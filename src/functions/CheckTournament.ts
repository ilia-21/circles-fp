import { Id, toast } from "react-toastify";
import { MappoolMod } from "../types/Beatmap";
import { Tourney, TourneyParticipant } from "../types/Tourney";
import { PlayerLite } from "../types/Player";
import { Team } from "../types/Team";
import FinalizeTournmaent from "./FinalizeTournmaent";
import { getTimeZone } from "./TimeOperations";
const sendTournament = async (id: string, tourneyData: Tourney, created?: boolean, toastId?: Id) => {
	const url = created ? `${import.meta.env.VITE_API_URL}/new/tourney?tz=${getTimeZone().replace("+", "plus").replace("-", "minus")}` : `${import.meta.env.VITE_API_URL}/edit/tourney/${id}?tz=${getTimeZone().replace("+", "plus").replace("-", "minus")}`;
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_API_KEY,
			},
			credentials: "include",
			body: JSON.stringify(tourneyData),
		});
		const data = await response.json();
		if (response.status == 401) {
			window.open("https://c.tenor.com/5laBYESlyu8AAAAC/tenor.gif", "_self");
		}
		if (!response.ok) {
			if (toastId) {
				const str = created ? " creating " : " updating ";
				setTimeout(() => {
					toast.update(toastId, { render: `Error, while ${str} tournament`, autoClose: 5000, type: "error" });
				}, 1000);
			}
			throw new Error(`Error saving data: ${response.statusText}`);
		}
		if (created) {
			window.open(`${window.location.origin}/#/tourney/${data.id}`);
		} else {
			if (toastId) {
				const str = created ? " created " : " updated ";
				setTimeout(() => {
					toast.update(toastId, { render: `Tournament ${str} successfully`, autoClose: 5000, type: "error" });
				}, 1000);
			}
		}
		return true;
	} catch (error) {
		console.error(error);
	}
};
const highlightMatches = (foundIn: string[]) => {
	for (const m of foundIn) {
		document.getElementById(`match-${m}`)?.classList.add("glowing-red");
		setTimeout(() => document.getElementById(`match-${m}`)?.classList.remove("glowing-red"), 10000);
	}
};
const updateToast = (current: Id, text: string) => {
	if (!current) return;
	setTimeout(() => {
		toast.update(current, { render: text, autoClose: 5000, type: "error" });
	}, 1000);
};
let CheckTournament = async (send: boolean, id: string, tourneyData: Tourney, setMessage: (message: string[]) => void, created?: boolean, skip?: boolean) => {
	// note: there are skill server side checks
	// so no, you can't just manipulate them
	const toastId = toast.warning("Checking", { autoClose: false });
	let foundIn: any = [];
	let counter: number | null = 0;
	const allBracketMatches = [...tourneyData.data.bracket.upper, ...tourneyData.data.bracket.lower];
	if (skip) {
		toast.update(toastId, { render: "Checks skipped, sending...", type: "error", autoClose: false });
		tourneyData = FinalizeTournmaent(tourneyData);
		sendTournament(id, tourneyData, created, toastId);
	}

	// Test 0
	// Check if there's even a something
	if (allBracketMatches.length <= 2) {
		counter++;
		foundIn.push("at least 3 matches");
	}
	if (tourneyData.data.participants.length <= 0) {
		counter++;
		foundIn.push("at least 4 participants");
	}
	if (tourneyData.data.pool.length <= 0) {
		counter++;
		foundIn.push("at least 1 mappool");
	}
	if (counter > 0) {
		updateToast(toastId, `Your tournament is incorrect! Every tournament should have ${foundIn.join(", ")}`);
		return false;
	}
	counter = 0;
	foundIn = [];

	for (const match of tourneyData.data.bracket.upper) {
		if (!match.nextMatchId) {
			counter++;
			foundIn.push(match.id);
		}
	}
	for (const match of tourneyData.data.bracket.lower) {
		if (!match.nextMatchId) {
			counter++;
			foundIn.push(match.id);
		}
	}
	if (counter > 1) {
		updateToast(toastId, `Your matches are incorrect! There can be only one match without "Next match for winner": the Grand Finals, but you have ${counter}: ${foundIn.join(", ")}`);
		highlightMatches(foundIn);
		return false;
	}
	counter = 0;
	foundIn = [];
	// Test 2
	// Check if all finished matches have both players set
	let found = false;
	for (const match of tourneyData.data.bracket.upper) {
		if (!match.participants[0] && !match.participants[1] && match.state == "DONE") {
			found = true;
			foundIn.push(match.id);
		}
	}
	for (const match of tourneyData.data.bracket.lower) {
		if (!match.participants[0] && !match.participants[1] && match.state == "DONE") {
			found = true;
			foundIn.push(match.id);
		}
	}
	if (found) {
		updateToast(toastId, `Your matches are incorrect! All finished matches must have both players selected. These matches dont: ${foundIn.join(", ")}`);
		highlightMatches(foundIn);
		return false;
	}
	counter = 0;
	foundIn = [];
	// Test 3
	// Check if all routes in matches are leading to existing match
	// There should only be one match with invalid nextMatchId: the last one.
	for (const match of tourneyData.data.bracket.upper) {
		const allUpperMatches = tourneyData.data.bracket.upper;
		const allLowerMatches = tourneyData.data.bracket.lower;
		if (!allUpperMatches.find((m) => m.id == match.nextMatchId) || !allLowerMatches.find((m) => m.id == match.nextLooserMatchId)) {
			counter++;
			foundIn.push(match.id);
		}
	}
	for (const match of tourneyData.data.bracket.lower) {
		const allUpperMatches = tourneyData.data.bracket.upper;
		const allLowerMatches = tourneyData.data.bracket.lower;
		if (!allLowerMatches.find((m) => m.id == match.nextMatchId) && !allUpperMatches.find((m) => m.id == match.nextMatchId)) {
			counter++;
			foundIn.push(match.id);
		}
	}
	if (counter > 1) {
		updateToast(toastId, `Your matches are incorrect! All matches, execpt grand finals must have real match id in "Next match for winner". These don't: ${foundIn.join(", ")}`);
		highlightMatches(foundIn);
		return false;
	}
	counter = 0;
	foundIn = [];
	// Test 4
	// Check if all winners/loosers are in correct matches
	// For each match match with nextMatchId or nextLooserMatchId should have winner/looser OR null/TBD
	// There can't be any other player/team in match from nextMatchId other than winner player/team, save for nextLooserMatchId
	for (const match of tourneyData.data.bracket.upper) {
		const nextWinnerMatch = tourneyData.data.bracket.upper.find((m) => m.id == match.nextMatchId) || tourneyData.data.bracket.lower.find((m) => m.id == match.nextMatchId);
		const nextLooserMatch = tourneyData.data.bracket.lower.find((m) => m.id == match.nextLooserMatchId);
		const thisWinner = match.participants.find((p) => p.isWinner == true);
		const thisLooser = match.participants.find((p) => p.isWinner == false);
		if (thisWinner) {
			// !thisWinner means that match doesn't have a winner yet
			if (nextWinnerMatch?.participants[0].name && !nextWinnerMatch?.participants.find((p) => p.name == thisWinner.name)) {
				counter++;
				foundIn.push(match.id);
				setTimeout(() => document.getElementById(`match-${match.id}`)?.classList.remove("glowing-red"), 20000);
			}
		}
		if (thisLooser) {
			if (nextLooserMatch?.participants[0].name && !nextLooserMatch?.participants.find((p) => p.name == thisLooser.name)) {
				counter++;
				foundIn.push(match.id);
			}
		}
	}
	for (const match of tourneyData.data.bracket.lower) {
		const nextWinnerMatch = tourneyData.data.bracket.upper.find((m) => m.id == match.nextMatchId) || tourneyData.data.bracket.lower.find((m) => m.id == match.nextMatchId);
		const thisWinner = match.participants.find((p) => p.isWinner == true);
		// Not checking for losers in lower bracket
		if (thisWinner) {
			// !thisWinner means that match doesn't have a winner yet
			if (nextWinnerMatch?.participants[0].name && !nextWinnerMatch?.participants.find((p) => p.name == thisWinner.name)) {
				counter++;
				foundIn.push(match.id);
			}
		}
	}
	highlightMatches(foundIn);
	if (counter > 0) {
		updateToast(toastId, `Your matches are incorrect! All winners should go to the "Next match for winner", and all loosers should go to the "Next match for looser", but these don't: ${foundIn.join(", ")}`);
		if (foundIn.length == 1) {
			setTimeout(() => document.getElementById(`match-${foundIn[0]}`)?.scrollIntoView(), 1000);
		}

		return false;
	}
	counter = 0;
	foundIn = [];
	// Test 5
	// Check if all finished matches have a valid mp link
	for (const match of [...tourneyData.data.bracket.upper, ...tourneyData.data.bracket.lower]) {
		if ((!match.mpID || !Number(match.mpID)) && match.state == "DONE") {
			counter++;
			foundIn.push(match.id);
		}
	}
	highlightMatches(foundIn);
	if (counter > 0) {
		updateToast(toastId, `Your matches are incorrect! All finished matches MUST have a valid osu mp link, but these don't: ${foundIn.join(", ")}`);
		if (foundIn.length == 1) {
			setTimeout(() => document.getElementById(`match-${foundIn[0]}`)?.scrollIntoView(), 1000);
		}

		return false;
	}
	counter = 0;
	foundIn = [];
	// Test 6
	// Check if all finished matches have a mappool assigned
	for (const match of allBracketMatches) {
		if (!tourneyData.data.pool.find((p) => p.title == match.tournamentRoundText) && match.state == "DONE") {
			counter++;
			foundIn.push(match.id);
		}
	}
	highlightMatches(foundIn);
	if (counter > 0) {
		updateToast(toastId, `Your matches are incorrect! All finished matches MUST have a valid stage, but these don't: ${foundIn.join(", ")}`);

		if (foundIn.length == 1) {
			setTimeout(() => document.getElementById(`match-${foundIn[0]}`)?.scrollIntoView(), 1000);
		}

		return false;
	}
	counter = 0;
	foundIn = [];
	// Test 7
	// Check if there's only one TB in each map pool
	for (const pool of tourneyData.data.pool) {
		let TBcount = 0;
		for (const map of pool.maps) {
			if ((map as [number, MappoolMod])[1].slice(0, 2) == "TB") TBcount++;
		}
		if (TBcount > 1) {
			counter++;
			foundIn.push(pool.title);
		}
	}
	highlightMatches(foundIn);
	if (counter > 0) {
		updateToast(toastId, `Your map pools are incorrect! All map pool MUST have only one Tiebreaker, but these don't: ${foundIn.join(", ")}`);

		return false;
	}

	// Test 8
	// Check if all images in description are from allowed links
	const description = tourneyData.data.description;
	const allowedDomains = ["imgur.com", "puu.sh", "ppy.sh"];
	const markdownImageRegex = /!\[.*?\]\((.*?)\)/g;
	const urls = [...description.matchAll(markdownImageRegex)].map((match) => match[1]);
	for (const url of urls) {
		const domain = new URL(url).hostname.split(".").slice(-2).join(".");
		if (!allowedDomains.some((allowedDomain) => domain.endsWith(allowedDomain))) {
			updateToast(toastId, `Your tournament description contains a link to an unknown source, please use one of the allowed image hostings: ${allowedDomains.join(", ")}`);
			return false;
		}
	}
	// Test 9
	// Check for fake links in description
	const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
	let match;

	while ((match = markdownLinkRegex.exec(description)) !== null) {
		const visibleText = match[1];
		const actualUrl = match[2];

		if (visibleText.startsWith("http://") || visibleText.startsWith("https://")) {
			if (visibleText !== actualUrl) {
				updateToast(toastId, `Your tournament description contains fake link. What are you trying to do? Please remove it. Links can only be like this: [https://ourwebsite.com](https://ourwebsite.com) or [our website](https://ourwebsite.com)`);
				return false;
			}
		}
	}

	// After tests
	// Some data modification, so it works on server
	tourneyData = FinalizeTournmaent(tourneyData);
	if (send) {
		const toastId = toast.warning("Sending", { autoClose: false });
		sendTournament(id, tourneyData, created, toastId);
	} else {
		toast.update(toastId, { render: "No errors found in your tournament", autoClose: 5000, type: "success" });
	}
	return true;
};
export default CheckTournament;

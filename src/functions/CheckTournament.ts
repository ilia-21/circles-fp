import { MappoolMod } from "../types/Beatmap";
import { Tourney } from "../types/Tourney";
const sendTournament = async (id: string, tourneyData: Tourney, setMessage: (message: string[]) => void) => {
	console.log("sending..");
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/edit/tourney/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_API_KEY,
			},
			credentials: "include",
			body: JSON.stringify(tourneyData),
		});
		if (response.status == 401) {
			window.open("https://c.tenor.com/5laBYESlyu8AAAAC/tenor.gif", "_self");
		}
		if (!response.ok) {
			setMessage(["red", "Error, while updating tournament"]);
			throw new Error(`Error saving data: ${response.statusText}`);
		}
		setMessage(["green", "Tournament information updated successfully"]);
		return true;
	} catch (error) {
		console.error(error);
	}
};
const highlightMatches = (foundIn: string[]) => {
	for (const m of foundIn) {
		document.getElementById(`match-${m}`)?.classList.add("glowing-red");
		setTimeout(() => document.getElementById(`match-${m}`)?.classList.remove("glowing-red"), 20000);
	}
};
let CheckTournament = async (send: boolean, id: string, tourneyData: Tourney, setMessage: (message: string[]) => void) => {
	let foundIn: any = [];
	// Test 1
	// Check for matches without any routes for winner
	// There should only be one match without a nextMatchId: the last one.
	let counter: number | null = 0;
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
		setMessage(["red", `Your matches are incorrect! There can be only one match without "Next match for winner": the Grand Finals, but you have ${counter}: ${foundIn.join(", ")}`]);
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
		setMessage(["red", `Your matches are incorrect! All finished matches must have both players selected. These matches dont: ${foundIn.join(", ")}`]);
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
		setMessage(["red", `Your matches are incorrect! All matches, execpt grand finals must have real match id in "Next match for winner". These don't: ${foundIn.join(", ")}`]);
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
		setMessage(["red", `Your matches are incorrect! All winners should go to the "Next match for winner", and all loosers should go to the "Next match for looser", but these don't: ${foundIn.join(", ")}`]);
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
		setMessage(["red", `Your matches are incorrect! All finished matches MUST have a valid osu mp link, but these don't: ${foundIn.join(", ")}`]);
		if (foundIn.length == 1) {
			setTimeout(() => document.getElementById(`match-${foundIn[0]}`)?.scrollIntoView(), 1000);
		}

		return false;
	}
	counter = 0;
	foundIn = [];
	// Test 6
	// Check if all finished matches have a mappool assigned
	for (const match of [...tourneyData.data.bracket.upper, ...tourneyData.data.bracket.lower]) {
		if (!tourneyData.data.pool.find((p) => p.title == match.tournamentRoundText) && match.state == "DONE") {
			counter++;
			foundIn.push(match.id);
		}
	}
	highlightMatches(foundIn);
	if (counter > 0) {
		setMessage(["red", `Your matches are incorrect! All finished matches MUST have a valid stage, but these don't: ${foundIn.join(", ")}`]);
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
		setMessage(["red", `Your map pools are incorrect! All map pool MUST have only one Tiebreaker, but these don't: ${foundIn.join(", ")}`]);

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
			setMessage(["red", `Your tournament description contains a link to an unknown source, please use one of the allowed image hostings: ${allowedDomains.join(", ")}`]);
		}
		return false;
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
				setMessage(["red", `Your tournament description contains fake link. What are you trying to do? Please remove it. Links can only be like this: [https://ourwebsite.com](https://ourwebsite.com) or [our website](https://ourwebsite.com)`]);
				return false;
			}
		}
	}

	if (send) {
		sendTournament(id, tourneyData, setMessage);
	} else {
		setMessage(["green", "No errors found in your tournament, click again to confirm"]);
	}
	return true;
};
export default CheckTournament;

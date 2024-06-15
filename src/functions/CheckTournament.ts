import { Tourney } from "../types/Tourney";
const sendTournament = async (id: string, tourneyData: Tourney, setMessage: (message: string[]) => void) => {
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
let CheckTournament = async (id: string, tourneyData: Tourney, setMessage: (message: string[]) => void) => {
	let foundIn = [];
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
		return false;
	}
	sendTournament(id, tourneyData, setMessage);
	return true;
};
export default CheckTournament;

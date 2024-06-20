import { Tourney } from "../types/Tourney";

let ProcessTournamentBracket = (t: Tourney) => {
	let bracket = t.data.bracket;
	bracket.upper.map((m) => {
		Number(m.mpID) ? (m.href = `/#/match/${m.mpID}`) : (m.href = ``);
		if (new Date(m.startTime)) {
			m.startTime = new Intl.DateTimeFormat("en-US", {
				dateStyle: "short",
				timeStyle: "short",
			}).format(new Date(m.startTime));
		}
	});
	bracket.lower.map((m) => {
		Number(m.mpID) ? (m.href = `/#/match/${m.mpID}`) : (m.href = ``);
	});
	return bracket;
};

export default ProcessTournamentBracket;

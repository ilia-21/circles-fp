import { Tourney } from "../types/Tourney";

let ProcessTournamentBracket = (t: Tourney) => {
	let bracket = t.data.bracket;
	for (let m of bracket.upper) {
		m.href = `/match/${m.id}`;
		if (new Date(m.startTime)) {
			//fml
			m.startTime = new Intl.DateTimeFormat("en-US", {
				dateStyle: "short",
				timeStyle: "short",
			}).format(new Date(m.startTime));
		}
	}
	for (let m of bracket.lower) {
		m.href = `/match/${m.id}`;
	}
	return bracket;
};

export default ProcessTournamentBracket;

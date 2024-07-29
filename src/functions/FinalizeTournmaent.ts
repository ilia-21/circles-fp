import { PlayerLite } from "../types/Player";
import { Team } from "../types/Team";
import { Tourney, TourneyParticipant } from "../types/Tourney";

const FinalizeTournmaent = (tourneyData: Tourney) => {
	const findId = (id: string) => {
		return tourneyData.data.participants.find((p: TourneyParticipant) => (p.who as PlayerLite).username === id || (p.who as Team).title === id)?.who.id;
	};
	console.log("Finalizing...");
	const updatedMatches = {
		upper: tourneyData.data.bracket.upper.map((match) => {
			if (match.participants[0] && !Number(match.participants[0].id)) {
				console.log(match.participants[0].id);
				const firstParticipantID = findId(match.participants[0].id);
				if (!firstParticipantID) throw new Error("Id not found");
				const firstParticipant = { ...match.participants[0], id: `` + firstParticipantID };
				match.participants = [firstParticipant, match.participants[1]];
			}
			if (match.participants[1] && !Number(match.participants[1].id)) {
				const secondParticipantID = findId(match.participants[1].id);
				if (!secondParticipantID) throw new Error("Id not found");
				const secondParticipant = { ...match.participants[1], id: `` + secondParticipantID };
				match.participants = [match.participants[0], secondParticipant];
			}
			return match;
		}),
		lower: tourneyData.data.bracket.lower.map((match) => {
			if (match.participants[0] && !Number(match.participants[0].id)) {
				const firstParticipantID = findId(match.participants[0].id);
				if (!firstParticipantID) throw new Error("Id not found");
				const firstParticipant = { ...match.participants[0], id: `` + firstParticipantID };
				match.participants = [firstParticipant, match.participants[1]];
			}
			if (match.participants[1] && !Number(match.participants[1].id)) {
				const secondParticipantID = findId(match.participants[1].id);
				if (!secondParticipantID) throw new Error("Id not found");
				const secondParticipant = { ...match.participants[1], id: `` + secondParticipantID };
				match.participants = [match.participants[0], secondParticipant];
			}
			return match;
		}),
	};
	tourneyData.data.bracket = updatedMatches;
	console.log(tourneyData);
	return tourneyData;
};
export default FinalizeTournmaent;

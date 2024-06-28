import { PlayerLite } from "../types/Player";
import { Team } from "../types/Team";
import { Tourney, TourneyParticipant } from "../types/Tourney";

const FinalizeTournmaent = (tourneyData: Tourney) => {
	console.log("Finalizing...");
	const updatedMatches = {
		upper: tourneyData.data.bracket.upper.map((match) => {
			if (match.participants[0]) {
				const firstParticipantID = tourneyData.data.participants.find((p: TourneyParticipant) => (p.who as PlayerLite).username === match.participants[0].id || (p.who as Team).title === match.participants[0].id)?.who.id;
				const firstParticipant = { ...match.participants[0], id: `` + firstParticipantID };
				match.participants = [firstParticipant, match.participants[1]];
			}
			if (match.participants[1]) {
				const secondParticipantID = tourneyData.data.participants.find((p: TourneyParticipant) => (p.who as PlayerLite).username === match.participants[1].id || (p.who as Team).title === match.participants[1].id)?.who.id;
				const secondParticipant = { ...match.participants[1], id: `` + secondParticipantID };
				match.participants = [match.participants[0], secondParticipant];
			}
			return match;
		}),
		lower: tourneyData.data.bracket.lower.map((match) => {
			if (match.participants[0]) {
				const firstParticipantID = tourneyData.data.participants.find((p: TourneyParticipant) => (p.who as PlayerLite).username === match.participants[0].id || (p.who as Team).title === match.participants[0].id)?.who.id;
				const firstParticipant = { ...match.participants[0], id: `` + firstParticipantID };
				match.participants = [firstParticipant, match.participants[1]];
			}
			if (match.participants[1]) {
				const secondParticipantID = tourneyData.data.participants.find((p: TourneyParticipant) => (p.who as PlayerLite).username === match.participants[1].id || (p.who as Team).title === match.participants[1].id)?.who.id;
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

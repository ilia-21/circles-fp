import { Beatmap } from "./Beatmap";
import { DoubleEliminationMatches } from "./DoubleElimMatches";
import { Match } from "./Match";
import { Player, PlayerLite, PlayerLitest } from "./Player";
import { Team } from "./Team";

export interface Tourney {
	id: number;
	title: string;
	host: Player;
	data: TourneyData;
	visits: any;
	popularity: number;
	datestart: string | Date;
	dateend: string | Date;
	ongoing: boolean;
	matches: Match[];
}
interface TourneyData {
	banner: string;
	description: string;
	icon: string;
	prize: string;
	stream: string;
	date: {
		start: string;
		end: string;
	};
	participants: TourneyParticipant[];
	pool: TourneyMappool[];
	bracket: DoubleEliminationMatches;
}
interface TourneyMappool {
	title: string;
	maps: Beatmap[];
}
export interface TourneyParticipant {
	type: "team" | "player";
	who: PlayerLite | PlayerLitest | Team;
	why: string;
}

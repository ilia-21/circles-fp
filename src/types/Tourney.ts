import { Beatmap, MappoolMod } from "./Beatmap";
import { DoubleEliminationMatches } from "./DoubleElimMatches";
import { Match } from "./Match";
import { PlayerLite, PlayerLitest } from "./Player";
import { Team } from "./Team";

export interface TourneyLite {
	id: number;
	title: string;
	ongoing: boolean;
	endedRecently: boolean;
	datestart: string | Date;
	data: {
		icon: string;
	};
}

export interface Tourney {
	id: number;
	title: string;
	host: PlayerLite;
	data: TourneyData;
	visits: any;
	popularity: number;
	datestart: string | Date;
	dateend: string | Date;
	ongoing: boolean;
	matches: Match[];
}
export interface TourneyData {
	type?: "1v1" | "team";
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
export interface TourneyMappool {
	title: string;
	maps: Beatmap[] | [number, MappoolMod][];
}
export interface TourneyParticipant {
	type: "team" | "player";
	who: PlayerLite | PlayerLitest | Team;
	why: string;
}

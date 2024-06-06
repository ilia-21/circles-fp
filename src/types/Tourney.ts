import { Beatmap } from "./Beatmap";
import { DoubleEliminationMatches } from "./DoubleElimMatches";
import { Match } from "./Match";
import { Player } from "./Player";

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
	date: {
		start: string;
		end: string;
	};
	pool: TournamentMappool[];
	bracket: DoubleEliminationMatches;
}
interface TournamentMappool {
	title: string;
	maps: Beatmap[];
}

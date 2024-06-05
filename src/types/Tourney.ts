import { DoubleEliminationMatches } from "./DoubleElimMatches";
import { Match } from "./Match";
import { Player } from "./Player";

export interface Tourney {
	id: number;
	title: string;
	host: Player;
	data: {
		banner: string;
		icon: string;
		prize: string;
		date: {
			start: string;
			end: string;
		};
		bracket: DoubleEliminationMatches;
	};
	visits: any;
	popularity: number;
	datestart: string | Date;
	dateend: string | Date;
	ongoing: boolean;
	matches: Match[];
}

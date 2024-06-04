import { Match } from "./Match";

export interface Tourney {
	id: number;
	title: string;
	host: number;
	data: {
		banner: string;
		prize: string;
	};
	visits: any;
	popularity: number;
	matches: Match[];
}

import { Player } from "./Player";
import { Team } from "./Team";

export interface Match {
	id: number;
	type: string;
	tournament: number;
	result: number[];
	first: Team | Player;
	second: Team | Player;
	timestamp: string;
	data: any;
	date: string;
}

import { Match } from "./Match";
import { PlayerLite } from "./Player";

export interface Team {
	id: number;
	title: string;
	logo: string;
	leader: PlayerLite;
	players: PlayerLite[];
	matches?: Match[];
}

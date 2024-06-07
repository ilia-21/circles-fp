import { Player, PlayerLite } from "./Player";

export interface Team {
	id: number;
	title: string;
	players: PlayerLite[];
}

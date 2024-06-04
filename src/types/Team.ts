import { Player } from "./Player";

export interface Team {
	id: number;
	title: string;
	players: Player[];
}

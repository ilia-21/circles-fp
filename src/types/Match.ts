import { MappoolMod } from "./Beatmap";
import { Player } from "./Player";
import { Team } from "./Team";
import { MatchEvent as Event, PickEvent } from "./MatchEvent";

export interface Match {
	id: number;
	events: (Event | PickEvent)[];
	type: "1v1" | "team";
	tournament: number;
	result: number[];
	first: Team | Player;
	second: Team | Player;
	timestamp: string;
	data: any;
	date: string;
}

import { Player, PlayerLite } from "./Player";
import { Team } from "./Team";
import { MatchEvent as Event, PickEvent } from "./MatchEvent";

export interface Match {
	id: number;
	events: (Event | PickEvent)[];
	users: PlayerLite[];
	type: "1v1" | "team";
	tournament: number;
	result: number[];
	first: Team | Player;
	second: Team | Player;
	timestamp: string;
	data?: MatchData;
	date: string;
	extra?: string;
}
interface MatchData {
	stage: string;
	picks: PickEvent[];
}

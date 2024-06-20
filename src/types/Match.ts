import { Player, PlayerLite } from "./Player";
import { Team } from "./Team";
import { MatchEvent as Event, PickEvent } from "./MatchEvent";

export interface Match {
	name: string;
	match: MatchInfo;
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
interface MatchInfo {
	id: number;
	start_time: string;
	end_time: string;
	name: string;
}

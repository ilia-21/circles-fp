//those goddamn brackets...
export interface BracketMatch {
	id: string; // This will be used as reference from another match
	href?: string;
	name: string;
	nextMatchId: string | null; // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
	nextLooserMatchId: string | null;
	tournamentRoundText: string; // Text for Round Header
	startTime: string;
	state: "DONE" | "NO_SHOW" | "WALK_OVER" | "NO_PARTY" | "DONE" | "SCORE_DONE"; // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
	participants: Participant[];
}
interface Participant {
	id: string; // Unique identifier of any kind
	resultText: string; // Any string works
	isWinner: boolean;
	status: "PLAYED" | "NO_SHOW" | "WALK_OVER" | "NO_PARTY" | null;
	name: string;
}

//those goddamn brackets...

/**
 * Match to be used in bracket
 *
 * @interface BracketMatch
 * @id Will be used as reference from another match
 * @href (Optional) /matches/${id} link
 * @name (Optional) The text that will be shown under match in bracket
 * @nextMatchId  Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
 * @tournamentRoundText Will be used as reference from another match
 * @startTime Timestamp with timezone
 * @state Only needed to decide walkovers and if teamNames are TBD (to be decided)
 */
export interface BracketMatch {
	id: string;
	href?: string;
	mpID?: string;
	name?: string;
	nextMatchId: string | null;
	nextLooserMatchId: string | null;
	tournamentRoundText?: string; // (broken) Text for Round Header, used for tournament stage, for example: Semifinals
	startTime: string;
	state: "DONE" | "NO_SHOW" | "WALK_OVER" | "NO_PARTY" | "DONE" | "SCORE_DONE";
	participants: Participant[];
}
/**
 * Participant fomat for brackets
 *
 * @id Unique identifier of any kind
 * @resultText Any string works
 * @isWinner (Optional) true if participant won this match
 * @status "PLAYED" | "NO_SHOW" | "WALK_OVER" | "NO_PARTY" | null;
 * @name Text that will be shown in bracket
 */
interface Participant {
	id: string;
	resultText: string;
	isWinner?: boolean;
	status: "PLAYED" | "NO_SHOW" | "WALK_OVER" | "NO_PARTY" | null;
	name: string;
}

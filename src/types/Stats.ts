export interface PlayerStats {
	period: "allTime" | [string, string];
	Rates: Rates;
	Combos: {
		NM: number;
		HD: number;
		HR: number;
		HRHD: number;
	};
	Matches: MatchStats;
	Tiebrakers: MatchStats;
}
export interface TourneyStats {
	Rates: StageRates;
	Combos: {
		NM: number;
		HD: number;
		HR: number;
		HRHD: number;
	};
	Matches: MatchStats;
	Tiebrakers: MatchStats;
}
interface StageRates {
	stage: string;
	rates: PickBanRates;
}
interface PickBanRates {
	NM: PickBanRate;
	HR: PickBanRate;
	HD: PickBanRate;
	DT: PickBanRate;
	FM: PickBanRate;
}
interface PickBanRate {
	pick: number;
	ban: number;
}
interface Rates {
	NM: Rate;
	HR: Rate;
	HD: Rate;
	DT: Rate;
	FM: Rate;
}
interface MatchStats {
	won: number;
	lost: number;
	total: number;
}
/**
 * Rates for map picks/bans/wins/looses
 *
 * @timesWon Amount of maps won
 * @timesLost Amount of maps lost
 * @outOf  Total amount of maps
 */
interface Rate {
	timesWon: Times;
	timesLost: Times;
	outOf: Times;
}
/**
 * Times for picks/bans/wins/looses
 * this is prob unoptimized af, but I'll fix in later™
 * @ownPick Amount of own picks
 * @oppPick Amount of opponent picks
 *
 */
interface Times {
	ownPick: number;
	oppPick: number;
}

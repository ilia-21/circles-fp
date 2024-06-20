// https://imgur.com/BJPOKDY
import { Match } from "../types/Match";
import { MatchEvent } from "../types/MatchEvent";
import { Mod } from "../types/Mod";

type Game = {
	playerScore: number;
	averageScore: number;
	isTiebreaker: boolean;
	tiebreakerScore?: number;
	averageTiebreakerScore?: number;
};

/**
 * Calculates the matchCost for a player
 *
 * @games {Game[]} array of converted games
 * @nPrime {number} amount of participated games for the player
 * @returns {number} - The calculated cost.
 */
export const calculateMatchcost = (games: Game[], nPrime: number): number => {
	const playerScores = games.map((g) => g.playerScore);
	const averageScores = games.map((g) => g.averageScore);
	const scoreSum = playerScores.reduce((sum, score, index) => sum + score / averageScores[index], 0);

	// Calculate the cost using the provided formula
	const cost = (2 / (nPrime + 2)) * scoreSum;

	return cost;
};

//Bathbot formula was strange, so I'll use osuplus
/**
 * Returns the matchcost of player in match
 * @games {number} array of converted games
 * @n {number} total amount of games
 * @nPrime {number} amount of participated games for the player
 * @m {number} amount of different mod combinations the player used
 * @returns {number}
 */
// export const calculateMatchcost = (games: Game[], n: number, nPrime: number, m: number): number => {
// 	// Sum of (player score / average score) for all games
// 	let sumScores = 0;
// 	let tiebreakerBonus = 0;

// 	for (const game of games) {
// 		sumScores += game.playerScore / game.averageScore;
// 		if (game.isTiebreaker && game.tiebreakerScore && game.averageTiebreakerScore) {
// 			tiebreakerBonus += game.tiebreakerScore / game.averageTiebreakerScore;
// 		}
// 	}

// 	const participationBonus = nPrime * 0.5;
// 	const averageScore = 1 / nPrime;
// 	const participationMultiplier = 1.4 * Math.pow((nPrime - 1) / (n - 1), 0.6);
// 	const modCombinationBonus = 1 + 0.02 * Math.max(0, m - 2);
// 	const playerRating = (sumScores + participationBonus + tiebreakerBonus) * averageScore * participationMultiplier * modCombinationBonus;

// 	return playerRating;
// };
/**
 * Converts games and starts Matchcost calculator
 * @match {Match} Match object
 * @user {number} user ID to calculate match cost
 * @returns {Game[]}
 */
export const convertAndCalculateMatchcost = (match: Match, user: number): number => {
	let n = 0;
	let nPrime = 0;
	let m = 0;
	let modCombos: Mod[][] = [];

	let games: Game[] = [];
	for (const e of match.events) {
		if ((e as MatchEvent).detail.type == "other") {
			if ((e as MatchEvent).game?.scores.length == 0) continue;
			// type == other means that the event is played map
			n++;
			let avgScore = 0;
			let scoresCount = 0;
			let playerScore = 0;
			//@ts-ignore
			for (const s of (e as MatchEvent).game?.scores) {
				avgScore += s.score;

				scoresCount++;
				if (s.user_id == user) {
					playerScore = s.score;
					nPrime++;
					modCombos.push(s.mods);
				}
			}

			avgScore = avgScore / scoresCount;

			let lastGameid = 0;
			for (const ev of match.events) {
				if ((ev as MatchEvent).detail.type == "other") {
					lastGameid = (ev as MatchEvent).id;
				}
			}
			// Check if event is TB
			let isTB = lastGameid == (e as MatchEvent).id;
			let TBScore = 0;
			let avgTBScore = 0;
			let TBScoreCount = 0;
			let TBEvent = match.events.find((evnt) => (evnt as MatchEvent).id == lastGameid);
			//@ts-ignore
			for (const scr of (TBEvent as MatchEvent).game?.scores) {
				avgTBScore += scr.score;
				TBScoreCount++;
				if (scr.user_id == user) TBScore = scr.score;
			}
			avgTBScore = avgTBScore / TBScoreCount;
			games.push({ playerScore: playerScore, averageScore: avgScore, isTiebreaker: isTB, tiebreakerScore: TBScore, averageTiebreakerScore: avgTBScore });
		}
	}
	// count unique mod combos
	const uniqueCombinations = new Set<string>();
	for (const combo of modCombos) {
		const sortedCombo = combo.slice().sort().join(",");
		uniqueCombinations.add(sortedCombo);
	}
	m = uniqueCombinations.size;

	const MatchCost = calculateMatchcost(games, nPrime);
	return MatchCost;
};

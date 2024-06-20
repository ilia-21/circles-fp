import { MatchEvent as MatchEventType, PickEvent, Score } from "../../types/MatchEvent";
import { Team } from "../../types/Team";
import BeatmapMod from "../universal/BeatmapMod";
import Tooltip from "../universal/Tooltip";
import "./MatchDetails.css";

interface Props {
	first: Team;
	second: Team;
	event: MatchEventType | PickEvent;
	next: MatchEventType | PickEvent;
}

const MatchTeamEvent = ({ event, next, first }: Props) => {
	if ((event as MatchEventType).id) {
		event = event as MatchEventType;
		// @ts-ignore: Object is possibly 'null'.
		if (event.detail.type != "other" || event.game.scores.length <= 0) {
			return <></>;
		}
		let firstScores: Score[] = [];
		let firstTotal = 0;
		let secondScores: Score[] = [];
		let secondTotal = 0;
		// @ts-ignore: Object is possibly 'null'.
		for (const s of event.game?.scores) {
			if (s.match.team == "red") {
				firstTotal += s.score;
				firstScores.push(s);
			} else if (s.match.team == "blue") {
				secondTotal += s.score;
				secondScores.push(s);
			}
		}
		firstScores.sort((a, b) => b.score - a.score);
		secondScores.sort((a, b) => b.score - a.score);
		// @ts-ignore: Object is possibly 'null'.
		const beatmap = event.game.beatmap;
		// @ts-ignore: Object is possibly 'null'.
		const mod = event.game.mods[1] || "NM";

		const drawScoreDetails = (who: Score[]) => {
			const scoreElements = who.map((s) => {
				return (
					<div className="matchGrid-row">
						<div className="matchGrid-item">
							<a href={`/#/${s.player.id}`}>
								<img src={s.player.avatar_url} />
								<Tooltip content={s.player.username} height="2em" />
							</a>
						</div>
						<div className="matchGrid-item">
							<p>{s.max_combo}x</p>
						</div>
						<div className="matchGrid-item">
							<p>{Math.round(s.accuracy * 10000) / 100}%</p>
						</div>
						<div className="matchGrid-item">
							<p>{`{${s.statistics.count_300}/${s.statistics.count_100}/${s.statistics.count_50}/${s.statistics.count_miss}}`}</p>
						</div>
						<div className="matchGrid-item">
							<p style={{ fontWeight: "bolder" }}>{s.score}</p>
						</div>
					</div>
				);
			});

			return scoreElements;
		};
		return (
			<div className="MatchPlay">
				<a
					className="MatchPlayHeader"
					style={{
						backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${beatmap.beatmapset.covers.cover})`,
					}}
					href={`https://osu.ppy.sh/b/${beatmap.id}`}
				>
					{mod && (
						<div className="MatchPlayBeatmapMod">
							<BeatmapMod mod={mod} textColor="var(--cfp-bg)" />
						</div>
					)}
					<p>{beatmap.beatmapset.artist}</p>
					<p>{beatmap.beatmapset.title}</p>
				</a>
				<div className="MatchScoresContainer">
					<div className={firstTotal > secondTotal ? "MatchScoreContainer winner" : "MatchScoreContainer looser"}>
						<p className="MatchScorePoints">{firstTotal}</p>
						<table>
							<tbody>{drawScoreDetails(firstScores)}</tbody>
						</table>
					</div>
					<div className={secondTotal > firstTotal ? "MatchScoreContainer winner" : "MatchScoreContainer looser"}>
						<p className="MatchScorePoints">{secondTotal}</p>
						<table>
							<tbody>{drawScoreDetails(secondScores)}</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	} else {
		event = event as PickEvent;
		const content = [event.type == "ban" ? "var(--red)" : "var(--green)", event.type == "ban" ? " banned " : " picked ", event.map];
		if (event.type != "tb") {
			return (
				<div className={(next as MatchEventType).game ? "matchEvent prePick" : "matchEvent"}>
					<div>
						{event.who == "first" && (
							<p style={{ color: content[0] }}>
								{first.title} {content[1]} {content[2]}
							</p>
						)}
					</div>
					<div>
						{event.who == "second" && (
							<p style={{ color: content[0] }}>
								{first.title} {content[1]} {content[2]}
							</p>
						)}
					</div>
				</div>
			);
		} else {
			<p>The match ends in a tie, players have to play tiebreaker!</p>;
		}
	}
};

export default MatchTeamEvent;

import { MatchEvent as MatchEventType, PickEvent, Score } from "../../types/MatchEvent";
import BeatmapMod from "../universal/BeatmapMod";
import "./MatchDetails.css";

interface Props {
	first: string;
	second: string;
	event: MatchEventType | PickEvent;
	next: MatchEventType | PickEvent;
}

const MatchEvent = ({ event, next, first, second }: Props) => {
	if ((event as MatchEventType).id) {
		event = event as MatchEventType;
		if (event.detail.type != "other") {
			return <></>;
		}
		// @ts-ignore: Object is possibly 'null'.
		const firstScore = (event as MatchEventType).game.scores[0];
		// @ts-ignore: Object is possibly 'null'.
		const secondScore = (event as MatchEventType).game.scores[1];
		// @ts-ignore: Object is possibly 'null'.
		const beatmap = event.game.beatmap;
		// @ts-ignore: Object is possibly 'null'.
		const mod = event.game.mods[1] || "NM";

		const drawScoreDetails = (who: Score) => {
			return (
				<div>
					<p>Acc: {Math.round(who.accuracy * 10000) / 100}%</p>
					<p>{`${who.max_combo}x`}</p>
					<p>{`{${who.statistics.count_300}/${who.statistics.count_100}/${who.statistics.count_50}/${who.statistics.count_miss}}`}</p>
				</div>
			);
		};
		console.log(firstScore, secondScore);
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
					<div className={firstScore?.score > secondScore?.score || !secondScore ? "MatchScoreContainer winner" : "MatchScoreContainer looser"}>
						<p className="MatchScorePoints">{firstScore?.score}</p>
						{drawScoreDetails(firstScore)}
					</div>
					{secondScore ? (
						<div className={secondScore?.score > firstScore?.score ? "MatchScoreContainer winner" : "MatchScoreContainer looser"}>
							<p className="MatchScorePoints">{secondScore?.score}</p>
							{drawScoreDetails(secondScore)}
						</div>
					) : (
						<div className={"MatchScoreContainer looser"}>
							<p className="MatchScorePoints">{"Disconnect"}</p>
						</div>
					)}
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
								{first} {content[1]} {content[2]}
							</p>
						)}
					</div>
					<div>
						{event.who == "second" && (
							<p style={{ color: content[0] }}>
								{second} {content[1]} {content[2]}
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

export default MatchEvent;

import { MatchEvent as MatchEventType, PickEvent } from "../../types/MatchEvent";
import "./MatchDetails.css";

interface Props {
	first: string;
	second: string;
	event: MatchEventType | PickEvent;
}

const MatchEvent = ({ event, first, second }: Props) => {
	if ((event as MatchEventType).id) {
		event = event as MatchEventType;
		if (event.detail.type != "other") {
			return <></>;
		}

		const firstScore = (event as MatchEventType).game?.scores[0];
		const secondScore = (event as MatchEventType).game?.scores[1];

		return (
			<div>
				<img src={event.game?.beatmap.beatmapset.covers.cover} alt="" />
				<div>
					<div></div>
					<div></div>
				</div>
			</div>
		);
	} else {
		event = event as PickEvent;

		if (event.type != "tb") {
			return (
				<div className="matchEvent">
					<p>{event.who == "first" ? first : second}</p> <p style={{ color: event.type == "ban" ? "var(--red)" : "var(--green)" }}>{event.type == "ban" ? " banned " : " picked "}</p> <p>{event.map}</p>
				</div>
			);
		} else {
			<p>The match ends in a tie, players have to play tiebreaker!</p>;
		}
	}
};

export default MatchEvent;

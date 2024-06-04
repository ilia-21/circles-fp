import { Player } from "../../types/Player";
import { Team } from "../../types/Team";
import "./MatchSmall.css";
interface Props {
	id: number;
	first: Team | Player;
	second: Team | Player;
	content: "upcoming" | "score";
	upcoming?: String[];
	score?: number[];
}

const MatchSmall = ({ id, first, second, content, upcoming, score }: Props) => {
	console.log(upcoming);
	let getTimeZone = () => {
		let offset = new Date().getTimezoneOffset(),
			o = Math.abs(offset);
		let bs: number = parseInt(("00" + Math.floor(o / 60)).slice(-2));
		return offset < 0 ? 0 + bs : 0 - bs;
	};
	let createContent = () => {
		if (content == "score" && score) {
			return (
				<p>
					{score[0]} - {score[1]}
				</p>
			);
		} else if (upcoming) {
			let timePart = upcoming[1].slice(0, 8);
			let combinedDateTimeString = `${timePart}${upcoming[1].slice(8, 10)}T${upcoming[0].slice(0, 11)}:00`;
			const timestamp = new Date(combinedDateTimeString);
			const localizedTimeString = new Intl.DateTimeFormat("en-US", {
				hour: "2-digit",
				minute: "2-digit",
			}).format(timestamp);
			return <p>{`${localizedTimeString}`}</p>;
		}
	};

	let createLink = (who: Team | Player) => {
		if (first as Player) {
			return (
				<a href="">
					<img src={`${(who as Player).avatar_url}`} alt="" />
				</a>
			);
		} else {
			return (
				<a href="">
					<img src={`/src/assets/flags/${who}.png`} alt="NO TEAM AVATARS CURRENTLY" />
				</a>
			);
		}
	};

	return (
		<div className="matchSmall">
			{createLink(first)}
			{createContent()}
			{createLink(second)}
		</div>
	);
};

export default MatchSmall;

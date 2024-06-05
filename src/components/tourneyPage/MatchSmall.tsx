import { Player } from "../../types/Player";
import { Team } from "../../types/Team";
import PlayerCardSmall from "../mainPage/PlayerCardSmall";
import "./MatchSmall.css";
interface Props {
	id: number;
	first: Team | Player;
	second: Team | Player;
	content: "upcoming" | "score";
	upcoming?: string | Date;
	score?: number[];
}

const MatchSmall = ({ id, first, second, content, upcoming, score }: Props) => {
	let openMatchPage = (id: number) => {
		window.open(`/matches/${id}`, "_blank");
	};

	let createContent = () => {
		if (content == "score" && score) {
			return (
				<p>
					{score[0]} - {score[1]}
				</p>
			);
		} else if (upcoming) {
			let timestamp = new Date(upcoming);
			let shortLocalizedTimeString = new Intl.DateTimeFormat("en-US", {
				hour: "2-digit",
				minute: "2-digit",
			}).format(timestamp);
			let longLocalizedTimeString = new Intl.DateTimeFormat("en-US", {
				dateStyle: "full",
				timeStyle: "long",
			}).format(timestamp);
			return (
				<p>
					{`${shortLocalizedTimeString}`}
					<span className="tooltip">{`${longLocalizedTimeString}`}</span>
				</p>
			);
		}
	};

	let createLink = (who: Team | Player) => {
		if (first as Player) {
			return (
				<a href={`profile/${(who as Player).id}`}>
					<img src={`${(who as Player).avatar_url}`} alt="" />
					<PlayerCardSmall player={who as Player} />
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
		<div className="matchSmall" onClick={() => openMatchPage(id)}>
			{createLink(first)}
			{createContent()}
			{createLink(second)}
		</div>
	);
};

export default MatchSmall;

import { Match } from "../../types/Match";
import { Player } from "../../types/Player";
import { Team } from "../../types/Team";
import PlayerCardSmall from "../mainPage/PlayerCardSmall";
import "./MatchCardMed.css";

interface Props {
	match: Match;
	content: "upcoming" | "score";
}

const MatchCardMed = ({ match, content }: Props) => {
	if ((content == "upcoming" && new Date(match.timestamp) < new Date(Date.now())) || (content == "score" && new Date(match.timestamp) > new Date(Date.now()))) return;
	const score = match.result;
	const upcoming = match.timestamp || null;
	const first = match.first;
	const second = match.second;
	const id = match.id;
	const openMatchPage = (id: number) => {
		window.open(`/#/matches/${id}`, "_blank");
	};

	const createContent = () => {
		if (content == "score") {
			return <p>{score ? `${score[0]} - ${score[1]}` : "Score not found"}</p>;
		} else if (content == "upcoming") {
			if (!upcoming) {
				return (
					<p>
						"6:66 AM"
						<span className="tooltip">"Time not found"</span>
					</p>
				);
			}
			const timestamp = new Date(upcoming);
			const shortLocalizedTimeString = new Intl.DateTimeFormat("en-US", {
				hour: "2-digit",
				minute: "2-digit",
			}).format(timestamp);
			const longLocalizedTimeString = new Intl.DateTimeFormat("en-US", {
				dateStyle: "full",
				timeStyle: "long",
			}).format(timestamp);
			return (
				<p>
					{shortLocalizedTimeString}
					<span className="tooltip">{longLocalizedTimeString}</span>
				</p>
			);
		}
	};

	const createLink = (who: Team | Player) => {
		if ((first as Player).avatar_url) {
			return (
				<a href={`profile/${(who as Player).id}`}>
					<img src={(who as Player).avatar_url} alt="" />
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
		<div className="matchMed" onClick={() => openMatchPage(id)}>
			{createLink(first)}
			{createContent()}
			{createLink(second)}
		</div>
	);
};

export default MatchCardMed;

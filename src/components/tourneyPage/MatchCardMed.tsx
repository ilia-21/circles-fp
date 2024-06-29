import { Match } from "../../types/Match";
import { Player, PlayerLite } from "../../types/Player";
import { Team } from "../../types/Team";
import PlayerCardSmall from "../mainPage/PlayerCardSmall";
import TeamLink from "../universal/TeamLink";
import Tooltip from "../universal/Tooltip";
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
		window.open(`/#/match/id/${id}`, "_blank");
	};

	const createContent = () => {
		if (content == "score") {
			return <p>{score ? `${score[0]} - ${score[1]}` : "? - ?"}</p>;
		} else if (content == "upcoming") {
			if (!upcoming) {
				return (
					<p>
						"0:00 AM"
						<Tooltip content={"Time not found"} />
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
					<Tooltip content={longLocalizedTimeString} />
				</p>
			);
		}
	};

	const createLink = (who: Team | PlayerLite) => {
		if ((first as PlayerLite).avatar_url) {
			return (
				<a href={`profile/${(who as Player).id}`}>
					<img src={(who as Player).avatar_url} alt="" />
					{(who as Player).id != 1 ? <PlayerCardSmall player={who as Player} /> : "TBD"}
				</a>
			);
		} else {
			return (
				<a href="">
					<img src={`${(match.second as Team).logo}`} alt="" />
					{(who as Player).id != 1 ? <TeamLink team={who as Team} noColor /> : "TBD"}
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

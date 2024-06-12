import { Match } from "../../types/Match";
import { PlayerLite } from "../../types/Player";
import { Tourney } from "../../types/Tourney";
import "../universal/universal.css";
import "./MatchDetails.css";
import LinkButtonSmall from "./LinkButtonSmall";
import OneStat from "./OneStat";
interface Props {
	match: Match;
	tournament: Tourney;
}

const MatchDetails = ({ match, tournament }: Props) => {
	const first = match.first;
	const second = match.second;
	const drawLinks = () => {
		return (
			<div className="matchDetails-links">
				{tournament && tournament.data.stream && new Date(match.timestamp) > new Date(Date.now()) && <LinkButtonSmall color="#9146FF" icn="Twitch" text="Watch live" link={tournament.data.stream} />}
				<LinkButtonSmall color="#FF66AA" icn="Osu" text="mp link" link={`https://osu.ppy.sh/community/matches/${match.id}`} />
			</div>
		);
	};
	if (!first.title) {
		return (
			<div className="contentSlim-section">
				{drawLinks()}
				<p></p>
				<OneStat first={`#${(first as PlayerLite).statistics.global_rank}`} second={`#${(second as PlayerLite).statistics.global_rank}`} stat="World ranking" condition="more" />
			</div>
		);
	} else {
		return <div className="contentSlim-section">{drawLinks()}</div>;
	}
};

export default MatchDetails;

import { Match } from "../../types/Match";
import { PlayerLite } from "../../types/Player";
import { Team } from "../../types/Team";
import { Tourney } from "../../types/Tourney";
import "../universal/universal.css";
import "./MatchDetails.css";
import LinkButtonSmall from "./LinkButtonSmall";
import OneStat from "./OneStat";
import MatchEvent from "./MatchEvent";
import genRanHex from "../../functions/GetRanHex";
interface Props {
	match: Match;
	tournament: Tourney;
}

const MatchDetails = ({ match, tournament }: Props) => {
	const first = match.first;
	const second = match.second;
	return (
		<div className="contentSlim-section">
			<div className="matchDetails-links">
				{tournament.data.stream && <LinkButtonSmall color="#9146FF" icn="Twitch" text="Watch live" link={tournament.data.stream} />}
				<LinkButtonSmall color="#FF66AA" icn="Osu" text="mp link" link={`https://osu.ppy.sh/community/matches/${match.id}`} />
			</div>
			<p></p>
			<OneStat first={`#${(first as PlayerLite).statistics.global_rank}`} second={`#${(second as PlayerLite).statistics.global_rank}`} stat="World ranking" condition="more" />
			{match.events.map((event) => (
				<MatchEvent key={genRanHex(4)} event={event} first={(match.first as PlayerLite).username} second={(match.second as PlayerLite).username} />
			))}
		</div>
	);
};

export default MatchDetails;

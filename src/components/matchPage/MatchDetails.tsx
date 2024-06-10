import { Match } from "../../types/Match";
import { PlayerLite } from "../../types/Player";
import { Team } from "../../types/Team";
import { Tourney } from "../../types/Tourney";
import "../universal/universal.css";
interface Props {
	match: Match;
	tournament: Tourney;
}

const MatchDetails = ({ match, tournament }: Props) => {
	const first = match.first;
	const second = match.second;
	return (
		<div className="contentSlim-section">
			<p>
				Stats for {(first as Team).title || (first as PlayerLite)?.username} vs {(second as Team)?.title || (second as PlayerLite)?.username} on {tournament.title} match is gonna be here
			</p>
		</div>
	);
};

export default MatchDetails;

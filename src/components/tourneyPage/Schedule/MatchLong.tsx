import "./TourneySchedule.css";
import { Match } from "../../../types/Match";
import DateConverter from "../../../functions/DateConverter";
import { Player, PlayerLite } from "../../../types/Player";
import PlayerLink from "../../universal/PlayerLink";
import { Team } from "../../../types/Team";
import TeamLink from "../../universal/TeamLink";
import Tooltip from "../../universal/Tooltip";
interface Props {
	match: Match;
}

const MatchLong = ({ match }: Props) => {
	const drawParty = (who: Team | PlayerLite) => {
		console.log(who.id);
		if (match.type == "team") {
			return (
				<div className="MatchLongPlayerSmol">
					<img src={`${(who as Team).logo}`} alt="" />
					{who.id != 1 ? <TeamLink team={who as Team} noColor /> : <p>TBD</p>}
				</div>
			);
		} else {
			return (
				<div className="MatchLongPlayerSmol">
					<img src={(who as Player).avatar_url} alt="" />
					{who.id != 1 ? <PlayerLink user={who as Player} noColor /> : <p>TBD</p>}
				</div>
			);
		}
	};
	return (
		<div className="MatchLong">
			<p>
				{DateConverter(new Date(match.timestamp), "HH:MM")}
				<Tooltip content={DateConverter(new Date(match.timestamp), "full")} />
			</p>
			<div className="MatchLongPlayerBox">
				{drawParty(match.first)}
				{drawParty(match.second)}
			</div>
			<a href={`/#/match/id/${match.id}`}>Details</a>

			{/* <p>Quaterfinal / Final / whatever</p> TODO */}
		</div>
	);
};

export default MatchLong;

import "./TourneySchedule.css";
import { Match } from "../../../types/Match";
import DateConverter from "../../../functions/DateConverter";
import { Player } from "../../../types/Player";
import PlayerLink from "../../universal/PlayerLink";
import { Team } from "../../../types/Team";
import TeamLink from "../../universal/TeamLink";
import Tooltip from "../../universal/Tooltip";
interface Props {
	match: Match;
}

const MatchLong = ({ match }: Props) => {
	const renderFirstParty = () => {
		if (match.type == "team") {
			return (
				<div className="MatchLongPlayerSmol">
					<img src={`${(match.first as Team).logo}`} alt="" />
					<TeamLink team={match.first as Team} noColor />
				</div>
			);
		} else {
			return (
				<div className="MatchLongPlayerSmol">
					<img src={(match.first as Player).avatar_url} alt="" />
					<PlayerLink user={match.first as Player} noColor />
				</div>
			);
		}
	};
	const renderSecondParty = () => {
		if (match.type == "team") {
			return (
				<div className="MatchLongPlayerSmol">
					<img src={`${(match.second as Team).logo}`} alt="" />
					<TeamLink team={match.second as Team} noColor />
				</div>
			);
		} else {
			return (
				<div className="MatchLongPlayerSmol">
					<img src={(match.second as Player).avatar_url} alt="" />
					<PlayerLink user={match.second as Player} noColor />
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
				{renderFirstParty()}
				{renderSecondParty()}
			</div>
			<a href={`/#/match/${match.id}`}>Details</a>

			{/* <p>Quaterfinal / Final / whatever</p> TODO */}
		</div>
	);
};

export default MatchLong;

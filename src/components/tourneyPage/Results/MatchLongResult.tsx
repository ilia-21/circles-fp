import "./MatchLongResult.css";
import { Match } from "../../../types/Match";
import { Player } from "../../../types/Player";
import PlayerLink from "../../universal/PlayerLink";
import TeamLink from "../../universal/TeamLink";
import { Team } from "../../../types/Team";
interface Props {
	match: Match;
}

const MatchLongResult = ({ match }: Props) => {
	const renderFirstParty = () => {
		if (match.type == "team") {
			return (
				<div className="MatchLongPlayerSmol">
					<TeamLink team={match.first as Team} noColor />
					<img src={(match.first as Player).avatar_url} alt="" />
				</div>
			);
		} else {
			return (
				<div className="MatchLongPlayerSmol">
					<PlayerLink user={match.first as Player} noColor />
					<img src={(match.first as Player).avatar_url} alt="" />
				</div>
			);
		}
	};
	const renderSecondParty = () => {
		if (match.type == "team") {
			return (
				<div className="MatchLongPlayerSmol">
					<img src={(match.second as Player).avatar_url} alt="" />
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
		<div className="MatchLongResult">
			{renderFirstParty()}
			{!match.result ? <a href={`/#/match/${match.id}`}>{`Score - not found`}</a> : <a href={`/#/match/${match.id}`}>{`${match.result[0]} - ${match.result[1]}`}</a>}
			{renderSecondParty()}
		</div>
	);
};

export default MatchLongResult;

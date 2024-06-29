import "./TourneyResults.css";
import { Match } from "../../../types/Match";
import { Player, PlayerLite } from "../../../types/Player";
import PlayerLink from "../../universal/PlayerLink";
import TeamLink from "../../universal/TeamLink";
import { Team } from "../../../types/Team";
interface Props {
	match: Match;
}

const MatchLongResult = ({ match }: Props) => {
	const drawParty = (party: "first" | "second") => {
		const who = match[party];
		if (party == "first") {
			if (match.type == "team") {
				return (
					<div className="MatchLongPlayerSmol" style={{ justifyContent: "end" }}>
						{(who as Team).id != 1 ? <TeamLink team={who as Team} noColor /> : <p>TBD</p>}
						<img src={`${(who as Team).logo}`} alt="" />
					</div>
				);
			} else {
				return (
					<div className="MatchLongPlayerSmol" style={{ justifyContent: "end" }}>
						{(who as Player).id != 1 ? <PlayerLink user={who as Player} noColor /> : <p>TBD</p>}
						<img src={(who as Player).avatar_url} alt="" />
					</div>
				);
			}
		} else {
			if (match.type == "team") {
				return (
					<div className="MatchLongPlayerSmol" style={{ justifyContent: "start" }}>
						<img src={`${(who as Team).logo}`} alt="" />
						{(who as Team).id != 1 ? <TeamLink team={who as Team} noColor /> : <p>TBD</p>}
					</div>
				);
			} else {
				return (
					<div className="MatchLongPlayerSmol" style={{ justifyContent: "start" }}>
						<img src={(who as Player).avatar_url} alt="" />
						{(who as Player).id != 1 ? <PlayerLink user={who as Player} noColor /> : <p>TBD</p>}
					</div>
				);
			}
		}
	};

	return (
		<div className="MatchLongResult">
			{drawParty("first")}
			{!match.result ? <a href={`/#/match/id/${match.id}`}>{`? - ?`}</a> : <a href={`/#/match/id/${match.id}`}>{`${match.result[0]} - ${match.result[1]}`}</a>}
			{drawParty("second")}
		</div>
	);
};

export default MatchLongResult;

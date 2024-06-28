import "./MatchCardBig.css";
import { Match } from "../../types/Match";
import { Team } from "../../types/Team";
import { PlayerLite } from "../../types/Player";
import DateConverter from "../../functions/DateConverter";
import Tooltip from "../universal/Tooltip";
import TeamCardSmall from "../mainPage/TeamCardSmall";
interface Props {
	match: Match;
}

const MatchCardBig = ({ match }: Props) => {
	const drawParty = (which: "first" | "second") => {
		if (!(match[which] as Team).logo) {
			const party = match[which] as PlayerLite;
			return (
				<div className="MatchCardBigPlayer">
					<a href={`/#/profile/${party.id}`}>
						<img src={party.avatar_url} alt="" />
						<p>{party.username}</p>
					</a>
				</div>
			);
		} else {
			const party = match[which] as Team;
			const team = {
				id: 0,
				title: party.title,
				logo: party.logo,
				leader: party.players[0],
				players: party.players,
			} as Team;
			return (
				<div className="MatchCardBigPlayer">
					<img src={party.logo} alt="" />
					<p>{party.title}</p>
					<TeamCardSmall team={team} height="-20em" />
				</div>
			);
		}
	};
	const drawcontent = () => {
		if (new Date(match.timestamp) > new Date(Date.now())) {
			return (
				<p style={{ fontSize: "2em" }}>
					{DateConverter(new Date(match.timestamp), "HH:MM")} <Tooltip content={DateConverter(new Date(match.timestamp), "full")} />
				</p>
			);
		} else {
			return <p>{`${match.result ? match.result[0] : "?"} - ${match.result ? match.result[1] : "?"}`}</p>;
		}
	};

	return (
		<div className="MatchCardBig">
			{drawParty("first")}
			{drawcontent()}
			{drawParty("second")}
		</div>
	);
};

export default MatchCardBig;

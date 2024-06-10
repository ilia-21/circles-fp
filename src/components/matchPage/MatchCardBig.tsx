import "./MatchCardBig.css";
import { Match } from "../../types/Match";
import { Team } from "../../types/Team";
import { PlayerLite } from "../../types/Player";
import DateConverter from "../../functions/DateConverter";
import Tooltip from "../universal/Tooltip";
import { Tourney } from "../../types/Tourney";
interface Props {
	match: Match;
	tournament: Tourney;
}

const MatchCardBig = ({ match, tournament }: Props) => {
	const drawParty = (which: "first" | "second") => {
		if ((match.type = "1v1")) {
			const party = match[which] as PlayerLite;
			return (
				<div className="MatchCardBigPlayer">
					<a href={`/#/profile/${party.id}`}>
						<img src={party.avatar_url} alt="" />
						<p>
							[#{party.statistics.global_rank}] {party.username}
						</p>
					</a>
				</div>
			);
		} else {
			const party = match[which] as Team;

			return (
				<div className="MatchCardBigPlayer">
					<img src={`${import.meta.env.VITE_API_URL}${party.logo}`} alt="" />
					<p>{party.title}</p>
				</div>
			);
		}
	};
	const drawcontent = () => {
		if (new Date(match.timestamp) < new Date(Date.now())) {
			return <p>{`${match.result[0]} - ${match.result[1]}`}</p>;
		} else {
			return (
				<p style={{ fontSize: "2em" }}>
					{DateConverter(new Date(match.timestamp), "HH:MM")} <Tooltip content={DateConverter(new Date(match.timestamp), "full")} />
				</p>
			);
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

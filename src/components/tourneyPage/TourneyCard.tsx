import { Tourney } from "../../types/Tourney";
import MatchSmall from "./MatchSmall";
import "./TourneyCard.css";

interface Props {
	tourney: Tourney;
}

const TourneyCard = ({ tourney }: Props) => {
	let generateMatches = (which: "upcoming" | "score") => {
		const matchesToRender = tourney.matches.map((match) => {
			if (match.result && which === "score") {
				return <MatchSmall key={match.id} match={match} content="score" />;
			} else if (!match.result && which === "upcoming") {
				return <MatchSmall key={match.id} match={match} content="upcoming" />;
			} else {
				return null;
			}
		});

		return matchesToRender;
	};

	return (
		<div className="tourneyCard">
			<img src={tourney.data.banner} alt="" />
			<p className="tourneyCardTitle">{tourney.title}</p>
			<div className="tourneyCardButtons">
				<a href={`/#/tourney/${tourney.id}`}>Info</a>
				<a href={`/#/tourney/${tourney.id}/stats`}>Stats</a>
			</div>
			<div className="tourneyCardNews">
				<div>
					<a href={`/#/tourney/${tourney.id}/results`}>Recents</a>
					{generateMatches("score")}
				</div>
				<div>
					<a href={`/#/tourney/${tourney.id}/matches`}>Upcoming</a>
					{generateMatches("upcoming")}
				</div>
			</div>
		</div>
	);
};

export default TourneyCard;

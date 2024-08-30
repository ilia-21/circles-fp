import { Tourney } from "../../types/Tourney";
import MatchSmall from "./MatchSmall";
import "./TourneyCard.css";

interface Props {
	tourney: Tourney;
}

const TourneyCard = ({ tourney }: Props) => {
	const generateMatches = (which: "upcoming" | "score") => {
		const matchesToRender = tourney.matches.slice(0, 5).map((match) => {
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
			<a href={`/#/tourney/${tourney.id}`}>
				<img src={tourney.data.banner} alt="" className="tourneyCard-Banner" />
			</a>
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

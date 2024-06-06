import { Tourney } from "../../types/Tourney";
import MatchSmall from "./MatchSmall";
import "./TourneyCard.css";

interface Props {
	tourney: Tourney;
}

const TourneyCard = ({ tourney }: Props) => {
	let generateMatches = (which: "upcoming" | "score") => {
		if (tourney.matches.length <= 0) return <p>No matches availabale</p>;
		for (let match of tourney.matches) {
			//let cont: "upcoming" | "score";
			if (match.result && which == "score") {
				return <MatchSmall id={match.id} first={match.first} second={match.second} content="score" score={match.result} />;
			} else if (!match.result && which == "upcoming") {
				return <MatchSmall id={match.id} first={match.first} second={match.second} content="upcoming" upcoming={match.timestamp} />;
			} else {
			}
		}
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

import { Match } from "../../types/Match";
import { Tourney } from "../../types/Tourney";
import MatchSmall from "./MatchSmall";
import "./TourneyCard.css";

interface Props {
	tourney: Tourney;
}

const TourneyCard = ({ tourney }: Props) => {
	let generateMatches = (which: "upcoming" | "score") => {
		console.log(which);
		if (!tourney.matches) return <p>No matches availabale</p>;
		for (let match of tourney.matches) {
			let cont: "upcoming" | "score";
			if (match.result && which == "score") {
				return <MatchSmall id={match.id} first={match.first} second={match.second} content="score" score={match.result} />;
			} else if (!match.result && which == "upcoming") {
				return <MatchSmall id={match.id} first={match.first} second={match.second} content="upcoming" upcoming={[match.timestamp, match.date]} />;
			} else {
			}
		}
	};
	return (
		<div className="tourneyCard">
			<img src={tourney.data.banner} alt="" />
			<p className="tourneyCardTitle">{tourney.title}</p>
			<div className="tourneyCardButtons">
				<a href="">Info</a>
				<a href="">Stats</a>
			</div>
			<div className="tourneyCardNews">
				<div>
					<a>Recents</a>
					{generateMatches("score")}
				</div>
				<div>
					<a>Upcoming</a>
					{generateMatches("upcoming")}
					{/* <MatchSmall id={1} team1={"Russia"} team2={"Germany"} content="upcoming" upcoming={"2:00PM"} />
					<MatchSmall id={1} team1={"Russia"} team2={"Germany"} content="upcoming" upcoming={"2:00PM"} />
					<MatchSmall id={1} team1={"Russia"} team2={"Germany"} content="upcoming" upcoming={"2:00PM"} /> */}
				</div>
			</div>
		</div>
	);
};

export default TourneyCard;

import MatchSmall from "./MatchSmall";
import "./TourneyCard.css";

interface Props {
	id: number;
	name: string;
	banner: string;
}

const TourneyCard = ({ id, name, banner }: Props) => {
	return (
		<div className="tourneyCard">
			<img src={banner} alt="" />
			<p className="tourneyCardTitle">{name}</p>
			<div className="tourneyCardButtons">
				<a href="">Info</a>
				<a href="">Stats</a>
			</div>
			<div className="tourneyCardNews">
				<div>
					<p>Recents</p>
					<MatchSmall id={1} team1={"Russia"} team2={"Germany"} content="score" score={[7, 5]} />
					<MatchSmall id={1} team1={"Russia"} team2={"Germany"} content="score" score={[7, 5]} />
					<MatchSmall id={1} team1={"Russia"} team2={"Germany"} content="score" score={[7, 5]} />
				</div>
				<div>
					<p>Upcoming</p>
					<MatchSmall id={1} team1={"Russia"} team2={"Germany"} content="upcoming" upcoming={"2:00PM"} />
					<MatchSmall id={1} team1={"Russia"} team2={"Germany"} content="upcoming" upcoming={"2:00PM"} />
					<MatchSmall id={1} team1={"Russia"} team2={"Germany"} content="upcoming" upcoming={"2:00PM"} />
				</div>
			</div>
		</div>
	);
};

export default TourneyCard;

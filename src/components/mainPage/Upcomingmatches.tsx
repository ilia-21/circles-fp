import MatchSmall from "../tourneyPage/MatchSmall";
import "./Upcomingmatches.css";

const Upcomingmatches = () => {
	return (
		<div>
			<MatchSmall id={1} team1={"Russia"} team2={"Germany"} content="upcoming" upcoming={"2:00PM"} />
			<MatchSmall id={1} team1={"Russia"} team2={"Germany"} content="upcoming" upcoming={"2:00PM"} />
			<MatchSmall id={1} team1={"Russia"} team2={"Germany"} content="upcoming" upcoming={"2:00PM"} />
			<MatchSmall id={1} team1={"Russia"} team2={"Germany"} content="upcoming" upcoming={"2:00PM"} />
		</div>
	);
};

export default Upcomingmatches;

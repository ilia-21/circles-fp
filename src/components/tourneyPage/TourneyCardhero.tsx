import "./TourneyCardhero.css";
import { Tourney } from "../../types/Tourney";
import PlayerCardSmall from "../mainPage/PlayerCardSmall";
import BracketCard from "./BracketCard";
interface Props {
	tourney: Tourney;
}

const TourneyCardhero = ({ tourney }: Props) => {
	if (!tourney) {
		return (
			<div className="tourneyCardhero">
				<img src="404" alt="404" />
				<h1>Tournament not found</h1>
			</div>
		);
	}
	let host = tourney.host;
	let dateStart = new Intl.DateTimeFormat("en-US", {
		dateStyle: "full",
	}).format(new Date(tourney.datestart));
	let dateEnd = new Intl.DateTimeFormat("en-US", {
		dateStyle: "full",
	}).format(new Date(tourney.dateend));

	return (
		<div className="tourneyCardhero">
			<img src={tourney.data.banner} alt="" />
			<h1>{tourney.title}</h1>
			<div className="tourneyInfoShort">
				<div>
					<p>
						Hosted by:{" "}
						<a href={`/profile/${host.id}`} style={{ position: "relative" }}>
							{host.username}
							<PlayerCardSmall player={host} />
						</a>{" "}
					</p>
					<p>Prize: {tourney.data.prize}</p>
				</div>
				<div>
					<p>Starts:{dateStart}</p>
					<p>Ends: {dateEnd}</p>
				</div>
			</div>
			<BracketCard tourney={tourney} />
		</div>
	);
};

export default TourneyCardhero;

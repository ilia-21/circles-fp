import "./TourneyCardhero.css";
import { Tourney } from "../../../types/Tourney";
import BracketCard from "../BracketCard";
import BeatMapCardMed from "./BeatMapCardMed";
import UserLink from "../../universal/UserLink";
import genRanHex from "../../../functions/getRanHex";
interface Props {
	tourney: Tourney;
}

const TourneyCardhero = ({ tourney }: Props) => {
	console.log(tourney);
	if (!tourney) {
		return (
			<div className="tourneyCardhero">
				<img src="404" alt="404" />
				<h1>Tournament not found</h1>
				<div className="tourneyInfoShort">
					<p>
						If you think this is an error, please open a ticket in #feedback on{" "}
						<a href="https://discord.gg/WsXtQ9YC2d" style={{ position: "relative" }}>
							discord server
						</a>
					</p>
				</div>
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

	const drawPools = () => {
		if (!tourney.data.pool) return <p>No map pools in this tournament</p>;
		return tourney.data.pool.map((pool) => (
			<>
				<h2>{pool.title}</h2>
				{pool.maps.map((map) => (
					<BeatMapCardMed key={map.id + genRanHex(4)} map={map} />
				))}
			</>
		));
	};

	return (
		<div className="tourneyCardhero">
			<img src={tourney.data.banner} alt="" />
			<h1>{tourney.title}</h1>
			<div className="tourneyInfoShort">
				<div>
					<p>
						Hosted by:
						<UserLink user={host} />
					</p>
					<p>Prize: {tourney.data.prize}</p>
				</div>
				<div>
					<p>Starts: {dateStart}</p>
					<p>Ends: {dateEnd}</p>
				</div>
				<p>{tourney.data.description}</p>
			</div>
			<BracketCard tourney={tourney} />

			<div className="tourneyNews">
				<h1>Map pool</h1>
				{tourney.data.pool && drawPools()}
			</div>
		</div>
	);
};

export default TourneyCardhero;

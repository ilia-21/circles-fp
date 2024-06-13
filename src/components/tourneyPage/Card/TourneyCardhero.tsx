import "./TourneyCardhero.css";
import { Tourney } from "../../../types/Tourney";
import BracketCard from "../BracketCard";
import BeatMapCardMed from "./BeatMapCardMed";
import PlayerLink from "../../universal/PlayerLink";
import genRanHex from "../../../functions/GetRanHex";
import ErrorPage from "../../../pages/ErrorPage";
import ParseMarkdown from "../../universal/ParseMarkdown";
import { PlayerLitest } from "../../../types/Player";
interface Props {
	tourney: Tourney;
}

const TourneyCardhero = ({ tourney }: Props) => {
	if (!tourney) {
		return <ErrorPage />;
	}

	let host = tourney.host;
	let dateStart = new Intl.DateTimeFormat("en-US", {
		dateStyle: "full",
	}).format(new Date(tourney.datestart));
	let dateEnd = new Intl.DateTimeFormat("en-US", {
		dateStyle: "full",
	}).format(new Date(tourney.dateend));

	const drawPools = () => {
		if (!tourney.data.pool)
			return (
				<div className="tourneyNews">
					<p>{tourney.title} doesn't have a mappool</p>
				</div>
			);
		return tourney.data.pool.map((pool) => (
			<div className="tourneyNews">
				<h2>{pool.title}</h2>
				{pool.maps.map((map) => (
					<BeatMapCardMed key={map.id + genRanHex(4)} map={map} />
				))}
			</div>
		));
	};
	const drawParticipants = () => {
		const participants = tourney.data.participants;
		if (!participants || participants.length == 0)
			return (
				<div className="tourneyNews">
					<p>{tourney.title} doesn't have any participants</p>
				</div>
			);
		return participants.map((p) => (
			<div className="tourneyInfo-Participant">
				<img src={(p.who as PlayerLitest).avatar_url} alt="" />
				<p>{(p.who as PlayerLitest).username}</p>
				<p>{p.why}</p>
			</div>
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
						<PlayerLink user={host} />
					</p>
					<p>Prize: {tourney.data.prize}</p>
				</div>
				<div>
					<p>Starts: {dateStart}</p>
					<p>Ends: {dateEnd}</p>
				</div>
				<div style={{ flex: "0 0 99%" }}>
					<ParseMarkdown text={tourney.data.description} />
				</div>
			</div>
			<div>
				<h2>Paticipants</h2>
				<div className="tourneyInfo-Participants">{drawParticipants()}</div>
			</div>
			<BracketCard tourney={tourney} />
			<h1>Map pool</h1>
			{drawPools()}
		</div>
	);
};

export default TourneyCardhero;

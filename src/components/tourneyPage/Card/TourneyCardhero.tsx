import "./TourneyCardhero.css";
import { Tourney } from "../../../types/Tourney";
import BracketCard from "../BracketCard";
import BeatMapCardMed from "./BeatMapCardMed";
import PlayerLink from "../../universal/PlayerLink";
import genRanHex from "../../../functions/GetRanHex";
import ErrorPage from "../../../pages/ErrorPage";
import ParseMarkdown from "../../universal/ParseMarkdown";
import { PlayerLite, PlayerLitest } from "../../../types/Player";
import { Beatmap } from "../../../types/Beatmap";
import { useEffect, useState } from "react";
import { LuPencil } from "react-icons/lu";
import IsEditor from "../../../functions/IsEditor";
interface Props {
	tourney: Tourney;
}

const TourneyCardhero = ({ tourney }: Props) => {
	const [user, setUser] = useState<PlayerLite | null>(null);
	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/session`, {
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.isLoggedIn) {
					setUser(data.user);
				}
			});
	}, []);

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
					<BeatMapCardMed key={(map as Beatmap).id + genRanHex(4)} map={map as Beatmap} />
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
				<a href={`/#/profile/${p.who.id}`}>{(p.who as PlayerLitest).username}</a>
				<p>{p.why}</p>
			</div>
		));
	};

	return (
		<div className="tourneyCardhero">
			<img src={tourney.data.banner} alt="" />
			<div style={{ position: "relative" }}>
				<h1>{tourney.title}</h1>
				{user && IsEditor({ key: `${user?.id}`, condition: "equals", value: tourney.host.id }, user as PlayerLite) && (
					<div className="teamProfileEditButton">
						<a href={`/#/editor/tourney/${tourney.id}`}>
							<LuPencil style={{ fontSize: "1.5em" }} />
						</a>
					</div>
				)}
			</div>
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

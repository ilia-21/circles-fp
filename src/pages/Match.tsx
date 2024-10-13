import { useEffect, useState } from "react";
import "../components/universal/universal.css";
import type { Match } from "../types/Match";
import { PlayerLite } from "../types/Player";
import { Team } from "../types/Team";
import { useParams } from "react-router-dom";
import randomLoadingMessage from "../functions/loadingMessages";
import MatchCardBig from "../components/matchPage/MatchCardBig";
import { Tourney } from "../types/Tourney";
import MatchDetails from "../components/matchPage/MatchDetails";
import ErrorPage from "./ErrorPage";
import MatchEvent from "../components/matchPage/MatchEvent";
import genRanHex from "../functions/GetRanHex";
import MatchTeamEvent from "../components/matchPage/MatchTeamEvent";
import { BsChevronLeft } from "react-icons/bs";
import IsEditor from "../functions/IsEditor";
import { LuPencil } from "react-icons/lu";
import setEmbed from "../functions/DiscordEmbedMabager";

const Match = () => {
	const { id, identifier } = useParams<{ id: string; identifier: "mp" | "id" }>();
	const [user, setUser] = useState<PlayerLite | null>(null);
	const [matchData, setMatchData] = useState<Match | null>(null);
	const [tournamentData, setTournamentData] = useState<Tourney | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string[] | null>(null);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/session`, {
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.isLoggedIn) {
					setUser(data.user as PlayerLite);
				}
			})
			.catch((error) => console.error("Error fetching session:", error));
	}, []);

	useEffect(() => {
		const fetchMatch = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/match/${identifier}/${id}?on=matchPage`, {
					headers: {
						"x-api-key": import.meta.env.VITE_API_KEY,
					},
					credentials: "include",
				});
				if (response.status == 401) {
					setError(["401", "Log in to see match data"]);
				}
				if (response.status == 404) {
					setError(["404", "Match not found"]);
				}
				if (!response.ok) {
					throw new Error(`Error fetching data: ${response.statusText}`);
				}
				const data = await response.json();
				const fullData = { ...data, id: id };
				setMatchData(fullData);
				if (!data.tournament) {
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};

		fetchMatch();
	}, [id, identifier]);

	useEffect(() => {
		const fetchTournament = async () => {
			if (!matchData || !matchData.tournament) {
				return;
			}

			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/tourney/${matchData.tournament}`, {
					headers: {
						"x-api-key": import.meta.env.VITE_API_KEY,
					},
					credentials: "include",
				});
				if (!response.ok) {
					throw new Error(`Error fetching data: ${response.statusText}`);
				}
				const data = await response.json();
				setTournamentData(data as Tourney);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		if (matchData?.tournament) fetchTournament();

		if (!matchData) return;

		// shit here was completely wrong
	}, [matchData]);

	const first = matchData?.first as Team | PlayerLite;
	const second = matchData?.second as Team | PlayerLite;

	if (loading) {
		return (
			<div className="contentSlim">
				<p>{randomLoadingMessage()}</p>
			</div>
		);
	}

	if (error) {
		return <ErrorPage error={[Number(error[0]), error[1]]} />;
	} else if (!matchData) {
		return <ErrorPage error={[500, "Failed to load match data"]} />;
	}

	const drawEvents = () => {
		const events = [];

		if (!(matchData.first as Team).title) {
			//for some reason this thing always sets matchData.type to "1v1" and I don't know why
			for (let i = 0; i < matchData.events.length; i++) {
				events.push(<MatchEvent key={genRanHex(4)} event={matchData.events[i]} first={matchData.first as PlayerLite} second={matchData.second as PlayerLite} next={matchData.events[i + 1]} />);
			}
		} else {
			for (let i = 0; i < matchData.events.length; i++) {
				events.push(<MatchTeamEvent key={genRanHex(4)} event={matchData.events[i]} first={matchData.first as Team} second={matchData.second as Team} next={matchData.events[i + 1]} />);
			}
		}
		return events;
	};
	const drawExtra = () => {
		let elements = [];
		if (matchData.match.end_time) {
			switch (matchData.extra) {
				case "mpOnly":
					elements.push(<p style={{ color: "var(--red)" }}>Warning! This match is not in the database, data maybe incorrect/not full</p>);
					break;
				case "noPickData":
					elements.push(<p style={{ color: "var(--red)" }}>Warning! Tournament host did not provide pick/ban data</p>);
					break;
				case "noTourney":
					elements.push(<p style={{ color: "var(--red)" }}>Warning! This match doesn't have a tournament attached to it, but contains info about picks and bans.</p>);
					break;
			}
			if (user && IsEditor({ key: `${user.id}`, condition: "equals", value: tournamentData?.host.id }, user) && matchData.extra == "noPickData") {
				elements.push(
					<p style={{ color: "var(--red)" }}>
						Oh, wait. Looks like you have the permission to ehit this match, maybe <a href={`/#/editor/match/${identifier}/${matchData.id}`}>provide some pick/ban data?</a>
					</p>
				);
			}
		}
		return elements;
	};
	document.title = `CFP: ${(first as Team).title || (first as PlayerLite)?.username} vs ${(second as Team)?.title || (second as PlayerLite)?.username}`;
	setEmbed(`${(first as Team).title || (first as PlayerLite)?.username} vs ${(second as Team)?.title || (second as PlayerLite)?.username}`, `Check out all the information about this match on Circles Front Page!`);
	return (
		<>
			<div className="contentSlim">
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					{matchData.tournament && (
						<a href={`/#/tourney/${matchData.tournament}`} style={{ display: "flex", gap: "0.5em", alignItems: "center" }}>
							<BsChevronLeft /> Back to the tournament
						</a>
					)}
					{user && IsEditor({ key: `${user.id}`, condition: "equals", value: tournamentData?.host.id }, user) && (
						<a href={`/#/editor/match/${identifier}/${matchData.id}`} style={{ display: "flex", gap: "0.5em", alignItems: "center" }}>
							<LuPencil />
						</a>
					)}
				</div>
				<h1 className="alignCenter">
					{(first as Team).title || (first as PlayerLite)?.username} vs {(second as Team)?.title || (second as PlayerLite)?.username}
				</h1>
				<MatchCardBig match={matchData} />
			</div>
			<MatchDetails match={matchData} tournament={tournamentData as Tourney} />
			<div className="contentSlim-section">
				{matchData.extra && drawExtra()}
				{matchData.extra != "dbOnly" && drawEvents()}
			</div>
		</>
	);
};

export default Match;

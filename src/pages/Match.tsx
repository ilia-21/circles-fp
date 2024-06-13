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

const Match = () => {
	const { id } = useParams<{ id: string }>();
	const [matchData, setMatchData] = useState<Match | null>(null);
	const [tournamentData, setTournamentData] = useState<Tourney | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string[] | null>(null);

	useEffect(() => {
		const fetchMatch = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/match/${id}`, {
					headers: {
						"x-api-key": import.meta.env.VITE_API_KEY,
					},
					credentials: "include",
				});
				if (response.status == 401) {
					setError(["401", "You need to log in"]);
				}
				if (!response.ok) {
					throw new Error(`Error fetching data: ${response.statusText}`);
				}
				const data = await response.json();
				setMatchData(data);
				if (!data.tournament) {
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};

		fetchMatch();
	}, [id]);

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

		if (!matchData?.extra) fetchTournament();

		if (!matchData) return;

		// sometimes first and second user in mp are swapped, or there's a ref, so I made this
		let firstUserFound = false;
		for (const user of matchData.users) {
			if (user.id === matchData.first.id) {
				return;
			}
			if (user.id === matchData.second.id && !firstUserFound) {
				let newMatch = { ...matchData };
				const temp = newMatch.first;
				newMatch.first = newMatch.second;
				newMatch.second = temp;
				const tempScore = newMatch.result[0];
				newMatch.result[0] = newMatch.result[1];
				newMatch.result[1] = tempScore;
				setMatchData(newMatch);
				return;
			}
		}
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
		if (!matchData.first.title) {
			//for some reason this thing always sets matchData.type to "1v1" and I don't know why
			for (let i = 0; i < matchData.events.length; i++) {
				events.push(<MatchEvent key={genRanHex(4)} event={matchData.events[i]} first={(matchData.first as PlayerLite).username} second={(matchData.second as PlayerLite).username} next={matchData.events[i + 1]} />);
			}
		} else {
			for (let i = 0; i < matchData.events.length; i++) {
				events.push(<MatchTeamEvent key={genRanHex(4)} event={matchData.events[i]} first={matchData.first as Team} second={matchData.second as Team} next={matchData.events[i + 1]} />);
			}
		}
		return events;
	};

	return (
		<>
			<div className="contentSlim">
				<h1 className="alignCenter">
					{(first as Team).title || (first as PlayerLite)?.username} vs {(second as Team)?.title || (second as PlayerLite)?.username}
				</h1>
				<MatchCardBig match={matchData} />
			</div>
			<MatchDetails match={matchData} tournament={tournamentData as Tourney} />
			<div className="contentSlim-section">
				{matchData.extra && <p style={{ color: "var(--red)" }}>Warning! This match is not in the database, data maybe incorrect/not full</p>}
				{drawEvents()}
			</div>
		</>
	);
};

export default Match;

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

const Match = () => {
	const { id } = useParams<{ id: string }>();
	const [matchData, setMatchData] = useState<Match | null>(null);
	const [tournamentData, setTournamentData] = useState<Tourney | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchMatch = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/match/${id}`, {
					headers: {
						"x-api-key": import.meta.env.VITE_API_KEY,
					},
					credentials: "include",
				});
				if (!response.ok) {
					throw new Error(`Error fetching data: ${response.statusText}`);
				}
				const data = await response.json();
				setMatchData(data as Match);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};

		fetchMatch();
	}, [id]);

	useEffect(() => {
		const fetchTournament = async () => {
			if (!matchData) return;

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

		fetchTournament();
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

	if (!matchData || !tournamentData) {
		return <ErrorPage error={[500, "failed to load match data"]} />;
	}

	return (
		<>
			<div className="contentSlim">
				<h1 className="alignCenter">
					{(first as Team).title || (first as PlayerLite)?.username} vs {(second as Team)?.title || (second as PlayerLite)?.username} on {tournamentData.title}
				</h1>
				<MatchCardBig match={matchData} tournament={tournamentData} />
			</div>
			<MatchDetails match={matchData} tournament={tournamentData} />
		</>
	);
};

export default Match;

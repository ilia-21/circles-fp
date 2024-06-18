import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Match } from "../types/Match";
import { Tourney } from "../types/Tourney";
import { Team } from "../types/Team";
import { PlayerLite } from "../types/Player";
import randomLoadingMessage from "../functions/loadingMessages";
import ErrorPage from "./ErrorPage";
import MatchCardBig from "../components/matchPage/MatchCardBig";
import { PickEvent } from "../types/MatchEvent";
import { IoMdAdd } from "react-icons/io";
import Pick from "../components/matchEditorPage/Pick";
import { MappoolMod } from "../types/Beatmap";
const BlankPick: PickEvent = {
	who: "first",
	type: "pick",
	map: "NM1",
};
const MatchEditor = () => {
	const { id } = useParams<{ id: string }>();
	const [matchData, setMatchData] = useState<Match | null>(null);
	const [tournamentData, setTournamentData] = useState<Tourney | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string[] | null>(null);
	const [pickData, setPickData] = useState<PickEvent[] | null | undefined>((matchData && matchData.data && matchData.data.picks) || null);
	const [availableMaps, setAvailableMaps] = useState<string[] | null>();

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
	}, [id]);
	useEffect(() => {
		const fetchTournament = async () => {
			if (!matchData || !matchData.tournament) {
				return;
			}

			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/tourney/${matchData.tournament}?raw=true`, {
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

		// shit here was completely wrong
	}, [matchData]);
	useEffect(() => {
		setPickData(matchData?.data?.picks || []);
	}, []);

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
	const addBlankPick = () => {
		const updatedPicks = [...(pickData || []), BlankPick];
		setPickData(updatedPicks);
	};
	const drawPicksEditor = () => {
		if (matchData.data && matchData.data.stage) setAvailableMaps(tournamentData?.data.pool[matchData.data.stage].maps.map((m) => `${(m as [number, MappoolMod])[0]}`));
		console.log(availableMaps);
		for (const p of pickData || []) {
			const updatedMaps = "";
		}
		if (pickData) {
			console.log(pickData);
			return pickData.map((p, index) => {
				<Pick first={matchData.first} second={matchData.second} pick={p} pickData={pickData} setPickData={setPickData} />;
			});
		} else {
			return <div>no picks</div>;
		}
	};
	return (
		<div>
			<div className="content">
				<MatchCardBig match={matchData} />
			</div>
			<div className="content-section">
				<div>
					{pickData && drawPicksEditor()}
					<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} onClick={addBlankPick}>
						<IoMdAdd className="TourneyEditor-Participants-Icon" />
						<p>Add new pick</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MatchEditor;

import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Match } from "../types/Match";
import { Tourney } from "../types/Tourney";
import randomLoadingMessage from "../functions/loadingMessages";
import ErrorPage from "./ErrorPage";
import { PickEvent } from "../types/MatchEvent";
import { IoMdAdd } from "react-icons/io";
import Pick from "../components/matchEditorPage/Pick";
import { MappoolMod } from "../types/Beatmap";
import "./MatchEditor.css";
import { BsChevronLeft, BsFloppy } from "react-icons/bs";
import { Team } from "../types/Team";
import TeamCardSmall from "../components/mainPage/TeamCardSmall";
import { PlayerLite } from "../types/Player";
import DateConverter from "../functions/DateConverter";
import Tooltip from "../components/universal/Tooltip";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const BlankPick: PickEvent = {
	who: "first",
	type: "pick",
	map: "NM1",
	detail: {
		type: "pickban",
	},
};

const fetchMatch = async (identifier: string, id: string) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/match/${identifier}/${id}`, {
		headers: {
			"x-api-key": import.meta.env.VITE_API_KEY,
		},
		credentials: "include",
	});

	if (response.status === 401) {
		throw new Error("401: You need to log in");
	}

	if (!response.ok) {
		throw new Error(`Error fetching data: ${response.statusText}`);
	}

	const data = await response.json();
	return { ...data, id };
};

const fetchTournament = async (tournamentId: string) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/tourney/${tournamentId}?raw=true`, {
		headers: {
			"x-api-key": import.meta.env.VITE_API_KEY,
		},
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error(`Error fetching data: ${response.statusText}`);
	}

	const data = await response.json();
	return data as Tourney;
};

const MatchEditor = () => {
	const { id } = useParams<{ id: string }>();
	const { identifier } = useParams<{ identifier: string }>();
	const [pickData, setPickData] = useState<PickEvent[] | null>(null);
	const [score, setScore] = useState<string[] | null>(null);
	const [availableMaps, setAvailableMaps] = useState<string[] | null>(null);
	const {
		data: matchData,
		error: matchError,
		isLoading: matchLoading,
	} = useQuery({
		queryKey: ["matchData", identifier, id],
		queryFn: () => fetchMatch(identifier as string, id as string),
		retry: false,
	});

	const {
		data: tournamentData,
		error: tournamentError,
		isLoading: tournamentLoading,
	} = useQuery({
		queryKey: ["tournamentData", matchData?.tournament],
		queryFn: () => fetchTournament(matchData?.tournament || ""),
		enabled: !!matchData?.tournament,
		retry: false,
	});

	useEffect(() => {
		if (matchData?.result) {
			setScore([matchData.result[0], matchData.result[1]]);
		}
	}, [matchData]);
	let toastId;
	const drawParty = (which: "first" | "second") => {
		if (!matchData) return;
		if (!(matchData[which] as Team).logo) {
			const party = matchData[which] as PlayerLite;
			return (
				<div className="matchDataCardBigPlayer">
					<a href={`/#/profile/${party.id}`}>
						<img src={party.avatar_url} alt="" />
						<p>{party.username}</p>
					</a>
				</div>
			);
		} else {
			const party = matchData[which] as Team;
			const team = {
				id: 0,
				title: party.title,
				logo: party.logo,
				leader: party.players[0],
				players: party.players,
			} as Team;
			return (
				<div className="MatchCardBigPlayer">
					<img src={party.logo} alt="" />
					<p>{party.title}</p>
					<TeamCardSmall team={team} height="-20em" />
				</div>
			);
		}
	};
	const drawcontent = () => {
		if (!matchData) return;
		if (new Date(matchData.timestamp) > new Date(Date.now())) {
			return (
				<p style={{ fontSize: "2em" }}>
					{DateConverter(new Date(matchData.timestamp), "HH:MM")} <Tooltip content={DateConverter(new Date(matchData.timestamp), "full")} />
				</p>
			);
		} else {
			return (
				<div style={{ display: "flex", borderBottom: "1px solid var(--cfp-accent)" }}>
					<input type="text" name="score.first" className="minimalisticInput" inputMode="numeric" value={score ? score[0] : "0"} style={{ width: "1em", textAlign: "center", borderBottom: "none" }} onChange={(e) => setScore([e.target.value, score ? score[1] : "0"])} />
					<p> - </p>
					<input type="text" name="score.second" className="minimalisticInput" inputMode="numeric" value={score ? score[1] : "0"} style={{ width: "1em", textAlign: "center", borderBottom: "none" }} onChange={(e) => setScore([score ? score[0] : "0", e.target.value])} />
				</div>
			);
		}
	};

	useEffect(() => {
		if (matchData?.data?.picks) {
			setPickData(matchData.data.picks);
		}
	}, [matchData]);

	useEffect(() => {
		if (tournamentData && matchData?.data?.stage) {
			const stageMaps = tournamentData.data.pool.find((p) => p.title === matchData.data?.stage)?.maps.map((m) => (m as [number, MappoolMod])[1].toString()) || [];
			setAvailableMaps(stageMaps);
		}
	}, [tournamentData, matchData]);

	const addBlankPick = () => {
		setPickData((prevPicks) => [...(prevPicks || []), BlankPick]);
	};

	const drawPicksEditor = useCallback(() => {
		if (!pickData) return <div>No picks</div>;
		if (!matchData) return <div>No matchData?</div>; // This sould never be seen

		const usedMaps = new Set(pickData.map((p) => p.map));
		const availableMapsFiltered = (availableMaps || []).filter((map) => !usedMaps.has(map as MappoolMod));

		return pickData.map((p, index) => <Pick key={index} first={matchData.first} second={matchData.second} pick={p} index={index} pickData={pickData} setPickData={setPickData} availableMaps={availableMapsFiltered} />);
	}, [pickData, availableMaps, matchData]);
	const submitMatch = async () => {
		let merged = matchData as Match;
		//@ts-ignore
		if (pickData?.length > 0) {
			//@ts-ignore
			merged.data = { ...merged.data, picks: pickData };
		} else {
			//@ts-ignore
			merged.data = { stage: matchData?.data?.stage };
		}

		if (score) merged.result = [+score[0], +score[1]];
		toastId = toast.warning("Submitting...", { autoClose: false });
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/edit/match/${identifier}/${id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": import.meta.env.VITE_API_KEY,
				},
				credentials: "include",
				body: JSON.stringify(merged),
			});
			if (response.status == 401) {
				window.open("https://c.tenor.com/5laBYESlyu8AAAAC/tenor.gif", "_self");
			}
			if (!response.ok) {
				toast.update(toastId, { render: `Error, while updating match`, autoClose: 5000, type: "error" });
				throw new Error(`Error saving data: ${response.statusText}`);
			}
			toast.update(toastId, { render: `Match information updated successfully`, autoClose: 5000, type: "success" });
			return true;
		} catch (error) {
			console.error(error);
		}
	};
	if (tournamentLoading || matchLoading) {
		return (
			<div className="contentSlim">
				<p>{randomLoadingMessage()}</p>
			</div>
		);
	}
	if (tournamentError || matchError || !matchData) {
		return <ErrorPage error={[500, "Failed to load match data"]} />;
	}
	queryFn: document.title = `CFP: Editing Match`;

	return (
		<div>
			<div className="content">
				<div className="matchEditor-toolbar">
					<div>
						<a href={`/#/match/${identifier}/${matchData.id}`} style={{ display: "flex", gap: "0.5em", alignItems: "center" }}>
							<BsChevronLeft /> Back to the match Page
						</a>
					</div>
					<div style={{ display: "flex", gap: "1em", alignItems: "center" }}>
						<BsFloppy style={{ fontSize: "2em" }} onClick={submitMatch} />
					</div>
				</div>
				<h1>{matchData.match.name}</h1>
				<div className="MatchCardBig">
					{drawParty("first")}
					{drawcontent()}
					{drawParty("second")}
				</div>
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

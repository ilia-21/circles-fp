import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerLite } from "../types/Player";
import MainDetails from "../components/tourneyEditorPage/MainDetails";
import { BsCloudUpload, BsDisc, BsFloppy } from "react-icons/bs";
import { Tourney } from "../types/Tourney";
import ErrorPage from "./ErrorPage";
import randomLoadingMessage from "../functions/loadingMessages";
import "../components/universal/universal.css";
import "../components/tourneyEditorPage/TourneyEditorPage.css";
import Banner from "../components/tourneyEditorPage/Banner";
import Tooltip from "../components/universal/Tooltip";
import Participants from "../components/tourneyEditorPage/Participants";
import Matches from "../components/tourneyEditorPage/Matches";
import CheckTournament from "../functions/CheckTournament";
import MappoolEditor from "../components/tourneyEditorPage/MappoolEditor";
import IsEditor from "../functions/IsEditor";
import GetEmptyTourney from "../functions/GetEmptyTourney";
import Logo from "../components/tourneyEditorPage/Logo";
import { useQuery } from "@tanstack/react-query";
import Tie from "../functions/TournamentImportExport";

const fetchUser = async () => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/session`, {
		credentials: "include",
	});
	const data = await response.json();
	console.log(data);
	if (data.isLoggedIn) {
		return data.user;
	}
	throw new Error("User not logged in");
};

const fetchTourney = async (id: string, userId: number) => {
	if (id === "new") {
		let tempData = GetEmptyTourney();
		tempData.host.id = userId;
		return tempData;
	}
	const response = await fetch(`${import.meta.env.VITE_API_URL}/tourney/${id}?raw=true`, {
		credentials: "include",
		headers: {
			"x-api-key": import.meta.env.VITE_API_KEY,
		},
	});
	if (!response.ok) {
		throw new Error(`Error fetching data: ${response.statusText}`);
	}
	const data = await response.json();
	return data as Tourney;
};

const TourneyEditor = () => {
	const [message, setMessage] = useState<string[] | null>(null);
	const [tourneyData, setTourneyData] = useState<Tourney | null>(null);
	const [confirmation, setConfirmation] = useState<boolean>(false);

	const { id } = useParams<{ id: string }>();

	const {
		isLoading: userLoading,
		error: userError,
		data: user,
	} = useQuery({
		queryKey: ["currentUserData"],
		queryFn: fetchUser,
		staleTime: 0,
		retry: false,
	});

	const {
		isLoading: tourneyLoading,
		error: tourneyError,
		data: fetchedTourneyData,
		refetch: refetchTourney,
	} = useQuery({
		queryKey: ["tournamentData", id, user?.id],
		queryFn: () => fetchTourney(id || "new", user?.id || Number(localStorage.getItem("localuserID"))),
		enabled: !!user,
		staleTime: 0,
		retry: false,
	});

	useEffect(() => {
		if (user) {
			refetchTourney();
		}
	}, [user, id, refetchTourney]);

	useEffect(() => {
		if (fetchedTourneyData) {
			setTourneyData(fetchedTourneyData);
		}
	}, [fetchedTourneyData]);

	useEffect(() => {
		const unloadCallback = (event: any) => {
			event.preventDefault();
			event.returnValue = "";
			return "";
		};

		window.addEventListener("beforeunload", unloadCallback);
		return () => window.removeEventListener("beforeunload", unloadCallback);
	}, []);

	const saveTourneyData = async () => {
		const created = id === "new";
		if (!confirmation) {
			const checkResult = await CheckTournament(false, id as string, tourneyData as Tourney, setMessage, created, true);
			checkResult && setConfirmation(true);
			return;
		}
		try {
			CheckTournament(true, id as string, tourneyData as Tourney, setMessage, created);
			setConfirmation(false);
		} catch (error) {
			console.error("Error saving data:", error);
		}
	};

	if (message) {
		const time = message[0] === "red" ? 10000 : 3000;
		setTimeout(() => {
			setMessage(null);
		}, time);
	}

	if (userLoading || tourneyLoading) {
		return (
			<div className="content" style={{ position: "relative" }}>
				<h1>{randomLoadingMessage()}</h1>
			</div>
		);
	}

	if ((userError && userError.message != "User not logged in") || tourneyError) {
		return <ErrorPage />;
	}
	if (!user || (id !== "new" && !IsEditor({ key: `${user.id}`, condition: "equals", value: tourneyData?.host.id }, user as PlayerLite))) {
		return <ErrorPage error={[401, "You are not supposed to be here"]} />;
	}
	document.title = `CFP: editing ${tourneyData?.title}`;
	return (
		<div className="content" style={{ position: "relative" }}>
			<div className="TourneyEditor-mainToolbar">
				{message && <p style={{ color: `var(--${message[0]})` }}>{message[1]}</p>}
				<div style={{ display: "flex", gap: "1em" }}>
					<div onClick={() => Tie.exp(tourneyData as Tourney)}>
						<BsFloppy color="var(--cfp-text)" style={{ fontSize: "2em" }} />
						<Tooltip content={"Save your tournament as JSON"} />
					</div>
					<div onClick={() => Tie.imp(setTourneyData)}>
						<BsDisc color="var(--cfp-text)" style={{ fontSize: "2em" }} />
						<Tooltip content={"Load JSON tournament"} />
					</div>
					<div onClick={saveTourneyData}>
						<BsCloudUpload color={!confirmation ? "var(--red)" : "var(--cfp-text)"} style={{ fontSize: "2em" }} />
						{confirmation ? <Tooltip content={"Click again to confirm"} /> : <Tooltip content={"Check tournament"} />}
					</div>
				</div>
			</div>
			{tourneyData && (
				<div className="TourneyEditor-sections">
					<Banner tourney={tourneyData} setTourneyData={setTourneyData} />
					<Logo tourney={tourneyData} setTourneyData={setTourneyData} />
					<MainDetails tourney={tourneyData} setTourneyData={setTourneyData} />
					<Participants tourney={tourneyData} setTourneyData={setTourneyData} />
					<Matches tourney={tourneyData} setTourneyData={setTourneyData} />
					<MappoolEditor tourney={tourneyData} setTourneyData={setTourneyData} />
				</div>
			)}
		</div>
	);
};

export default TourneyEditor;

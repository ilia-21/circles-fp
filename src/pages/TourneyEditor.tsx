import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerLite } from "../types/Player";
import MainDetails from "../components/tourneyEditorPage/MainDetails";
import { BsFloppy } from "react-icons/bs";
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

const TourneyEditor = () => {
	const [tourneyData, setTourneyData] = useState<Tourney | null>(null);
	const [user, setUser] = useState<PlayerLite | null>(null);
	const [message, setMessage] = useState<string[] | null>(null);
	const [errorMessage, setErrorMessage] = useState<string[] | null>(null);
	const [confirmation, setConfirmation] = useState<boolean>(false);

	const [loading, setLoading] = useState<boolean>(true);
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		const fetchSession = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/api/session`, {
					credentials: "include",
				});
				const data = await response.json();
				if (data.isLoggedIn) {
					setUser(data.user);
				} else {
					setUser(null);
				}
			} catch (error) {
				console.error("Error fetching session data:", error);
			}
		};

		const fetchTourney = async (fetchedUser: PlayerLite | null) => {
			if (id === "new") {
				let tempData = GetEmptyTourney();
				//@ts-ignore
				tempData.host.id = fetchedUser.id;
				setTourneyData(tempData);
				setLoading(false);
			} else {
				try {
					const response = await fetch(`${import.meta.env.VITE_API_URL}/tourney/${id}?raw=true`, {
						credentials: "include",
						headers: {
							"x-api-key": import.meta.env.VITE_API_KEY,
						},
					});
					if (!response.ok) {
						setErrorMessage([`${response.status}`, `${response.statusText}`]);
						throw new Error(`Error fetching data: ${response.statusText}`);
					}
					const data = await response.json();
					setTourneyData(data);
				} catch (error) {
					console.error("Error fetching tourney data:", error);
				} finally {
					setLoading(false);
				}
			}
		};

		const initialize = async () => {
			await fetchSession();
			console.log(user);
			await fetchTourney(user);
		};

		initialize();
	}, []);

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
		const created = id == "new" ? true : false;
		if (!confirmation) {
			setMessage(["yellow", "Checking your tournament..."]);
			const checkResult = await CheckTournament(false, id as string, tourneyData as Tourney, setMessage, created);
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

	if (loading) {
		return <h1>{randomLoadingMessage()}</h1>;
	}

	if (errorMessage) {
		return <ErrorPage error={[Number(errorMessage[0]), errorMessage[1]]} />;
	}

	if ((!user && !loading) || !IsEditor({ key: `${user?.id}`, condition: "equals", value: tourneyData?.host.id }, user as PlayerLite)) {
		return <ErrorPage error={[401, "You are not supposed to be here"]} />;
	}

	return (
		<div className="content" style={{ position: "relative" }}>
			<div className="TourneyEditor-saveButton" onClick={saveTourneyData}>
				{message && <p style={{ color: `var(--${message[0]})` }}>{message[1]}</p>}
				<div>
					<BsFloppy color={!confirmation ? "var(--cfp-text)" : "var(--red)"} />
					{confirmation && <Tooltip content={"Click again to confirm"} />}
				</div>
			</div>
			<Banner tourney={tourneyData as Tourney} setTourneyData={setTourneyData} setMessage={setMessage} />
			<MainDetails tourney={tourneyData as Tourney} setTourneyData={setTourneyData} />
			<h1>Participants</h1>
			<Participants tourney={tourneyData as Tourney} setTourneyData={setTourneyData} />
			<h1>Matches</h1>
			<Matches tourney={tourneyData as Tourney} setTourneyData={setTourneyData} />
			<h1>Map pool</h1>
			<MappoolEditor tourney={tourneyData as Tourney} setTourneyData={setTourneyData} />
		</div>
	);
};

export default TourneyEditor;

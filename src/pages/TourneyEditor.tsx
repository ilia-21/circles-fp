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
import { MdPanoramaPhotosphereSelect } from "react-icons/md";
import MappoolEditor from "../components/tourneyEditorPage/MappoolEditor";

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
		const fetchTeam = async () => {
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
				console.error("Error fetching session data:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchSession();
		fetchTeam();
	}, []);
	// confirm closing
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
		if (!confirmation) {
			setConfirmation(true);
			return;
		}
		try {
			CheckTournament(id as string, tourneyData as Tourney, setMessage);
			setConfirmation(false);
		} catch (error) {
			console.error("Error saving data:", error);
		}
	};
	if (message) {
		const time = message[0] == "red" ? 10000 : 3000;
		setTimeout(() => {
			setMessage(null);
		}, time);
	}

	if (loading) {
		return <h1>{randomLoadingMessage()}</h1>;
	}
	// @ts-ignore: Object is possibly 'null'.
	if (errorMessage) {
		return <ErrorPage error={[Number(errorMessage[0]), errorMessage[1]]} />;
	}
	if (!user || (!loading && !user.cfp.roles.DEV && user && user.id != tourneyData?.host.id)) {
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
			{/* MappoolEditor is for editing all mappools, as there can be more than one for each tournament stage */}
			{/* Mappool is for editing ONE map pool, for ONE stage */}
			{/* Map is for ONE MAP of the map pool */}
		</div>
	);
};

export default TourneyEditor;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerLite } from "../types/Player";
import { MainDetails } from "../components/tourneyEditorPage/MainDetails";
import { BsFloppy } from "react-icons/bs";
import { Tourney } from "../types/Tourney";
import ErrorPage from "./ErrorPage";
import randomLoadingMessage from "../functions/loadingMessages";
import "../components/universal/universal.css";
import "../components/tourneyEditorPage/TourneyEditorPage.css";
import { Banner } from "../components/tourneyEditorPage/Banner";
import Tooltip from "../components/universal/Tooltip";
import { Participants } from "../components/tourneyEditorPage/Participants";

const TourneyEditor = () => {
	const [tourneyData, setTourneyData] = useState<Tourney | null>(null);
	const [user, setUser] = useState<PlayerLite | null>(null);
	const [message, setMessage] = useState<string[] | null>(null);
	const [thinkTwice, setThinkTwice] = useState<boolean>(false);

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
		if (!thinkTwice) {
			setThinkTwice(true);
			return;
		}
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/edit/tourney/${id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": import.meta.env.VITE_API_KEY,
				},
				credentials: "include",
				body: JSON.stringify(tourneyData),
			});

			if (!response.ok) {
				setMessage(["red", "Error, while updating tournament"]);
				throw new Error(`Error saving data: ${response.statusText}`);
			}
			setMessage(["green", "Tournament information updated successfully"]);
			setThinkTwice(false);
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
	if (!user || (!loading && !user.cfp.roles.DEV && user && user.id != tourneyData?.host.id)) {
		return <ErrorPage error={[401, "You are not supposed to be here"]} />;
	}
	return (
		<div className="content" style={{ position: "relative" }}>
			{message && <p style={{ color: `var(--${message[0]})` }}>{message[1]}</p>}
			<div className="TourneyEditor-saveButton" onClick={saveTourneyData}>
				<div>
					<BsFloppy color={!thinkTwice ? "var(--cfp-text)" : "var(--red)"} />
					{thinkTwice && <Tooltip content={"Click again to confirm"} />}
				</div>
			</div>
			<Banner tourney={tourneyData as Tourney} setTourneyData={setTourneyData} setMessage={setMessage} />
			<MainDetails tourney={tourneyData as Tourney} setTourneyData={setTourneyData} />
			<Participants tourney={tourneyData as Tourney} setTourneyData={setTourneyData} />
		</div>
	);
};

export default TourneyEditor;

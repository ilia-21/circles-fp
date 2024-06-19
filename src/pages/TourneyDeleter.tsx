import { ChangeEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerLite } from "../types/Player";
import { Tourney } from "../types/Tourney";
import ErrorPage from "./ErrorPage";
import randomLoadingMessage from "../functions/loadingMessages";
import "../components/universal/universal.css";
import "../components/tourneyEditorPage/TourneyEditorPage.css";
import "../components/universal/universal.css";
import IsEditor from "../functions/IsEditor";
import GetEmptyTourney from "../functions/GetEmptyTourney";

const TourneyDeleter = () => {
	const [tourneyData, setTourneyData] = useState<Tourney | null>(null);
	const [user, setUser] = useState<PlayerLite | null>(null);
	const [errorMessage, setErrorMessage] = useState<string[] | null>(null);
	const [confirmation, setConfirmation] = useState<boolean>(false);
	const [message, setMessage] = useState<string[] | null>(null);
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
			await fetchTourney(user);
		};

		initialize();
	}, []);
	const handleInputChange = (e: ChangeEventHandler<HTMLInputElement>) => {
		//@ts-ignore
		if (e.target.value == `Confirm the deletion of ${tourneyData?.title}`) {
			setConfirmation(true);
		} else {
			setConfirmation(false);
		}
	};
	const deleteTournament = async () => {
		if (!confirmation) return;
		try {
			const toSend = { id: tourneyData.id };
			const response = await fetch(`${import.meta.env.VITE_API_URL}/delete/tourney`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": import.meta.env.VITE_API_KEY,
				},
				credentials: "include",
				body: JSON.stringify(tourneyData),
			});
			const data = await response.json();
			if (response.status == 401) {
				window.open("https://c.tenor.com/5laBYESlyu8AAAAC/tenor.gif", "_self");
			}
			if (!response.ok) {
				setMessage(["red", "Error, while updating tournament"]);
				throw new Error(`Error saving data: ${response.statusText}`);
			}

			setMessage(["green", "Tournament is no more"]);

			return true;
		} catch (error) {
			console.error(error);
		}
	};
	if (loading) {
		return <h1>{randomLoadingMessage()}</h1>;
	}

	if (errorMessage) {
		return <ErrorPage error={[Number(errorMessage[0]), errorMessage[1]]} />;
	}

	if ((!user && !loading) || !IsEditor({ key: `${user?.id}`, condition: "equals", value: tourneyData?.host.id }, user as PlayerLite)) {
		return <ErrorPage error={[401, "You are not supposed to be here"]} />;
	}
	if (message) {
		return (
			<div className="fullscreen">
				<div className="fullscreenMessage" style={{ alignItems: "center" }}>
					<h1 style={{ color: "var(--red)" }}>{tourneyData?.title} does not exist</h1>
					<p>{message[1]}</p>
					<p>All assets will be avalable for a few days</p>
				</div>
			</div>
		);
	}
	return (
		<div className="fullscreen">
			<div className="fullscreenMessage" style={{ alignItems: "center" }}>
				<h1 style={{ color: "var(--red)" }}>Are you sure you want to delete {tourneyData?.title}?</h1>
				<p>
					This action <b>can't be undone</b>!
				</p>
				<p>
					Mods and developers, are <b>unlikely</b> to restore it!
				</p>
				<p>
					<b style={{ fontWeight: 900 }}>This is the last warning!!!</b>
				</p>
				<p>Type "Confirm⠀the⠀deletion⠀of⠀{tourneyData?.title}" in the field below (no pasting)</p>
				{/* all spaces in the message above are replaced with braile spaces, so no copypasting will work, he-he*/}

				<input type="text" className="minimalisticInput" onChange={handleInputChange} />
				<div style={{ display: "flex", justifyContent: "center", gap: "1em" }}>
					<div style={{ background: "var(--red)", color: "var(--cfp-bg)" }} className={`fullscreenMessage-button ${!confirmation ? "disabled" : ""}`} onClick={deleteTournament}>
						Confirm
					</div>
					<div className="fullscreenMessage-button">
						<a href={`/#/tourneys/${tourneyData.id}`}>Turn back</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TourneyDeleter;

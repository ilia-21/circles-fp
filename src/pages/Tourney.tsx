import { useEffect, useState } from "react";
import "./Tourney.css";
import { useParams } from "react-router-dom";
import TourneyCardhero from "../components/tourneyPage/Card/TourneyCardhero";
import type { Tourney } from "../types/Tourney";
import Bannertop from "../components/universal/Bannertop";
import NavBar from "../components/tourneyPage/Card/NavBar";
import TourneyResultsPage from "../components/tourneyPage/Results/TourneyResultsPage";
import TourneySchedulePage from "../components/tourneyPage/Schedule/TourneySchedulePage";
import TourneyStatsPage from "../components/tourneyPage/Stats/TourneyStatsPage";
import randomLoadingMessage from "../functions/loadingMessages";
interface Props {
	page: "info" | "upcoming" | "results" | "stats";
}

const Tourney = ({ page }: Props) => {
	const { id } = useParams<{ id: string }>();
	const [loading, setLoading] = useState<boolean>(true);
	const [tourneyData, setTourneyData] = useState<Tourney>();
	useEffect(() => {
		const fetchOneTourney = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/tourney/${id}`, {
					headers: {
						"x-api-key": import.meta.env.VITE_API_KEY,
					},
					credentials: "include",
				});
				if (!response.ok) {
					throw new Error(`Error fetching data: ${response.statusText}`);
				}
				const data = await response.json();
				setTourneyData(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchOneTourney();
	}, []);
	if (loading) {
		return (
			<div className="mainContent">
				<p>{randomLoadingMessage()}</p>
			</div>
		);
	}
	const drawContent = () => {
		switch (page) {
			case "info":
				return <TourneyCardhero tourney={tourneyData as Tourney} />;
				break;
			case "upcoming":
				return <TourneySchedulePage tourney={tourneyData as Tourney} />;
				break;
			case "results":
				return <TourneyResultsPage tourney={tourneyData as Tourney} />;
				break;
			case "stats":
				return <TourneyStatsPage tourney={tourneyData as Tourney} />;
				break;
		}
	};
	return (
		<div className="mainContent">
			<div className="tourneyPage">
				{tourneyData && <NavBar selected={page} id={tourneyData.id} />}
				{tourneyData && <Bannertop banner={tourneyData.data.banner} />}
				{drawContent()}
			</div>
		</div>
	);
};

export default Tourney;

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
import ErrorPage from "./ErrorPage";
import setEmbed from "../functions/DiscordEmbedMabager";

interface Props {
	page: "info" | "upcoming" | "results" | "stats";
}

const Tourney = ({ page }: Props) => {
	const { id } = useParams<{ id: string }>();
	const [loading, setLoading] = useState<boolean>(true);
	const [gone, setGone] = useState<boolean>(false);
	const [tourneyData, setTourneyData] = useState<Tourney>();
	useEffect(() => {
		const fetchOneTourney = async () => {
			setLoading(true);
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/tourney/${id}`, {
					headers: {
						"x-api-key": import.meta.env.VITE_API_KEY,
					},
					credentials: "include",
				});
				if (response.status === 410) {
					setGone(true);
				} else if (!response.ok) {
					throw new Error(`Error fetching data: ${response.statusText}`);
				} else {
					const data = await response.json();
					setTourneyData(data);
					setGone(false);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchOneTourney();
	}, [id]);

	if (loading) {
		return (
			<div className="mainContent">
				<p>{randomLoadingMessage()}</p>
			</div>
		);
	}

	if (gone) {
		return <ErrorPage error={[410, "Gone"]} description="This tournament has been deleted by the host" />;
	}

	const drawContent = () => {
		switch (page) {
			case "info":
				return <TourneyCardhero tourney={tourneyData as Tourney} />;
			case "upcoming":
				return <TourneySchedulePage tourney={tourneyData as Tourney} />;
			case "results":
				return <TourneyResultsPage tourney={tourneyData as Tourney} />;
			case "stats":
				return <TourneyStatsPage tourney={tourneyData as Tourney} />;
			default:
				return null;
		}
	};
	document.title = `CFP: ${tourneyData?.title}`;
	tourneyData && setEmbed(tourneyData.title, `Check out all the information about ${tourneyData?.title} on Circles Front Page!`, tourneyData.data.banner);
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

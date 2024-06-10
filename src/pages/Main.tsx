import "./main.css";
import CenterPane from "../components/mainPage/CenterPane";
import LeftPane from "../components/mainPage/LeftPane";
import RightPane from "../components/mainPage/RightPane";
import { useEffect, useState } from "react";
import Bannertop from "../components/universal/Bannertop";
import { Tourney } from "../types/Tourney";
import randomLoadingMessage from "../functions/loadingMessages";

const Main = () => {
	const [tourneyData, setTourneyData] = useState<Tourney[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTourneys = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/tourneys`, {
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

		fetchTourneys();
	}, []);

	if (loading) {
		return (
			<div className="mainContent">
				<p>{randomLoadingMessage()}</p>
			</div>
		);
	}

	return (
		<div className="mainContent">
			{tourneyData.length > 0 && <Bannertop banner={tourneyData[0].data.banner} />}
			<LeftPane tourneyData={tourneyData} />
			<CenterPane tourneyData={tourneyData} />
			<RightPane />
		</div>
	);
};

export default Main;

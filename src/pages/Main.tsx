import "./main.css";
import CenterPane from "../components/mainPage/CenterPane";
import LeftPane from "../components/mainPage/LeftPane";
import RightPane from "../components/mainPage/RightPane";
import { useEffect, useState } from "react";
import Bannertop from "../components/ProfilePage/Bannertop";
import { Tourney } from "../types/Tourney";

const Main = () => {
	const [tourneyData, setTourneyData] = useState<Tourney[]>([]);

	useEffect(() => {
		const fetchTourneys = async () => {
			try {
				const response = await fetch(`http://${import.meta.env.VITE_API_URL}/tourneys`, {
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
			}
		};

		fetchTourneys();
	}, []);

	return (
		<div className="mainContent">
			{tourneyData.length > 0 && <Bannertop banner={tourneyData[0].data.banner} />}
			<LeftPane />
			<CenterPane />
			<RightPane />
		</div>
	);
};

export default Main;

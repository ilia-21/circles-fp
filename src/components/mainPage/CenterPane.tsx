import "./panes.css";
import TourneyCard from "../tourneyPage/TourneyCard";
import { useEffect, useState } from "react";

const CenterPane = () => {
	const [tourneyData, setTourneyData] = useState<any[]>([]);
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
			}
		};

		fetchTourneys();
	}, []);

	return (
		<div className="centerPane">
			{tourneyData.map((tourney) => (
				<TourneyCard key={tourney.id} tourney={tourney} />
			))}
		</div>
	);
};

export default CenterPane;

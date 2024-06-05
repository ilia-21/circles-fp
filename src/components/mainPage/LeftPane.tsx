import "./panes.css";
import TourneycardSmall from "./TourneycardSmall";
import { useEffect, useState } from "react";

const LeftPane = () => {
	const [tourneyData, setTourneyData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

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
			} finally {
				setLoading(false);
			}
		};

		fetchTourneys();
	}, []);

	return (
		<div className="leftPane">
			<div>
				<p>Tournaments</p>
				{loading ? <p>Please wait...</p> : tourneyData.map((tourney) => <TourneycardSmall key={tourney.id} tourney={tourney} />)}
			</div>
		</div>
	);
};

export default LeftPane;

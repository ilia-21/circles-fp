import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./panes.css";
import TourneycardSmall from "./TourneycardSmall";
import { useEffect, useState } from "react";
import genRanHex from "../../functions/getRanHex";

const LeftPane = () => {
	const [tourneyData, setTourneyData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchTourneys = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/tourneys?date`, {
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
			<div className="leftPane">
				<div>
					<p>Tournaments</p>
					<p>Please, wait</p>
				</div>
			</div>
		);
	}
	return (
		<div className="leftPane">
			<div>
				<p>Tournaments</p>
				{tourneyData.map((tourney) => (
					<TourneycardSmall key={tourney.id + genRanHex(4)} tourney={tourney} />
				))}
			</div>
		</div>
	);
};

export default LeftPane;

import "./panes.css";
import TourneycardSmall from "./TourneycardSmall";
import genRanHex from "../../functions/GetRanHex";
import { TourneyLite } from "../../types/Tourney";
import { useEffect, useState } from "react";
import randomLoadingMessage from "../../functions/loadingMessages";

const LeftPane = () => {
	const [tourneys, setTourneys] = useState<TourneyLite[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchTourneys = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/tourneys?onlyDates=true`, {
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
						"x-api-key": import.meta.env.VITE_API_KEY,
					},
				});
				const data = await response.json();
				setTourneys(data as TourneyLite[]);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching session data:", error);
			}
		};

		fetchTourneys();
	}, []);
	if (loading) {
		return (
			<div className="leftPane">
				<div>
					<p>Tournaments</p>
					<p>{randomLoadingMessage()}</p>
				</div>
			</div>
		);
	}
	return (
		<div className="leftPane">
			<div>
				<p>Tournaments</p>
				{tourneys && tourneys.map((tourney) => <TourneycardSmall key={tourney.id + genRanHex(4)} tourney={tourney} />)}
			</div>
		</div>
	);
};

export default LeftPane;

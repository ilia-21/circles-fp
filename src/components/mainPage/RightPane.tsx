import { useEffect, useState } from "react";
import "./panes.css";
import MatchSmall from "../tourneyPage/MatchSmall";

const RightPane = () => {
	const [matchData, setMatchData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchMatches = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/matches`, {
					headers: {
						"x-api-key": import.meta.env.VITE_API_KEY,
					},
					credentials: "include",
				});
				if (!response.ok) {
					throw new Error(`Error fetching data: ${response.statusText}`);
				}
				const data = await response.json();
				setMatchData(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchMatches();
	}, []);
	return (
		<div className="rightPane">
			<div>
				<p>Upcoming matches</p>
				{loading ? <p>Please wait...</p> : matchData.map((match) => <MatchSmall key={match.id} id={match.id} first={match.first} second={match.second} content="upcoming" upcoming={match.timestamp} />)}
			</div>
		</div>
	);
};

export default RightPane;

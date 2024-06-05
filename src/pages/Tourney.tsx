import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TourneyCardhero from "../components/tourneyPage/TourneyCardhero";
import type { Tourney } from "../types/Tourney";
import Bannertop from "../components/ProfilePage/Bannertop";

const Tourney = () => {
	const { id } = useParams<{ id: string }>();
	const [loading, setLoading] = useState<boolean>(true);
	const [tourneyData, setTourneyData] = useState<Tourney>();
	useEffect(() => {
		const fetchTourneys = async () => {
			try {
				const response = await fetch(`http://${import.meta.env.VITE_API_URL}/tourney/${id}`, {
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
		<div className="mainContent">
			{tourneyData && <Bannertop banner={tourneyData.data.banner} />}
			{loading ? <p>Please wait...</p> : <TourneyCardhero tourney={tourneyData as Tourney} />}
		</div>
	);
};

export default Tourney;

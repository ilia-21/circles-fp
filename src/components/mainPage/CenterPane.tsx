import "./panes.css";
import TourneyCard from "../tourneyPage/TourneyCard";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import genRanHex from "../../functions/getRanHex";

const CenterPane = () => {
	const [tourneyData, setTourneyData] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
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
				console.log(data);
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
			<div className="centerPane">
				<p>Please wait</p>
			</div>
		);
	}
	return <div className="centerPane">{tourneyData && tourneyData[0].id != tourneyData[1].id && tourneyData.map((tourney) => <TourneyCard key={tourney.id + genRanHex(4)} tourney={tourney} />)}</div>;
	//for some reason sometimes tourneyData[0] == tourneyData[1]
};

export default CenterPane;

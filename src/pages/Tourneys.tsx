import { useQuery } from "@tanstack/react-query";
import "../components/tourneyBrowserPage/styles.css";
import randomLoadingMessage from "../functions/loadingMessages";
import TourneyCardMed from "../components/tourneyBrowserPage/TourneyCardMed";
import { Tourney } from "../types/Tourney";
import { useParams } from "react-router-dom";
import { useState } from "react";
import BrowserFilters from "../components/tourneyBrowserPage/BrowserFilters";
const fetchTourneys = async (page: string) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/tournaments/${page}`, {
		headers: {
			"x-api-key": import.meta.env.VITE_API_KEY,
		},
		credentials: "include",
	});
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	const result = await response.json();
	return result as Tourney[];
};
const Tourneys = () => {
	const [searchOptions, setSearchOptions] = useState<{ type: "upcomingLive" | "archive"; year: string }>({
		type: "upcomingLive",
		year: "" + new Date().getFullYear(),
	});
	const { page } = useParams<{ page: string }>();
	const { isLoading: loading, data: tourneyData } = useQuery({
		queryKey: ["tourneysData", page],
		queryFn: () => fetchTourneys(page as string),
		retry: false,
	});
	if (loading) {
		return (
			<div className="tourneyBrowser">
				<div className="center">
					<p>{randomLoadingMessage()}</p>
				</div>
			</div>
		);
	}
	const drawTourneys = () => {
		if (!tourneyData) return <></>;
		return tourneyData.map((tourney) => <TourneyCardMed key={tourney.id} tourney={tourney} />);
	};
	return (
		<div className="tourneyBrowser">
			<div className="center">{tourneyData && drawTourneys()}</div>
			<div className="right">
				<BrowserFilters setSearchOptions={setSearchOptions} searchOptions={searchOptions}></BrowserFilters>
			</div>
		</div>
	);
};

export default Tourneys;

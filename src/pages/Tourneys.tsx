import { useQuery } from "@tanstack/react-query";
import "../components/tourneyBrowserPage/styles.css";
import randomLoadingMessage from "../functions/loadingMessages";
import TourneyCardMed from "../components/tourneyBrowserPage/TourneyCardMed";
import { Tourney } from "../types/Tourney";
import { useParams } from "react-router-dom";
import { useState } from "react";
import BrowserFilters from "../components/tourneyBrowserPage/BrowserFilters";
import { useSearchParams } from "react-router-dom";

export type Filters = {
	enabled: boolean;
	year: string;
};
interface TourneyBrowserData {
	data: Tourney[];
	pages: number;
}
const fetchTourneys = async (page: string, filters: Filters) => {
	let query = `${import.meta.env.VITE_API_URL}/tournaments/${page}`;
	if (filters.enabled) {
		filters.year !== "0000" && (query += `?year=${filters.year}`);
	}
	const response = await fetch(query, {
		headers: {
			"x-api-key": import.meta.env.VITE_API_KEY,
		},
		credentials: "include",
	});
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	const result = await response.json();
	return result as TourneyBrowserData;
};
const Tourneys = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [filters, setFilters] = useState<Filters>({
		enabled: searchParams.get("year") ? true : false,
		year: searchParams.get("year") || "0000",
	});
	const { page } = useParams<{ page: string }>();
	const { isLoading: loading, data: tourneyData } = useQuery({
		queryKey: ["tourneysData", page, filters],
		queryFn: () => fetchTourneys(page as string, filters),
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
		console.log(tourneyData);
		if (!tourneyData) return <></>;
		if (!tourneyData.data) {
			return (
				<>
					<h2>nothing found</h2>
				</>
			);
		}
		return tourneyData.data.map((tourney) => <TourneyCardMed key={tourney.id} tourney={tourney} />);
	};
	const drawPages = () => {
		if (!tourneyData) return <></>;
		let pageButtons = [];
		for (let i = 1; i <= tourneyData.pages; i++) {
			pageButtons.push(
				<a href={`/#/tourneys/${i}`} style={{ textDecoration: `` + i == page ? "underline" : "none" }}>
					{i}
				</a>
			);
		}
		return pageButtons;
	};
	return (
		<div className="tourneyBrowser">
			<div className="center">
				{tourneyData && drawTourneys()}
				<div className="pagesSelector">{tourneyData && drawPages()}</div>
			</div>

			<div className="right">
				<BrowserFilters setFilters={setFilters} filters={filters} setSearchParams={setSearchParams}></BrowserFilters>
			</div>
		</div>
	);
};

export default Tourneys;

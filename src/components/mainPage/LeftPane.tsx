import "./panes.css";
import TourneycardSmall from "./TourneycardSmall";
import genRanHex from "../../functions/GetRanHex";
import { TourneyLite } from "../../types/Tourney";
import randomLoadingMessage from "../../functions/loadingMessages";
import { useQuery } from "@tanstack/react-query";

const LeftPane = () => {
	const { isPending, data: Tourneys } = useQuery({
		queryKey: ["tourneysDataDates"],
		queryFn: () =>
			fetch(`${import.meta.env.VITE_API_URL}/tourneys?onlyDates=true`, {
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": import.meta.env.VITE_API_KEY,
				},
			}).then((response) => response.json()),
	});

	if (isPending) {
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
				{Tourneys && Tourneys.map((tourney: TourneyLite) => <TourneycardSmall key={tourney.id + genRanHex(4)} tourney={tourney} />)}
			</div>
		</div>
	);
};

export default LeftPane;

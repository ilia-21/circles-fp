import "./panes.css";
import MatchSmall from "../tourneyPage/MatchSmall";
import randomLoadingMessage from "../../functions/loadingMessages";
import { useQuery } from "@tanstack/react-query";
import { Match } from "../../types/Match";
import { getTimeZone } from "../../functions/TimeOperations";

const RightPane = () => {
	const { isPending: loading, data: matchData } = useQuery({
		queryKey: ["matchData"],
		queryFn: () =>
			fetch(`${import.meta.env.VITE_API_URL}/matches?tz=${getTimeZone().replace("+", "plus").replace("-", "minus")}`, {
				headers: {
					"x-api-key": import.meta.env.VITE_API_KEY,
				},
				credentials: "include",
			}).then((response) => response.json()),
	});
	const drawMatches = () => {
		if ((matchData as Match[]).length > 0) {
			const elements: JSX.Element[] = [];
			matchData.map((match: Match) => elements.push(<MatchSmall key={match.id} match={match} content="upcoming" />));
			return elements;
		} else {
			return (
				<div>
					<p>No matches today</p>
				</div>
			);
		}
	};
	if (loading) {
		return (
			<div className="rightPane">
				<div>
					<p>Matches Today</p>
					<p>{randomLoadingMessage()}</p>
				</div>
			</div>
		);
	}
	return (
		<div className="rightPane">
			<div>
				<p>Matches today ({`UTC${getTimeZone().slice(0, 3)}`})</p>
				{drawMatches()}
			</div>
		</div>
	);
};

export default RightPane;

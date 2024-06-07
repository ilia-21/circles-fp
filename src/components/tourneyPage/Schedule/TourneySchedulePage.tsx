import DateConverter from "../../../functions/DateConverter";
import { Tourney } from "../../../types/Tourney";
import MatchLong from "./MatchLong";

interface Props {
	tourney: Tourney;
}

const TourneySchedulePage = ({ tourney }: Props) => {
	const drawSchedule = () => {
		const sortedMatches = [...tourney.matches].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
		const matchesByDate: { [key: string]: JSX.Element[] } = {};

		sortedMatches.forEach((match) => {
			if (new Date(match.timestamp) > new Date(Date.now())) {
				const date = DateConverter(new Date(match.timestamp), "W MM DD") as string;
				if (!matchesByDate[date]) {
					matchesByDate[date] = [];
				}
				matchesByDate[date].push(<MatchLong key={match.id} match={match} />);
			}
		});

		const groupsToRender = Object.keys(matchesByDate).map((date) => (
			<div key={date} className="date-group">
				<h1>{date}</h1>
				{matchesByDate[date]}
			</div>
		));

		return groupsToRender;
	};

	return (
		<div>
			<h2>Schedule for {tourney.title}</h2>
			{drawSchedule()}
		</div>
	);
};

export default TourneySchedulePage;

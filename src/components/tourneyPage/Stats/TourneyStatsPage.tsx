import { Tourney } from "../../../types/Tourney";
import "./TourneyStatsPage.css";

interface Props {
	tourney: Tourney;
}

const TourneyStatsPage = ({ tourney }: Props) => {
	return (
		<div className="TourneyStatsPage">
			<h2>Stats of {tourney.title}</h2>
			<div className="TourneyStatsPageSection">
				<h3>Best perfoming players</h3>
			</div>
		</div>
	);
};

export default TourneyStatsPage;

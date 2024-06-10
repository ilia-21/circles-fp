import { Tourney } from "../../../types/Tourney";
import "./TourneyStatsPage.css";

interface Props {
	tourney: Tourney;
}

const TourneyStatsPage = ({ tourney }: Props) => {
	return (
		<div className="TourneyStatsPage">
			<h2>Stats page coming soon</h2>
			<div className="TourneyStatsPageSection">
				<h3>stat</h3>
			</div>
		</div>
	);
};

export default TourneyStatsPage;

import { Tourney } from "../../../types/Tourney";
import Collapsible from "../../universal/Collapsible";
import "./TourneyStatsPage.css";

interface Props {
	tourney: Tourney;
}

const TourneyStatsPage = ({}: /*tourney*/ Props) => {
	return (
		<div className="TourneyStatsPage">
			<h2>Stats page coming soon</h2>
			<div className="TourneyStatsPageSection">
				<Collapsible>
					<h3>stat</h3>
					<p>test</p>
				</Collapsible>
			</div>
		</div>
	);
};

export default TourneyStatsPage;

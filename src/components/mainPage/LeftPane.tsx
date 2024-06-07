import "./panes.css";
import TourneycardSmall from "./TourneycardSmall";
import genRanHex from "../../functions/GetRanHex";
import { Tourney } from "../../types/Tourney";

interface LeftPaneProps {
	tourneyData: Tourney[];
}

const LeftPane: React.FC<LeftPaneProps> = ({ tourneyData }) => {
	return (
		<div className="leftPane">
			<div>
				<p>Tournaments</p>
				{tourneyData.map((tourney) => (
					<TourneycardSmall key={tourney.id + genRanHex(4)} tourney={tourney} />
				))}
			</div>
		</div>
	);
};

export default LeftPane;

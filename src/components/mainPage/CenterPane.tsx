import "./panes.css";
import TourneyCard from "../tourneyPage/TourneyCard";
import { Tourney } from "../../types/Tourney";

interface LeftPaneProps {
	tourneyData: Tourney[];
}

const LeftPane: React.FC<LeftPaneProps> = ({ tourneyData }) => {
	console.log(tourneyData);
	const drawTourneys = () => {
		return tourneyData.map((tourney) => <TourneyCard key={tourney.id} tourney={tourney} />);
	};

	return <div className="centerPane">{tourneyData && drawTourneys()}</div>;
};

export default LeftPane;

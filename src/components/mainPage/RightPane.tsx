import Upcomingmatches from "./Upcomingmatches";
import "./panes.css";

const RightPane = () => {
	return (
		<div className="rightPane">
			<div>
				<p>Upcoming matches</p>
				<Upcomingmatches />
			</div>
		</div>
	);
};

export default RightPane;

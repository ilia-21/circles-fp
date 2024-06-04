import "./panes.css";
import TourneyCard from "../tourneyPage/TourneyCard";

const CenterPane = () => {
	return (
		<div className="centerPane">
			<TourneyCard id={1} name="OWC 2025" banner="https://i.ppy.sh/c654ce3b0a9aa87b1da2526a46141cf723c47935/68747470733a2f2f6f73752e7070792e73682f77696b692f696d616765732f546f75726e616d656e74732f4f57432f323032332f696d672f6f7763323032332d62616e6e65722e6a7067" />
			<TourneyCard id={1} name="OWC 2025" banner="https://i.ppy.sh/c654ce3b0a9aa87b1da2526a46141cf723c47935/68747470733a2f2f6f73752e7070792e73682f77696b692f696d616765732f546f75726e616d656e74732f4f57432f323032332f696d672f6f7763323032332d62616e6e65722e6a7067" />
		</div>
	);
};

export default CenterPane;

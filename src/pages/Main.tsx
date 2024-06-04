import "./main.css";
import CenterPane from "../components/mainPage/CenterPane";
import LeftPane from "../components/mainPage/LeftPane";
import RightPane from "../components/mainPage/RightPane";

const Main = () => {
	return (
		<div className="mainContent">
			<LeftPane />
			<CenterPane />
			<RightPane />
		</div>
	);
};

export default Main;

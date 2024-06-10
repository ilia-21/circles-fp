import { Route, Routes } from "react-router-dom";
import ImageGuidelines from "./ImageGuidelines";
import "../universal/universal.css";
import TourneyGuidelines from "./TournamentGuidelines";

const Infopage = () => {
	return (
		<>
			<div className="content">
				<h1 className="content-title">Circles Front Page info pages</h1>
				<div style={{ display: "flex", gap: "1em", flexWrap: "wrap" }}>
					<a href="/#/info/image-guidelines" className="link">
						Image guidelines
					</a>
					<a href="/#/info/tournament-guidelines" className="link">
						Tournament guidelines
					</a>
				</div>
			</div>
			<Routes>
				<Route path="/image-guidelines" element={<ImageGuidelines />} />
				<Route path="/tournament-guidelines" element={<TourneyGuidelines />} />
			</Routes>
		</>
	);
};

export default Infopage;

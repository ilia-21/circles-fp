import { Route, Routes } from "react-router-dom";
import ImageGuidelines from "./ImageGuidelines";
import "../universal/universal.css";
import TourneyGuidelines from "./TournamentGuidelines";
import Cookies from "./Cookies";
import About from "./About";

const Infopage = () => {
	return (
		<>
			<div className="content">
				<h1 className="content-title">Circles Front Page info pages</h1>
				<div style={{ display: "flex", gap: "1em", flexWrap: "wrap" }}>
					<a href="/#/info/about" className="link">
						About
					</a>
					<a href="/#/info/image-guidelines" className="link">
						Image guidelines
					</a>
					<a href="/#/info/tournament-guidelines" className="link">
						Tournament guidelines
					</a>
					<a href="/#/info/cookies" className="link">
						Enabling cross-site cookies
					</a>
				</div>
			</div>
			<Routes>
				<Route path="/image-guidelines" element={<ImageGuidelines />} />
				<Route path="/cookies" element={<Cookies />} />
				<Route path="/tournament-guidelines" element={<TourneyGuidelines />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</>
	);
};

export default Infopage;

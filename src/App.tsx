import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import MainPage from "./pages/Main";
import Tourney from "./pages/Tourney";
import Tourneys from "./pages/Tourneys";
import SomethingWentWrong from "./pages/SomethingWentWrong";
import ErrorPage from "./pages/ErrorPage";
import TeamPage from "./pages/TeamPage";
import Infopage from "./components/infoPages/InfoPage";
import Match from "./pages/Match";
import CookieWarningPopup from "./components/universal/CookieWarningPopup";
import TourneyEditor from "./pages/TourneyEditor";
import Settings from "./pages/Settings";
import SettingsLoader from "./components/universal/SettingsLoader";
import MatchEditor from "./pages/MatchEditor";
import TourneyDeleter from "./pages/TourneyDeleter";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [showPopup, setShowPopup] = useState(false);
	const [currentPage] = useState(-1);
	const { isPending, data } = useQuery({
		queryKey: ["userData"],
		queryFn: () =>
			fetch(`${import.meta.env.VITE_API_URL}/api/session`, {
				credentials: "include",
			}).then((response) => response.json()),
	});
	// react-query YIPPIE
	let links = [
		{ title: "Tournaments", location: "/#/tourneys" },
		{ title: "Matches", location: "/#/matches" },
		{ title: "Stats", location: "/#/stats" },
	];
	const handleClosePopup = () => {
		localStorage.setItem("hasSeenCookieWarning", "true");
		setShowPopup(false);
	};
	if (!isPending && data && data.user && data.user.username != "ilia21") {
		console.log("%c" + "Hold Up!", "color: #7289DA; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;");
		console.log("%c Do not paste anything here!", "color:red;font-size:20px");
		console.log("%c If someone told you to do so, you are probably getting hacked!", "color:red;font-weight:bold");
		console.log(" If you know what you are doing, please, contribute: https://github.com/ilia-21/circles-fp");
	}
	return (
		<Router>
			{showPopup && <CookieWarningPopup onClose={handleClosePopup} />}
			<SettingsLoader />
			<ToastContainer position="bottom-right" theme="dark" draggable icon={false} />
			<NavBar selected={currentPage} links={links} />
			<ErrorBoundary fallbackRender={SomethingWentWrong}>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="profile" element={<Profile />}>
						<Route path=":uid" element={<Profile />} />
					</Route>
					<Route path="tourneys" element={<Tourneys />} />
					<Route path="tourney">
						<Route path=":id" element={<Tourney page="info" />} />
						<Route path=":id/info" element={<Tourney page="info" />} />
						<Route path=":id/matches" element={<Tourney page="upcoming" />} />
						<Route path=":id/results" element={<Tourney page="results" />} />
						<Route path=":id/stats" element={<Tourney page="stats" />} />
					</Route>
					<Route path="editor">
						<Route path="tourney/:id" element={<TourneyEditor />} />
						<Route path="match/:id" element={<MatchEditor />} />
					</Route>
					<Route path="deleter">
						<Route path="tourney/:id" element={<TourneyDeleter />} />
					</Route>
					<Route path="match/:id" element={<Match />} />
					<Route path="team/:id" element={<TeamPage />} />
					<Route path="info/*" element={<Infopage />} />
					<Route path="settings/" element={<Settings />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
				<Footer />
			</ErrorBoundary>
		</Router>
	);
}

export default App;

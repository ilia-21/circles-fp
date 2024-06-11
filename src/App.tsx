import { useEffect, useState } from "react";
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

function App() {
	const [user, setUser] = useState(null);
	const [showPopup, setShowPopup] = useState(false);
	const [currentPage] = useState(-1);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/session`, {
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.isLoggedIn) {
					setUser(data.user);
				}
			})
			.catch((error) => console.error("Error fetching session:", error));

		if (!localStorage.getItem("hasSeenCookieWarning")) {
			setShowPopup(true);
		}
	}, []);
	let links = [
		{ title: "Tournaments", location: "/#/tourneys" },
		{ title: "Matches", location: "/#/matches" },
		{ title: "Stats", location: "/#/stats" },
	];
	const handleClosePopup = () => {
		localStorage.setItem("hasSeenCookieWarning", "true");
		setShowPopup(false);
	};

	return (
		<Router>
			{showPopup && <CookieWarningPopup onClose={handleClosePopup} />}
			<NavBar selected={currentPage} links={links} user={user} />
			<ErrorBoundary fallbackRender={SomethingWentWrong}>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="profile" element={<Profile loggedInUser={user} />}>
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
					<Route path="match/:id" element={<Match />} />
					<Route path="team/:id" element={<TeamPage />} />
					<Route path="info/*" element={<Infopage />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
				<Footer />
			</ErrorBoundary>
		</Router>
	);
}

export default App;

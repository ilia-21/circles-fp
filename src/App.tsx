// App.tsx
import { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import MainPage from "./pages/Main";
import Tourney from "./pages/Tourney";
import Tourneys from "./pages/Tourneys";

function App() {
	const [user, setUser] = useState(null);
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
			});
	}, []);
	let links = [
		{ title: "Tournaments", location: "/#/tourneys" },
		{ title: "Matches", location: "/#/matches" },
		{ title: "Stats", location: "/#/stats" },
	];

	return (
		<Router>
			<NavBar selected={currentPage} links={links} user={user} />

			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/profile" element={<Profile loggedInUser={user} />} />
				<Route path="/profile/:uid" element={<Profile />} />
				<Route path="/tourneys" element={<Tourneys />} />
				<Route path="/tourney/:id" element={<Tourney />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;

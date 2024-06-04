// App.tsx
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import MainPage from "./pages/Main";

function App() {
	const [user, setUser] = useState(null);
	const [currentPage, setcurrentPage] = useState(-1);

	useEffect(() => {
		fetch("http://localhost:3000/api/session", {
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
		{ title: "Tournaments", location: "/tourneys" },
		{ title: "Matches", location: "/matches" },
		{ title: "Stats", location: "/stats" },
	];

	return (
		<Router>
			<NavBar selected={currentPage} links={links} user={user} />

			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/profile" element={<Profile loggedInUser={user} />} />
				<Route path="/profile/:uid" element={<Profile />} />
				{/* Add other routes here */}
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;

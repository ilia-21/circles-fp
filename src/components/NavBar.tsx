import { useQuery } from "@tanstack/react-query";
import logo from "../assets/logoInlineV3.svg";
import osulogo from "../assets/osu!logoBlack.png";
import "./NavBar.css";
import UserArea from "./UserArea";

interface Props {
	selected: number;
	links: { title: string; location: string }[];
}

const NavBar = ({ selected, links }: Props) => {
	const { data } = useQuery({
		queryKey: ["userData"],
		queryFn: () =>
			fetch(`${import.meta.env.VITE_API_URL}/api/session`, {
				credentials: "include",
			}).then((response) => response.json()),
	});
	const createLinks = () => {
		return links.map((link, index) => (
			<a href={link.location} key={index} className="navBarLink">
				{link.title}
				{index === selected && <span className="navBarLinkUnderline"></span>}
			</a>
		));
	};

	const handleLogin = () => {
		const authPopup = window.open(`${import.meta.env.VITE_API_URL}/login`, "Circles front page login", "toolbar=no,location=no,directories=no,status=no,menubar=no, scrollbars=no,resizable=yes,height=800,width=450");
		//refresh the page after login popup is closed (stackoverflow says it works only if the page is on the same domain, we'll see)
		authPopup &&
			(authPopup.onbeforeunload = function () {
				window.location.reload();
			});
	};

	const handleLogout = () => {
		window.location.href = `${import.meta.env.VITE_API_URL}/logout`;
	};
	const drawUserArea = () => {
		if (data.isLoggedIn) {
			return <UserArea name={data.user.username} avatar={data.user.avatar_url} userid={data.user.id} onLogout={handleLogout} />;
		} else {
			return (
				<a className="navBarLink" onClick={handleLogin}>
					Login with <img src={osulogo} alt="osu!" />
				</a>
			);
		}
	};
	return (
		<div className="navBar">
			<a href="/">
				<img src={logo} className="logo" alt="Logo" />
			</a>
			<div className="links">{createLinks()}</div>
			{data ? drawUserArea() : <a className="navBarLink" onClick={handleLogin}></a>}
		</div>
	);
};

export default NavBar;

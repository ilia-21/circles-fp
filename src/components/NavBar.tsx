import logo from "../assets/logo.png";
import osulogo from "../assets/osu!logoBlack.png";
import "./NavBar.css";
import UserArea from "./UserArea";

interface Props {
	selected: number;
	links: { title: string; location: string }[];
	user: any;
}

const NavBar = ({ selected, links, user }: Props) => {
	const createLinks = () => {
		return links.map((link, index) => (
			<a href={link.location} key={index} className="navBarLink">
				{link.title}
				{index === selected && <span className="navBarLinkUnderline"></span>}
			</a>
		));
	};

	const handleLogin = () => {
		window.location.href = `${import.meta.env.VITE_API_URL}/login`;
	};

	const handleLogout = () => {
		window.location.href = `${import.meta.env.VITE_API_URL}/logout`;
	};

	return (
		<div className="navBar">
			<a href="/">
				<img src={logo} className="logo" alt="Logo" />
			</a>
			<div className="links">{createLinks()}</div>
			{user ? (
				<UserArea name={user.username} avatar={user.avatar_url} userid={user.id} onLogout={handleLogout} />
			) : (
				<a className="navBarLink" onClick={handleLogin}>
					Login with <img src={osulogo} alt="osu!" />
				</a>
			)}
		</div>
	);
};

export default NavBar;

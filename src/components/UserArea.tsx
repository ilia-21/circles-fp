import "./UserArea.css";
import { useState } from "react";
interface Props {
	avatar: string;
	name: string;
	userid: number;
	onLogout: () => void;
}

const UserArea = ({ avatar, name, userid, onLogout }: Props) => {
	const [menuVisible, setMenuVisible] = useState(false);
	const toggleMenu = () => {
		setMenuVisible(!menuVisible);
	};

	return (
		<div className="userArea">
			<div onClick={toggleMenu} className="userInfo">
				<img src={avatar} alt="User Avatar" />
				<p>{name}</p>
			</div>
			{menuVisible && (
				<div className="userMenu">
					<a href={`/profile`}>My Profile</a>
					<a href={`/tourneys`}>My Tournaments</a>
					<a href={`/stats`}>My Stats</a>
					<a href={`/matches`}>My Matches</a>
					<a onClick={onLogout}>Logout</a>
				</div>
			)}
		</div>
	);
};

export default UserArea;

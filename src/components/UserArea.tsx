import loadSettings from "../functions/loadSettings";
import { UserSettings } from "../types/Player";
import "./UserArea.css";
import { useState, useEffect, useRef } from "react";

interface Props {
	avatar: string;
	name: string;
	userid: number;
	onLogout: () => void;
}

const UserArea = ({ avatar, name, userid, onLogout }: Props) => {
	const [menuVisible, setMenuVisible] = useState(false);
	const [settings, setSettings] = useState<UserSettings | null>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	const toggleMenu = () => {
		setMenuVisible(!menuVisible);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
			setMenuVisible(false);
		}
	};

	const handleEscapeKey = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			setMenuVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscapeKey);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, []);
	useEffect(() => {
		const fetchSettings = async () => {
			const fetchedSettings: UserSettings = await loadSettings();
			setSettings(fetchedSettings);
		};
		fetchSettings();
	}, []);
	const drawMenu = () => {
		if (settings && settings.profileButtons) {
			let elements = [];

			for (const s of settings.profileButtons) {
				switch (s) {
					case "profile":
						elements.push(<a href={`/#/profile`}>My Profile</a>);
						break;
					case "tourneys":
						elements.push(<a href={`/#/tourneys`}>My Tournaments</a>);
						break;
					case "stats":
						elements.push(<a href={`/#/stats`}>My Stats</a>);
						break;
					case "matches":
						elements.push(<a href={`/#/matches`}>My Matches</a>);
						break;
					case "settings":
						elements.push(<a href={`/#/settings`}>Settings</a>);
						break;
				}
			}
			return (
				<>
					{elements}
					<a onClick={onLogout}>Logout</a>
				</>
			);
		} else {
			return (
				<>
					<a href={`/#/profile`}>My Profile</a>
					<a href={`/#/tourneys`}>My Tournaments</a>
					<a href={`/#/stats`}>My Stats</a>
					<a href={`/#/matches`}>My Matches</a>
					<a href={`/#/settings`}>Settings</a>
					<a onClick={onLogout}>Logout</a>
				</>
			);
		}
	};
	return (
		<div className="userArea" ref={menuRef}>
			<div onClick={toggleMenu} className="userInfo">
				<img src={avatar} alt="User Avatar" />
				<p>{name}</p>
			</div>
			<div className="userMenu">{menuVisible && drawMenu()}</div>
		</div>
	);
};

export default UserArea;

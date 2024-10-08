import { loadSettings } from "../functions/SettingsUtils";
import { UserSettings } from "../types/Player";
import "./UserArea.css";
import { useState, useEffect, useRef } from "react";

interface Props {
	avatar: string;
	name: string;
	userid: number;
	onLogout: () => void;
}
const setlocalId = (id: string) => {
	//Only for local operations, there are still server-side checks for important stuff
	const cached = localStorage.getItem("localuserID");
	if (cached && cached == id) return;
	localStorage.setItem("localuserID", id);
};
const UserArea = ({ avatar, name, userid, onLogout }: Props) => {
	const [menuVisible, setMenuVisible] = useState(false);
	const [settings, setSettings] = useState<UserSettings | null>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	setlocalId("" + userid);
	const toggleMenu = () => {
		setMenuVisible(!menuVisible);
	};

	const handleClick = (event: MouseEvent) => {
		if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
			setMenuVisible(false);
		} else if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
			setTimeout(() => {
				setMenuVisible(false);
			}, 100);
		}
	};

	const handleEscapeKey = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			setMenuVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClick);
		document.addEventListener("keydown", handleEscapeKey);

		return () => {
			document.removeEventListener("mousedown", handleClick);
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
			<div className="userMenu" ref={dropdownRef}>
				{menuVisible && drawMenu()}
			</div>
		</div>
	);
};

export default UserArea;

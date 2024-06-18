import type { UserSettings } from "../../types/Player";
import { useState, useEffect } from "react";
import "./../../pages/Settings.css";
import { defaultProfileButtons } from "../../pages/Settings";
import Link from "./Link";
import HeaderButtons from "./HeaderButtons";

interface Props {
	userSettings: UserSettings;
	setUserSettings: (settings: UserSettings) => void;
	importSettings: (section: string) => void;
	exportSettings: (section: string) => void;
}

const styles: React.CSSProperties = { WebkitTouchCallout: "none", WebkitUserSelect: "none", MozUserSelect: "none", msUserSelect: "none", userSelect: "none" };

const Links = ({ userSettings, setUserSettings, importSettings, exportSettings }: Props) => {
	const [links, setLinks] = useState<string[]>(userSettings.profileButtons);

	const setDefaultPages = () => {
		const updatedSettings = { ...userSettings, profileButtons: defaultProfileButtons };
		setUserSettings(updatedSettings);
		setLinks(defaultProfileButtons);
	};
	const updateLinks = () => {
		const updatedSettings = { ...userSettings, profileButtons: links };
		setUserSettings(updatedSettings);
	};
	useEffect(() => {
		updateLinks();
	}, [links]);
	useEffect(() => {
		setLinks(userSettings.profileButtons);
	}, [userSettings.profileButtons]);

	const drawLinks = () => {
		return (
			<>
				<h3>Active links</h3>
				{links.map((ln, index) => (
					<Link key={index} link={ln} allLinks={links} index={index} setLinks={setLinks} />
				))}
			</>
		);
	};

	const drawDeletedLinks = () => {
		const inactiveLinks = defaultProfileButtons.filter((x) => !links.includes(x));
		return (
			<>
				<h3>Disabled links</h3>
				{inactiveLinks.map((ln, index) => (
					<Link key={index} link={ln} allLinks={links} index={index} setLinks={setLinks} disabled />
				))}
			</>
		);
	};

	return (
		<div style={styles}>
			<div className="settings-colors-header">
				<h2 className="settings-header-title">Links in profile pop-up</h2>
				<HeaderButtons exportSettings={exportSettings} importSettings={importSettings} setDefaults={setDefaultPages} section="profileButtons" />
			</div>
			<div>
				{drawLinks()}
				{drawDeletedLinks()}
			</div>
		</div>
	);
};

export default Links;

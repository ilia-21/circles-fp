import type { UserSettings } from "../../types/Player";
import "./../../pages/Settings.css";
import { defaultProfileButtons } from "../../pages/Settings";

import HeaderButtons from "./HeaderButtons";

interface Props {
	userSettings: UserSettings;
	setUserSettings: (settings: UserSettings) => void;
	importSettings: (section: string) => void;
	exportSettings: (section: string) => void;
}

const styles: React.CSSProperties = { WebkitTouchCallout: "none", WebkitUserSelect: "none", MozUserSelect: "none", msUserSelect: "none", userSelect: "none" };

const OtherSettings = ({ userSettings, setUserSettings, importSettings, exportSettings }: Props) => {
	const setDefaults = () => {
		const updatedSettings = { ...userSettings, profileButtons: defaultProfileButtons };
		setUserSettings(updatedSettings);
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const updatedSettings = { ...userSettings, other: { ...userSettings.other, [e.target.name]: e.target.value } };
		setUserSettings(updatedSettings);
	};

	return (
		<div style={styles}>
			<div className="settings-colors-header">
				<h2 className="settings-header-title">Other settings</h2>
				<HeaderButtons exportSettings={exportSettings} importSettings={importSettings} setDefaults={setDefaults} section="profileButtons" />
			</div>
			<div>
				<div>
					<p>Mark matches, that happened this many hours ago as spoiler (0 to disable)</p>
					<input type="text" value={userSettings.other.spoilerTime} name="spoilerTime" onChange={handleChange} className="minimalisticInput" />
				</div>
				<div>
					<p>Separator for long numbers (By default: just space) </p>
					<input type="text" maxLength={1} value={userSettings.other.separator} name="separator" onChange={handleChange} className="minimalisticInput" />
					<p>Preview: 123{userSettings.other.separator}456</p>
				</div>
			</div>
		</div>
	);
};

export default OtherSettings;

import { useEffect, useState } from "react";
import { UserSettings } from "../../types/Player";
import loadSettings from "../../functions/loadSettings";

const isEmpty = (obj: any) => {
	if (!obj) {
		return true;
	} else {
		return Object.keys(obj).length === 0;
	}
};
const SettingsLoader = () => {
	const [userSettings, setUserSettings] = useState<UserSettings | null>(null);

	useEffect(() => {
		const fetchSettings = async () => {
			const fetchedSettings: UserSettings = await loadSettings();
			setUserSettings(fetchedSettings);
		};
		fetchSettings();
	}, []);
	if (!isEmpty(userSettings)) {
		for (const clr of Object.keys((userSettings as any).colors)) {
			if (clr != "advanced") {
				const rootVariableName = clr
					.split(/\.?(?=[A-Z])/)
					.join("-")
					.toLowerCase();
				document.documentElement.style.setProperty(`--${rootVariableName}`, (userSettings as any).colors[clr]);
			}
		}
	}
	return <></>;
};

export default SettingsLoader;

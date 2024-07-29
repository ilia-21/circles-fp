import { useEffect, useState } from "react";
import { BsCloudDownload, BsCloudUpload, BsDownload, BsFloppy, BsUpload } from "react-icons/bs";
import type { UserSettings } from "../types/Player";
import loadSettings from "../functions/loadSettings";
import updateSettings from "../functions/updateSettings";
import randomLoadingMessage from "../functions/loadingMessages";
import "./Settings.css";
import Colors from "../components/settingsPage/Colors";
import Tooltip from "../components/universal/Tooltip";
import Links from "../components/settingsPage/Links";
import OtherSettings from "../components/settingsPage/Other";
import ErrorPage from "./ErrorPage";
import { toast } from "react-toastify";

export const defaultColors = {
	/* CFP styles */
	cfpBgDark: "var(--crust)",
	cfpBg: "var(--crust)",
	cfpBgSecondary: "var(--mantle)",
	cfpBgTertiary: "var(--base)",
	cfpAccent: "var(--blue)",
	cfpText: "var(--text)",
	advanced: {
		rosewater: "#f5e0dc",
		flamingo: "#f2cdcd",
		pink: "#f5c2e7",
		mauve: "#cba6f7",
		red: "#f38ba8",
		maroon: "#eba0ac",
		peach: "#fab387",
		yellow: "#f9e2af",
		green: "#a6e3a1",
		teal: "#94e2d5",
		sky: "#89dceb",
		sapphire: "#74c7ec",
		blue: "#89b4fa",
		lavender: "#b4befe",
		text: "#cdd6f4",
		subtext0: "#a6adc8",
		subtext1: "#bac2de",
		overlay0: "#6c7086",
		overlay1: "#7f849c",
		overlay2: "#9399b2",
		surface0: "#45475a",
		surface1: "#313244",
		surface2: "#585b70",
		base: "#1e1e2e",
		mantle: "#181825",
		crust: "#11111b",
	},
};
export const defaultProfileButtons = ["profile", "tourneys", "stats", "matches", "settings"];
const Settings = () => {
	const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
	const [userError, setUserError] = useState<string | null>(null);

	useEffect(() => {
		const fetchSettings = async () => {
			const fetchedSettings = await loadSettings();
			console.log(fetchedSettings);
			if (fetchedSettings == 401) setUserError("401");
			setUserSettings(fetchedSettings);
		};
		fetchSettings();
	}, []);

	const saveSettings = (sync?: boolean) => {
		try {
			updateSettings(userSettings as UserSettings, sync);
			toast.success("Saved");
		} catch (e) {}
	};
	const importSettings = (section: string) => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".json";
		input.onchange = (event) => {
			const file = (event.target as HTMLInputElement).files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					try {
						const importedSettings = JSON.parse(e.target?.result as string);
						if (importedSettings[section]) {
							console.log(section);

							setUserSettings((prevSettings) => ({
								...prevSettings!,
								[section]: importedSettings[section],
							}));
						} else if (section == "all") {
							setUserSettings(importedSettings);
							toast.success("Settings imported successfully");
						} else {
							toast.error(`Invalid settings file. Section "${section}" not found.`);
						}
					} catch (error) {
						toast.error("Invalid settings file.");
					}
				};
				reader.readAsText(file);
			}
		};
		input.click();
	};

	const exportSettings = (section: string) => {
		let data;
		if (section == "all") {
			data = JSON.stringify(userSettings as any, null, 2);
		} else {
			data = JSON.stringify({ [section]: (userSettings as any)?.[section] }, null, 2);
		}
		const blob = new Blob([data], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `cfp_settings_${section}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};
	const loadSettingsFromServer = async () => {
		const loadedSettings = await loadSettings(true);
		setUserSettings(loadedSettings);
	};
	const drawSettings = () => {
		let elements = [];
		//let isUpdated = false;
		if (!userSettings) return <>{randomLoadingMessage()}</>;
		if (!userSettings.colors) {
			userSettings.colors = defaultColors;
			//isUpdated = true;
		}
		if (!userSettings.profileButtons) {
			userSettings.profileButtons = defaultProfileButtons;
			//isUpdated = true;
		}
		elements.push(<Colors userSettings={userSettings} setUserSettings={setUserSettings} importSettings={importSettings} exportSettings={exportSettings} />);
		elements.push(<Links userSettings={userSettings} setUserSettings={setUserSettings} importSettings={importSettings} exportSettings={exportSettings} />);
		elements.push(<OtherSettings userSettings={userSettings} setUserSettings={setUserSettings} importSettings={importSettings} exportSettings={exportSettings} />);
		return elements;
	};
	document.title = `CFP: Settings`;
	if (userError) {
		return <ErrorPage error={[401, "You need to log in"]} />;
	}
	return (
		<div className="content">
			<div className="settings-header">
				<h1>Settings</h1>
				<div className="settings-header-buttons">
					<div onClick={loadSettingsFromServer}>
						<BsCloudDownload />
						<Tooltip content={"Download from server"} />
					</div>
					<div
						onClick={() => {
							saveSettings(true);
						}}
					>
						<BsCloudUpload />
						<Tooltip content={"Save settings on server"} />
					</div>
					<div
						onClick={() => {
							importSettings("all");
						}}
					>
						<BsDownload />
						<Tooltip content={"Import all settings"} />
					</div>
					<div
						onClick={() => {
							exportSettings("all");
						}}
					>
						<BsUpload />
						<Tooltip content={"Export all settings"} />
					</div>
					<BsFloppy
						className="settings-header-save"
						onClick={() => {
							saveSettings();
						}}
					/>
				</div>
			</div>
			{userSettings && drawSettings()}
		</div>
	);
};

export default Settings;

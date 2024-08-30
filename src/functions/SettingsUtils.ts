import { UserSettings } from "../types/Player";
const GetDefaultSettings = (): UserSettings => {
	return {
		version: 3,
		colors: {
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
		},
		profileButtons: ["profile", "tourneys", "stats", "matches", "settings"],
		other: {
			spoilerTime: 12,
			separator: " ",
		},
	} as UserSettings;
};
const getUserSettings = (): UserSettings => {
	return JSON.parse(localStorage.getItem("websiteSettings") as string) as UserSettings;
};
const migrateSettings = () => {
	//migrate settings keeping the ones that are already present
	const def = GetDefaultSettings();
	const user = getUserSettings();
	localStorage.setItem("websiteSettings", JSON.stringify({ ...def, ...user }));
};
const syncSettings = async () => {
	if (GetDefaultSettings().version > getUserSettings().version) migrateSettings();
	const isEmpty = (obj: any) => {
		if (!obj) {
			return true;
		} else {
			return Object.keys(obj).length === 0;
		}
	};
	try {
		const def = GetDefaultSettings();
		if (Number(localStorage.getItem("settingsTime")) + 36000 > Date.now()) {
			return JSON.parse(localStorage.getItem("websiteSettings") as string);
		}
		const response = await fetch(`${import.meta.env.VITE_API_URL}/me/settings`, {
			headers: {
				"x-api-key": import.meta.env.VITE_API_KEY,
			},
			credentials: "include",
		});
		if (response.status == 401) return 401;
		let data = await response.json();
		if (isEmpty(data)) data = def;
		if (data.version < def.version) data = { ...def, ...data };
		localStorage.setItem("websiteSettings", JSON.stringify(data));
		localStorage.setItem("settingsTime", `` + Date.now());
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};
const loadSettings = async (sync?: boolean, force?: boolean) => {
	return await syncSettings();
};

let updateSettings = async (settings: UserSettings, sync?: boolean) => {
	if (sync) {
		/* const response =*/ await fetch(`${import.meta.env.VITE_API_URL}/me/edit/settings`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_API_KEY,
			},
			credentials: "include",
			body: JSON.stringify(settings),
		});

		//let data = await response.json();
	}
	localStorage.setItem("websiteSettings", JSON.stringify(settings));
};

export { loadSettings, updateSettings, GetDefaultSettings, getUserSettings };

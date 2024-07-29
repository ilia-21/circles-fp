import { UserSettings } from "../types/Player";

const GetDefaultSettings = () => {
	return {
		version: 2,
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
		},
	} as UserSettings;
};
export default GetDefaultSettings;

import { UserSettings } from "../../types/Player";
import { loadSettings } from "../../functions/SettingsUtils";
import { useQuery } from "@tanstack/react-query";
const SettingsLoader = () => {
	const { data: userSettings, isLoading, error } = useQuery<UserSettings>({ queryKey: ["userSettings"], queryFn: () => loadSettings(), staleTime: 3600 });

	if (userSettings) {
		//@ts-ignore
		if (userSettings == 401) return <></>;
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

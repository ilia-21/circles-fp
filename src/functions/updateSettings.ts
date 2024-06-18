import { UserSettings } from "../types/Player";

let updateSettings = async (settings: UserSettings, sync?: boolean) => {
	if (sync) {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/me/edit/settings`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_API_KEY,
			},
			credentials: "include",
			body: JSON.stringify(settings),
		});

		let data = await response.json();
	}
	localStorage.setItem("websiteSettings", JSON.stringify(settings));
};
export default updateSettings;

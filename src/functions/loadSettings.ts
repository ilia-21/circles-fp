import GetDefaultSettings from "./GetDefaultSettings";

const isEmpty = (obj: any) => {
	if (!obj) {
		return true;
	} else {
		return Object.keys(obj).length === 0;
	}
};
const syncSettings = async () => {
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
export default loadSettings;

const syncSettings = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/me/settings`, {
			headers: {
				"x-api-key": import.meta.env.VITE_API_KEY,
			},
			credentials: "include",
		});
		let data = await response.json();
		console.log(data);
		localStorage.setItem("websiteSettings", JSON.stringify(data));
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};
const loadSettings = async (sync?: boolean, force?: boolean) => {
	let localStoredSettings = localStorage.getItem("websiteSettings");
	localStoredSettings = localStoredSettings ? JSON.parse(localStoredSettings) : {};
	if (sync) {
		const hashResponse = await fetch(`${import.meta.env.VITE_API_URL}/me/settings?hash=true`, {
			headers: {
				"x-api-key": import.meta.env.VITE_API_KEY,
			},
			credentials: "include",
		});

		let hash = await hashResponse.json();
		//@ts-ignore
		if (localStoredSettings && localStoredSettings.hash == hash && !force) {
			return localStoredSettings;
		} else {
			return syncSettings();
		}
	} else {
		return await localStoredSettings;
	}
};
export default loadSettings;

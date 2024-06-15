import { Beatmap } from "../types/Beatmap";

let GetMap = async (id: number) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/map/${id}`, {
			headers: {
				"x-api-key": import.meta.env.VITE_API_KEY,
			},
			credentials: "include",
		});
		if (!response.ok) {
			throw new Error(`Error fetching data: ${response.statusText}`);
		}
		let map = await response.json();
		return map as Beatmap;
	} catch (error) {
		console.error(error);
	}
};
export default GetMap;

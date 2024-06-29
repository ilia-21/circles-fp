import { PlayerLite, Size } from "../types/Player";

let GetPlayer = async (id: number, size: Size) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}?size=${size}`, {
			headers: {
				"x-api-key": import.meta.env.VITE_API_KEY,
			},
			credentials: "include",
		});
		if (!response.ok) {
			throw new Error(`Error fetching data: ${response.statusText}`);
		}
		let player = await response.json();
		return player as PlayerLite;
	} catch (error) {
		console.error(error);
	}
};
export default GetPlayer;

let GetPlayer = async (id: number) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
			headers: {
				"x-api-key": import.meta.env.VITE_API_KEY,
			},
			credentials: "include",
		});
		if (!response.ok) {
			throw new Error(`Error fetching data: ${response.statusText}`);
		}
		let player = await response.json();
		return player;
	} catch (error) {
		console.error(error);
	}
};
export default GetPlayer;

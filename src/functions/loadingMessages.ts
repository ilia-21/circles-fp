const messages: [string, number][] = [
	["Clicking circles", 1],
	["Warming up", 1],
	["Practicing map pool", 1],
	["Farming pp", 1],
	["Adjusting offset", 1],
	["Switching to full area", 1],
	["Configuring keybinds", 1],
	["Applying mods", 1],
	["Beatmap difficulty calculation in progress", 1],
	["Reworking pp", 0.1],
];

const randomLoadingMessage = () => {
	const totalWeight = messages.reduce((sum, [_, weight]) => sum + weight, 0);
	const randomWeight = Math.random() * totalWeight;

	let cumulativeWeight = 0;
	for (const [message, weight] of messages) {
		cumulativeWeight += weight;
		if (randomWeight < cumulativeWeight) {
			return message + "...";
		}
	}

	// Just in case
	return "Loading...";
};

export default randomLoadingMessage;

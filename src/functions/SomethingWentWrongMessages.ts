const messages: [string, number][] = [
	["You ended up in a strage place", 1],
	["You shitmissed", 1],
	["Looks like the servers are taking break", 1],
	["Looks like a hidden mod is enabled on this page", 1],
	["You got a slider break", 1],
	["Uh-oh! This page seems to have slipped into the graveyard", 1],
	["Page not found... just like accuracy on your top play!", 1],
	["Can't find the storyboard for this page. Looks like someone disabled it!", 1],
	["404: Not Found. Looks like you're hunting for a hidden object. Keep searching!", 1],
	["Error 403: Forbidden. Looks like you're not ready for this difficulty. Practice some more!", 1],
	["The page you're searching for is probably practicing pool right now", 1],
	["Error 406: You have overstreamed 222 bpm ", 1],
	["You are not enjoying the game", 1],
	["Oops! You accidentaly used FL on this page", 1],
	["You just choked you first 100pp", 1],
	["Get tsukinami'd", 1],
];
const randomErrorMessage = () => {
	const totalWeight = messages.reduce((sum, [_, weight]) => sum + weight, 0);
	const randomWeight = Math.random() * totalWeight;

	let cumulativeWeight = 0;
	for (const [message, weight] of messages) {
		cumulativeWeight += weight;
		if (randomWeight < cumulativeWeight) {
			return message;
		}
	}

	// Just in case
	return "An error occurred while selecting error message, you are very lucky today";
};
export default randomErrorMessage;

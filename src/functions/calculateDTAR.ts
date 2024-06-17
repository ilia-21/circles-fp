import { LargeNumberLike } from "crypto";

// https://osu.ppy.sh/wiki/en/Beatmap/Approach_rate
let calculateDTAR = (ar: number) => {
	//thank you https://www.reddit.com/r/osugame/comments/99bj39/comment/e4mksa8/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
	let ms: number;
	let newAR: number;

	if (ar > 5) {
		ms = 200 + (11 - ar) * 100;
	} else {
		ms = 800 + (5 - ar) * 80;
	}

	if (ms < 300) {
		newAR = 11;
	} else if (ms < 1200) {
		newAR = Math.round((11 - (ms - 300) / 150) * 100) / 100;
	} else {
		newAR = Math.round((5 - (ms - 1200) / 120) * 100) / 100;
	}
	return newAR;
};
export default calculateDTAR;

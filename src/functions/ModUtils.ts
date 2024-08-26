import { Beatmap } from "../types/Beatmap";
import { BeatmapSlot, Mod } from "../types/Mod";

let calculateDTAR = (ar: number) => {
	//thank you https://www.reddit.com/r/osugame/comments/99bj39/comment/e4mksa8/
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

const ModApplier = (mod: Mod, map: Beatmap) => {
	const modifiedMap = { ...map };
	if (mod === "HR" || mod === "DT") {
		const hrMultiply = (stat: number, cs?: boolean) => {
			// floating point precision :skull:
			const multiplier = cs ? 1.3 : 1.4;
			const result = Math.min(stat * multiplier, 10);
			return parseFloat(result.toFixed(1));
		};

		switch (mod) {
			case "HR":
				modifiedMap.ar = hrMultiply(map.ar);
				modifiedMap.cs = hrMultiply(map.cs, true);
				modifiedMap.drain = hrMultiply(map.drain);
				modifiedMap.accuracy = hrMultiply(map.accuracy);
				break;
			case "DT":
				modifiedMap.bpm *= 1.5;
				modifiedMap.ar = calculateDTAR(map.ar);
				break;
		}
	}
	return modifiedMap as Beatmap;
};
const getModColor = (mod: BeatmapSlot | Mod): string => {
	const colors = {
		NM: "var(--green)",
		HR: "var(--red)",
		HD: "var(--blue)",
		DT: "var(--yellow)",
		FM: "var(--mauve)",
		TB: "var(--teal)",
	};
	for (const key in colors) {
		//@ts-ignore
		//I honestly don't understand what does it want
		if (mod.includes(key)) return colors[key];
	}
	return "var(--grey)";
};
export { ModApplier, getModColor };

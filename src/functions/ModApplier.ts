import { Beatmap } from "../types/Beatmap";

const ModApplier = (mod: "NM" | "HR" | "HD" | "DT" | "FM" | "TB", map: Beatmap) => {
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
				break;
		}
	}
	return modifiedMap as Beatmap;
};
export default ModApplier;

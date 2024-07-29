import { toast } from "react-toastify";
import { Tourney, TourneyMappool } from "../types/Tourney";
import genRanHex from "./GetRanHex";

const imp = (setTourneyData: (Tourney: Tourney) => void) => {
	const input = document.createElement("input");
	input.type = "file";
	input.accept = ".json";
	input.onchange = (event) => {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const importedTourney = JSON.parse(e.target?.result as string);
					if (importedTourney) {
						setTourneyData(importedTourney);
						toast.success("Tournament imported sucessfully");
					} else {
						toast.error("Invalid tourney file");
					}
				} catch (error) {
					toast.error("Invalid tourney file");
				}
			};
			reader.readAsText(file);
		}
	};
	input.click();
};
const exp = async (tournament: Tourney) => {
	try {
		// Helper function to convert image URL to base64
		const toBase64 = async (url: string): Promise<string> => {
			const response = await fetch(url);
			const blob = await response.blob();
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					resolve(reader.result as string);
				};
				reader.onerror = reject;
				reader.readAsDataURL(blob);
			});
		};

		// Check and convert images to base64 if they are URLs
		if (tournament.data.banner && tournament.data.banner.startsWith("http")) {
			tournament.data.banner = await toBase64(tournament.data.banner);
		}

		if (tournament.data.icon && tournament.data.icon.startsWith("http")) {
			tournament.data.icon = await toBase64(tournament.data.icon);
		}

		let ids: any = {};

		// Function to generate a unique ID
		const generateUniqueId = (prefix: string, existingIds: Set<string>) => {
			let newId;
			do {
				newId = `${prefix}-${genRanHex(4)}`;
			} while (existingIds.has(newId));
			return newId;
		};

		// Collect all existing IDs
		const existingIds = new Set<string>();

		// First replace ids and add them
		for (const match of tournament.data.bracket.upper) {
			const newId = generateUniqueId("upper", existingIds);
			ids[match.id] = newId;
			match.id = newId;
			existingIds.add(newId);
		}
		for (const match of tournament.data.bracket.lower) {
			const newId = generateUniqueId("lower", existingIds);
			ids[match.id] = newId;
			match.id = newId;
			existingIds.add(newId);
		}

		// Log the mapping of old IDs to new IDs
		console.log("ID Mapping:", ids);

		// Then replace ids in nextMatchId and nextLooserMatchId
		const replaceIdsInBracket = (bracket: any[]) => {
			for (const match of bracket) {
				if (match.nextMatchId) match.nextMatchId = ids[match.nextMatchId];
				if (match.nextLooserMatchId) match.nextLooserMatchId = ids[match.nextLooserMatchId];
			}
		};
		replaceIdsInBracket(tournament.data.bracket.upper);
		replaceIdsInBracket(tournament.data.bracket.lower);

		// Log the updated bracket for verification
		console.log("Updated Bracket:", tournament.data.bracket);

		// Convert tournament data to JSON
		const data = JSON.stringify({ WARNING: "DO NOT CHANGE ANYTHING IN THIS FILE", ...tournament }, null, 2);
		const blob = new Blob([data], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `cfp_tournament_${tournament.title.replace(/ /g, "_")}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	} catch (error) {
		console.error("Error while exporting:", error);
		toast.error("Error while exporting");
	}
};

const mpools = {
	exp: (tournament: Tourney) => {
		try {
			const pool = tournament.data.pool;
			let data;
			data = JSON.stringify(pool as any, null, 2);

			const blob = new Blob([data], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `cfp_pools_${tournament.title.replace(" ", "_")}.json`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (error) {
			toast.error("Error while exporting");
		}
	},
	imp: (setTourneyData: (Tourney: Tourney) => void, localTourneyData: Tourney) => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".json";
		input.onchange = (event) => {
			const file = (event.target as HTMLInputElement).files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					try {
						const importedPool = JSON.parse(e.target?.result as string);
						if (importedPool) {
							setTourneyData({ ...localTourneyData, data: { ...localTourneyData.data, pool: importedPool } });
							toast.success("Map pools imported sucessfully");
						} else {
							toast.error("Invalid map pools file");
						}
					} catch (error) {
						toast.error("Invalid map pools file");
					}
				};
				reader.readAsText(file);
			}
		};
		input.click();
	},
};
const mpool = {
	exp: (pool: TourneyMappool) => {
		try {
			let data;
			data = JSON.stringify(pool as any, null, 2);

			const blob = new Blob([data], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `cfp_pool_${pool.title.replace(" ", "_")}.json`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (error) {
			toast.error("Error while exporting");
		}
	},
	imp: (syncPools: (index: number, updatedPool: TourneyMappool) => void, index: number) => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".json";
		input.onchange = (event) => {
			const file = (event.target as HTMLInputElement).files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					try {
						const importedPool = JSON.parse(e.target?.result as string);
						if (importedPool) {
							syncPools(index, importedPool);
							toast.success("Map pools imported sucessfully");
						} else {
							toast.error("Invalid map pools file");
						}
					} catch (error) {
						toast.error("Invalid map pools file");
					}
				};
				reader.readAsText(file);
			}
		};
		input.click();
	},
};
export default { exp, imp, mpools, mpool };

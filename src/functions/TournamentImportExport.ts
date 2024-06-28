import { toast } from "react-toastify";
import { Tourney, TourneyMappool } from "../types/Tourney";

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
const exp = (tournament: Tourney) => {
	try {
		let data;
		data = JSON.stringify(tournament as any, null, 2);

		const blob = new Blob([data], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `cfp_tournament_${tournament.title.replace(" ", "_")}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	} catch (error) {
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

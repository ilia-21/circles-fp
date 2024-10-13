import { RxValue } from "react-icons/rx";
import { SunburstData } from "../types/DataViz";
import { PlayerStats } from "../types/Stats";

const convertToChartData = (data: PlayerStats, type: "picked" | "banned" | "lost"): SunburstData => {
	const chartData = {
		name: type,
		children: [],
	};
	switch (type) {
		case "banned":
			Object.entries(data.Rates).forEach(([mod, stats]) => {
				const modNode = { name: mod, value: stats.timesBanned };
				chartData.children.push(modNode as never);
			});
			break;
			break;
		case "picked":
			Object.entries(data.Rates).forEach(([mod, stats]) => {
				const modNode = {
					name: mod,
					children: [
						{ name: "Won", value: stats.timesWon.ownPick },
						{ name: "Lost", value: stats.timesLost.ownPick },
					],
				};
				chartData.children.push(modNode as never);
			});
			break;
		case "lost":
			Object.entries(data.Rates).forEach(([mod, stats]) => {
				const modNode = { name: mod, value: stats.timesLost.ownPick + stats.timesLost.oppPick };
				chartData.children.push(modNode as never);
			});
			break;
	}

	return chartData;
};

export default convertToChartData;

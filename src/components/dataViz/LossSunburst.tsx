import { ComputedDatum, ResponsiveSunburst } from "@nivo/sunburst";
import { Pickcolors, WinrateColors, colors, theme } from "./theme";
import { SunburstData } from "../../types/DataViz";

interface Props {
	data: SunburstData;
	keys: string[];
	indexby: string;
	type: "loss" | "ban";
}
const DoesItHaveChildrenWith0Value = (data: SunburstData) => {
	//Because the chart breaks on 100% winrate or lossrate
	if (data.children && data.children.find((c) => c.value == 0)) return true;
	return false;
};
const ReadableTooltip = (e: ComputedDatum<SunburstData>, type: "loss" | "ban") => {
	const word = e.value == 1 ? "time" : "times"; // a little bit of attention to small details
	return (
		<div className="profile-stats-tooltip-container">
			<p>
				{e.id} {type == "loss" ? "lost" : "banned"} {e.value} {word}
			</p>
			<p>{e.formattedValue}</p>
		</div>
	);
};
const LossSunburst = ({ data, keys, indexby, type }: Props) => {
	return (
		<ResponsiveSunburst
			data={data}
			margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
			id="name"
			value="value"
			borderWidth={1}
			cornerRadius={2}
			borderColor={{ theme: "stroke" }}
			colors={Pickcolors}
			colorBy="id"
			enableArcLabels={true}
			arcLabelsSkipAngle={1}
			arcLabel="id"
			arcLabelsTextColor={{
				from: "color",
				modifiers: [["darker", 1.72]],
			}}
			theme={theme}
			tooltip={(e) => ReadableTooltip(e, type)}
		/>
	);
};
export default LossSunburst;

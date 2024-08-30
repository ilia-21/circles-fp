import { ComputedDatum, ResponsiveSunburst } from "@nivo/sunburst";
import { Pickcolors, WinrateColors, colors, theme } from "./theme";
import { SunburstData } from "../../types/DataViz";

interface Props {
	data: SunburstData;
	keys: string[];
	indexby: string;
	setData: (data: SunburstData) => void;
	originalData: SunburstData;
}
const DoesItHaveChildrenWith0Value = (data: SunburstData) => {
	//Because the chart breaks on 100% winrate or losrate
	if (data.children && data.children.find((c) => c.value == 0)) return true;
	return false;
};
const ReadableTooltip = (e: ComputedDatum<SunburstData>) => {
	const firstWord = e.path[1] == "picked" ? e.data.name : e.path[1];
	const secondWord = e.path[1] == "picked" ? "picked" : e.data.name;
	const thirdWord = e.value == 1 ? "time" : "times"; // a little bit attention to small details
	return (
		<div className="profile-stats-tooltip-container">
			<p>
				{firstWord} {secondWord} {e.value} {thirdWord}
			</p>
			{e.path.length == 2 && <p>{e.formattedValue}</p>}
		</div>
	);
};
const PicksSunburst = ({ data, keys, indexby, setData, originalData }: Props) => {
	return (
		<ResponsiveSunburst
			data={data}
			margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
			id="name"
			value="value"
			borderWidth={1}
			cornerRadius={2}
			borderColor={{ theme: "stroke" }}
			colors={data.name == "picked" ? Pickcolors : WinrateColors}
			colorBy="id"
			enableArcLabels={true}
			arcLabelsSkipAngle={1}
			arcLabel="id"
			arcLabelsTextColor={{
				from: "color",
				modifiers: [["darker", 1.72]],
			}}
			theme={theme}
			tooltip={ReadableTooltip}
			onClick={(e) => {
				const found = data.children?.find((c) => c.name == e.data.name);
				if (found && found.children && !DoesItHaveChildrenWith0Value(found)) setData(found);
				if (!found?.children) setData(originalData);
			}}
		/>
	);
};
export default PicksSunburst;

import { ResponsiveRadar } from "@nivo/radar";
import { theme } from "./theme";

interface Props {
	data: any;
	keys: string[];
	indexby: string;
}
const Radar = ({ data, keys, indexby }: Props) => {
	return (
		<ResponsiveRadar
			data={data}
			keys={keys}
			indexBy={indexby}
			valueFormat=">-.2f"
			margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
			borderColor={{
				from: "color",
			}}
			gridLabelOffset={36}
			gridShape="linear"
			dotSize={10}
			dotColor={{ theme: "background" }}
			dotBorderWidth={2}
			colors={{ scheme: "nivo" }}
			blendMode="multiply"
			motionConfig="wobbly"
			theme={theme}
		/>
	);
};
export default Radar;

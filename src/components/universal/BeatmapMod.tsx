import "./BeatmapMod.css";
interface Props {
	mod: string;
	textColor?: string;
}

const BeatmapMod = ({ mod, textColor }: Props) => {
	mod = mod.slice(0, 2).toUpperCase();
	let color: string = "";
	switch (mod) {
		case "NM":
			color = "green";
			break;
		case "HR":
			color = "red";
			break;
		case "DT":
			color = "yellow";
			break;
		case "HD":
			color = "blue";
			break;
		case "FM":
			color = "mauve";
			break;
		case "TB":
			color = "teal";
			break;
	}
	return (
		<div className="BeatmapMod" style={{ backgroundColor: `var(--${color})` }}>
			<p style={{ color: textColor || "auto" }}>{mod}</p>
		</div>
	);
};

export default BeatmapMod;

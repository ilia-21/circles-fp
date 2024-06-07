import "./BeatmapMod.css";
interface Props {
	mod: string;
}

const BeatmapMod = ({ mod }: Props) => {
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
	}
	return (
		<div className="BeatmapMod" style={{ backgroundColor: `var(--${color})` }}>
			<p>{mod}</p>
		</div>
	);
};

export default BeatmapMod;

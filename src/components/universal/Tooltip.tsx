import "./Tooltip.css";
interface Props {
	content: any;
	height?: string;
}

const Tooltip = ({ content, height }: Props) => {
	height = height || "auto";
	return (
		<span className="tooltip" style={{ marginBottom: height }}>
			{content}
		</span>
	);
};

export default Tooltip;

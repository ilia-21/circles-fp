import "./Tooltip.css";
interface Props {
	content: any;
}

const Tooltip = ({ content }: Props) => {
	return <span className="tooltip">{content}</span>;
};

export default Tooltip;

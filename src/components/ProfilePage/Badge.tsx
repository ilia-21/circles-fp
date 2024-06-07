import * as Icon from "react-icons/fa";
import "./Badge.css";
interface Props {
	title: string;
	color: string;
	icn: string;
	description?: string;
}

const Badge = ({ title, color, icn, description }: Props) => {
	!description && (description = "This badge does not have any description");
	const IconComponent = (Icon as any)[`Fa${icn}`];
	return (
		<div className="badge">
			{IconComponent && <IconComponent />}
			<p style={{ color: color, textTransform: "capitalize" }}>
				{title} {description && <p className="badgeTooltip">{description}</p>}
			</p>
		</div>
	);
};

export default Badge;

import * as Icon from "react-icons/si";
import "./LinkButtonSmall.css";
interface Props {
	text: string;
	color: string;
	icn: string;
	link: string;
}

const LinkButtonSmall = ({ text, color, icn, link }: Props) => {
	if (link.includes("twitch.tv")) {
		text = "Watch on twitch";
		icn = "Twitch";
		color = "#9146FF";
	}
	if (link.includes("youtube.com")) {
		text = "Watch on youtube";
		icn = "Youtube";
		color = "#FF0000";
	}
	const openLink = () => {
		window.open(link, "_self");
	};
	const IconComponent = (Icon as any)[`Si${icn}`];
	return (
		<div className="LinkButtonSmall" style={{ backgroundColor: color }} onClick={openLink}>
			{IconComponent && <IconComponent />}
			<p>{text}</p>
		</div>
	);
};

export default LinkButtonSmall;

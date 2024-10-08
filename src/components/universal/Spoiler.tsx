import { useEffect, useState } from "react";
import Tooltip from "./Tooltip";
import { UserSettings } from "../../types/Player";
import { getUserSettings } from "../../functions/SettingsUtils";
interface Props {
	children: any;
	time: Date;
}
const Spoiler = ({ children, time }: Props) => {
	const [revealed, setRevealed] = useState(false);
	const [hovering, setHovering] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			if (hovering) {
				setRevealed(true);
			}
		}, 2000);
	}, [hovering]);
	const spoiler = getUserSettings().other.spoilerTime * 3600;
	time.setSeconds(time.getSeconds() + spoiler);
	if (time > new Date()) {
		return (
			<div
				className={!revealed ? "spoiler-hidden" : "spoiler-revealed"}
				onMouseEnter={() => {
					setHovering(true);
				}}
				onMouseLeave={() => {
					setHovering(false);
				}}
			>
				{children}
				{!revealed && <Tooltip content={"Hover for a few seconds to reveal spoiler"} />}
			</div>
		);
	} else {
		return <>{children}</>;
	}
};

export default Spoiler;

import { useEffect, useState } from "react";
import Tooltip from "./Tooltip";

const Spoiler = ({ children }: any) => {
	const [revealed, setRevealed] = useState(false);
	const [hovering, setHovering] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			if (hovering) {
				setRevealed(true);
			}
		}, 2000);
	}, [hovering]);
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
};

export default Spoiler;

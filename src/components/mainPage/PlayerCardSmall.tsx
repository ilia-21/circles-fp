import { useEffect, useRef, useState } from "react";
import "./PlayerCardSmall.css";
import { Player } from "../../types/Player";
interface Props {
	player: Player;
}

const PlayerCardSmall = ({ player }: Props) => {
	const playerCardRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ left: "50%", right: "0", transform: "translateX(-50%)" });

	useEffect(() => {
		const handleMouseOver = () => {
			if (!playerCardRef.current) return;
			const rect = playerCardRef.current.getBoundingClientRect();
			if (rect.right > window.innerWidth) {
				setPosition({ left: "auto", right: "0", transform: "translateX(0)" });
			} else if (rect.left < 0) {
				setPosition({ left: "0", right: "auto", transform: "translateX(0)" });
			}
		};
		if (!playerCardRef.current) return;
		const parentElement = playerCardRef.current.parentElement;
		if (!parentElement) return;
		parentElement.addEventListener("mouseover", handleMouseOver);

		return () => {
			parentElement.removeEventListener("mouseover", handleMouseOver);
		};
	}, []);
	//is this what hell looks like?
	return (
		<div className="playerCardSmall" ref={playerCardRef} style={position}>
			<img src={player.cover.custom_url} alt="" />
			<div className="dacontainer">
				<img src={player.avatar_url} alt="" />
				<div>
					<p>{player.username}</p>
					<img src={`/src/assets/flags/${player.country.name}.png`} />
				</div>
			</div>
			<p className="playerCardSmallRank">#{player.statistics.global_rank}</p>
		</div>
	);
};

export default PlayerCardSmall;

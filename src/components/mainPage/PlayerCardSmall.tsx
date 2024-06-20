import { useEffect, useRef, useState } from "react";
import "./PlayerCardSmall.css";
import { Player, PlayerLite } from "../../types/Player";
import Badge from "../ProfilePage/Badge";

interface Props {
	player: Player | PlayerLite;
	height?: string;
}

const PlayerCardSmall = ({ player, height }: Props) => {
	const playerCardRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({
		left: "50%",
		right: "0",
		transform: "translateX(-50%)",
		marginBottom: height || "auto",
	});

	useEffect(() => {
		const handleMouseOver = () => {
			if (!playerCardRef.current) return;
			const rect = playerCardRef.current.getBoundingClientRect();
			if (rect.right > window.innerWidth) {
				setPosition((prev) => ({ ...prev, left: "auto", right: "0", transform: "translateX(0)" }));
			} else if (rect.left < 0) {
				setPosition((prev) => ({ ...prev, left: "0", right: "auto", transform: "translateX(0)" }));
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
	function printRoles() {
		const roleTitle = Object.keys(player.cfp.roles)[0];
		const role = player.cfp.roles[roleTitle];
		return <Badge title={roleTitle} color={role[0]} icn={role[1]} description={role[2]} />;
	}
	if (!player.cover) {
		console.log(player);
	}
	return (
		<div className="playerCardSmall" ref={playerCardRef} style={position}>
			<img src={player.cover.custom_url} alt="" />
			<div className="dacontainer">
				<img src={player.avatar_url} alt="" />
				<div>
					<p>{player.username}</p>
					<img src={`${import.meta.env.VITE_API_URL}/f/flags/${player.country.name}.png`} />
				</div>

				<div>{player.cfp.roles && Object.keys(player.cfp.roles).length > 0 && printRoles()}</div>
			</div>
			<p className="playerCardSmallRank">#{player.statistics.global_rank}</p>
		</div>
	);
};

export default PlayerCardSmall;

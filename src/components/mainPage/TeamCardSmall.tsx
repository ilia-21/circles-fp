import { useEffect, useRef, useState } from "react";
import "./TeamCardSmall.css";
import { Team } from "../../types/Team";
interface Props {
	team: Team;
}

const TeamCardSmall = ({ team }: Props) => {
	const teamCardRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ left: "50%", right: "0", transform: "translateX(-50%)" });

	useEffect(() => {
		const handleMouseOver = () => {
			if (!teamCardRef.current) return;
			const rect = teamCardRef.current.getBoundingClientRect();
			if (rect.right > window.innerWidth) {
				setPosition({ left: "auto", right: "0", transform: "translateX(0)" });
			} else if (rect.left < 0) {
				setPosition({ left: "0", right: "auto", transform: "translateX(0)" });
			}
		};
		if (!teamCardRef.current) return;
		const parentElement = teamCardRef.current.parentElement;
		if (!parentElement) return;
		parentElement.addEventListener("mouseover", handleMouseOver);

		return () => {
			parentElement.removeEventListener("mouseover", handleMouseOver);
		};
	}, []);
	//is this what hell looks like?
	return (
		<div className="teamCardSmall" ref={teamCardRef} style={position}>
			<p>{team.title}</p>
			{team.players.map((player) => (
				<div className="teamCardContainer">
					<img src={player.avatar_url} alt="" />
					<p>{player.username}</p>
				</div>
			))}
		</div>
	);
};

export default TeamCardSmall;

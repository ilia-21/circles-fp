import { useState, useEffect } from "react";
import GetPlayer from "../functions/GetPlayer";
import { PlayerLite } from "../types/Player";
import "./Footer.css";
import PlayerLink from "./universal/PlayerLink";

const Footer = () => {
	const [ilia21, setIlia21] = useState<PlayerLite | null>(null);
	const [effectXolodka, setEffectXolodka] = useState<PlayerLite | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const player1 = (await GetPlayer(17258441, "lite")) as PlayerLite;
				setIlia21(player1);

				const player2 = (await GetPlayer(27057916, "lite")) as PlayerLite;
				setEffectXolodka(player2);
			} catch (error) {
				console.error("Error fetching player data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="footer">
			<p>{import.meta.env.VITE_VERSION}</p>
			<a href="https://github.com/ilia-21/circles-fp">Source</a>
			<a href="/#/info/about">About</a>
			<a href="https://discord.gg/WsXtQ9YC2d">Contact</a>
			{loading || !ilia21 || !effectXolodka ? (
				<p>
					made with ♡ By ilia21, effect xolodka and <a href="https://github.com/ilia-21/circles-fp/graphs/contributors">you</a>
				</p>
			) : (
				<p>
					made with ♡ By <PlayerLink user={ilia21 as PlayerLite} />, <PlayerLink user={effectXolodka as PlayerLite} /> and <a href="https://github.com/ilia-21/circles-fp/graphs/contributors">you</a>
				</p>
			)}
		</div>
	);
};

export default Footer;

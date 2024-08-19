import GetPlayer from "../functions/GetPlayer";
import { PlayerLite, Size } from "../types/Player";
import "./Footer.css";
import PlayerLink from "./universal/PlayerLink";
import { useQuery } from "@tanstack/react-query";
const fetchPlayer = async (id: number, type: Size): Promise<PlayerLite> => {
	const response = await GetPlayer(id, type);
	return response as PlayerLite;
};
const Footer = () => {
	const { data: ilia21, isLoading: loading1 } = useQuery({
		queryKey: ["ilia21Data"],
		queryFn: () => fetchPlayer(17258441, "lite"),
	});
	const { data: effectXolodka, isLoading: loading2 } = useQuery({
		queryKey: ["effectXolodkaData"],
		queryFn: () => fetchPlayer(27057916, "lite"),
	});
	const { data: serverStats, isLoading: loading3 } = useQuery({
		queryKey: ["serverData"],
		queryFn: () =>
			fetch(`${import.meta.env.VITE_API_URL}/db/stats`, {
				headers: {
					"x-api-key": import.meta.env.VITE_API_KEY,
				},
				credentials: "include",
			}).then((response) => response.json()),
		staleTime: 3600,
	});

	return (
		<div className="footer">
			<div>
				{loading3 ? (
					<p></p>
				) : (
					<p>
						Stored ~{serverStats.matchCount} matches and ~{serverStats.tourneyCount} tournaments for total of {serverStats.DBSize}
					</p>
				)}
			</div>
			<div>
				<p>{import.meta.env.VITE_VERSION}</p>
				<a href="https://github.com/ilia-21/circles-fp">Source</a>
				<a href="/#/info/about">About</a>
				<a href="https://discord.gg/WsXtQ9YC2d">Contact</a>
				{loading1 || loading2 || !ilia21 || !effectXolodka ? (
					<p>
						made with ♡ By ilia21, effect xolodka and <a href="https://github.com/ilia-21/circles-fp/graphs/contributors">you</a>
					</p>
				) : (
					<p>
						made with ♡ By <PlayerLink user={ilia21 as PlayerLite} />, <PlayerLink user={effectXolodka as PlayerLite} /> and <a href="https://github.com/ilia-21/circles-fp/graphs/contributors">you</a>
					</p>
				)}
			</div>
		</div>
	);
};

export default Footer;

import { useQuery } from "@tanstack/react-query";
import { Player, PlayerLite } from "../../types/Player";
import PlayerCardSmall from "../../components/mainPage/PlayerCardSmall";
import GetPlayer from "../../functions/GetPlayer";

type Props =
	| {
			user?: null;
			userid: number;
			noColor?: boolean;
			pfp?: boolean;
	  }
	| {
			user: Player | PlayerLite;
			userid?: null;
			noColor?: boolean;
			pfp?: boolean;
	  };

const fetchPlayer = async (id: number) => {
	const player = (await GetPlayer(id)) as PlayerLite;
	return player;
};

const PlayerLink = ({ user, userid, noColor, pfp }: Props) => {
	const { data: player, isLoading } = useQuery({
		queryKey: ["playerData", userid || user?.id],
		enabled: !!userid, // Only fetch if userid is provided
		queryFn: () => fetchPlayer(userid as number),
		initialData: user || undefined, // Use initial data if user is provided
	});
	if (isLoading) {
		return (
			<a
				href={`/#/profile/2`}
				style={{
					position: "relative",
					textDecoration: noColor ? "none" : "unset",
					color: noColor ? "var(--text)" : "var(--cfp-accent)",
				}}
			>
				loading...
			</a>
		);
	}
	return (
		<a
			href={`/#/profile/${userid || (user as PlayerLite).id}`}
			style={{
				position: "relative",
				textDecoration: noColor ? "none" : "unset",
				color: noColor ? "var(--text)" : "var(--cfp-accent)",
				display: pfp ? "flex" : "inline",
				gap: "1em",
				alignItems: "center",
			}}
		>
			{player && pfp && <img src={player.avatar_url} style={{ height: "2.5em", borderRadius: "1em" }} />}
			{player && player.username}
			{player && <PlayerCardSmall player={player as PlayerLite} />}
		</a>
	);
};

export default PlayerLink;

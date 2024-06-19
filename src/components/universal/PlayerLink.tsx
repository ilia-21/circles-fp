import { useEffect, useState } from "react";
import { Player, PlayerLite } from "../../types/Player";
import PlayerCardSmall from "../mainPage/PlayerCardSmall";
import GetPlayer from "../../functions/GetPlayer";

interface Props {
	user: Player | PlayerLite;
	noColor?: boolean;
}

const PlayerLink = ({ user, noColor }: Props) => {
	const [player, setPlayer] = useState<PlayerLite | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchPlayer = async () => {
			if (user && user.id) {
				const fetchedPlayer = await GetPlayer(user.id);
				setPlayer(fetchedPlayer);
			}
			setLoading(false);
		};

		if (!user.cover_url) {
			fetchPlayer();
		} else {
			setPlayer(user as PlayerLite);
			setLoading(false);
		}
	}, [user]);

	if (loading) {
		return (
			<a
				href={`/#/profile/${user.id}`}
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
			href={`/#/profile/${user.id}`}
			style={{
				position: "relative",
				textDecoration: noColor ? "none" : "unset",
				color: noColor ? "var(--text)" : "var(--cfp-accent)",
			}}
		>
			{player && player.username}
			{player && <PlayerCardSmall player={player as PlayerLite} />}
		</a>
	);
};

export default PlayerLink;

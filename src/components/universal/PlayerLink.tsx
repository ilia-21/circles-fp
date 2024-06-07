import { Player, PlayerLite } from "../../types/Player";
import PlayerCardSmall from "../mainPage/PlayerCardSmall";
interface Props {
	user: Player | PlayerLite;
	noColor?: boolean;
}

const PlayerLink = ({ user, noColor }: Props) => {
	return (
		<a
			href={`/#/profile/${user.id}`}
			style={{
				position: "relative",
				textDecoration: noColor ? "none" : "unset",
				color: noColor ? "var(--text)" : "var(--cfp-accent)",
			}}
		>
			{user.username}
			<PlayerCardSmall player={user} />
		</a>
	);
};

export default PlayerLink;

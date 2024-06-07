import { Player } from "../../types/Player";
import PlayerCardSmall from "../mainPage/PlayerCardSmall";
interface Props {
	user: Player;
}

const UserLink = ({ user }: Props) => {
	return (
		<a href={`/#/profile/${user.id}`} style={{ position: "relative" }}>
			{user.username}
			<PlayerCardSmall player={user} />
		</a>
	);
};

export default UserLink;

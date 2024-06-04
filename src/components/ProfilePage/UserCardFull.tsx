import Badge from "./Badge";
import "./UserCardFull.css";
interface Props {
	username: string;
	avatar: string;
	country: string;
	roles?: { [key: string]: string[] };
}

const UserCardFull = ({ username, avatar, country, roles }: Props) => {
	function printRoles() {
		if (roles && Object.keys(roles).length != 0)
			for (let role of Object.keys(roles)) {
				console.log(roles[role]);
				return <Badge title={role} color={roles[role][0]} icn={roles[role][1]} />;
			}
	}
	return (
		<div className="userCardFull">
			<div className="profileContainer">
				<img src={avatar} alt="avatar" className="avatar" />
				<div className="yetAnotherContainer">
					<h1 className="username">{username}</h1>
					<img src={`/src/assets/flags/${country}.png`} alt="" />
				</div>
				<div className="badgeContainer">{printRoles()}</div>
			</div>
		</div>
	);
};

export default UserCardFull;

import Badge from "./Badge";
import "./UserCardFull.css";
interface Props {
	user: any;
}

const UserCardFull = ({ user }: Props) => {
	let username = user.username;
	let avatar = user.avatar_url;
	let roles = user.cfp.roles;
	let country = user.country.name;
	function printRoles() {
		if (roles && Object.keys(roles).length != 0)
			for (let role of Object.keys(roles)) {
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
			<div className="quickInfo">
				<h1>Player stats since day 1</h1>
				<p>acc:</p> <p>{Math.round(user.statistics.hit_accuracy * 100) / 100}%</p>
				<p>rating:</p>
				<p>#{user.statistics.global_rank}</p>
				<p>Matches played:</p>
				<p></p>
				<p>Winrate:</p>
				<p></p>
				<p>Average matchcost:</p>
				<p></p>
			</div>
		</div>
	);
};

export default UserCardFull;

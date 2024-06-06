import Badge from "./Badge";
import "./UserCardFull.css";

interface Props {
	id: number;
}

const OptoutPage = ({ id }: Props) => {
	let username = "Opted out";
	let roles: any = [];

	function printRoles() {
		if (roles && Object.keys(roles).length != 0)
			for (let role of Object.keys(roles)) {
				return <Badge title={role} color={roles[role][0]} icn={roles[role][1]} />;
			}
	}
	return (
		<div className="userCardFull">
			<div className="profileContainer">
				<div className="yetAnotherContainer">
					<h1 className="username">{username}</h1>
					<p>This user has opted out of showing their data on Circles Front Page</p>
					<a href={`https://osu.ppy.sh/users/${id}`}>Open profile page on osu!website</a>
				</div>
				<div className="badgeContainer">{printRoles()}</div>
			</div>
			<div className="quickInfo"></div>
		</div>
	);
};

export default OptoutPage;

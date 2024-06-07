import { Team } from "../../types/Team";
import TeamCardSmall from "../mainPage/TeamCardSmall";
interface Props {
	team: Team;
	noColor?: boolean;
}

const TeamLink = ({ team, noColor }: Props) => {
	return (
		<a
			href={`/#/team/${team.id}`}
			style={{
				position: "relative",
				textDecoration: noColor ? "none" : "unset",
				color: noColor ? "var(--text)" : "var(--cfp-accent)",
			}}
		>
			{team.title}
			<TeamCardSmall team={team} />
		</a>
	);
};

export default TeamLink;

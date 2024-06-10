import { LuPencil } from "react-icons/lu";

import { PlayerLite } from "../../types/Player";

import PlayerCardSmall from "../mainPage/PlayerCardSmall";
import MatchLong from "../tourneyPage/Schedule/MatchLong";
import DateConverter from "../../functions/DateConverter";
import MatchLongResult from "../tourneyPage/Results/MatchLongResult";
import PlayerLink from "../universal/PlayerLink";
import { Team } from "../../types/Team";
import { useEffect, useState } from "react";
interface Props {
	team: Team;
}

const TeamProfile = ({ team }: Props) => {
	const [user, setUser] = useState<PlayerLite | null>(null);
	const drawcontent = (which: "results" | "schedule") => {
		if (!team.matches) return;
		const sortedMatches = [...team.matches].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
		const matchesByDate: { [key: string]: JSX.Element[] } = {};

		sortedMatches.forEach((match) => {
			if (new Date(match.timestamp) < new Date(Date.now()) && which == "results") {
				const date = DateConverter(new Date(match.timestamp), "W MM DD") as string;
				if (!matchesByDate[date]) {
					matchesByDate[date] = [];
				}
				matchesByDate[date].push(<MatchLongResult key={match.id} match={match} />);
			} else if (new Date(match.timestamp) > new Date(Date.now()) && which == "schedule") {
				const date = DateConverter(new Date(match.timestamp), "W MM DD") as string;
				if (!matchesByDate[date]) {
					matchesByDate[date] = [];
				}
				matchesByDate[date].push(<MatchLong key={match.id} match={match} />);
			}
		});

		const groupsToRender = Object.keys(matchesByDate).map((date) => (
			<div key={date} className="date-group">
				<h2>{date}</h2>
				{matchesByDate[date]}
			</div>
		));

		return groupsToRender;
	};
	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/session`, {
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.isLoggedIn) {
					setUser(data.user);
				}
			});
	}, []);
	return (
		<div className="profilePageThe2st">
			<div className="teamProfilePlayersSegment">
				{team.players.map((player: PlayerLite) => (
					<a href={`/#/profile/${player.id}`}>
						<img src={player.avatar_url} alt="" />
						<p>{player.username}</p>
						<PlayerCardSmall player={player} height="10em" />
					</a>
				))}
			</div>
			<div style={{ display: "flex", gap: "1em" }}>
				<img src={`${import.meta.env.VITE_API_URL}${team.logo}`} alt="" className="TeamPageLogo" />
				<div>
					<h1>{team.title}</h1>
					<p>
						Leader: <PlayerLink user={team.leader} />
					</p>
					{(user?.cfp.roles.DEV || (user && user.id == team.leader.id)) && (
						<div className="teamProfileEditButton">
							<a href={`/#/team/${team.id}?edit=true`}>
								<LuPencil />
							</a>
						</div>
					)}
				</div>
			</div>
			<div>
				<h2>Upcoming matches </h2>
				<div>{drawcontent("schedule")}</div>
			</div>
			<div>
				<h2>Recent matches</h2>
				<div>{drawcontent("results")}</div>
			</div>
			<div>
				<h2>Stats</h2>
				<div>stats page coming soon</div>
			</div>
		</div>
	);
};

export default TeamProfile;

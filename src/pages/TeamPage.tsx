import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";

import { Team } from "../types/Team";

interface Props {
	teamid?: number;
}
const TeamPage = ({ teamid }: Props) => {
	const { id } = useParams<{ id: string }>();
	const [team, setTeam] = useState<any | Team>(null);
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		try {
			fetch(`${import.meta.env.VITE_API_URL}/team/${id}`, {
				credentials: "include",
			})
				.then((response) => response.json())
				.then((data) => {
					setTeam(data as Team);
					setLoading(false);
				})
				.catch((error) => {
					console.error("Error fetching user data:", error);
					setLoading(false);
				});
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	}, []);

	if (loading) {
		return (
			<div className="profilePage">
				<div className="profilePageThe2st">
					<div>Loading...</div>
				</div>
			</div>
		);
	}
	if (!team) {
		return (
			<div className="profilePage">
				<div className="profilePageThe2st">
					<div className="userCardFull">
						<div>
							team not found, or you are not logged in. <a href="https://osu.ppy.sh/docs/#get-user">osu!api requires a token to get information about players</a>. Circles Front Page will cache this team's profile when someone who is logged in opens it.
						</div>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="profilePage">
			<div className="profilePageThe2st" style={{ backgroundColor: "var(--cfp-bg-secondary)", padding: "1em" }}>
				<h1>This is a page for {team.title}</h1>
			</div>
			{/* <UserInfo /> */}
		</div>
	);
};

export default TeamPage;

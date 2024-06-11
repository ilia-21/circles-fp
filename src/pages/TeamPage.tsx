import { useEffect, useState } from "react";

import { useParams, useSearchParams } from "react-router-dom";
import "./Profile.css";
import "./TeamProfile.css";

import { Team } from "../types/Team";

import ErrorPage from "./ErrorPage";

import TeamProfile from "../components/teamPage/TeamProfile";
import TeamEditor from "../components/teamPage/TeamEditor";
import randomLoadingMessage from "../functions/loadingMessages";

const TeamPage = () => {
	const [queryParameters] = useSearchParams();
	const { id } = useParams<{ id: string }>();
	const edit = queryParameters.get("edit");
	const [team, setTeam] = useState<any | Team>(null);
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		const fetchOneTeam = async () => {
			try {
				await fetch(`${import.meta.env.VITE_API_URL}/team/${id}?matches=true&leader=true`, {
					headers: {
						"x-api-key": import.meta.env.VITE_API_KEY,
					},
					credentials: "include",
				})
					.then((response) => response.json())
					.then((data) => {
						setTeam(data as Team);
					})
					.catch((error) => {
						console.error("Error fetching team data:", error);
					});
			} catch (e) {
				console.log(e);
			} finally {
				setLoading(false);
			}
		};
		fetchOneTeam();
	}, [id]);

	if (loading) {
		return (
			<div className="profilePage">
				<div className="profilePageThe2st">
					<h1>{randomLoadingMessage()}</h1>
				</div>
			</div>
		);
	} else if (!team) {
		return (
			<div className="profilePage">
				<ErrorPage />
			</div>
		);
	}

	return <div className="profilePage">{edit ? <TeamEditor team={team} /> : <TeamProfile team={team} />}</div>;
};

export default TeamPage;

import { useParams } from "react-router-dom";
import UserCardFull from "../components/ProfilePage/UserCardFull";
import UserInfo from "../components/ProfilePage/UserInfo";
import "./Profile.css";
import Bannertop from "../components/universal/Bannertop";
import OptoutPage from "../components/ProfilePage/OptoutPage";
import randomLoadingMessage from "../functions/loadingMessages";
import { useQuery } from "@tanstack/react-query";
import setEmbed from "../functions/DiscordEmbedMabager";
import { Player } from "../types/Player";
import ErrorPage from "./ErrorPage";

const fetchProfileData = async (uid: string | undefined) => {
	console.log("called", uid);
	const queryUrl = uid ? `${import.meta.env.VITE_API_URL}/user/${uid}?full=true` : `${import.meta.env.VITE_API_URL}/api/session`;
	const response = await fetch(queryUrl, {
		credentials: "include",
	});
	if (!response.ok) {
		throw new Error(`Error fetching data: ${response.statusText}`);
	}
	let data = await response.json();
	if (!uid) data = data.user;
	return data as Player;
};

const Profile = () => {
	const { uid } = useParams<{ uid: string }>();
	const {
		isLoading,
		error,
		data: user,
	} = useQuery({
		queryKey: ["profileData", uid || localStorage.getItem("localuserID")],
		queryFn: () => fetchProfileData(uid),
	});

	if (isLoading) {
		return (
			<div className="profilePage">
				<div className="profilePageThe2st">
					<div>{randomLoadingMessage()}</div>
				</div>
			</div>
		);
	}
	if (error) {
		return (
			<div className="profilePage">
				<div className="profilePageThe2st">
					<div className="userCardFull">
						<div>
							User not found, or you are not logged in. <a href="https://osu.ppy.sh/docs/#get-user">osu!api requires a token to get information about players</a>. Circles Front Page will cache this user's profile when someone who is logged in opens it.
						</div>
					</div>
				</div>
			</div>
		);
	}
	user && (document.title = `CFP: ${user.username}'s profile`);
	user && setEmbed(`${user.username}'s profile`, `Check out ${user.username}'s stats, recent and upcoming matches, on Circles Front Page!`, user.cover.custom_url || undefined);
	if (user?.optout) {
		return (
			<div className="profilePage">
				<div className="profilePageThe2st">
					<OptoutPage id={Number(uid)} />
				</div>
			</div>
		);
	}
	if (!user) return <ErrorPage />;
	return (
		<div className="profilePage">
			<Bannertop banner={user.cover_url} />

			<div className="profilePageThe2st">
				<UserCardFull user={user} />
				<UserInfo id={user.id} />
			</div>
		</div>
	);
};

export default Profile;

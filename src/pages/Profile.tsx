import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserCardFull from "../components/ProfilePage/UserCardFull";
import UserInfo from "../components/ProfilePage/UserInfo";
import "./Profile.css";
import Bannertop from "../components/ProfilePage/Bannertop";

interface Props {
	loggedInUser?: any;
}
const Profile = ({ loggedInUser }: Props) => {
	const { uid } = useParams<{ uid: string }>();
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		const id = uid || loggedInUser?.id;
		if (id) {
			fetch(`http://localhost:3000/user/${id}`, {
				credentials: "include",
			})
				.then((response) => response.json())
				.then((data) => {
					setUser(data);
					setLoading(false);
				})
				.catch((error) => {
					console.error("Error fetching user data:", error);
					setLoading(false);
				});
		} else if (loggedInUser) {
			setUser(loggedInUser);
			setLoading(false);
		} else {
			setLoading(false);
		}
	}, [uid, loggedInUser]);

	if (loading) {
		return (
			<div className="profilePage">
				<div>Loading...</div>
			</div>
		);
	}
	if (!user) {
		return (
			<div className="profilePage">
				<div>User not found.</div>
			</div>
		);
	}
	return (
		<div className="profilePage">
			<Bannertop banner={user.cover_url} />

			<div className="profilePageThe2st">
				<UserCardFull username={user.username} avatar={user.avatar_url} roles={user.cfp.roles} country={user.country.name} />
				<UserInfo id={user.id} />
			</div>
			{/* <UserInfo /> */}
		</div>
	);
};

export default Profile;

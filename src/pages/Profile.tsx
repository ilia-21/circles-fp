import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserCardFull from "../components/ProfilePage/UserCardFull";
import UserInfo from "../components/ProfilePage/UserInfo";
import "./Profile.css";
import Bannertop from "../components/ProfilePage/Bannertop";
import OptoutPage from "../components/ProfilePage/OptoutPage";

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
			fetch(`http://${import.meta.env.VITE_API_URL}/user/${id}`, {
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
				<div className="profilePageThe2st">
					<div>Loading...</div>
				</div>
			</div>
		);
	}
	if (!user) {
		return (
			<div className="profilePage">
				<div className="profilePageThe2st">
					<div>User not found.</div>
				</div>
			</div>
		);
	}
	if (user.optout) {
		return (
			<div className="profilePage">
				<div className="profilePageThe2st">
					<OptoutPage id={uid || loggedInUser?.id} />
				</div>
			</div>
		);
	}
	return (
		<div className="profilePage">
			<Bannertop banner={user.cover_url} />

			<div className="profilePageThe2st">
				<UserCardFull user={user} />
				<UserInfo id={user.id} />
			</div>
			{/* <UserInfo /> */}
		</div>
	);
};

export default Profile;

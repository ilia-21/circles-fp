import { BsFloppy } from "react-icons/bs";
import { PlayerLite } from "../../types/Player";
import { Team } from "../../types/Team";
import PlayerCardSmall from "../mainPage/PlayerCardSmall";
import PlayerLink from "../universal/PlayerLink";
import { useEffect, useState } from "react";
import ErrorPage from "../../pages/ErrorPage";
import "../universal/MinimalInput.css";
import GetPlayer from "../../functions/GetPlayer";
import genRanHex from "../../functions/GetRanHex";
import randomLoadingMessage from "../../functions/loadingMessages";

interface Props {
	team: Team;
}

const TeamEditor = ({ team }: Props) => {
	const [leader, setLeader] = useState<PlayerLite | null>(team.leader);
	const [user, setUser] = useState<PlayerLite | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [teamData, setTeamData] = useState<{ id: number; title?: string; leader?: number; logo?: string }>({ id: team.id, title: team.title, leader: team.leader.id });
	const [logoPreview, setLogoPreview] = useState<string | null>(`${import.meta.env.VITE_API_URL}${team.logo}`);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	useEffect(() => {
		const fetchSession = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/api/session`, {
					credentials: "include",
				});
				const data = await response.json();
				if (data.isLoggedIn) {
					setUser(data.user);
					setLoading(false);
				} else {
					setUser(data.user);
				}
			} catch (error) {
				console.error("Error fetching session data:", error);
			}
		};

		fetchSession();
	}, []);

	if (loading) {
		return <h1>{randomLoadingMessage()}</h1>;
	}
	// @ts-ignore: Object is possibly 'null'.
	if (!user && !loading && !user.cfp.roles.DEV && user && user.id != team.leader.id) {
		return <ErrorPage error={[401, "You are not supposed to be here"]} />;
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTeamData((prevData) => ({
			...prevData,
			[e.target.id]: e.target.value,
		}));
	};

	const handleBlur = async () => {
		if (teamData.leader) {
			try {
				const player = await GetPlayer(Number(teamData.leader));
				setLeader(player);
			} catch (error) {
				console.error("Error fetching player data:", error);
			}
		}
	};

	const handleSave = async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/edit/team/${team.id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": import.meta.env.VITE_API_KEY,
				},
				credentials: "include",
				body: JSON.stringify(teamData),
			});

			if (!response.ok) {
				throw new Error(`Error saving data: ${response.statusText}`);
			}

			setSuccess("Team updated");
		} catch (error) {
			console.error("Error saving data:", error);
		}
	};

	const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];

			if (selectedFile.size > 9 * 1024 * 1024) {
				setError("File size should be less than 9 MB");
				return;
			}

			const reader = new FileReader();

			reader.onloadend = () => {
				const base64String = reader.result as string;

				const img = new Image();
				img.onload = () => {
					if (img.width > 512 || img.height > 512) {
						setError("Image dimensions should not exceed 512x512 pixels");
					} else {
						setLogoPreview(base64String);
						setTeamData((prevData) => ({
							...prevData,
							logo: base64String,
						}));
						setError(null);
					}
				};
				img.src = base64String;
			};

			reader.readAsDataURL(selectedFile);
		}
	};

	return (
		<div className="profilePageThe2st">
			{error && <p style={{ color: "var(--red)" }}>{error}</p>}
			{success && <p style={{ color: "var(--green)" }}>{success}</p>}
			<div className="teamProfilePlayersSegment">
				{team.players.map((player: PlayerLite) => (
					<a key={player.id + genRanHex(4)} href={`/#/profile/${player.id}`}>
						<img src={player.avatar_url} alt="" />
						<p>{player.username}</p>
						<PlayerCardSmall player={player} height="10em" />
					</a>
				))}
			</div>
			<div style={{ display: "flex", gap: "1em" }}>
				<img className="TeamPageLogo" src={logoPreview || ""} onClick={() => document.getElementById("logoInput")?.click()} style={{ cursor: "pointer" }} />
				<input id="logoInput" type="file" accept="image/*" style={{ display: "none" }} onChange={handleLogoChange} />
				<div>
					<input className="minimalInput" type="text" id="title" value={teamData.title} onChange={handleInputChange} style={{ fontSize: "2em", fontWeight: "bold" }} />
					<p>
						Leader: <input className="minimalInput" type="text" id="leader" value={teamData.leader || ""} onChange={handleInputChange} onBlur={handleBlur} /> (<PlayerLink user={leader as PlayerLite} />)
					</p>
					<p>
						Plase make sure that your logo is not violating any <a href="/#/info/image-guidelines">image rules</a>, before you click save
					</p>
					<div className="teamProfileEditButton" onClick={handleSave}>
						<BsFloppy />
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeamEditor;

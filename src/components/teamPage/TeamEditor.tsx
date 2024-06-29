import { BsFloppy } from "react-icons/bs";
import { PlayerLite } from "../../types/Player";
import { Team } from "../../types/Team";
import PlayerCardSmall from "../mainPage/PlayerCardSmall";
import PlayerLink from "../universal/PlayerLink";
import { useState } from "react";
import ErrorPage from "../../pages/ErrorPage";
import "../universal/universal.css";
import GetPlayer from "../../functions/GetPlayer";
import genRanHex from "../../functions/GetRanHex";
import randomLoadingMessage from "../../functions/loadingMessages";
import IsEditor from "../../functions/IsEditor";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface Props {
	team: Team;
}

const TeamEditor = ({ team }: Props) => {
	const [leader, setLeader] = useState<PlayerLite | null>(team.leader);
	const [teamData, setTeamData] = useState<{ id: number; title?: string; leader?: number; logo?: string }>({ id: team.id, title: team.title, leader: team.leader.id });
	const [logoPreview, setLogoPreview] = useState<string | null>(`${team.logo}`);
	const { isPending: loading, data: user } = useQuery({
		queryKey: ["userData"],
		queryFn: () =>
			fetch(`${import.meta.env.VITE_API_URL}/api/session`, {
				credentials: "include",
			}).then((response) => response.json()),
	});

	if (loading) {
		return <h1>{randomLoadingMessage()}</h1>;
	}
	// @ts-ignore: Object is possibly 'null'.
	if (!user && !loading && !IsEditor({ key: user.id, condition: "equals", value: team.leader.id }, user)) {
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
				const player = await GetPlayer(Number(teamData.leader), "lite");
				setLeader(player);
			} catch (error) {
				console.error("Error fetching player data:", error);
			}
		}
	};

	const handleSave = async () => {
		// I may have to add comments because returning to this I don't understand a single thing
		try {
			// POSTing edited data to the api
			const response = await toast.promise(
				fetch(`${import.meta.env.VITE_API_URL}/edit/team/${team.id}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"x-api-key": import.meta.env.VITE_API_KEY,
					},
					credentials: "include",
					body: JSON.stringify(teamData),
				}),
				{
					pending: "Updating...",
					success: "Team upadted successfully",
					error: "Error while updating team",
				}
			);
			if (response.status == 401) {
				window.open("https://c.tenor.com/5laBYESlyu8AAAAC/tenor.gif", "_self");
			}
			if (!response.ok) {
				throw new Error(`Error saving data: ${response.statusText}`);
			}
		} catch (error) {
			console.error("Error saving data:", error);
		}
	};

	const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// This gets called every time the logo changes
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];

			if (selectedFile.size > 9 * 1024 * 1024) {
				// Check if logo is bigger than 9 MB
				toast.error("File size should be less than 9 MB");
				return;
			}
			// Thing to read buffer from image
			const reader = new FileReader();

			reader.onloadend = () => {
				const base64String = reader.result as string;

				const img = new Image();
				// This gets called every time img.src changes
				img.onload = () => {
					if (img.width > 512 || img.height > 512) {
						// Check file resolution
						toast.error("Image dimensions should not exceed 512x512 pixels");
					} else {
						// Changing src of the preview
						setLogoPreview(base64String);
						// Changing data, that's gonna be sent to the API
						setTeamData((prevData) => ({
							...prevData,
							logo: base64String,
						}));
					}
				};
				img.src = base64String;
			};

			reader.readAsDataURL(selectedFile);
		}
	};

	return (
		<div className="profilePageThe2st">
			<div className="teamProfilePlayersSegment">
				{team.players.map((player: PlayerLite) => (
					<a key={player.id + genRanHex(4)} style={{ flex: `1 0 calc(${100 / Math.ceil(team.players.length / 2)}% - 10px)` }} href={`/#/profile/${player.id}`}>
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
					<input className="minimalisticInput" type="text" id="title" value={teamData.title} onChange={handleInputChange} style={{ fontSize: "2em", fontWeight: "bold" }} />
					<p>
						Leader: <input className="minimalisticInput" type="text" id="leader" value={teamData.leader || ""} onChange={handleInputChange} onBlur={handleBlur} /> (<PlayerLink user={leader as PlayerLite} />)
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

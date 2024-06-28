import { useQuery } from "@tanstack/react-query";
import ParseMarkdown from "./ParseMarkdown";
import PlayerLink from "./PlayerLink";
import "./Announcement.css";
import { BsEyeSlash } from "react-icons/bs";

const Announcement = () => {
	const { data } = useQuery({
		queryKey: ["announcement"],
		queryFn: () =>
			fetch(`${import.meta.env.VITE_API_URL}/announcement`, {
				credentials: "include",
			}).then((response) => response.json()),
		staleTime: 0,
		retry: false,
	});
	const closeAnnouncement = () => {
		localStorage.setItem("lastAnnouncementSeen", data.timestamp);
		document.getElementById("announcement-container")?.remove();
	};
	const stored = localStorage.getItem("lastAnnouncementSeen");
	if (data && (!stored || new Date(stored) < new Date(data.timestamp))) {
		return (
			<div className="announcement-container" id="announcement-container">
				<div>
					<div className="announcement-toolbar">
						<h1>Announcement</h1>
						<BsEyeSlash onClick={closeAnnouncement} color="white" style={{ fontSize: "2em", cursor: "pointer" }} />
					</div>
					{data && <ParseMarkdown text={data.text} />}
					<div style={{ display: "flex", justifyContent: "end", alignItems: "center", gap: "0.5em", width: "90%" }}>
						<p>Announced by: </p>
						{data && <PlayerLink userid={data.author} pfp />}
					</div>
				</div>
			</div>
		);
	}
};

export default Announcement;

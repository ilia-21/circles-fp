import { Tourney } from "../../types/Tourney";
import { useState, useEffect } from "react";
import PlayerLink from "../universal/PlayerLink";
import { CiWarning } from "react-icons/ci";
import Tooltip from "../universal/Tooltip";
import ParseMarkdown from "../universal/ParseMarkdown";
import { PlayerLite } from "../../types/Player";
import GetPlayer from "../../functions/GetPlayer";

interface Props {
	tourney: Tourney;
	setTourneyData: (tourney: Tourney) => void;
}

const MainDetails = ({ tourney, setTourneyData }: Props) => {
	const [localTourneyData, setLocalTourneyData] = useState<Tourney>(tourney);
	const [host, setHost] = useState<PlayerLite>(tourney.host);
	const [descriptionTab, setDescriptionTab] = useState<"edit" | "preview">("preview");

	useEffect(() => {
		setLocalTourneyData(tourney);
	}, [tourney]);
	const updateHost = async () => {
		setHost(await GetPlayer(localTourneyData.host.id));
	};
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		const { id, value } = e.target;
		const updatedTourney = { ...localTourneyData, [id]: value };
		setLocalTourneyData(updatedTourney);
		setTourneyData(updatedTourney);
	};

	const handleHostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const updatedHost = { ...localTourneyData.host, id: Number(value) };
		const updatedTourney = { ...localTourneyData, host: updatedHost };
		setLocalTourneyData(updatedTourney);
		setTourneyData(updatedTourney);
	};

	const handleInputDataChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		const { id, value } = e.target;
		const dataId = id.replace("data.", "");
		const updatedData = { ...localTourneyData.data, [dataId]: value };
		const updatedTourney = { ...localTourneyData, data: updatedData };
		setLocalTourneyData(updatedTourney);
		setTourneyData(updatedTourney);
	};
	const handleTypeChange = (type: "1v1" | "team") => {
		const updatedData = { ...localTourneyData.data, type: type, participants: [] };
		const updatedTourney = { ...localTourneyData, data: updatedData };
		setLocalTourneyData(updatedTourney);
		setTourneyData(updatedTourney);
	};
	const textAreaAdjust = (element: HTMLTextAreaElement) => {
		element.style.height = element.rows * 5 + "em";
	};

	return (
		<div>
			<input className="minimalisticInput" id="title" value={localTourneyData.title} onChange={handleInputChange} style={{ fontSize: "2em", fontWeight: "bold" }} />
			<div className="TourneyEditor-MainDetails-Line">
				<p>Prize:</p>
				<input className="minimalisticInput" id="data.prize" value={localTourneyData.data.prize} onChange={handleInputDataChange} />
			</div>
			<div className="TourneyEditor-MainDetails-Line">
				<p>Host:</p>
				<input className="minimalisticInput" id="host" value={localTourneyData.host.id} onChange={handleHostChange} onBlur={updateHost} />
				<PlayerLink user={host} />
				<CiWarning style={{ color: "var(--red)" }} />
				<Tooltip content={"Be careful! Changing this may revoke your right to edit the tournament."} />
			</div>
			<div className="TourneyEditor-MainDetails-Line" style={{ margin: "1em 0" }}>
				<p>Type:</p>
				<div className="toggler">
					<span className={tourney.data.type == "1v1" ? "selected" : "unselected"} onClick={() => handleTypeChange("1v1")}>
						1v1
					</span>
					<span className={tourney.data.type == "team" ? "selected" : "unselected"} onClick={() => handleTypeChange("team")}>
						Team
					</span>
				</div>
				<Tooltip content={"Be careful! Changing this will erase all current participants."} />
			</div>
			<div className="TourneyEditor-MainDetails-Line" style={{ display: "block", width: "99%" }}>
				<p>Description (supports markdown!):</p>
				<textarea
					style={{ display: descriptionTab == "preview" ? "none" : "block", width: "100%" }}
					className="minimalisticTextarea"
					id="data.description"
					value={localTourneyData.data.description}
					onBlur={() => {
						setDescriptionTab("preview");
					}}
					onChange={handleInputDataChange}
				/>
				<div
					style={{ display: descriptionTab == "preview" ? "block" : "none" }}
					onClick={() => {
						setDescriptionTab("edit");
						const el = document.getElementById("data.description") as HTMLTextAreaElement;
						el && textAreaAdjust(el);
						setTimeout(() => {
							el && el.focus();
						}, 10);
					}}
				>
					<ParseMarkdown text={localTourneyData.data.description} />
				</div>
			</div>
		</div>
	);
};
export default MainDetails;

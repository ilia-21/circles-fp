import { Tourney } from "../../types/Tourney";
import { useState, useEffect } from "react";
import PlayerLink from "../universal/PlayerLink";
import { CiWarning } from "react-icons/ci";
import Tooltip from "../universal/Tooltip";
import ParseMarkdown from "../universal/ParseMarkdown";
import { PlayerLite } from "../../types/Player";
import GetPlayer from "../../functions/GetPlayer";
import DateConverter from "../../functions/DateConverter";
import { convertTime, getTimeZone } from "../../functions/TimeOperations";

interface Props {
	tourney: Tourney;
	setTourneyData: (tourney: Tourney) => void;
}
const MainDetails = ({ tourney, setTourneyData }: Props) => {
	const [localTourneyData, setLocalTourneyData] = useState<Tourney>(tourney);
	const [host, setHost] = useState<PlayerLite>(tourney.host);
	const [descriptionTab, setDescriptionTab] = useState<"edit" | "preview">("preview");
	const [startTimestamp, setStartTimestamp] = useState<string[] | null>(convertTime(tourney.data.date.start) || null);
	const [endTimestamp, setEndTimestamp] = useState<string[] | null>(convertTime(tourney.data.date.end) || null);

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
	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, timestamp: "start" | "end") => {
		const index = e.target.name == "date" ? 0 : 1;
		const ts = timestamp == "start" ? startTimestamp : endTimestamp;
		const newTimestamp = [...(ts as string[])];
		if (index === 0) {
			newTimestamp[0] = `${e.target.value.length <= 0 ? "1970-07-27" : e.target.value}T`;
		} else {
			newTimestamp[1] = `${e.target.value.length <= 0 ? "07:27" : e.target.value}${getTimeZone()}`;
		}
		if (timestamp == "start") {
			setStartTimestamp(newTimestamp);
		} else {
			setEndTimestamp(newTimestamp);
		}
		const string = timestamp == "start" ? "datestart" : "dateend";

		const time = newTimestamp.join("");
		const updatedData = { ...localTourneyData.data, date: { ...localTourneyData.data.date, [timestamp]: time } };
		const updatedTourney = { ...localTourneyData, data: updatedData, [string]: time };
		setLocalTourneyData(updatedTourney);
		setTourneyData(updatedTourney);
	};
	const textAreaAdjust = (element: HTMLTextAreaElement) => {
		element.style.height = element.rows * 5 + "em";
	};
	const drawDatePicker = (timestamp: "start" | "end") => {
		const ts = timestamp == "start" ? startTimestamp : endTimestamp;
		//@ts-ignore
		const d = (DateConverter(new Date(ts.join("")), "DD/MM/YYYY") as string).split("/");
		const date = `${d[2]}-${d[1]}-${d[0]}`;
		//@ts-ignore
		const time = DateConverter(new Date(ts.join("")), "HH:MM 24");
		return (
			<div style={{ display: "flex", gap: "1em" }}>
				<input
					type="date"
					name="date"
					id=""
					value={date}
					className="minimalisticInput"
					onChange={(e) => {
						handleDateChange(e, timestamp);
					}}
				/>
				<input
					type="time"
					name="time"
					id=""
					value={time}
					className="minimalisticInput"
					onChange={(e) => {
						handleDateChange(e, timestamp);
					}}
				/>
			</div>
		);
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
				<input className="minimalisticInput" id="host" value={host.id} onChange={handleHostChange} onBlur={updateHost} />
				<PlayerLink user={host} />
				<CiWarning style={{ color: "var(--red)" }} />
				<Tooltip content={"Be careful! Changing this may revoke your right to edit the tournament."} />
			</div>
			<div className="TourneyEditor-MainDetails-Line">
				<p style={{ width: "15em" }}>Steam link (twitch or youtube):</p>
				<input className="minimalisticInput" id="data.stream" value={localTourneyData.data.stream} onChange={handleInputDataChange} />
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
			<div className="TourneyEditor-MainDetails-Line" style={{ margin: "1em 0" }}>
				<p>Starts:</p>
				{drawDatePicker("start")}
				<Tooltip content={`Tournament start time IN YOUR TIMEZONE (${getTimeZone()}), we'll do the rest :)`} />
			</div>
			<div className="TourneyEditor-MainDetails-Line" style={{ margin: "1em 0" }}>
				<p>Ends:</p>
				{drawDatePicker("end")}
				<Tooltip content={`Tournament end time IN YOUR TIMEZONE (${getTimeZone()}), we'll do the rest :)`} />
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

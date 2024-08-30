import React, { useState, useCallback, useEffect } from "react";
import { CiTrash } from "react-icons/ci";
import { BracketMatch } from "../../types/BracketMatches";
import InputWithSuggestions from "../universal/InputWithSuggestions";
import Tooltip from "../universal/Tooltip";
import DateConverter from "../../functions/DateConverter";
import { convertTime, getTimeZone } from "../../functions/TimeOperations";
import genRanHex from "../../functions/GetRanHex";
import { BsCopy } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa";

interface Props {
	match: BracketMatch;
	matchBracket: "lower" | "upper";
	matchIndex: number;
	removeMatch: (index: number, bracket: "lower" | "upper") => void;
	updateMatch: (index: number, bracket: "lower" | "upper", updatedMatch: BracketMatch) => void;
	allParticipants: string[];
	allMatches: BracketMatch[];
	setMatchesErrored: (error: boolean) => void;
	allPools: string[];
}
const Match: React.FC<Props> = React.memo(({ match, matchBracket, matchIndex, removeMatch, updateMatch, allParticipants, allMatches, setMatchesErrored, allPools }) => {
	const getScore = () => {
		const first = match.participants[0] ? match.participants[0].resultText : "";
		const second = match.participants[1] ? match.participants[1].resultText : "";
		return [first, second] || null;
	};
	const [bracket, setBracket] = useState<"lower" | "upper">(matchBracket);
	const [timestamp, setTimestamp] = useState<string[] | null>(convertTime(match.startTime) || null);
	const [score, setScore] = useState<string[] | null>(getScore());
	const [matchState, setMatchState] = useState<"SCORE_DONE" | "DONE" | "NO_SHOW" | "WALK_OVER" | "NO_PARTY">(match.state);

	const checkIfMatchExists = useCallback(
		(matchId: string) => {
			const found = allMatches.find((m) => m.id === matchId);
			found ? setMatchesErrored(false) : setMatchesErrored(true);
		},
		[allMatches, setMatchesErrored]
	);

	// const checkForMpLink = useCallback(
	// 	(matchId: string) => {
	// 		const found = allMatches.find((m) => m.id === matchId);
	// 		found ? setMatchesErrored(false) : setMatchesErrored(true);
	// 	},
	// 	[allMatches, setMatchesErrored]
	// );
	useEffect(() => {
		updateMatch(matchIndex, bracket, { ...match, state: matchState });
	}, [matchState]);
	const handleInputBlur = useCallback(
		(e: React.FocusEvent<HTMLInputElement>) => {
			const value = e.target.value;
			if (e.target.name.startsWith("participant")) {
				const index = e.target.name.endsWith(".first") ? 0 : 1;
				let updatedParticipants;
				if (!value || value === "TBD") {
					updatedParticipants = [...match.participants];
					updatedParticipants.splice(index, 1);
				} else {
					updatedParticipants = [...match.participants];
					updatedParticipants[index] = { name: value, id: value, resultText: "", status: null };
				}
				const updatedMatch = { ...match, participants: updatedParticipants };
				updateMatch(matchIndex, bracket, updatedMatch);
			} else if (e.target.name.startsWith("score")) {
				const index = e.target.name.endsWith(".first") ? 0 : 1;
				const updatedParticipants = [...match.participants];
				updatedParticipants[index].resultText = value;
				const updatedMatch = { ...match, participants: updatedParticipants };
				updateMatch(matchIndex, bracket, updatedMatch);
			} else if (e.target.name.startsWith("route")) {
				const updatedMatch = { ...match, [e.target.name === "route.win" ? "nextMatchId" : "nextLooserMatchId"]: value };
				updateMatch(matchIndex, bracket, updatedMatch);
			} else if (e.target.name.startsWith("match")) {
				const key = e.target.name.replace("match.", "");
				const updatedMatch = { ...match, [key]: value };
				updateMatch(matchIndex, bracket, updatedMatch);
			} else if (e.target.name.startsWith("time")) {
				const index = e.target.name.endsWith(".date") ? 0 : 1;
				const newTimestamp = [...(timestamp as string[])];
				if (index === 0) {
					newTimestamp[0] = `${value}T`;
				} else {
					newTimestamp[1] = `${value}${getTimeZone()}`;
				}
				setTimestamp(newTimestamp);
				const startTime = newTimestamp.join("");
				if (new Date(startTime) instanceof Date && !isNaN(new Date(startTime).getTime())) {
					const updatedMatch = { ...match, startTime: startTime };
					updateMatch(matchIndex, bracket, updatedMatch);
				}
			}
		},
		[match, matchIndex, bracket, updateMatch, timestamp]
	);

	const drawScoreEditor = () => {
		const localScore = score || ["0", "0"];
		return (
			<div style={{ display: "flex", gap: "0.5em", borderBottom: "1px solid var(--cfp-accent)" }}>
				<input type="text" name="score.first" className="minimalisticInput" inputMode="numeric" value={localScore[0]} onBlur={handleInputBlur} style={{ width: "1em", textAlign: "center", borderBottom: "none" }} onChange={(e) => setScore([e.target.value, localScore[1]])} />
				<p> - </p>
				<input type="text" name="score.second" className="minimalisticInput" inputMode="numeric" value={localScore[1]} onBlur={handleInputBlur} style={{ width: "1em", textAlign: "center", borderBottom: "none" }} onChange={(e) => setScore([localScore[0], e.target.value])} />
			</div>
		);
	};

	const drawDatePicker = () => {
		const d = (DateConverter(new Date(match.startTime), "DD/MM/YYYY") as string).split("/");
		const date = `${d[2]}-${d[1]}-${d[0]}`;
		const time = DateConverter(new Date(match.startTime), "HH:MM 24");
		return (
			<div style={{ display: "flex", gap: "1em" }}>
				<input type="date" name="time.date" id="" value={date} className="minimalisticInput" onChange={handleInputBlur} />
				<input type="time" name="time.time" id="" value={time} className="minimalisticInput" onChange={handleInputBlur} />
			</div>
		);
	};
	return (
		<div className={`TourneyEditor-Match-Container`} id={`match-${match.id}`}>
			<div className="TourneyEditor-Match-Toolbar">
				<p>Match id: {match.id} </p>
				<Tooltip content={`Unique id for this match. Will be used as reference by other matches`} />
				<FaRegCopy
					style={{
						cursor: "pointer",
						color: "var(--cfp-accent)",
					}}
					onClick={(e) => {
						navigator.clipboard.writeText(String(match.id));
					}}
				/>
			</div>
			<div className="TourneyEditor-Matches-Content-Block">
				<InputWithSuggestions value={match.participants[0] ? match.participants[0].name : "TBD"} name="participant.first" onBlur={handleInputBlur} suggestions={allParticipants} inputStyle={{ textAlign: "right", fontSize: "1.25em", width: "100%" }} containerStyle={{ maxWidth: "35%" }} />
				{matchState === "DONE" && drawScoreEditor()}
				<InputWithSuggestions value={match.participants[1] ? match.participants[1].name : "TBD"} name="participant.second" onBlur={handleInputBlur} suggestions={allParticipants} inputStyle={{ fontSize: "1.25em", width: "100%" }} containerStyle={{ maxWidth: "35%" }} />
			</div>
			<div className="TourneyEditor-Matches-Content-Block" style={{ flexDirection: "column" }}>
				<p>Match timestamp</p>
				{drawDatePicker()}
				<Tooltip content={`Date and time if match in YOUR timezone (${getTimeZone()}) We'll convert it for each user :)`} />
			</div>
			<div className="TourneyEditor-Matches-Content-Block">
				<div style={{ flexDirection: "column" }}>
					<p>Match Name</p>
					<input type="text" name="match.name" className="minimalisticInput" value={match.name} onChange={handleInputBlur} />
					<Tooltip content={`Shows under this match in bracket. Can be empty`} />
				</div>
				<div style={{ flexDirection: "column" }}>
					<p>Mp id</p>
					<input type="text" name="match.mpID" className="minimalisticInput" value={match.mpID} onChange={handleInputBlur} />
					<Tooltip content={`An osu mp id, for example in match https://osu.ppy.sh/community/matches/111554331, you should paste 111554331 `} />
				</div>
				<div style={{ flexDirection: "column" }}>
					<p>Tournament stage</p>
					<InputWithSuggestions value={match.tournamentRoundText as string} name="match.tournamentRoundText" onBlur={handleInputBlur} suggestions={allPools} />
					<Tooltip content={`Required for finished matches, stage must have mappool `} />
				</div>
			</div>
			<div className="TourneyEditor-Matches-Content-Block">
				<div>
					<p>Next match for winner: </p>
					<input
						type="text"
						name="route.win"
						className="minimalisticInput"
						value={match.nextMatchId as string}
						onBlur={handleInputBlur}
						onChange={(e) => {
							checkIfMatchExists(e.target.value);
							handleInputBlur(e as unknown as React.FocusEvent<HTMLInputElement>);
						}}
						onFocus={(e) => {
							const winnerMatch = document.getElementById(`match-${e.target.value}`);
							if (winnerMatch) winnerMatch.classList.add("glowing-green");
						}}
						onBlurCapture={(e) => {
							const winnerMatch = document.getElementById(`match-${e.target.value}`);
							if (winnerMatch) winnerMatch.classList.remove("glowing-green");
						}}
					/>
					<Tooltip content={"Winner will advance to match with this id"} />
				</div>
				<div>
					<p>Next match for looser: </p>
					<input
						type="text"
						name="route.loose"
						className="minimalisticInput"
						value={match.nextLooserMatchId as string}
						onBlur={handleInputBlur}
						onChange={(e) => {
							checkIfMatchExists(e.target.value);
							handleInputBlur(e as unknown as React.FocusEvent<HTMLInputElement>);
						}}
						onFocus={(e) => {
							const looserMatch = document.getElementById(`match-${e.target.value}`);
							if (looserMatch) looserMatch.classList.add("glowing-red");
						}}
						onBlurCapture={(e) => {
							const looserMatch = document.getElementById(`match-${e.target.value}`);
							if (looserMatch) looserMatch.classList.remove("glowing-red");
						}}
					/>
					<Tooltip content={`Looser will go to match with this id `} />
				</div>
			</div>
			<div className="TourneyEditor-Match-Footer">
				<div>
					<p>Bracket:</p>
					<div className="toggler">
						<span className={bracket === "upper" ? "selected" : "unselected"} onClick={() => setBracket("upper")}>
							Upper
						</span>
						<span className={bracket === "lower" ? "selected" : "unselected"} onClick={() => setBracket("lower")}>
							Lower
						</span>
					</div>
					<p>Status:</p>
					<div className="toggler">
						<span
							className={matchState === "SCORE_DONE" ? "selected" : "unselected"}
							onClick={() => {
								setMatchState("SCORE_DONE");
								setScore(null);
							}}
						>
							Upcoming
						</span>
						<span
							className={matchState === "DONE" ? "selected" : "unselected"}
							onClick={() => {
								setMatchState("DONE");
								setScore(["0", "0"]);
							}}
						>
							Finished
						</span>
					</div>
				</div>
				<CiTrash className="TourneyEditor-Participants-Block-Delete" onClick={() => removeMatch(matchIndex, bracket)} />
			</div>
		</div>
	);
});

export default Match;

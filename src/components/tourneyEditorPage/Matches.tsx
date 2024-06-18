import { IoMdAdd } from "react-icons/io";
import { Tourney } from "../../types/Tourney";
import { useState, useEffect, useCallback } from "react";
import "./TourneyEditorPage.css";
import Match from "./Match";
import { BracketMatch } from "../../types/BracketMatches";
import { PlayerLite } from "../../types/Player";
import { Team } from "../../types/Team";
import BracketCard from "../tourneyPage/BracketCard";

interface Props {
	tourney: Tourney;
	setTourneyData: (tourney: Tourney) => void;
}

const newMatch: BracketMatch = {
	id: "0",
	name: "Lower Final",
	nextMatchId: "0",
	nextLooserMatchId: "0",
	startTime: "2024-06-04T16:51:14+03:00",
	state: "DONE",
	participants: [
		{
			id: "0",
			resultText: "",
			isWinner: false,
			status: null,
			name: "Player name",
		},
		{
			id: "1",
			resultText: "",
			isWinner: false,
			status: null,
			name: "Player2 name",
		},
	],
};

const Matches = ({ tourney, setTourneyData }: Props) => {
	const [localTourneyData, setLocalTourneyData] = useState<Tourney>(tourney);
	const [allParticipants, setAllParticipants] = useState<string[]>([]);
	const [matchesErrored, setMatchesErrored] = useState<boolean>(false);

	useEffect(() => {
		setLocalTourneyData(tourney);
		updateParticipants();
	}, [tourney]);

	const updateParticipants = useCallback(() => {
		const participants = tourney.data.participants.map((p) => (p.who as PlayerLite).username || (p.who as Team).title);
		setAllParticipants(participants);
	}, [tourney.data.participants]);

	const addBlankMatch = useCallback(
		(br: "upper" | "lower") => {
			const updatedMatch = [...localTourneyData.data.bracket[br], { ...newMatch, id: String(Date.now()) }];
			const updatedBracket = { ...localTourneyData.data.bracket, [br]: updatedMatch };
			const updatedTourneyData = { ...localTourneyData, data: { ...localTourneyData.data, bracket: updatedBracket } };
			setLocalTourneyData(updatedTourneyData);
			setTourneyData(updatedTourneyData);
		},
		[localTourneyData, setTourneyData]
	);

	const removeMatch = useCallback(
		(index: number, bracket: "lower" | "upper") => {
			const updatedMatches = localTourneyData.data.bracket[bracket].filter((_, i) => i !== index);
			const updatedBracket = { ...localTourneyData.data.bracket, [bracket]: updatedMatches };
			const updatedTourneyData = { ...localTourneyData, data: { ...localTourneyData.data, bracket: updatedBracket } };
			setLocalTourneyData(updatedTourneyData);
			setTourneyData(updatedTourneyData);
		},
		[localTourneyData, setTourneyData]
	);

	const updateMatch = useCallback(
		(index: number, bracket: "lower" | "upper", updatedMatch: BracketMatch) => {
			const updatedMatches = { ...localTourneyData.data.bracket, [bracket]: [...localTourneyData.data.bracket[bracket]] };
			updatedMatches[bracket][index] = updatedMatch;
			const updatedTourneyData = { ...localTourneyData, data: { ...localTourneyData.data, bracket: updatedMatches } };
			setLocalTourneyData(updatedTourneyData);
			setTourneyData(updatedTourneyData);
		},
		[localTourneyData, setTourneyData]
	);

	const drawMatches = useCallback(
		(br: "upper" | "lower") => {
			return localTourneyData.data.bracket[br].map((match, i) => <Match key={match.id} matchIndex={i} matchBracket={br} match={match} removeMatch={removeMatch} updateMatch={updateMatch} allParticipants={allParticipants} allMatches={[...tourney.data.bracket.lower, ...tourney.data.bracket.upper]} setMatchesErrored={setMatchesErrored} allPools={tourney.data.pool.map((p) => p.title)} />);
		},
		[localTourneyData.data.bracket, allParticipants, removeMatch, updateMatch]
	);
	const drawIncorrectBlock = () => {
		return (
			<div>
				<p style={{ color: "var(--red)" }}>Your matches are incorrect! Bracket preview is not available</p>
				<p>Click on save tournament to check what is wrong. (Tournament data won't be updated)</p>
			</div>
		);
	};

	return (
		<div className="TourneyEditor-Participants">
			<div style={{ width: "100%" }}>
				<h2>Bracket preview</h2>
				{!matchesErrored ? <BracketCard tourney={localTourneyData} bracketWidth={1000} /> : drawIncorrectBlock()}
			</div>
			<div className="TourneyEditor-Matches-Block">
				<h2 style={{ width: "100%" }}>Upper bracket</h2>
				{localTourneyData.data.bracket.upper && drawMatches("upper")}
				<div className="TourneyEditor-Match-Container empty" onClick={() => addBlankMatch("upper")}>
					<IoMdAdd className="TourneyEditor-Participants-Icon" />
					<p>Add new Match</p>
				</div>
				<h2 style={{ width: "100%" }}>Lower bracket</h2>
				{localTourneyData.data.bracket.lower && drawMatches("lower")}
				<div className="TourneyEditor-Match-Container empty" onClick={() => addBlankMatch("lower")}>
					<IoMdAdd className="TourneyEditor-Participants-Icon" />
					<p>Add new Match</p>
				</div>
			</div>
		</div>
	);
};

export default Matches;

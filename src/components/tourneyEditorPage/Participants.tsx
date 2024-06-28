import { IoMdAdd } from "react-icons/io";
import { Tourney, TourneyParticipant } from "../../types/Tourney";
import { useState, useEffect } from "react";
import "./TourneyEditorPage.css";
import { PlayerLitest } from "../../types/Player";
import Participant from "./Participant";
import GetPlayer from "../../functions/GetPlayer";
import GetTeam from "../../functions/GetTeam";

interface Props {
	tourney: Tourney;
	setTourneyData: (tourney: Tourney) => void;
}

const newParticipant: TourneyParticipant = {
	type: "player",
	why: "Invited",
	who: {
		id: 0,
		username: "New Participant",
		avatar_url: "https://osu.ppy.sh/images/layout/avatar-guest@2x.png",
	} as PlayerLitest,
};

const Participants = ({ tourney, setTourneyData }: Props) => {
	const [localTourneyData, setLocalTourneyData] = useState<Tourney>(tourney);

	useEffect(() => {
		setLocalTourneyData(tourney);
	}, [tourney]);

	const addBlankParticipant = async () => {
		const updatedParticipants = [...localTourneyData.data.participants, newParticipant];
		const updatedTourneyData = { ...localTourneyData, data: { ...localTourneyData.data, participants: updatedParticipants } };
		setLocalTourneyData(updatedTourneyData);
		setTourneyData(updatedTourneyData);
	};

	const removeParticipant = (index: number) => {
		const updatedParticipants = localTourneyData.data.participants.filter((_, i) => i !== index);
		const updatedTourneyData = { ...localTourneyData, data: { ...localTourneyData.data, participants: updatedParticipants } };
		setLocalTourneyData(updatedTourneyData);
		setTourneyData(updatedTourneyData);
	};

	const updateParticipant = (index: number, updatedParticipant: TourneyParticipant) => {
		const updatedParticipants = [...localTourneyData.data.participants];
		updatedParticipants[index] = updatedParticipant;
		const updatedTourneyData = { ...localTourneyData, data: { ...localTourneyData.data, participants: updatedParticipants } };
		setLocalTourneyData(updatedTourneyData);
		setTourneyData(updatedTourneyData);
	};

	const fetchPlayerData = async (index: number, partyId: number) => {
		let playerData;
		if (tourney.data.type == "team") {
			playerData = await GetTeam(partyId);
		} else {
			playerData = await GetPlayer(partyId);
		}
		const updatedParticipant = { ...localTourneyData.data.participants[index], who: playerData };
		updateParticipant(index, updatedParticipant);
	};

	const drawParticipants = () => {
		return localTourneyData.data.participants.map((p, index) => <Participant key={index} index={index} participant={p} removeParticipant={removeParticipant} updateParticipant={updateParticipant} fetchPlayerData={fetchPlayerData} />);
	};

	return (
		<div>
			<h1>Participants</h1>
			<div className="TourneyEditor-Participants">
				{localTourneyData.data.participants && drawParticipants()}
				<div className="TourneyEditor-Participants-Block new" onClick={addBlankParticipant}>
					<IoMdAdd className="TourneyEditor-Participants-Icon" />
					<p>Add new participant</p>
				</div>
			</div>
		</div>
	);
};
export default Participants;

import React, { useState } from "react";
import { CiTrash } from "react-icons/ci";
import Tooltip from "../universal/Tooltip";
import { TourneyParticipant } from "../../types/Tourney";
import { PlayerLitest } from "../../types/Player";

interface Props {
	participant: TourneyParticipant;
	index: number;
	removeParticipant: (index: number) => void;
	updateParticipant: (index: number, updatedParticipant: TourneyParticipant) => void;
	fetchPlayerData: (index: number, playerId: number) => void;
}

const Participant = ({ participant, index, removeParticipant, updateParticipant, fetchPlayerData }: Props) => {
	const [inputValue, setInputValue] = useState<string>(String(participant.who.id));

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		const { name, value } = e.target;
		const updatedParticipant = { ...participant, who: { ...participant.who, [name]: value } };
		updateParticipant(index, updatedParticipant);
	};

	const handleInputBlur = () => {
		const playerId = Number(inputValue);
		if (playerId !== participant.who.id) {
			fetchPlayerData(index, playerId);
		}
	};
	const handleInputPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		setTimeout(() => {
			const playerId = Number(e.target.value);
			if (playerId !== participant.who.id) {
				fetchPlayerData(index, playerId);
			}
		}, 10); // for some reason input element not updates at the exact time of calling the function
	};

	const handleWhyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const updatedParticipant = { ...participant, why: value };
		updateParticipant(index, updatedParticipant);
	};

	return (
		<div className="TourneyEditor-Participants-Container">
			<CiTrash className="TourneyEditor-Participants-Block-Delete" onClick={() => removeParticipant(index)} />
			<div className="TourneyEditor-Participants-Block">
				<input type="text" className="minimalisticInput TourneyEditor-Participants-Id" value={participant.who.id} name="id" onChange={handleInputChange} onBlur={handleInputBlur} onPaste={handleInputPaste} />
				<Tooltip content="Participant's id" height="-12em" />
				<img src={(participant.who as PlayerLitest).avatar_url} className="TourneyEditor-Participants-Avatar" alt="Participant Avatar" />
				<input type="text" className="minimalisticInput" value={(participant.who as PlayerLitest).username} name="username" readOnly />
				<input type="text" className="minimalisticInput" value={participant.why} onChange={handleWhyChange} />
			</div>
		</div>
	);
};

export default Participant;

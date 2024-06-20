import React, { useState } from "react";
import { CiTrash } from "react-icons/ci";
import Tooltip from "../universal/Tooltip";
import { TourneyParticipant } from "../../types/Tourney";
import { PlayerLitest } from "../../types/Player";
import { Team } from "../../types/Team";

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
			const playerId = Number((e.target as HTMLInputElement).value);
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
	const drawParticipantData = () => {
		if ((participant.who as Team).title) {
			return (
				<div className="TourneyEditor-Participants-Block">
					<img src={(participant.who as Team).logo} className="TourneyEditor-Participants-Avatar" alt="Participant Avatar" />
					<input type="text" className="minimalisticInput" value={(participant.who as Team).title} name="username" readOnly style={{ textAlign: "center" }} />
					<input type="text" className="minimalisticInput" value={participant.why} onChange={handleWhyChange} style={{ textAlign: "center" }} />
				</div>
			);
		} else {
			return (
				<div className="TourneyEditor-Participants-Block">
					<img src={(participant.who as PlayerLitest).avatar_url} className="TourneyEditor-Participants-Avatar" alt="Participant Avatar" />
					<input type="text" className="minimalisticInput" value={(participant.who as PlayerLitest).username} name="username" readOnly style={{ textAlign: "center" }} />
					<input type="text" className="minimalisticInput" value={participant.why} onChange={handleWhyChange} style={{ textAlign: "center" }} />
				</div>
			);
		}
	};

	return (
		<div className="TourneyEditor-Participants-Container">
			<div className="TourneyEditor-Participants-Container-Toolbar">
				<input value={participant.who.id} className="minimalisticInput" name="id" onChange={handleInputChange} onBlur={handleInputBlur} onPaste={handleInputPaste} style={{ width: "7em" }} />
				<CiTrash className="TourneyEditor-Participants-Block-Delete" onClick={() => removeParticipant(index)} />
				<Tooltip content="Participant's id" />
			</div>
			{drawParticipantData()}
		</div>
	);
};

export default Participant;

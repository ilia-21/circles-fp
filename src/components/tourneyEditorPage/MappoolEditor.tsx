import { IoMdAdd } from "react-icons/io";
import { Tourney, TourneyMappool } from "../../types/Tourney";
import { useState, useEffect } from "react";
import "./TourneyEditorPage.css";
import Mappool from "./Mappool";

interface Props {
	tourney: Tourney;
	setTourneyData: (tourney: Tourney) => void;
}

const newPool: TourneyMappool = {
	title: "New mappool",
	maps: [],
};

const MappoolEditor = ({ tourney, setTourneyData }: Props) => {
	const [localTourneyData, setLocalTourneyData] = useState<Tourney>(tourney);

	useEffect(() => {
		setLocalTourneyData(tourney);
	}, [tourney]);

	const addBlankPool = async () => {
		const updatedPools = [...localTourneyData.data.pool, newPool];
		const updatedTourneyData = { ...localTourneyData, data: { ...localTourneyData.data, pool: updatedPools } };
		setLocalTourneyData(updatedTourneyData);
		setTourneyData(updatedTourneyData);
	};

	const removePool = (index: number) => {
		const updatedPools = localTourneyData.data.pool.filter((_, i) => i !== index);
		const updatedTourneyData = { ...localTourneyData, data: { ...localTourneyData.data, pool: updatedPools } };
		setLocalTourneyData(updatedTourneyData);
		setTourneyData(updatedTourneyData);
	};

	const updatePool = (index: number, updatedPool: TourneyMappool) => {
		const updatedPools = [...localTourneyData.data.pool];
		updatedPools[index] = updatedPool;
		const updatedTourneyData = { ...localTourneyData, data: { ...localTourneyData.data, pool: updatedPools } };
		setLocalTourneyData(updatedTourneyData);
		setTourneyData(updatedTourneyData);
	};

	const drawPools = () => {
		return localTourneyData.data.pool.map((p, index) => <Mappool key={index} index={index} mapPool={p} removePool={removePool} updatePool={updatePool} />);
	};

	return (
		<div className="TourneyEditor-Mappools">
			{localTourneyData.data.pool && drawPools()}
			<div style={{ display: "flex", alignItems: "center", flexDirection: "column" }} onClick={addBlankPool}>
				<IoMdAdd className="TourneyEditor-Participants-Icon" />
				<p>Add new Pool</p>
			</div>
		</div>
	);
};
export default MappoolEditor;

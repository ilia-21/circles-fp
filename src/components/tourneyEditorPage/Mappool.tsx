import { IoMdAdd } from "react-icons/io";
import { TourneyMappool } from "../../types/Tourney";
import { useState, useEffect } from "react";
import "./TourneyEditorPage.css";
import GetMap from "../../functions/GetMap";
import Map from "./Map";
import { Beatmap, MappoolMod } from "../../types/Beatmap";
import { ModType } from "../../types/Mod";
import { CiTrash } from "react-icons/ci";
import Tooltip from "../universal/Tooltip";

interface Props {
	mapPool: TourneyMappool;
	index: number;
	removePool: (index: number) => void;
	updatePool: (index: number, updatedPool: TourneyMappool) => void;
}
export interface mapsCount {
	NM: number;
	HR: number;
	HD: number;
	DT: number;
	FM: number;
	TB: number;
}
const emptyCounter = { NM: 0, HR: 0, HD: 0, DT: 0, FM: 0, TB: 0 };

const Mappool = ({ mapPool, index, removePool, updatePool }: Props) => {
	const [localPoolData, setLocalPoolData] = useState<TourneyMappool>(mapPool);
	const [poolMapsCounter, setPoolMapsCounter] = useState<mapsCount>(emptyCounter);
	const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);

	const syncPools = (index: number, updatedPool: TourneyMappool) => {
		setLocalPoolData(updatedPool);
		updatePool(index, updatedPool);
	};

	const updatePoolName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const updatedPool = { ...localPoolData, title: e.target.value };
		syncPools(index, updatedPool);
	};

	const addBlankMap = () => {
		const updatedMaps: [number, MappoolMod][] = [...(localPoolData.maps as [number, MappoolMod][]), [0, "NM1"] as [number, MappoolMod]];
		const updatedPool = { ...localPoolData, maps: updatedMaps };
		syncPools(index, updatedPool);
	};

	const removeMap = (mapIndex: number) => {
		const mapMod = (localPoolData.maps[mapIndex] as [number, MappoolMod])[1].slice(0, 2);
		const updatedMaps: [number, MappoolMod][] = (localPoolData.maps as [number, MappoolMod][]).filter((_, i) => i !== mapIndex);
		const updatedPool = { ...localPoolData, maps: updatedMaps };
		const newCounter = { ...poolMapsCounter, [mapMod]: poolMapsCounter[mapMod as ModType] - 1 };
		setPoolMapsCounter(newCounter);
		syncPools(index, updatedPool);
	};

	const updateMap = (mapIndex: number, updatedMap: [number, MappoolMod]) => {
		const oldMod = (localPoolData.maps[mapIndex] as [number, MappoolMod])[1].slice(0, 2);
		const newMod = updatedMap[1].slice(0, 2);

		const updatedMaps: [number, MappoolMod][] = [...(localPoolData.maps as [number, MappoolMod][])];
		updatedMaps[mapIndex] = updatedMap;

		const updatedPool = { ...localPoolData, maps: updatedMaps };
		const newCounter = { ...poolMapsCounter };

		if (oldMod !== newMod) {
			newCounter[oldMod as ModType]--;
			newCounter[newMod as ModType]++;
		}
		setPoolMapsCounter(newCounter);
		syncPools(index, updatedPool);
	};

	const fetchMapData = async (mapId: number) => {
		const mapData = await GetMap(mapId);
		return mapData as Beatmap;
	};

	const drawMaps = () => {
		return localPoolData.maps.map((m, mapIndex) => <Map key={mapIndex} mapInfo={m as [number, MappoolMod]} mapIndex={mapIndex} removeMap={removeMap} updateMap={updateMap} fetchMapData={fetchMapData} poolMapsCounter={poolMapsCounter} setPoolMapsCounter={setPoolMapsCounter} />);
	};

	useEffect(() => {
		const initialCounter = { ...emptyCounter };
		localPoolData.maps.forEach((m) => {
			const mod = (m as [number, MappoolMod])[1].slice(0, 2);
			initialCounter[mod as ModType]++;
		});
		setPoolMapsCounter(initialCounter);
	}, []);

	return (
		<div className="TourneyEditor-Mappool">
			<div className="TourneyEditor-Mappool-Toolbar">
				<input type="text" className="minimalisticInput" value={localPoolData.title} style={{ fontSize: "1.5em" }} onChange={updatePoolName} />
				<div>
					<CiTrash
						className="TourneyEditor-Mappool-Toolbar-Delete"
						onClick={() => {
							if (!deleteConfirm) {
								setDeleteConfirm(!deleteConfirm);
								setTimeout(() => setDeleteConfirm(false), 5000); //revert back in 5 seconds
							} else {
								removePool(index);
							}
						}}
					/>
					{deleteConfirm && <Tooltip content={"Are you sure?"} />}
				</div>
			</div>
			{localPoolData && drawMaps()}
			<div className="TourneyEditor-Map-Container empty" onClick={addBlankMap}>
				<IoMdAdd className="TourneyEditor-Participants-Icon" />
				<div>
					<p>Add new map</p>
				</div>
			</div>
		</div>
	);
};

export default Mappool;

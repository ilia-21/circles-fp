import { IoMdAdd } from "react-icons/io";
import { TourneyMappool } from "../../types/Tourney";
import { useState, useEffect, useCallback } from "react";
import "./TourneyEditorPage.css";
import GetMap from "../../functions/GetMap";
import Map from "./Map";
import { Beatmap, MappoolMod } from "../../types/Beatmap";

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

	const syncPools = (index: number, updatedPool: TourneyMappool) => {
		setLocalPoolData(updatedPool);
		updatePool(index, updatedPool);
	};

	const updatePoolName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const updatedPool = { ...localPoolData, title: e.target.value };
		syncPools(index, updatedPool);
	};

	const addBlankMap = () => {
		const updatedMaps = [...localPoolData.maps, [0, "NM1"] as [number, MappoolMod]];
		const updatedPool = { ...localPoolData, maps: updatedMaps };
		syncPools(index, updatedPool);
	};

	const removeMap = (mapIndex: number) => {
		const mapMod = localPoolData.maps[mapIndex][1].slice(0, 2);
		const updatedMaps = localPoolData.maps.filter((_, i) => i !== mapIndex);
		const updatedPool = { ...localPoolData, maps: updatedMaps };
		const newCounter = { ...poolMapsCounter, [mapMod]: poolMapsCounter[mapMod] - 1 };
		setPoolMapsCounter(newCounter);
		syncPools(index, updatedPool);
	};

	const updateMap = (mapIndex: number, updatedMap: [number, MappoolMod]) => {
		const oldMod = localPoolData.maps[mapIndex][1].slice(0, 2);
		const newMod = updatedMap[1].slice(0, 2);

		const updatedMaps = [...localPoolData.maps];
		updatedMaps[mapIndex] = updatedMap;

		const updatedPool = { ...localPoolData, maps: updatedMaps };
		const newCounter = { ...poolMapsCounter };

		if (oldMod !== newMod) {
			newCounter[oldMod]--;
			newCounter[newMod]++;
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
			const mod = m[1].slice(0, 2);
			initialCounter[mod]++;
		});
		setPoolMapsCounter(initialCounter);
	}, []);

	return (
		<div className="TourneyEditor-Mappool">
			<div style={{ width: "100%" }}>
				<input type="text" className="minimalisticInput" value={localPoolData.title} style={{ fontSize: "1.5em" }} onChange={updatePoolName} />
			</div>
			{localPoolData && drawMaps()}
			<div className="TourneyEditor-Map-Container" onClick={addBlankMap}>
				<IoMdAdd className="TourneyEditor-Participants-Icon" />
				<div>
					<p>Add new map</p>
				</div>
			</div>
		</div>
	);
};

export default Mappool;

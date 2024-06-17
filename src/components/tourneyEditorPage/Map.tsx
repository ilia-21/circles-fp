import React, { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { Beatmap, MappoolMod } from "../../types/Beatmap";
import { mapsCount } from "./Mappool";
import ModApplier from "../../functions/ModApplier";
import { ModType } from "../../types/Mod";

interface Props {
	mapInfo: [number, MappoolMod];
	mapIndex: number;
	removeMap: (index: number) => void;
	updateMap: (index: number, updatedMap: [number, MappoolMod]) => void;
	fetchMapData: (mapId: number) => Promise<Beatmap>;
	poolMapsCounter: mapsCount;
	setPoolMapsCounter: (count: mapsCount) => void;
}

const Map = ({ mapInfo, mapIndex, removeMap, updateMap, fetchMapData, poolMapsCounter, setPoolMapsCounter }: Props) => {
	const [mapData, setMapData] = useState<Beatmap | null>(null);
	const [localMapId, setLocalMapId] = useState<number>(mapInfo[0]);

	const updateMapId = async (e: React.FocusEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		const updatedMap: [number, MappoolMod] = [value, mapInfo[1]];
		updateMap(mapIndex, updatedMap);
		const data = await fetchMapData(value);
		setMapData(data);
	};

	const recountMods = (oldm: string, newm: string) => {
		const oldMod: string = oldm.slice(0, 2);
		const newMod: string = newm.slice(0, 2);
		const localMapsCounter = { ...poolMapsCounter };
		localMapsCounter[oldMod as ModType]--;
		localMapsCounter[newMod as ModType]++;
		setPoolMapsCounter(localMapsCounter);
		return localMapsCounter[newMod as ModType] as number;
	};

	const updateMapMod = (mod: "NM" | "HR" | "HD" | "DT" | "FM" | "TB") => {
		const oldMod = mapInfo[1];
		const newCount = recountMods(oldMod, mod);
		const updatedMap: [number, MappoolMod] = [mapInfo[0], `${mod}${newCount}`];
		updateMap(mapIndex, updatedMap);
	};

	useEffect(() => {
		const fetchAndSetMapData = async () => {
			const data = await fetchMapData(mapInfo[0]);
			const moddedMap = ModApplier(actualMod as "NM" | "HR" | "HD" | "DT" | "FM" | "TB", data as Beatmap);
			setMapData(moddedMap);
		};
		const actualMod = mapInfo[1].slice(0, 2);
		fetchAndSetMapData();
	}, [mapInfo[0], mapInfo[1]]);

	return (
		<div className="TourneyEditor-Map-Container">
			<div className="TourneyEditor-Map-Container-Toolbar">
				<p>{mapInfo[1]}</p>
				<input type="text" inputMode="numeric" className="minimalisticInput" value={localMapId} onChange={(e) => setLocalMapId(Number(e.target.value))} onBlur={updateMapId} />
				<CiTrash className="TourneyEditor-Map-Container-Toolbar-Delete" onClick={() => removeMap(mapIndex)} />
			</div>
			<div>{mapData && mapData.beatmapset && <img src={mapData.beatmapset.covers.card} alt="BeatmapBg" className="TourneyEditor-Map-Container-Image" />}</div>
			<div className="TourneyEditor-Map-Container-Stats">
				<p>AR: {mapData?.ar}</p>
				<p>CS: {mapData?.cs}</p>
				<p>BPM: {mapData?.bpm}</p>
				<p>HP: {mapData?.drain}</p>
				<p>OD: {mapData?.accuracy}</p>
			</div>
			<div className="TourneyEditor-Map-Container-Mods">
				{["NM", "HR", "HD", "DT", "FM", "TB"].map((mod) => (
					<p
						key={mod}
						className={`${mapInfo[1].startsWith(mod) ? "mod-enabled" : "mod-disabled"} TourneyEditor-Map-Mod mod${mod}`}
						onClick={() => {
							updateMapMod(mod as ModType);
						}}
					>
						{mod}
					</p>
				))}
			</div>
		</div>
	);
};

export default Map;

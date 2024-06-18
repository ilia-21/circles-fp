import { useState, useEffect } from "react";
import "./BeatMapCardMed.css";
import { Beatmap } from "../../../types/Beatmap";
import BeatmapMod from "../../universal/BeatmapMod";
import Tooltip from "../../universal/Tooltip";
import ModApplier from "../../../functions/ModApplier";

interface Props {
	map: Beatmap;
}

const BeatMapCardMed = ({ map }: Props) => {
	const [modifiedMap, setModifiedMap] = useState(map);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		const actualMod = map.mod.slice(0, 2);
		const moddedMap = ModApplier(actualMod as "NM" | "HR" | "HD" | "DT" | "FM" | "TB", map);

		setModifiedMap(moddedMap);
	}, [map]);

	const copyMapID = () => {
		navigator.clipboard.writeText(String(map.id));
		setCopied(true);
		setTimeout(() => setCopied(false), 2000); // Revert back after 2 seconds
	};

	let beatmap = modifiedMap.beatmapset;

	return (
		<div className="BeatMapCardMed">
			<h2 className="BeatMapSlot">{map.mod}</h2>
			<img src={beatmap.covers.list} alt="" />
			<div className="BeatMapDataCont">
				<a href={map.url}>
					<p className="BeatMapDataTitle">{beatmap.title}</p>
					<p className="BeatMapDataArtist">{beatmap.artist}</p>
				</a>
				<div className="BeatMapStatsCont">
					<p>AR: {modifiedMap.ar}</p>
					<p>CS: {modifiedMap.cs}</p>
					<p>BPM: {modifiedMap.bpm}</p>
					<p>HP: {modifiedMap.drain}</p>
					<p>OD: {modifiedMap.accuracy}</p>
				</div>
			</div>
			<p className="BeatMapid" onClick={copyMapID}>
				{copied ? "Copied!" : map.id}
				<Tooltip content={"Click to copy"} />
			</p>
			<div className="BeatMapModsCont">
				<BeatmapMod mod={modifiedMap.mod} />
			</div>
		</div>
	);
};

export default BeatMapCardMed;

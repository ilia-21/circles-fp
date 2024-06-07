import React, { useState, useEffect } from "react";
import "./BeatMapCardMed.css";
import { Beatmap } from "../../../types/Beatmap";
import BeatmapMod from "../../universal/BeatmapMod";

interface Props {
	map: Beatmap;
}

const BeatMapCardMed = ({ map }: Props) => {
	const [modifiedMap, setModifiedMap] = useState(map);

	useEffect(() => {
		const actualMod = map.mod.slice(0, 2);

		if (actualMod === "HR" || actualMod === "DT") {
			const hrMultiply = (stat: number, cs?: boolean) => {
				console.log(stat);
				return Math.min(cs ? stat * 1.3 : stat * 1.4, 10);
			};

			const modifiedMapCopy = { ...map };

			switch (actualMod) {
				case "HR":
					modifiedMapCopy.ar = hrMultiply(map.ar);
					modifiedMapCopy.cs = hrMultiply(map.cs, true);
					modifiedMapCopy.drain = hrMultiply(map.drain);
					modifiedMapCopy.accuracy = hrMultiply(map.accuracy);
					break;
				case "DT":
					modifiedMapCopy.bpm *= 1.5;
					break;
			}

			setModifiedMap(modifiedMapCopy);
		}
	}, []);

	let beatmap = modifiedMap.beatmapset;

	return (
		<div className="BeatMapCardMed">
			<h2 className="BeatMapSlot">{map.mod}</h2>
			<img src={beatmap.covers.list} alt="" />
			<div className="BeatMapDataCont">
				<a href={map.url}>
					{beatmap.artist} - {beatmap.title}
				</a>
				<div className="BeatMapStatsCont">
					<p>AR: {modifiedMap.ar}</p>
					<p>CS: {modifiedMap.cs}</p>
					<p>BPM: {modifiedMap.bpm}</p>
					<p>HP: {modifiedMap.drain}</p>
					<p>OD: {modifiedMap.accuracy}</p>
				</div>
			</div>
			<p className="BeatMapid">{map.id}</p>
			<div className="BeatMapModsCont">
				<BeatmapMod mod={modifiedMap.mod} />
			</div>
		</div>
	);
};

export default BeatMapCardMed;

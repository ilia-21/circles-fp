import "./BeatMapCardMed.css";
import { Beatmap } from "../../../types/Beatmap";
import BeatmapMod from "../../universal/BeatmapMod";

interface Props {
	map: Beatmap;
}

const BeatMapCardMed = ({ map }: Props) => {
	let beatmap = map.beatmapset;
	return (
		<div className="BeatMapCardMed">
			<img src={beatmap.covers.list} alt="" />
			<div className="BeatMapDataCont">
				<p>
					{beatmap.artist} - {beatmap.title}
				</p>
				<div className="BeatMapStatsCont">
					<p>AR: {map.ar}</p>
					<p>CS: {map.cs}</p>
					<p>BPM: {map.bpm}</p>
					<p>HP: {map.drain}</p>
					<p>OD: {map.accuracy}</p>
				</div>
			</div>
			<div className="BeatMapModsCont">
				<BeatmapMod mod={map.mod} />
			</div>
		</div>
	);
};

export default BeatMapCardMed;

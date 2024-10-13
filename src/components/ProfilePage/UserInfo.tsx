import "./UserInfo.css";
import PicksSunburst from "../dataViz/PicksSunburst";
import { useState } from "react";
import { SunburstData } from "../../types/DataViz";
import LossSunburst from "../dataViz/LossSunburst";
import { useQuery } from "@tanstack/react-query";
import { Player } from "../../types/Player";
import convertToChartData from "../../functions/convertToChartData";
import { PlayerStats } from "../../types/Stats";
interface Props {
	playerData: Player;
}

const UserInfo = ({ playerData }: Props) => {
	console.log(playerData);
	const [pickData, setPickData] = useState<SunburstData>(convertToChartData(playerData.cfp.stats as PlayerStats, "picked"));
	const [lossData, setLossData] = useState<SunburstData>(convertToChartData(playerData.cfp.stats as PlayerStats, "lost"));
	const [banData, setBanData] = useState<SunburstData>(convertToChartData(playerData.cfp.stats as PlayerStats, "banned"));

	return (
		<div>
			<h1>User stats past year</h1>
			<div className="profile-stats-container">
				<div style={{ width: "49%", height: "30em" }}>
					<h2>Map picks</h2>
					<div style={{ width: "100%", height: "90%" }}>
						<PicksSunburst data={pickData} keys={["picks"]} indexby="map" setData={setPickData} originalData={convertToChartData(playerData.cfp.stats as PlayerStats, "picked")} />
					</div>
				</div>
				<div style={{ width: "49%", height: "30em" }}>
					<h2>Map bans</h2>
					<div style={{ width: "100%", height: "90%" }}>
						<LossSunburst data={banData} keys={["picks"]} indexby="map" type="ban" />
					</div>
				</div>
				<div style={{ width: "49%", height: "30em" }}>
					<h2>Map losses</h2>
					<div style={{ width: "100%", height: "90%" }}>
						<LossSunburst data={lossData} keys={["picks"]} indexby="map" type="loss" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserInfo;

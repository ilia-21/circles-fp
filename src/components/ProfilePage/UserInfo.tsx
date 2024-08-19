import "./UserInfo.css";
import PicksSunburst from "../dataViz/PicksSunburst";
import { useState } from "react";
import { SunburstData } from "../../types/DataViz";
import LossSunburst from "../dataViz/LossSunburst";
interface Props {
	id: number;
}

const UserInfo = ({ id }: Props) => {
	const originalData = {
		name: "picked",
		children: [
			{
				name: "NM",
				children: [
					{ name: "Won", value: 10 },
					{ name: "Lost", value: 2 },
				],
			},
			{
				name: "HR",
				children: [
					{ name: "Won", value: 8 },
					{ name: "Lost", value: 2 },
				],
			},
			{
				name: "DT",
				children: [
					{ name: "Won", value: 7 },
					{ name: "Lost", value: 2 },
				],
			},
			{
				name: "HD",
				children: [
					{ name: "Won", value: 4 },
					{ name: "Lost", value: 0 },
				],
			},
			{
				name: "FM",
				children: [
					{ name: "Won", value: 9 },
					{ name: "Lost", value: 1 },
				],
			},
		],
	};
	const [data, setData] = useState<SunburstData>(originalData);
	const [data2, setData2] = useState<SunburstData>({
		name: "lost",
		children: [
			{ name: "NM", value: 3 },
			{ name: "HR", value: 1 },
			{ name: "DT", value: 7 },
			{ name: "HD", value: 20 },
			{ name: "FM", value: 4 },
		],
	});
	const [data3, setData4] = useState<SunburstData>({
		name: "banned",
		children: [
			{ name: "NM", value: 4 },
			{ name: "HR", value: 6 },
			{ name: "DT", value: 7 },
			{ name: "HD", value: 10 },
			{ name: "FM", value: 1 },
		],
	});

	return (
		<div>
			<h1>User stats</h1>
			<div className="profile-stats-container">
				<div style={{ width: "49%", height: "30em" }}>
					<h2>Map picks</h2>
					<div style={{ width: "100%", height: "90%" }}>
						<PicksSunburst data={data} keys={["picks"]} indexby="map" setData={setData} originalData={originalData} />
					</div>
				</div>
				<div style={{ width: "49%", height: "30em" }}>
					<h2>Map bans</h2>
					<div style={{ width: "100%", height: "90%" }}>
						<LossSunburst data={data3} keys={["picks"]} indexby="map" />
					</div>
				</div>
				<div style={{ width: "49%", height: "30em" }}>
					<h2>Map losses</h2>
					<div style={{ width: "100%", height: "90%" }}>
						<LossSunburst data={data2} keys={["picks"]} indexby="map" />
					</div>
				</div>
			</div>
		</div>
	);

	//Стата:
	//Акка
	//место в мире
	//Сыгранные матчи
	//Винрейт
	//Средний матчкост
	//последние два за последние два месяца

	//Детальная стата по картам
	//Количество пиков карт по модам
	//сколько из них выиграно/проиграно
	//
};

export default UserInfo;

import React from "react";
import "./TourneyCardSmall.css";
interface Props {
	id: number;
	title: string;
	date: string;
	icon: string;
}

const TourneycardSmall = ({ id, title, date, icon }: Props) => {
	//if (title.length > 10) title = title.slice(0, 10) + "...";
	return (
		<div className="tourneyCardSmall">
			<img src={icon} alt="" />
			<a href={`/tournaments/${id}`}>{title}</a>
			<p className="tourneyCardSmall-date">{date}</p>
		</div>
	);
};

export default TourneycardSmall;

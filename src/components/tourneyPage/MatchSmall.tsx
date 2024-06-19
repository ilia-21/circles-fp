import { useState } from "react";
import { Match } from "../../types/Match";
import { Player } from "../../types/Player";
import { Team } from "../../types/Team";
import PlayerCardSmall from "../mainPage/PlayerCardSmall";
import TeamCardSmall from "../mainPage/TeamCardSmall";
import Tooltip from "../universal/Tooltip";
import "./MatchSmall.css";
interface Props {
	match: Match;
	content: "upcoming" | "score";
}

const MatchSmall = ({ match, content }: Props) => {
	let openMatchPage = (id: number) => {
		window.open(`/#/match/${id}`, "_self");
	};
	if ((content == "upcoming" && new Date(match.timestamp) < new Date(Date.now())) || (content == "score" && new Date(match.timestamp) > new Date(Date.now()))) return;
	const score = match.result;
	const upcoming = match.timestamp || null;
	const first = match.first;
	const second = match.second;
	const id = match.id;
	let createContent = () => {
		if (content == "score") {
			return <p onClick={() => openMatchPage(id)}>{score ? `${score[0]} - ${score[1]}` : "Score not found"}</p>;
		} else if (content == "upcoming") {
			if (!upcoming) {
				return (
					<p onClick={() => openMatchPage(id)}>
						"6:66 AM"
						<Tooltip content={"Time not found"} />
					</p>
				);
			}
			const timestamp = new Date(upcoming);
			const shortLocalizedTimeString = new Intl.DateTimeFormat("en-US", {
				hour: "2-digit",
				minute: "2-digit",
			}).format(timestamp);
			const longLocalizedTimeString = new Intl.DateTimeFormat("en-US", {
				dateStyle: "full",
				timeStyle: "long",
			}).format(timestamp);
			return (
				<p onClick={() => openMatchPage(id)}>
					{shortLocalizedTimeString}
					<Tooltip content={longLocalizedTimeString} />
				</p>
			);
		}
	};
	const createLink = (who: Team | Player) => {
		if (match.type == "1v1") {
			return (
				<a href={`/#/profile/${(who as Player).id}`}>
					<img src={(who as Player).avatar_url} alt="" />
					<PlayerCardSmall player={who as Player} />
				</a>
			);
		} else {
			return (
				<a href={`/#/team/${(who as Team).id}`}>
					<img src={`${(who as Team).logo}`} alt="" />
					{typeof who != "number" && <TeamCardSmall team={who as Team} />}
					{/* stupid backend has 1% chance of not sending team info */}
				</a>
			);
		}
	};

	return (
		<div className="matchSmall">
			{createLink(first)}
			{createContent()}
			{createLink(second)}
		</div>
	);
};

export default MatchSmall;

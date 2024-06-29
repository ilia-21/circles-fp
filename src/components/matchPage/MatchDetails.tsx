import { Match } from "../../types/Match";
import { PlayerLite } from "../../types/Player";
import { Tourney } from "../../types/Tourney";
import "../universal/universal.css";
import "./MatchDetails.css";
import LinkButtonSmall from "./LinkButtonSmall";
import OneStat from "./OneStat";
import { convertAndCalculateMatchcost } from "../../functions/MatchCost";
import { Team } from "../../types/Team";
import DoubleStat from "./DoubleStat";
interface Props {
	match: Match;
	tournament: Tourney;
}

const MatchDetails = ({ match, tournament }: Props) => {
	const first = match.first;
	const second = match.second;
	let matchCosts: number[] = [0, 0];
	if (match.type == "1v1" && match.match.end_time) {
		matchCosts = [convertAndCalculateMatchcost(match, first.id), convertAndCalculateMatchcost(match, second.id)];
	}
	const drawLinks = () => {
		return (
			<div className="matchDetails-links">
				{tournament && tournament.data.stream && new Date(match.timestamp) > new Date(Date.now()) && <LinkButtonSmall color="#9146FF" icn="Twitch" text="Watch live" link={tournament.data.stream} />}
				<LinkButtonSmall color="#FF66AA" icn="Osu" text="mp link" link={`https://osu.ppy.sh/community/matches/${match.id}`} />
			</div>
		);
	};
	if (!first.title) {
		return (
			<>
				<div className="contentSlim-section">{drawLinks()}</div>

				<div className="contentSlim-section">
					<OneStat first={`#${(first as PlayerLite).statistics.global_rank}`} second={`#${(second as PlayerLite).statistics.global_rank}`} stat="World ranking" condition="less" />
					{matchCosts[0] != 0 && matchCosts[1] != 0 && <OneStat first={`${Math.round(matchCosts[0] * 1000) / 1000}`} second={`${Math.round(matchCosts[1] * 1000) / 1000}`} stat="Match costs" condition="more" />}
				</div>
			</>
		);
	} else {
		const drawTeamCosts = () => {
			const playersWithMatchcosts: [PlayerLite, number][][] = [[], []];

			(first as Team).players.map((p) => {
				playersWithMatchcosts[0].push([p, Math.round(convertAndCalculateMatchcost(match, p.id) * 1000) / 1000]);
			});
			(second as Team).players.map((p) => {
				playersWithMatchcosts[1].push([p, Math.round(convertAndCalculateMatchcost(match, p.id) * 1000) / 1000]);
			});
			//not using .map because sometimes teams are different sizes
			let elements = [];
			const longest = playersWithMatchcosts[0] > playersWithMatchcosts[1] ? 0 : 1;
			for (const plr in playersWithMatchcosts[longest]) {
				const player1 = playersWithMatchcosts[0].sort((a, b) => b[1] - a[1])[plr];
				const player2 = playersWithMatchcosts[1].sort((a, b) => b[1] - a[1])[plr];

				elements.push(<DoubleStat first={player1 ? [player1[0].username, player1[1]] : null} second={player2 ? [player2[0].username, player2[1]] : null} />);
			}
			return elements;
		};
		//sort by matchcost then display
		return (
			<>
				<div className="contentSlim-section">{drawLinks()}</div>
				{match.events && (
					<div className="contentSlim-section">
						<p style={{ textAlign: "center" }}>Match costs</p>
						{drawTeamCosts()}
					</div>
				)}
			</>
		);
	}
};

export default MatchDetails;

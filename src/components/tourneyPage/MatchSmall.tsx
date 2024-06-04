import "./MatchSmall.css";
interface Props {
	id: number;
	team1: String;
	team2: String;
	content: "upcoming" | "score";
	upcoming?: String;
	score?: number[];
}

const MatchSmall = (Props: Props) => {
	let createContent = () => {
		if (Props.content == "score" && Props.score) {
			return (
				<p>
					{Props.score[0]} - {Props.score[1]}
				</p>
			);
		} else {
			return <p>{Props.upcoming}</p>;
		}
	};
	return (
		<div className="matchSmall">
			<img src={`/src/assets/flags/${Props.team1}.png`} alt="" />
			{createContent()}
			<img src={`/src/assets/flags/${Props.team2}.png`} alt="" />
		</div>
	);
};

export default MatchSmall;

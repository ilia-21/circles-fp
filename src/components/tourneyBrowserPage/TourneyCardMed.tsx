import DateConverter from "../../functions/DateConverter";
import { Tourney } from "../../types/Tourney";

interface Props {
	tourney: Tourney;
}

const TourneyCardMed = ({ tourney }: Props) => {
	return (
		<div className="tourneyCardMed-container">
			<a href={`/#/tourney/${tourney.id}`}>
				<div className="tourneyCardMed-bannerContainer">
					<img src={tourney.data.banner} alt="" />
				</div>
				<h1>{tourney.title}</h1>
				<p>
					{DateConverter(new Date(tourney.datestart), "DD/MM/YYYY")} - {DateConverter(new Date(tourney.dateend), "DD/MM/YYYY")}
				</p>
			</a>
		</div>
	);
};

export default TourneyCardMed;

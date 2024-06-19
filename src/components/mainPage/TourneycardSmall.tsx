import { TourneyLite } from "../../types/Tourney";
import "./TourneyCardSmall.css";
interface Props {
	tourney: TourneyLite;
}

const TourneycardSmall = ({ tourney }: Props) => {
	//if (title.length > 10) title = title.slice(0, 10) + "...";
	let longLocalizedTimeString;
	if (tourney.ongoing) {
		longLocalizedTimeString = "Live";
	} else if (tourney.endedRecently) {
		longLocalizedTimeString = "Ended";
	} else {
		longLocalizedTimeString = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" }).format(new Date(tourney.datestart + "00"));
	}
	return (
		<div className="tourneyCardSmall">
			<img src={tourney.data.icon} alt="logo" />
			<div>
				<a href={`/#/tourney/${tourney.id}`}>{tourney.title}</a>
				<p className="tourneyCardSmall-date">{longLocalizedTimeString}</p>
			</div>
		</div>
	);
};

export default TourneycardSmall;

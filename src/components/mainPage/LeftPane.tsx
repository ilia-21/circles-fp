import "./panes.css";
import Upcomingmatches from "../mainPage/Upcomingmatches";
import TourneycardSmall from "./TourneycardSmall";

const LeftPane = () => {
	return (
		<div className="leftPane">
			<div>
				<p>Upcoming tournaments</p>
				<TourneycardSmall id={1} title="OWC 2025 asdasdasdasdadadsaad" date="July 27" icon="https://imgs.search.brave.com/2smzFSCFqAoPmqtcQvMrOd7KeeE80SdwYwz6uA3quJE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9saXF1/aXBlZGlhLm5ldC9j/b21tb25zL2ltYWdl/cy9jL2NjL09zdV9X/b3JsZF9DdXBfMjAy/MF9kYXJrbW9kZS5w/bmc" />
				<TourneycardSmall id={1} title="OWC 2025 asdasdasdasdadadsaad" date="July 27" icon="https://imgs.search.brave.com/2smzFSCFqAoPmqtcQvMrOd7KeeE80SdwYwz6uA3quJE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9saXF1/aXBlZGlhLm5ldC9j/b21tb25zL2ltYWdl/cy9jL2NjL09zdV9X/b3JsZF9DdXBfMjAy/MF9kYXJrbW9kZS5w/bmc" />
				<TourneycardSmall id={1} title="OWC 2025 asdasdasdasdadadsaad" date="July 27" icon="https://imgs.search.brave.com/2smzFSCFqAoPmqtcQvMrOd7KeeE80SdwYwz6uA3quJE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9saXF1/aXBlZGlhLm5ldC9j/b21tb25zL2ltYWdl/cy9jL2NjL09zdV9X/b3JsZF9DdXBfMjAy/MF9kYXJrbW9kZS5w/bmc" />
			</div>
		</div>
	);
};

export default LeftPane;

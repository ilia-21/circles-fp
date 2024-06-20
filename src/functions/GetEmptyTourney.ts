import { Tourney } from "../types/Tourney";

let GetEmptyTourney = () => {
	const newTourney: Tourney = {
		id: 4,
		title: "Fake tournament 2025",
		//@ts-ignore
		host: { id: 2 },
		data: {
			description: "Click to edit description",
			banner: "https://ilia21.s-ul.eu/BOWcvdqU",
			icon: "https://ilia21.s-ul.eu/rg7LF4Q5",
			prize: "Can be anything!",
			stream: "https://twitch.tv/you",
			date: { start: "2027-07-27T00:00:00+00:00", end: "2028-07-27T00:00:00+00:00" },
			participants: [],
			pool: [],
			bracket: {
				upper: [],
				lower: [],
			},
			type: "1v1",
		},
		visits: {},
		popularity: 2,
		datestart: "2027-07-27T00:00:00+00:00",
		dateend: "2025-06-07T21:00:00.000Z",
		stats: null,
		matches: [],
	};
	return newTourney;
};
export default GetEmptyTourney;

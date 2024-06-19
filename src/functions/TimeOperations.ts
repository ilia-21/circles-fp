const getTimeZone = () => {
	var offset = new Date().getTimezoneOffset(),
		o = Math.abs(offset);
	return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
};
const convertTime = (time: string): [string, string] => {
	const dateObject = new Date(time);

	const localDateString =
		dateObject
			.toLocaleDateString("en-GB", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			})
			.split("/")
			.reverse()
			.join("-") + "T";

	const localTimeString =
		dateObject.toLocaleTimeString("en-GB", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
		}) + getTimeZone();

	return [localDateString, localTimeString];
};
export { getTimeZone, convertTime };

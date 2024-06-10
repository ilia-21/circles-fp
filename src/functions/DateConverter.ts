let DateConverter = (date: Date, type: "MM DD" | "W MM DD" | "DD" | "MM DD HH:MM" | "HH:MM" | "full") => {
	switch (type) {
		case "full":
			return new Intl.DateTimeFormat("en-US", {
				dateStyle: "full",
				timeStyle: "long",
			}).format(date);
			break;
		case "MM DD":
			return new Intl.DateTimeFormat("en-US", {
				month: "long",
				day: "numeric",
			}).format(date);
			break;
		case "W MM DD":
			return new Intl.DateTimeFormat("en-US", {
				weekday: "long",
				month: "long",
				day: "numeric",
			}).format(date);
			break;
		case "DD":
			return date.getDate();
			break;
		case "MM DD HH:MM":
			return new Intl.DateTimeFormat("en-US", {
				dateStyle: "short",
				timeStyle: "short",
			}).format(date);
			break;
		case "HH:MM":
			return new Intl.DateTimeFormat("en-US", {
				timeStyle: "short",
			}).format(date);
			break;
	}
};
export default DateConverter;
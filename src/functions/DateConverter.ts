let DateConverter = (date: Date, type: "MM DD" | "W MM DD" | "DD" | "MM DD HH:MM" | "HH:MM" | "full" | "HH:MM 24" | "DD/MM/YYYY" | Intl.DateTimeFormatOptions) => {
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
		case "HH:MM 24":
			return new Intl.DateTimeFormat("en-GB", {
				timeStyle: "short",
			}).format(date);
			break;
		case "DD/MM/YYYY":
			//just why
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, "0");
			const day = String(date.getDate()).padStart(2, "0");

			return `${day}/${month}/${year.toString().padStart(4, "0")}`;
			break;
	}
};
export default DateConverter;

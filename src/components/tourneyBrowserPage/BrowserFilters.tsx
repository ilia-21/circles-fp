interface Props {
	setSearchOptions: (options: { type: "upcomingLive" | "archive"; year: string }) => void;
	searchOptions: { type: "upcomingLive" | "archive"; year: string };
}
const BrowserFilters = (props: Props) => {
	const setSearchYear = (year: string) => {
		props.setSearchOptions({ ...props.searchOptions, year: year });
	};
	const setSearchState = (state: "upcomingLive" | "archive") => {
		props.setSearchOptions({ ...props.searchOptions, type: state });
	};
	const drawYearPicker = () => {
		const years = [];
		const currentYear = new Date().getFullYear();
		for (let i = currentYear - 5; i <= currentYear + 5; i++) {
			years.push(i);
		}
		return years.map((year) => (
			<p key={year} className={+props.searchOptions.year == year ? "selected" : ""} onClick={() => setSearchYear("" + year)}>
				{year}
			</p>
		));
	};
	const drawStatePicker = () => {
		const states = [
			["Live and upcoming", "upcomingLive"],
			["Archived", "archive"],
		];
		return states.map((state) => (
			<p key={state[1]} className={props.searchOptions.type == state[1] ? "selected" : ""} onClick={() => setSearchState(state[1] as any)}>
				{state[0]}
			</p>
		));
	};
	return (
		<div className="tourneyBrowser-Filters">
			<h2>Filters</h2>
			<h3 style={{ border: "none", margin: "0" }}>Year</h3>
			<div className="tourneyBrowser-Filter">{drawYearPicker()}</div>
			<h3 style={{ border: "none", margin: "0" }}>State</h3>
			<div className="tourneyBrowser-Filter">{drawStatePicker()}</div>
		</div>
	);
};

export default BrowserFilters;

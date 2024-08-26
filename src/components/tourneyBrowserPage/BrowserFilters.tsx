import { SetURLSearchParams } from "react-router-dom";
import { Filters } from "../../pages/Tourneys";

interface Props {
	setFilters: (options: Filters) => void;
	filters: Filters;
	setSearchParams: SetURLSearchParams;
}
const BrowserFilters = (props: Props) => {
	const setSearchYear = (year: string) => {
		props.setFilters({ ...props.filters, year: year, enabled: true });
		props.setSearchParams({ year: year });
	};
	const drawYearPicker = () => {
		const years = [];
		const currentYear = new Date().getFullYear();
		for (let i = currentYear - 5; i <= currentYear + 5; i++) {
			years.push(i);
		}
		return years.map((year) => (
			<p key={year} className={+props.filters.year == year && props.filters.enabled ? "selected" : ""} onClick={() => setSearchYear("" + year)}>
				{year}
			</p>
		));
	};
	return (
		<div className="tourneyBrowser-Filters">
			<h2>Filters</h2>
			<h3 style={{ border: "none", margin: "0" }}>Year</h3>
			<div className="tourneyBrowser-Filter">{drawYearPicker()}</div>
		</div>
	);
};

export default BrowserFilters;

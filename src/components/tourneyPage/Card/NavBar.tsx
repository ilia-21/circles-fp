import "./NavBar.css";
interface Props {
	id: number;
	selected: "info" | "upcoming" | "results" | "stats";
}

const NavBar = ({ id, selected }: Props) => {
	return (
		<div className="tournamentNavBar">
			<a className={selected == "info" ? "selected" : ""} href={`/#/tourney/${id}`}>
				Info
			</a>
			<a className={selected == "upcoming" ? "selected" : ""} href={`/#/tourney/${id}/matches`}>
				Schedule
			</a>
			<a className={selected == "results" ? "selected" : ""} href={`/#/tourney/${id}/results`}>
				Results
			</a>
			<a className={selected == "stats" ? "selected" : ""} href={`/#/tourney/${id}/stats`}>
				Stats
			</a>
		</div>
	);
};

export default NavBar;

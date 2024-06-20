import "./MatchDetails.css";
interface Props {
	first: [string, string | number] | null;
	second: [string, string | number] | null;
}

const DoubleStat = ({ first, second }: Props) => {
	return (
		<div className="match-DoubleStat-block">
			<div style={{ display: "flex", justifyContent: "space-between", flex: "1 0 49%" }}>
				<p style={{ flex: "1 0 49%" }}>{first ? first[0] : ""}</p>
				<p style={{ flex: "1 0 49%" }}>{first ? first[1] : ""}</p>
			</div>

			<div style={{ display: "flex", justifyContent: "space-between", flex: "1 0 49%" }}>
				<p style={{ flex: "1 0 49%" }}>{second ? second[0] : ""}</p>
				<p style={{ flex: "1 0 49%" }}>{second ? second[1] : ""}</p>
			</div>
		</div>
	);
};

export default DoubleStat;

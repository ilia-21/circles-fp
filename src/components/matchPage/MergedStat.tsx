interface Props {
	label: string;
	stat: string | number;
}

const MergedStat = ({ label, stat }: Props) => {
	return (
		<div style={{ display: "flex", justifyContent: "space-around", gap: "10em" }}>
			<p style={{ flex: "1 0 49%", textAlign: "center" }}>{label}</p>
			<p style={{ flex: "1 0 49%", textAlign: "center" }}>{stat}</p>
		</div>
	);
};

export default MergedStat;

interface Props {
	first: string | number;
	second: string | number;
	stat: string;
	condition?: "more" | "less";
}

const OneStat = ({ first, second, stat, condition }: Props) => {
	let firstColor = "white";
	let secondColor = "white";
	if (condition) {
		firstColor = condition == "more" ? (first > second ? "green" : "red") : first > second ? "red" : "green";
		secondColor = condition == "more" ? (first > second ? "red" : "green") : first > second ? "green" : "red";
	}
	return (
		<div style={{ display: "flex", justifyContent: "space-around", gap: "10em" }}>
			<p style={{ color: `var(--${firstColor})` }}>{first}</p>
			<p>{stat}</p>
			<p style={{ color: `var(--${secondColor})` }}>{second}</p>
		</div>
	);
};

export default OneStat;

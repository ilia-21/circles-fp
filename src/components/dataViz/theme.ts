export const theme = {
	background: "#ffffff00",
	stroke: "#000000",
	text: {
		fontSize: 11,
		fill: "var(--cfp-text)",
		outlineWidth: 0,
		outlineColor: "transparent",
	},
	tooltip: {
		wrapper: {},
		container: {
			background: "var(--cfp-bg)",
			color: "var(--cfp-text)",
			fontSize: 12,
		},
		basic: {},
		chip: {},
		table: {},
		tableCell: {},
		tableCellValue: {},
	},
	colors: ["#111111", "#222222"],
};
export const colors = ["#f5c2e7", "#cba6f7", "#f38ba8", "#eba0ac", "#fab387", "#f9e2af", "#a6e3a1", "#94e2d5", "#89dceb", "#74c7ec", "#89b4fa", "#b4befe"]
	.map((value) => ({ value, sort: Math.random() }))
	.sort((a, b) => a.sort - b.sort)
	.map(({ value }) => value);
export const Pickcolors = ["var(--green)", "var(--red)", "var(--yellow)", "var(--blue)", "var(--mauve)"];
export const WinrateColors = ["var(--green)", "var(--red)"];

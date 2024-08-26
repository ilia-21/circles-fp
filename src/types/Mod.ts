export enum ModType {
	NM = "NM",
	HR = "HR",
	HD = "HD",
	DT = "DT",
	FM = "FM",
	TB = "TB",
}
export type Mod = "NM" | "HR" | "HD" | "DT" | "FM" | "TB";
export type BeatmapSlot = `${Mod}${number}` | "TB";

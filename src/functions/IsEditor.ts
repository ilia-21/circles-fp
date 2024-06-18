import { Player, PlayerLite } from "../types/Player";

// https://osu.ppy.sh/wiki/en/Beatmap/Approach_rate
interface condition {
	key: string;
	condition: "lessEquals" | "less" | "equals" | "notEquals" | "moreEquals" | "more";
	value: any;
}
let IsEditor = (condition: condition, user: PlayerLite | Player) => {
	console.log(user);
	if (user.cfp.roles.DEV || user.cfp.roles.MOD) return true;
	let allowed: boolean = false;
	switch (condition.condition) {
		case "lessEquals":
			allowed = condition.key <= condition.value;
			break;
		case "less":
			allowed = condition.key < condition.value;
			break;
		case "equals":
			allowed = condition.key == condition.value;
			break;
		case "notEquals":
			allowed = condition.key != condition.value;
			break;
		case "moreEquals":
			allowed = condition.key > condition.value;
			break;
		case "more":
			allowed = condition.key >= condition.value;
			break;
	}
	return allowed;
};
export default IsEditor;

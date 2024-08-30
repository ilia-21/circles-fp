import { getUserSettings } from "./SettingsUtils";

const MakeMoreReadable = (numStr: string | number) => {
	//split into number like 123,456,789
	const separator = getUserSettings().other.separator;
	numStr = numStr.toString();
	let result = "";
	let count = 0;
	for (let i = numStr.length - 1; i >= 0; i--) {
		result = numStr[i] + result;
		count++;
		if (count % 3 == 0 && i != 0) {
			result = separator + result;
		}
	}
	return result;
};
export default MakeMoreReadable;

import { PlayerLite } from "../../types/Player";
import { PickEvent } from "../../types/MatchEvent";
import { Team } from "../../types/Team";
import { BsArrowLeftRight } from "react-icons/bs";
import InputWithSuggestions from "../universal/InputWithSuggestions";
import { MappoolMod } from "../../types/Beatmap";
import { CiTrash } from "react-icons/ci";

interface Props {
	first: PlayerLite | Team;
	second: PlayerLite | Team;
	pick: PickEvent;
	index: number;
	pickData: PickEvent[];
	setPickData: (picks: PickEvent[]) => void;
	availableMaps: string[];
}

const Pick = ({ first, second, pick, index, pickData, setPickData, availableMaps }: Props) => {
	const updatePicker = (picker: "first" | "second") => {
		const updatedPickData = [...pickData];
		updatedPickData[index] = { ...updatedPickData[index], who: picker };
		setPickData(updatedPickData);
	};

	const updateAction = (action: "pick" | "ban") => {
		const updatedPickData = [...pickData];
		updatedPickData[index] = { ...updatedPickData[index], type: action };
		setPickData(updatedPickData);
	};

	const updateMap = (e: React.FocusEvent<HTMLInputElement>) => {
		const updatedPickData = [...pickData];
		updatedPickData[index] = { ...updatedPickData[index], map: e.target.value as MappoolMod };
		setPickData(updatedPickData);
	};
	const delPick = () => {
		const updatedPickData = [...pickData];
		updatedPickData.splice(index, 1);
		setPickData(updatedPickData);
	};
	const drawData = () => {
		const grammaticallyCorrectWord = pick.type == "pick" ? "picked" : "banned";
		const who = pick.who === "first" ? (first as PlayerLite).username || (first as Team).title : (second as PlayerLite).username || (second as Team).title;
		return (
			<div className={`matchEditor-pick ${pick.type === "ban" ? "ban" : "pick"}`}>
				<div>{who}</div>
				<div
					onClick={() => {
						updateAction(pick.type === "pick" ? "ban" : "pick");
					}}
					className="matchEditor-pick-user"
				>
					{grammaticallyCorrectWord}
				</div>
				<InputWithSuggestions name="pick.map" value={pick.map} suggestions={[...availableMaps, pick.map]} onBlur={updateMap} />
			</div>
		);
	};

	const drawEmpty = () => {
		return (
			<div
				className="matchEditor-pick-data"
				onClick={() => {
					updatePicker(pick.who === "first" ? "second" : "first");
				}}
			>
				<BsArrowLeftRight style={{ color: "var(--cfp-accent)" }} />
			</div>
		);
	};

	return (
		<div className="matchEditor-pick-container">
			{pick.who === "first" ? drawData() : drawEmpty()}
			<CiTrash onClick={delPick} style={{ color: "var(--cfp-accent)", fontSize: "1.5em" }} />
			{pick.who === "second" ? drawData() : drawEmpty()}
		</div>
	);
};

export default Pick;

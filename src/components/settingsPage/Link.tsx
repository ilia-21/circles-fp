import { CiTrash } from "react-icons/ci";
import { BsArrowDown, BsArrowUp, BsPlusLg } from "react-icons/bs";

interface Props {
	link: string;
	index: number;
	allLinks: string[];
	setLinks: (links: string[]) => void;
	disabled?: boolean;
}

const Link = ({ link, index, allLinks, setLinks, disabled }: Props) => {
	const delLink = () => {
		const updatedLinks = allLinks.filter((_, i) => i !== index);
		setLinks([...updatedLinks]);
	};

	const moveLink = (where: "up" | "down") => {
		const updatedLinks = [...allLinks];
		if (where === "up" && index > 0) {
			[updatedLinks[index - 1], updatedLinks[index]] = [updatedLinks[index], updatedLinks[index - 1]];
		} else if (where === "down" && index < allLinks.length - 1) {
			[updatedLinks[index + 1], updatedLinks[index]] = [updatedLinks[index], updatedLinks[index + 1]];
		}
		setLinks(updatedLinks);
	};
	const addLink = () => {
		const updatedLinks = [...allLinks];
		updatedLinks.push(link);
		setLinks(updatedLinks);
	};
	const drawButtons = () => {
		if (!disabled) {
			return (
				<div className="settings-profilebuttons-buttons">
					<CiTrash onClick={delLink} />
					<BsArrowUp onClick={() => moveLink("up")} />
					<BsArrowDown onClick={() => moveLink("down")} />
				</div>
			);
		} else {
			return (
				<div className="settings-profilebuttons-buttons">
					<BsPlusLg onClick={addLink} />
				</div>
			);
		}
	};

	return (
		<div className="settings-profilebutton-block">
			<p>{link}</p>

			{drawButtons()}
		</div>
	);
};

export default Link;

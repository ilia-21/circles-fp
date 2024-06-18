import { BsDownload, BsUpload } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";
import Tooltip from "../universal/Tooltip";

interface Props {
	importSettings: (section: string, after?: () => void) => void;
	exportSettings: (section: string) => void;
	setDefaults: () => void;
	section: string;
}
const HeaderButtons = ({ exportSettings, importSettings, setDefaults, section }: Props) => {
	return (
		<div className="settings-header-title-buttons">
			<div>
				<BsDownload
					onClick={() => {
						importSettings(section);
					}}
				/>
				<Tooltip content={"Import settings"} />
			</div>
			<div>
				<BsUpload
					onClick={() => {
						exportSettings(section);
					}}
				/>
				<Tooltip content={"Export settings"} />
			</div>
			<div>
				<TfiReload onClick={setDefaults} />
				<Tooltip content={"Load defaults"} />
			</div>
		</div>
	);
};

export default HeaderButtons;

import { toast } from "react-toastify";
import { Tourney } from "../../types/Tourney";
import { useState, useEffect } from "react";

interface Props {
	tourney: Tourney;
	setTourneyData: (tourney: Tourney) => void;
}

const Logo = ({ tourney, setTourneyData }: Props) => {
	const [localTourneyData, setLocalTourneyData] = useState<Tourney>(tourney);

	useEffect(() => {
		setLocalTourneyData(tourney);
	}, [tourney]);

	const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// This gets called every time the banner changes
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];

			if (selectedFile.size > 9 * 1024 * 1024) {
				// Check if the banner is bigger than 9 MB
				toast.error("File size should be less than 9 MB");
				return;
			}

			// Convert the image to a base64 string
			const reader = new FileReader();

			reader.onloadend = () => {
				const base64String = reader.result as string;
				const img = new Image();

				img.onload = () => {
					const aspect = Math.round((img.width / img.height) * 100) / 100;

					if (img.width > 512) {
						// Check file resolution
						toast.error("Logo width and height should not exceed 512 pixels");
					} else if (aspect != 1) {
						toast.error(`Incorrect aspect ratio: 1:${aspect}. Allowed aspect ratio for logo: 1:1`);
					} else {
						// Update the tourney data with the new banner
						const updatedData = { ...localTourneyData.data, icon: base64String };
						const updatedTourney = { ...localTourneyData, data: updatedData };
						setLocalTourneyData(updatedTourney);
						setTourneyData(updatedTourney); // Update parent state
					}
				};
				img.src = base64String;
			};

			reader.readAsDataURL(selectedFile);
		}
	};

	return (
		<div className="TourneyEditor-Banner-Container" onClick={() => document.getElementById("data.icon")?.click()}>
			<div className="TourneyEditor-Banner-Wrapper">
				<img src={localTourneyData.data.icon} className="TourneyEditor-Banner-img" alt="Logo" style={{ width: "10em" }} />
				<div className="TourneyEditor-Banner-Overlay">
					<p>Click to change Icon</p>
				</div>
			</div>
			<input id="data.icon" type="file" accept="image/*" style={{ display: "none" }} onChange={handleBannerChange} />
		</div>
	);
};
export default Logo;

import { Tourney } from "../../types/Tourney";
import { useState, useEffect } from "react";

interface Props {
	tourney: Tourney;
	setTourneyData: (tourney: Tourney) => void;
	setMessage: (message: string[] | null) => void;
}

export const Banner = ({ tourney, setTourneyData, setMessage }: Props) => {
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
				setMessage(["red", "File size should be less than 9 MB"]);
				return;
			}

			// Convert the image to a base64 string
			const reader = new FileReader();

			reader.onloadend = () => {
				const base64String = reader.result as string;
				const img = new Image();

				img.onload = () => {
					const aspect = Math.round((img.width / img.height) * 100) / 100;
					const aspectLimit = [5, 3];

					if (img.width > 2048) {
						// Check file resolution
						setMessage(["red", "Banner width should not exceed 2048 pixels"]);
					} else if (aspect > aspectLimit[0] || aspect < aspectLimit[1]) {
						setMessage(["red", `Incorrect aspect ratio: 1:${aspect}. Allowed aspect ratio: between 1:${aspectLimit[0]} and 1:${aspectLimit[1]}`]);
					} else {
						// Update the tourney data with the new banner
						const updatedData = { ...localTourneyData.data, banner: base64String };
						const updatedTourney = { ...localTourneyData, data: updatedData };
						setLocalTourneyData(updatedTourney);
						setTourneyData(updatedTourney); // Update parent state
						setMessage(null);
					}
				};
				img.src = base64String;
			};

			reader.readAsDataURL(selectedFile);
		}
	};

	return (
		<div className="TourneyEditor-Banner-Container">
			<img src={localTourneyData.data.banner} onClick={() => document.getElementById("data.banner")?.click()} className="TourneyEditor-Banner-img" alt="Banner" height={"-10em"} />
			<input id="data.banner" type="file" accept="image/*" style={{ display: "none" }} onChange={handleBannerChange} />
			<p>Click on a banner to pick a new one</p>
		</div>
	);
};

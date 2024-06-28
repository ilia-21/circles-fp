import { toast } from "react-toastify";
import { Tourney } from "../../types/Tourney";
import { useState, useEffect } from "react";

interface Props {
	tourney: Tourney;
	setTourneyData: (tourney: Tourney) => void;
}

const Banner = ({ tourney, setTourneyData }: Props) => {
	const [localTourneyData, setLocalTourneyData] = useState<Tourney>(tourney);

	useEffect(() => {
		setLocalTourneyData(tourney);
	}, [tourney]);

	const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];

			if (selectedFile.size > 9 * 1024 * 1024) {
				toast.error("File size should be less than 9 MB");
				return;
			}

			const reader = new FileReader();

			reader.onloadend = () => {
				const base64String = reader.result as string;
				const img = new Image();

				img.onload = () => {
					const aspect = Math.round((img.width / img.height) * 100) / 100;
					const aspectLimit = [5, 3];

					if (img.width > 2048) {
						toast.error("Banner width should not exceed 2048 pixels");
					} else if (aspect > aspectLimit[0] || aspect < aspectLimit[1]) {
						toast.error(`Incorrect aspect ratio: 1:${aspect}. Allowed aspect ratio: between 1:${aspectLimit[0]} and 1:${aspectLimit[1]}`);
					} else {
						const updatedData = { ...localTourneyData.data, banner: base64String };
						const updatedTourney = { ...localTourneyData, data: updatedData };
						setLocalTourneyData(updatedTourney);
						setTourneyData(updatedTourney);
					}
				};
				img.src = base64String;
			};

			reader.readAsDataURL(selectedFile);
		}
	};

	return (
		<div className="TourneyEditor-Banner-Container" onClick={() => document.getElementById("data.banner")?.click()}>
			<div className="TourneyEditor-Banner-Wrapper">
				<img src={localTourneyData.data.banner} className="TourneyEditor-Banner-img" alt="Banner" />
				<div className="TourneyEditor-Banner-Overlay">
					<p>Click to change banner</p>
				</div>
			</div>
			<input id="data.banner" type="file" accept="image/*" style={{ display: "none" }} onChange={handleBannerChange} />
		</div>
	);
};

export default Banner;

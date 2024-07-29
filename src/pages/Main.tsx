import "./main.css";
import CenterPane from "../components/mainPage/CenterPane";
import LeftPane from "../components/mainPage/LeftPane";
import RightPane from "../components/mainPage/RightPane";
import Bannertop from "../components/universal/Bannertop";
import randomLoadingMessage from "../functions/loadingMessages";
import { useQuery } from "@tanstack/react-query";
const fetchTourneys = async () => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/tourneys`, {
		headers: {
			"x-api-key": import.meta.env.VITE_API_KEY,
		},
		credentials: "include",
	});
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};

const Main = () => {
	const {
		isLoading: loading,
		isError,
		data: tourneyData,
	} = useQuery({
		queryKey: ["tourneysData"],
		queryFn: fetchTourneys,
		retry: false,
	});

	if (loading) {
		return (
			<div className="mainContent">
				<p>{randomLoadingMessage()}</p>
			</div>
		);
	}

	return (
		<div className="mainContent">
			{tourneyData && tourneyData.length > 0 && <Bannertop banner={tourneyData[0].data.banner} />}
			<LeftPane />
			<CenterPane tourneyData={tourneyData} />
			<RightPane />
		</div>
	);
};

export default Main;

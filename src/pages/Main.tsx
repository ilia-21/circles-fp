import "./main.css";
import CenterPane from "../components/mainPage/CenterPane";
import LeftPane from "../components/mainPage/LeftPane";
import RightPane from "../components/mainPage/RightPane";
import { useEffect, useState } from "react";
import Bannertop from "../components/universal/Bannertop";
import randomLoadingMessage from "../functions/loadingMessages";
import NoConnectionPopup from "../components/universal/NoConnectionPopup";
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

const checkConnection = async () => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/ping`, {
		headers: {
			"x-api-key": import.meta.env.VITE_API_KEY,
		},
		credentials: "include",
	});
	if (response.status == 503) {
		throw new Error(await response.text());
	}
	if (!response.ok) {
		throw new Error("Failed to ping server");
	}
	return response.json();
};

const Main = () => {
	const [showNoConnectionPopup, setShowNoConnectionPopup] = useState(false);
	const [serverLockdown, setServerLockdown] = useState<string | null>(null);

	const {
		isLoading: loading,
		isError,
		data: tourneyData,
	} = useQuery({
		queryKey: ["tourneysData"],
		queryFn: fetchTourneys,
		retry: false,
	});

	useEffect(() => {
		const handleError = async () => {
			if (isError) {
				try {
					await checkConnection();
				} catch (error: any) {
					if (error.message != "Failed to ping server") {
						setServerLockdown(error.message);
					} else {
						setShowNoConnectionPopup(true);
					}
				}
			}
		};

		handleError();
	}, [isError]);

	if (loading) {
		return (
			<div className="mainContent">
				<p>{randomLoadingMessage()}</p>
			</div>
		);
	}

	if (showNoConnectionPopup) {
		return <NoConnectionPopup />;
	}

	if (serverLockdown) {
		return <NoConnectionPopup text={serverLockdown} />;
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

import { useState, useEffect } from "react";
import NoConnectionPopup from "./NoConnectionPopup";

const ConnectionCheck = () => {
	const [showNoConnectionPopup, setShowNoConnectionPopup] = useState(false);
	const [serverLockdown, setServerLockdown] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const checkConnection = async () => {
		console.log("Checking");
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/ping`, {
				headers: {
					"x-api-key": import.meta.env.VITE_API_KEY,
				},
				credentials: "include",
			});

			if (response.status === 503) {
				const text = await response.text();
				setServerLockdown(text);
				return;
			}

			if (!response.ok) {
				setShowNoConnectionPopup(true);
				return;
			}

			await response.json();

			setShowNoConnectionPopup(false);
			setServerLockdown(null);
		} catch (error) {
			if ((error as Error).message.includes("NetworkError")) setShowNoConnectionPopup(true);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		checkConnection();
	}, []);

	if (isLoading) {
		return null;
	}

	if (serverLockdown) {
		return <NoConnectionPopup text={serverLockdown} />;
	}

	if (showNoConnectionPopup) {
		return <NoConnectionPopup />;
	}

	return null;
};

export default ConnectionCheck;

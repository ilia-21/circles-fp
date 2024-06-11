import { useEffect, useState } from "react";
import "./CookieWarningPopup.css";

const CookieWarningPopup = ({ onClose }: any) => {
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
	const [countdown, setCountdown] = useState(5);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsButtonDisabled(false);
		}, 5000);

		const countdownTimer = setInterval(() => {
			setCountdown((prevCountdown) => {
				if (prevCountdown > 1) {
					return prevCountdown - 1;
				} else {
					clearInterval(countdownTimer);
					return 0;
				}
			});
		}, 1000);

		return () => {
			clearTimeout(timer);
			clearInterval(countdownTimer);
		};
	}, []);
	const openCookiesPage = () => {
		localStorage.setItem("hasSeenCookieWarning", "true");
		window.open(`${window.location.protocol}//${window.location.host}/#/info/cookies`, "Circles Front Page cookies", "height=720,width=1280");
	};

	return (
		<div className="cfpWarningPopup">
			<div className="cfpWarningPopupContent">
				<h2>Please, take a moment to read this!</h2>
				<p>For the website to work correctly, please enable cross-site cookies in your browser settings. </p>
				<p>As an independent developer implementing this project with a small budget, I'm hosting the website on GitHub Pages and the API on my personal server to keep costs down. Because they are on different servers, cookies, required for authentication are becoming cross-site. Some browsers may block these cookies by default for privacy reasons. </p>
				<p>Don't worry, enabling cross-site cookies is safe and will not allow tracking or data collection. I don't plan to insert ads, and the whole project is open source </p>
				<p>If you have trouble logging in, simply go into your browser settings and allow cross-site cookies for this site. This option is completely under your control and is necessary for the login function to work correctly due to the split servers. </p>
				<p>Thank you for understanding!</p>
				<p>This pop up will only be shown once</p>
				<div>
					<button onClick={onClose} className={isButtonDisabled ? "disabled" : "enabled"}>
						{isButtonDisabled ? `Got it (${countdown})` : "Got it!"}
					</button>
					<button onClick={openCookiesPage}>Show me how</button>
				</div>
			</div>
		</div>
	);
};

export default CookieWarningPopup;

import { useState } from "react";
import randomErrorMessage from "../../functions/SomethingWentWrongMessages";
import "./NoConnectionPopup.css";

interface Props {
	text?: string;
}
const NoConnectionPopup = ({ text }: Props) => {
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [detailsOpened, setDetailsOpened] = useState(false);
	let styles = {
		opacity: detailsOpen ? 1 : 0,
		height: detailsOpen ? "20em" : 0,
		transition: "all 0.5s",
	};
	let text2: null | string = null;
	if (text && text.startsWith("Server is locked down") && !text.endsWith("without message")) {
		const split = text.split(" with message: ");
		text = split[0];
		text2 = split[1];
	}
	const drawDetails = () => {
		if (!text?.startsWith("Server is locked down")) {
			return (
				<div style={styles}>
					<h2>What happened?</h2>
					<p>Circles Front Page server is not acessible at the moment</p>
					<p>I stopped loading the page for you, so it won't break</p>
					<h2>What can I do?</h2>
					<p>
						Visit Circles Front Page <a href="https://discord.gg/WsXtQ9YC2d">discord</a>
					</p>
					<p>Refresh this page a couple of times, maybe you'll get a secret error message!</p>
					<p>Click read more once again to get minimalistic wallpaper</p>
					{/* add sponsor link once i find the one that works in Russia */}
				</div>
			);
		} else if (text?.startsWith("Server is locked down")) {
			return (
				<div style={styles}>
					<h2>What happened?</h2>
					<p>Circles Front Page developers found a critical bug and locked down the server to prevent damage</p>
					<p>If the reason for the lockdown is specified, you'll see it after "Server is locked down by developers".</p>
					<p>I stopped loading the page for you, so it won't break</p>
					<h2>What can I do?</h2>
					<p>
						Visit the Circles Front Page <a href="https://discord.gg/WsXtQ9YC2d">discord</a> to be notified when the server is fixed
					</p>
					<p>Refresh this page a couple of times, maybe you'll get a secret error message!</p>
					<p>Click read more once again to get minimalistic wallpaper</p>
					{/* add sponsor link once i find the one that works in Russia */}
				</div>
			);
		}
	};
	return (
		<div className="NoConnectionPopup">
			<div>
				<h1>{text?.startsWith("Server is locked down") ? text : "Can't connect to the server"}</h1>
				{text2 && <h2>{text2}</h2>}
				{!text2 && <p>{randomErrorMessage()}</p>}
				<p
					onClick={() => {
						setDetailsOpen(!detailsOpen);
						setDetailsOpened(true);
					}}
					style={{ opacity: detailsOpened && !detailsOpen ? 0 : 1 }}
				>{`> Read more`}</p>
				{drawDetails()}
			</div>
		</div>
	);
};

export default NoConnectionPopup;

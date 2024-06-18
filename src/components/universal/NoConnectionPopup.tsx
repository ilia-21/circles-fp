import { useState } from "react";
import randomErrorMessage from "../../functions/SomethingWentWrongMessages";
import "./NoConnectionPopup.css";

const NoConnectionPopup = () => {
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [detailsOpened, setDetailsOpened] = useState(false);
	let styles = {
		opacity: detailsOpen ? 1 : 0,
		height: detailsOpen ? "20em" : 0,
		transition: "all 0.5s",
	};
	return (
		<div className="NoConnectionPopup">
			<div>
				<h1>Can't connect to the server</h1>
				<p>{randomErrorMessage()}</p>
				<p
					onClick={() => {
						setDetailsOpen(!detailsOpen);
						setDetailsOpened(true);
					}}
					style={{ opacity: detailsOpened && !detailsOpen ? 0 : 1 }}
				>{`> Read more`}</p>
				<div style={styles}>
					<h2>What happened?</h2>
					<p>Circles Front Page server is not acessible at the moment</p>
					<p>I stopped loading the page for you, so it won't break</p>
					<h2>What can I do</h2>
					<p>
						Visit Circles Front Page <a href="https://discord.gg/WsXtQ9YC2d">discord</a>
					</p>
					<p>Refresh this page a couple of times, maybe you'll get a secret error message!</p>
					<p>Click read more once again to get minimalistic wallpaper</p>
					{/* add sponsor link once i find the one that works in Russia */}
				</div>
			</div>
		</div>
	);
};

export default NoConnectionPopup;

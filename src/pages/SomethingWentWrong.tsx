import { FallbackProps } from "react-error-boundary";
import "./SomethingWentWrong.css";
import randomErrorMessage from "../functions/SomethingWentWrongMessages";
import genRanHex from "../functions/GetRanHex";

const SomethingWentWrong = ({ error }: FallbackProps) => {
	const drawStack = () => {
		const spaceLength = 30;
		const stack = error.stack.split("\n");
		const stackElements = [];
		for (let i = 0; i < stack.length; i++) {
			const s = stack[i];
			const spLength = spaceLength - s.split("@")[0].length < 0 ? 0 : spaceLength - s.split("@")[0].length;
			const space = " ".repeat(spLength);
			const funct = s.split("@")[0];
			const file = (s.split("@")[1] + "").replace(`${window.location.protocol}//${window.location.host}`, "");
			stackElements.push(<p style={{ whiteSpace: "break-spaces" }} key={genRanHex(4)}>{`${funct}${space}${file}`}</p>);
		}
		return stackElements;
	};
	document.title = `CFP: Error`;
	return (
		<div className="somethingWentWrong">
			<h1 style={{ marginBottom: 0 }}>400: Something went wrong</h1>
			<h2 style={{ marginTop: 0 }}>{randomErrorMessage()}</h2>
			<h3>What happened?</h3>
			<p>The page you are trying to access causes an error, page loading has been stoped</p>
			<h3>What do I do now?</h3>
			<p>Try Reloading the page</p>
			<p>Try going on a homepage</p>
			<p>Try logging in</p>
			<p>
				<a href={`${import.meta.env.VITE_API_URL}/ping`}>Check server status</a>
			</p>
			<h3>If above steps didn't help</h3>
			<p>
				If you want to help fix this error, please copy the message below and post it in <a href="https://discord.gg/WsXtQ9YC2d">discord</a> #feedback channel or on <a href="https://github.com/ilia-21/circles-fp/issues">github</a>
			</p>
			<div className="somethingWentWrong-details">
				<h2>{error.name}</h2>
				<p>{error.message}</p>
				{drawStack()}
			</div>
		</div>
	);
};

export default SomethingWentWrong;

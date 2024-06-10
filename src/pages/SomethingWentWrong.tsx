import { FallbackProps } from "react-error-boundary";
import "./SomethingWentWrong.css";
import randomErrorMessage from "../functions/SomethingWentWrongMessages";
import { useEffect, useState } from "react";

const SomethingWentWrong = ({ error }: FallbackProps) => {
	return (
		<div className="somethingWentWrong">
			<h1 style={{ marginBottom: 0 }}>400 Something went wrong</h1>
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
			<p>
				You want to help fix this error, please copy the message below and post it in <a href="https://discord.gg/WsXtQ9YC2d">discord</a> #feedback channel or on <a href="https://github.com/ilia-21/circles-fp/issues">github</a>
			</p>
			<div className="somethingWentWrong-details">
				<h2>{error.name}</h2>
				<p>{error.message}</p>
				<p>{error.stack}</p>
			</div>
		</div>
	);
};

export default SomethingWentWrong;

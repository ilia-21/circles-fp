import "./SomethingWentWrong.css";
import randomErrorMessage from "../functions/SomethingWentWrongMessages";
interface Props {
	error?: [number, string];
	description?: string;
}

const ErrorPage = ({ error, description }: Props) => {
	document.title = "CFP: Error";
	return (
		<div className="somethingWentWrong">
			<h1 style={{ marginBottom: 0 }}>{error ? `${error[0]}: ${error[1]}` : "404: Not found"}</h1>
			<h2 style={{ marginTop: 0 }}>{description ? description : randomErrorMessage()}</h2>
			<p>
				If you think this is an error, please report it in <a href="https://discord.gg/WsXtQ9YC2d">discord</a> #feedback channel or on <a href="https://github.com/ilia-21/circles-fp">github</a>
			</p>
		</div>
	);
};

export default ErrorPage;

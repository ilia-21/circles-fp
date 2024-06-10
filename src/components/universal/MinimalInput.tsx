import "./MinimalInput.css";
interface Props {
	type?: string;
}

const MinimalInput = ({ type }: Props) => {
	type = type || "text";
	return <input className="MinimalInput" type={type} />;
};

export default MinimalInput;

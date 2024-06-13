import { marked } from "marked";
import DOMPurify from "dompurify";

interface Props {
	text: string;
}

const ParseMarkdown = ({ text }: Props) => {
	const createMarkup = () => {
		const rawHtml = marked(text);
		const sanitizedHtml = DOMPurify.sanitize(rawHtml as string);
		return { __html: sanitizedHtml };
	};

	return <div dangerouslySetInnerHTML={createMarkup()} />;
};

export default ParseMarkdown;

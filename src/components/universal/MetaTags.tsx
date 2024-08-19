import { Helmet } from "react-helmet";
const MetaTags = () => {
	return (
		<Helmet>
			<meta content="Circles Front Page" property="og:title" id="meta-title" />
			<meta content="The Pulse of osu! Competitive Play!" property="og:description" id="meta-description" />
			<meta content={window.location.href} property="og:url" id="meta-url" />
			<meta content="#88B3FA" data-react-helmet="true" name="theme-color" id="meta-color" />
			<meta content="logoEmbedV3.png" name="og:image" id="meta-image" />
			<meta name="twitter:card" content="summary_large_image" />
		</Helmet>
	);
};

export default MetaTags;

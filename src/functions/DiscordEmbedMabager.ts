const setEmbed = (title?: string, description?: string, image?: string) => {
	if (title) {
		(document.getElementById("meta-title") as HTMLMetaElement).content = `CFP: ${title}`;
	}
	if (description) {
		(document.getElementById("meta-description") as HTMLMetaElement).content = description;
	}
	if (image) {
		(document.getElementById("meta-image") as HTMLMetaElement).content = image;
	}
};
export default setEmbed;

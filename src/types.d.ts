interface Headline {
	thumbnailSrc: string;
	title: string;
	href: string;
}

interface SideNews {
	title: string;
	href: string;
}

interface News {
	id: string;
	pressName: string;
	logoImageSrc: string;
	editedTime: string;
	category: string;
	headline: Headline;
	sideNews: SideNews[];
}

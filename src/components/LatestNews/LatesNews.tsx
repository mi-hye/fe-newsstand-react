import { useEffect, useState } from "react";
import RollingNews from "./LollingNews/LollingNews";

interface Props {
	news: News[];
}

const NEWS_NUM = 50;

const randomIdx = () => ~~(Math.random() * NEWS_NUM);
const getNewsHeadlines = (news: News[]) =>
	Array.from({ length: 3 }, () => news[randomIdx()].headline);

function LatesNews({ news }: Props) {
	const [newsHeadline, setNewsHeadline] = useState<Headline[]>([]);
	useEffect(() => setNewsHeadline(getNewsHeadlines(news)), []); //지금 뉴스값 같아

	return (
		<section className="flex">
			<RollingNews margin="mr-4" newsHeadline={newsHeadline} />
			<RollingNews newsHeadline={newsHeadline} />
		</section>
	);
}

export default LatesNews;

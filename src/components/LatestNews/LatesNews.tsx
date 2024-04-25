import { useEffect, useState } from "react";
import { getTotalNews } from "../../utility/newsSetting";
import RollingNews from "./RollingNews/RollingNews";

function LatesNews() {
	const [news, setNews] = useState<News[]>([]);

	useEffect(() => {
		getTotalNews(setNews);
	}, []);

	if (!news.length) return <div className="my-5 text-xl text-center font-bold">|ω・`)ﾉ Hi..</div>;
	return (
		<section className="flex">
			<RollingNews margin="mr-4" news={news.slice(0, 50)} />
			<RollingNews news={news.slice(0, 50)} />
		</section>
	);
}

export default LatesNews;

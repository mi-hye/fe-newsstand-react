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
		<section className="flex mb-6">
			<RollingNews margin="mr-4" news={news} />
			<RollingNews news={news} />
		</section>
	);
}

export default LatesNews;

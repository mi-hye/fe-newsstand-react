import { useContext } from "react";
import { NewsContext } from "../../NewsProvider";
import RollingNews from "./RollingNews/RollingNews";

function LatesNews() {
	const [news] = useContext(NewsContext);
	if (!news.length) return <div>데이터를 불러오지 못했음</div>;
	return (
		<section className="flex">
			{/* <RollingNews margin="mr-4" news={news.slice(0, 50)} />
			<RollingNews news={news.slice(0, 50)} /> */}
		</section>
	);
}

export default LatesNews;

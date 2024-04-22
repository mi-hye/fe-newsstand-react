import { useContext } from "react";
import { NewsContext } from "../../../NewsProvider";
import CategoryTab from "./CategoryTab";
import SingleNews from "./SingleNews/SingleNews";

function TotalList() {
	const [news] = useContext(NewsContext);
	if (!news.length) return <></>;
	return (
		<div className=" border-2 border-customGray dark:border-white/40 h-full">
			<CategoryTab />
			<SingleNews singleNews={news[0]}></SingleNews>
		</div>
	);
}

export default TotalList;

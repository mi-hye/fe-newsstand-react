import { useState, useEffect } from "react";
import CategoryTab from "./CategoryTab/CategoryTab";
import SingleNews from "../shared-components/SingleNews";

const SERVER = process.env.REACT_APP_JSON_SERVER;
const ZERO = 0;

const fetchSubNews = async () => {
	try {
		const res = await fetch(`${SERVER}/subscribe`);
		const subNews = await res.json();
		return subNews;
	} catch (error) {
		console.error(error);
	}
};

function SubList() {
	const [subNews, setSubNews] = useState<News[]>([]);
	const [currCategoryIdx, setcurrCategoryIdx] = useState<number>(ZERO);

	const getSubNews = async () => {
		const subNews = await fetchSubNews();
		if (subNews) setSubNews(subNews);
	};

	useEffect(() => {
		getSubNews();
	}, []);

	if (!subNews.length) return <></>;
	return (
		<>
			<div className="border-2 border-customGray dark:border-white/40 h-full">
				<CategoryTab subNews={subNews} setcurrCategoryIdx={setcurrCategoryIdx}></CategoryTab>
				<SingleNews singleNews={subNews[currCategoryIdx]}></SingleNews>
			</div>
		</>
	);
}

export default SubList;

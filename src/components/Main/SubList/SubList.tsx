import { useState, useEffect, useContext } from "react";
import CategoryTab from "./CategoryTab/CategoryTab";
import SingleNews from "../shared-components/SingleNews";
import Swiper from "../shared-components/Swiper";
import { ViewContext } from "../ViewProvider";
import { handleSubscription } from "../../../utility/subscription";
import { Unsubscription } from "../shared-components/Subscription";

interface Props {
	page: boolean | undefined;
}

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

function SubList({ page }: Props) {
	const [subNews, setSubNews] = useState<News[]>([]);
	const [target, setTarget] = useState<News | null>(null);
	const [, dispatch] = useContext(ViewContext);
	const [currCategoryIdx, setcurrCategoryIdx] = useState<number>(ZERO);

	const getSubNews = async () => {
		const subNews = await fetchSubNews();
		if (subNews) setSubNews(subNews);
	};

	useEffect(() => {
		getSubNews();
	}, []);

	useEffect(() => {
		if (subNews.length) page && setcurrCategoryIdx(subNews.length - 1);
	}, [page, subNews]);

	if (!subNews.length || subNews.length <= currCategoryIdx)
		return (
			<div className="absolute top-1/3 left-[15%] text-9xl dark:text-white animate-bounce">
				Σ(´・ω・｀)
			</div>
		);
	return (
		<>
			<div
				onClick={(e) => handleSubscription(e, setTarget, dispatch)}
				className="border-2 border-customGray dark:border-white/40 h-full"
			>
				<CategoryTab
					subNews={subNews}
					currCategoryIdx={currCategoryIdx}
					setcurrCategoryIdx={setcurrCategoryIdx}
				></CategoryTab>
				<SingleNews singleNews={subNews[currCategoryIdx]}></SingleNews>
			</div>
			<Swiper
				lastPage={subNews.length - 1}
				currentPage={currCategoryIdx}
				setCurrentPage={setcurrCategoryIdx}
				isGrid={false}
			></Swiper>
			{target && <Unsubscription target={target} setTarget={setTarget} getNews={getSubNews} />}
		</>
	);
}
export default SubList;

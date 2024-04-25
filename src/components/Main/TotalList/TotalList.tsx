import { useContext, useState, useEffect } from "react";
import CategoryTab from "./CategoryTab/CategoryTab";
import SingleNews from "../shared-components/SingleNews";
import Swiper from "../shared-components/Swiper";
import { handleSubscription } from "../../../utility/subscription";
import { ViewContext } from "../ViewProvider";
import { Unsubscription, Subscription } from "../shared-components/Subscription";

const SERVER = process.env.REACT_APP_JSON_SERVER;
const ZERO = 0;
const LAST_PAGE = 213;

const fetchTotalNews = async () => {
	try {
		const res = await fetch(`${SERVER}/news`);
		const totalNews = await res.json();
		return totalNews;
	} catch (error) {
		console.error(error);
	}
};

function TotalList() {
	const [totalNews, setTotalNews] = useState<News[]>([]);
	const [, dispatch] = useContext(ViewContext);
	const [target, setTarget] = useState<News | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(ZERO);

	const getTotalListNews = async () => {
		const totalNews = await fetchTotalNews();
		if (totalNews) setTotalNews(totalNews);
	};

	useEffect(() => {
		getTotalListNews();
	}, []);

	if (!totalNews.length) return <></>;
	return (
		<>
			<div
				onClick={(e) => handleSubscription(e, setTarget, dispatch)}
				className="border-2 border-customGray dark:border-white/40 h-full"
			>
				<CategoryTab currentPage={currentPage} setCurrentPage={setCurrentPage} />
				<SingleNews singleNews={totalNews[currentPage]} />
			</div>
			<Swiper
				lastPage={LAST_PAGE}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				isGrid={false}
			/>
			{target &&
				(target.subscription ? (
					<Unsubscription target={target} setTarget={setTarget} getNews={getTotalListNews} />
				) : (
					<Subscription />
				))}
		</>
	);
}

export default TotalList;

import { useEffect, useState, useContext } from "react";
import { handleSubscription } from "../../../utility/subscription";
import { ViewContext } from "../ViewProvider";
import Swiper from "../shared-components/Swiper";
import { Unsubscription, Subscription } from "../shared-components/Subscription";

const SERVER = process.env.REACT_APP_JSON_SERVER;
const CELL_COUNT = 24;
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

function SubGrid() {
	const [subNews, setSubNews] = useState<News[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(ZERO);
	const [target, setTarget] = useState<News | null>(null);
	const [, dispatch] = useContext(ViewContext);
	const startIdx = currentPage * CELL_COUNT;
	const lastIdx = subNews.length - 1;

	const getSubNews = async () => {
		const subNews = await fetchSubNews();
		if (subNews) setSubNews(subNews);
	};

	useEffect(() => {
		getSubNews();
	}, []);

	return (
		<>
			<div
				onClick={(e) => handleSubscription(e, setTarget, dispatch)}
				className=" border-t-2 border-l-2 border-customGray dark:border-white/40 h-full grid grid-rows-4 grid-cols-6"
			>
				{Array.from({ length: CELL_COUNT }).map((_, i) => {
					if (startIdx + i <= lastIdx) {
						const currNews = subNews[startIdx + i];
						return (
							<div
								key={currNews.id}
								className="group border-b-2 border-r-2 border-customGray flex justify-center items-center hover:bg-news-gray/10 dark:border-white/40 dark:hover:bg-news-gray/30"
							>
								<img
									className="h-6 relative group-hover:opacity-0"
									src={currNews.logoImageSrc}
									alt={currNews.pressName}
								></img>
								<button
									id={currNews.id}
									onClick={getSubNews}
									className="absolute opacity-0 text-gray-400 group-hover:opacity-100 border-2 text-xs rounded-xl px-2 py-0.5 bg-white dark:bg-white/100"
								>
									해지하기
								</button>
							</div>
						);
					}
					return (
						<div
							key={i}
							className="group border-b-2 border-r-2 border-customGray flex justify-center items-center hover:bg-news-gray/10 dark:border-white/40 dark:hover:bg-news-gray/30"
						></div>
					);
				})}
			</div>
			<Swiper
				lastPage={~~(subNews.length / 24)}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				isGrid={true}
			/>
			{target && <Unsubscription target={target} setTarget={setTarget} getSubNews={getSubNews} />}
		</>
	);
}

export default SubGrid;

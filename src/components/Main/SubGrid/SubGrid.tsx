import { SetStateAction, useEffect, useState } from "react";
import handleSubscription from "../../../utility/subscription";

const SERVER = process.env.REACT_APP_JSON_SERVER;
const CELL_COUNT = 24;

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

	const getSubNews = async () => {
		const subNews = await fetchSubNews();
		if (subNews) setSubNews(subNews);
	};

	useEffect(() => {
		getSubNews();
	}, [subNews]);

	return (
		<>
			<div
				onClick={handleSubscription}
				className=" border-t-2 border-l-2 border-customGray dark:border-white/40 h-full grid grid-rows-4 grid-cols-6"
			>
				{subNews.length ? (
					subNews.map((news) => {
						return (
							<div
								key={news.id}
								className="group border-b-2 border-r-2 border-customGray flex justify-center items-center hover:bg-news-gray/10 dark:border-white/40 dark:hover:bg-news-gray/30"
							>
								<img
									className="h-6 relative group-hover:opacity-0"
									src={news.logoImageSrc}
									alt={news.pressName}
								></img>
								<button
									id={news.id}
									onClick={getSubNews}
									className="absolute opacity-0 text-gray-400 group-hover:opacity-100 border-2 text-xs rounded-xl px-2 py-0.5 bg-white dark:bg-white/100"
								>
									해지하기
								</button>
							</div>
						);
					})
				) : (
					<></>
				)}
				{Array.from({ length: CELL_COUNT - subNews.length }).map((_, i) => (
					<div
						key={i}
						className="group border-b-2 border-r-2 border-customGray flex justify-center items-center hover:bg-news-gray/10 dark:border-white/40 dark:hover:bg-news-gray/30"
					></div>
				))}
			</div>
		</>
	);
}

export default SubGrid;

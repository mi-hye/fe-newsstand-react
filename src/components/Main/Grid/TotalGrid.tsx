import { useState, useContext } from "react";
import Swiper from "./Swiper";
import { NewsContext } from "../../../NewsProvider";

//TODO 구독하기 만들어야함
function subscribe({ target }: React.MouseEvent<HTMLElement>) {
	const $target = target as HTMLElement;
	if ($target.tagName === "BUTTON") console.log($target);
}

const GRID_TOTAL_NUM = 96;
const CELL_COUNT = 24;
const ZERO = 0;

const getTotalGridNews = (news: News[]) =>
	news.slice(ZERO, GRID_TOTAL_NUM).sort(() => Math.random() - 0.5);

function TotalGrid() {
	const [news] = useContext(NewsContext);
	const [currentPage, setCurrentPage] = useState<number>(ZERO);
	if (!news.length) return <></>;

	const startIdx = currentPage * CELL_COUNT;
	const gridNews = getTotalGridNews(news);
	return (
		<>
			<div
				onClick={subscribe}
				className=" border-t-2 border-l-2 border-customGray dark:border-white/40 h-full grid grid-rows-4 grid-cols-6"
			>
				{Array.from({ length: CELL_COUNT }).map((_, i) => {
					const currNews = gridNews[startIdx + i];
					return (
						<div
							key={currNews.id}
							className="group border-b-2 border-r-2 border-customGray flex justify-center items-center hover:bg-news-gray/10  dark:border-white/40 dark:hover:bg-news-gray/30"
						>
							<img
								className="h-6 relative group-hover:opacity-0"
								src={currNews.logoImageSrc}
								alt={currNews.pressName}
							></img>
							<button
								id={currNews.id}
								className="absolute opacity-0 text-gray-400 group-hover:opacity-100 border-2 text-xs rounded-xl px-2 py-0.5 bg-white dark:bg-white/100"
							>
								{currNews.subscription ? "해지하기" : "+"}
							</button>
						</div>
					);
				})}
			</div>
			<Swiper lastPage={3} currentPage={currentPage} setCurrentPage={setCurrentPage} />
		</>
	);
}

export default TotalGrid;

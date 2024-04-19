interface Props {
	news: News[];
}

const GRID_TOTAL_NUM = 96;

const getTotalGridNews = (news: News[]) =>
	news.slice(0, GRID_TOTAL_NUM).sort(() => Math.random() - 0.5);

function TotalGrid({ news }: Props) {
	const gridNews = getTotalGridNews(news);

	return (
		<div className="h-full grid grid-rows-4 grid-cols-6">
			{Array.from({ length: 24 }).map((_, i) => (
				<div className="border-b-2 border-r-2 border-customGray flex justify-center items-center hover:bg-news-gray/10 dark:border-white/40">
					<img className="h-6" src={gridNews[i].logoImageSrc} alt={gridNews[i].id}></img>
				</div>
			))}
		</div>
	);
}

export default TotalGrid;

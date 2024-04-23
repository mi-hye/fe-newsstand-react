interface Props {
	singleNews: News;
}

function SingleNews({ singleNews }: Props) {
	const { id, logoImageSrc, headline, editedTime, subscription, pressName, sideNews } = singleNews;
	return (
		<>
			<div className="flex items-center h-[10%] mx-10 my-2">
				<a className="" href={headline.href}>
					<img className="h-[20px] mr-4" src={logoImageSrc} alt=""></img>
				</a>
				<span className="mr-4 text-sm dark:text-white/60">{editedTime}</span>
				<button
					id={id}
					className=" flex items-center text-news-gray border-2 text-xs rounded-xl px-2 py-0.5 bg-white dark:bg-customGray dark:text-white/60"
				>
					{subscription ? "해지하기" : "+ 구독하기"}
				</button>
			</div>
			<div className="h-[77%] flex">
				<div className="flex flex-col h-full w-[40%] mx-10">
					<a href={headline.href}>
						<img className="w-[330px]" src={headline.thumbnailSrc} alt={pressName}></img>
					</a>
					<a className="w-[330px] font-bold my-3 text-sm dark:text-white" href={headline.href}>
						{headline.title}
					</a>
				</div>
				<ul className="h-full w-[60%] mx-4">
					{sideNews.map((news, i) => (
						<li key={i} className={`${i > 0 ? "my-4" : ""}`}>
							<a className="text-gray-700 dark:text-white/70 text-sm" href={news.href}>
								{news.title}
							</a>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default SingleNews;

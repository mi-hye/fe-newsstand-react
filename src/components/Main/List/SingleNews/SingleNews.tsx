interface Props {
	singleNews: News;
}

function SingleNews({ singleNews }: Props) {
	const { id, logoImageSrc, headline, editedTime, subscription } = singleNews;
	console.log(singleNews);
	return (
		<>
			<div className="flex items-center h-[10%] ml-4">
				<a className="" href={headline.href}>
					<img className="h-[20px] mr-4" src={logoImageSrc} alt=""></img>
				</a>
				<span className="mr-4 text-sm dark:text-white/60">{editedTime}</span>
				<button
					id={id}
					className=" flex items-center text-news-gray border-2 text-xs rounded-xl px-2 py-0.5 bg-white dark:bg-customGray dark:text-white/60"
				>
					{subscription ? "해지하기" : "+"}
				</button>
			</div>
			<div className="bg-sky-300/10 h-[81%]"></div>
		</>
	);
}

export default SingleNews;

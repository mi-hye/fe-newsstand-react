import { useEffect, useState } from "react";

interface Props {
	margin?: string;
	news: News[];
}

interface SingleHeadlineProps {
	animate: string;
	news: News[];
}

const NEWS_NUM = 50;
const ANIMATION_DELAY = 10000;
const getRandomSingleHeadline = (news: News[]) => news[~~(Math.random() * NEWS_NUM)].headline;

function RollingNews({ margin = "", news }: Props) {
	return (
		<div
			className={`my-1 p-2 w-1/2 ${margin} border-2 border-customGray bg-customGray flex items-center`}
		>
			<span className="mx-2 text-sm font-bold dark:text-white">연합뉴스</span>
			<div className="mx-2 overflow-hidden flex flex-col relative w-4/5 h-5  whitespace-nowrap">
				<SingleHeadline animate="animate-rolling" news={news}></SingleHeadline>
				<SingleHeadline animate="animate-rollingDelay top-10" news={news}></SingleHeadline>
			</div>
		</div>
	);
}

function SingleHeadline({ animate, news }: SingleHeadlineProps) {
	const [singleHeadline, setSingleHeadline] = useState<Headline>();

	useEffect(() => {
		setSingleHeadline(getRandomSingleHeadline(news));
		setInterval(() => {
			setSingleHeadline(getRandomSingleHeadline(news));
		}, ANIMATION_DELAY);
	}, []);

	if (!singleHeadline) return <></>;
	return (
		<a
			key={singleHeadline.href}
			href={singleHeadline.href}
			className={`cursor-pointer hover:underline top-0.5 font-light text-xs absolute w-full overflow-hidden text-ellipsis dark:text-white/90 ${animate}`}
		>
			{singleHeadline.title}
		</a>
	);
}

export default RollingNews;

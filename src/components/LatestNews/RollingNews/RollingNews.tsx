import { useEffect, useState } from "react";

const NEWS_NUM = 50;
type ReactDispatch = React.Dispatch<React.SetStateAction<Headline[]>>;

interface Props {
	margin?: string;
	news: News[];
}

interface Style {
	[key: string]: string;
}

const style: Style = {
	common:
		"cursor-pointer hover:underline font-light text-xs absolute w-full overflow-hidden text-ellipsis dark:text-white/90 animate-rolling",
	0: "top-0.5 ",
	1: "top-10 ",
};

const randomIdx = () => ~~(Math.random() * NEWS_NUM);
const getNewsHeadlines = (news: News[]) =>
	Array.from({ length: 2 }, () => news[randomIdx()].headline);
const updateTop = (newsHeadline: Headline[], news: News[], setNewsHeadline: ReactDispatch) => {
	const [, second] = newsHeadline;
	setNewsHeadline([news[randomIdx()].headline, second]);
	// const updatedHeadline =
	// newsHeadline.push(news[randomIdx()].headline);
};
// const updateBottom = (newsHeadline: Headline[], news: News[], setNewsHeadline: ReactDispatch) => {
// 	const [first, _] = newsHeadline;
// 	setNewsHeadline([first, news[randomIdx()].headline]);
// };

//FIXME refactoring 예정
function RollingNews({ margin = "", news }: Props) {
	const [newsHeadline, setNewsHeadline] = useState<Headline[]>([]);
	useEffect(() => setNewsHeadline(getNewsHeadlines(news)), []);
	useEffect(() => {
		setTimeout(() => updateTop(newsHeadline, news, setNewsHeadline), 9000);
	}, [newsHeadline]);
	//
	// useEffect(() => {
	// 	setTimeout(() => updateBottom(newsHeadline, news, setNewsHeadline), 4000);
	// }, []);

	return (
		<div
			className={`my-1 p-2 w-1/2 ${margin} border-2 border-customGray bg-customGray flex items-center`}
		>
			<span className="mx-2 text-sm font-bold dark:text-white">연합뉴스</span>
			<div className="mx-2 flex flex-col relative w-4/5 h-5 overflow-hidden whitespace-nowrap">
				{newsHeadline.map((headline, i) => (
					<a key={i} href={headline.href} className={`${style.common} ${style?.[i]}`}>
						{headline.title}
					</a>
				))}
			</div>
		</div>
	);
}

export default RollingNews;

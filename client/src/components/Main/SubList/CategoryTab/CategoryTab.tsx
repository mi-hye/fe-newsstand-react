import React, { SetStateAction } from "react";

type Dispatcher = React.Dispatch<SetStateAction<number>>;
interface Props {
	subNews: News[];
	currCategoryIdx: number;
	setcurrCategoryIdx: Dispatcher;
}

const style = "pr-14 text-white bg-news-blue/40";

function CategoryTab({ subNews, currCategoryIdx, setcurrCategoryIdx }: Props) {
	const onClick = ({ target }: React.MouseEvent<HTMLElement>) => {
		const $liList = (target as HTMLElement).closest("ul")?.childNodes as NodeListOf<ChildNode>;
		const $li = (target as HTMLElement).closest("li") as HTMLElement;
		const idx = [...$liList].indexOf($li);
		setcurrCategoryIdx(idx);
	};
	return (
		<ul
			onClick={onClick}
			className="bg-customGray flex border-b-2 border-customGray dark:border-white/40 h-10"
			role="tablist"
		>
			{subNews.map((news, i) => (
				<li
					key={news.id}
					className={`relative flex items-center pl-1 cursor-pointer transition-[padding] ease-in-out duration-500
					${currCategoryIdx === i ? style : ""}`}
				>
					<span
						className={`relative text-news-gray text-sm flex m-2 z-10 ${
							currCategoryIdx === i ? "text-white" : ""
						}`}
					>
						{news.pressName}
					</span>
					{currCategoryIdx === i ? (
						<span className="absolute top-0 left-0 h-full z-0 bg-news-blue w-full animate-fill"></span>
					) : (
						<></>
					)}
				</li>
			))}
		</ul>
	);
}

export default CategoryTab;

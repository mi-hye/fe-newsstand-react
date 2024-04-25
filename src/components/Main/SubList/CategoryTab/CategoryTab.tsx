import React, { SetStateAction } from "react";
type Dispatcher = React.Dispatch<SetStateAction<number>>;

interface Props {
	subNews: News[];
	setcurrCategoryIdx: Dispatcher;
}

function CategoryTab({ subNews, setcurrCategoryIdx }: Props) {
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
					className="relative flex items-center mr-2 cursor-pointer transition-[padding] ease-in-out duration-500"
				>
					<span className="relative text-news-gray text-sm flex m-2 z-10 ">{news.pressName}</span>
				</li>
			))}
		</ul>
	);
}

export default CategoryTab;

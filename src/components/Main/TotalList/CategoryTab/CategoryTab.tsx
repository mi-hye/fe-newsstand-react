import { SetStateAction, useContext, useEffect, useState } from "react";
import { NewsContext } from "../../../../NewsProvider";

interface PageProps {
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

interface CategoryLength {
	[key: string]: {
		[key: string]: number;
	};
}
interface Param {
	currentPage: number;
	currCategory: string;
	length: number;
	startIdx: number;
	setCurrCategory: React.Dispatch<SetStateAction<string>>;
	currCategoryIdx: number;
}

const style = "pr-14 text-white bg-news-blue/40";
const ANIMATION_DURATION = 6000;
const LIST_LAST_PAGE = 213;
const LIST_FIRST_PAGE = 0;
const categories = [
	"종합/경제",
	"방송/통신",
	"IT",
	"영자지",
	"스포츠/연예",
	"매거진/전문지",
	"지역",
];

const changeCategory = (param: Param) => {
	const { currentPage, currCategory, length, startIdx, setCurrCategory, currCategoryIdx } = param;
	const nextCategory =
		currCategoryIdx === categories.length - 1 ? categories[0] : categories[currCategoryIdx + 1];
	const prevCategory = currCategoryIdx
		? categories[currCategoryIdx - 1]
		: categories[categories.length - 1];
	const lastCategoryPage = currentPage === length + startIdx;
	const lastPage = !currentPage && currCategory === "지역";
	const firstCategoryPage = currentPage === startIdx - 1;
	const firstPage = currentPage === LIST_LAST_PAGE && currCategory === "종합/경제";

	if (lastCategoryPage) {
		setCurrCategory(nextCategory);
		return;
	}
	if (lastPage) {
		setCurrCategory(nextCategory);
		return;
	}
	if (firstCategoryPage) {
		setCurrCategory(prevCategory);
		return;
	}
	if (firstPage) setCurrCategory(prevCategory);
};

function CategoryTab({ currentPage, setCurrentPage }: PageProps) {
	const [categoryLength]: [CategoryLength] = useContext(NewsContext);
	const [currCategory, setCurrCategory] = useState("종합/경제");

	const onClick = ({ target }: React.MouseEvent<HTMLElement>) => {
		const $target = target as HTMLElement;
		const $li = $target.closest("li") as HTMLElement;
		if ($li) {
			const [$categoryText] = $li.childNodes;
			const currText = ($categoryText as HTMLElement).innerHTML;
			setCurrCategory(currText);
			setCurrentPage(categoryLength[currText].startIdx);
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			if (currentPage === LIST_LAST_PAGE) {
				setCurrCategory("종합/경제");
				setCurrentPage(LIST_FIRST_PAGE);
			} else setCurrentPage((prev) => prev + 1);
		}, ANIMATION_DURATION);
		return () => clearInterval(interval);
	});

	useEffect(() => {
		const { length, startIdx } = categoryLength[currCategory];
		const currCategoryIdx = categories.indexOf(currCategory);
		const param = { currentPage, currCategory, length, startIdx, setCurrCategory, currCategoryIdx };
		changeCategory(param);
	}, [categoryLength, currCategory, currentPage]);
	return (
		<ul
			onClick={onClick}
			className="bg-customGray flex border-b-2 border-customGray dark:border-white/40 h-10"
			role="tablist"
		>
			{categories.map((category, i) => (
				<li
					className={`relative flex items-center pl-1 cursor-pointer transition-[padding] ease-in-out duration-500 ${
						category === currCategory ? style : ""
					}`}
					key={i}
				>
					<span
						className={`relative text-news-gray text-sm flex m-2 z-10 ${
							category === currCategory ? "text-white" : ""
						}`}
					>
						{category}
					</span>
					{category === currCategory ? (
						<>
							<div className="absolute top-[11.5px] right-2 z-10 text-[10px]">
								<span>{currentPage + 1 - categoryLength[currCategory].startIdx}</span>
								<span> / {categoryLength[currCategory].length}</span>
							</div>
							<span
								key={currentPage}
								className="absolute top-0 left-0 h-full z-0 bg-news-blue w-full animate-fill"
							></span>
						</>
					) : (
						""
					)}
				</li>
			))}
		</ul>
	);
}

export default CategoryTab;

import { useContext, useEffect, useState } from "react";
import { NewsContext } from "../../../NewsProvider";

interface PageProps {
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
interface CategoryProps {
	currCategory: string;
	currentPage: number;
	categoryLength: CategoryLength;
}

interface CategoryLength {
	[key: string]: {
		[key: string]: number;
	};
}

const style = "pr-14 text-white bg-news-blue/40";
const ANIMATION_DURATION = 6000;
const categories = [
	"종합/경제",
	"방송/통신",
	"IT",
	"영자지",
	"스포츠/연예",
	"매거진/전문지",
	"지역",
];

const TotalCategory = ({ currentPage, currCategory, categoryLength }: CategoryProps) => {
	return (
		<>
			{categories.map((category, i) => (
				<li
					className={`relative mr-2 cursor-pointer transition-[padding] ease-in-out duration-500 h-[106%] ${
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
							<div className="absolute top-[10px] right-2 z-10 text-[10px]">
								<span>{currentPage + 1 - categoryLength[currCategory].startIdx}</span>
								<span> / {categoryLength[currCategory].length}</span>
							</div>
							<span
								key={currentPage}
								className="absolute top-0 h-full z-0 bg-news-blue w-full animate-fill"
							></span>
						</>
					) : (
						""
					)}
				</li>
			))}
		</>
	);
};

function CategoryTab({ currentPage, setCurrentPage }: PageProps) {
	const [, categoryLength]: [News[], CategoryLength] = useContext(NewsContext);
	const [currCategory, setCurrCategory] = useState("종합/경제");
	const onClick = ({ target }: React.MouseEvent<HTMLElement>) => {
		const $target = target as HTMLElement;
		const $li = $target.closest("li") as HTMLElement;
		if ($li) {
			const currText = $li.innerText;
			setCurrCategory(currText);
			setCurrentPage(categoryLength[currText].startIdx);
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			if (currentPage === 213) {
				setCurrCategory("종합/경제");
				setCurrentPage(0);
			} else setCurrentPage((prev) => prev + 1);
		}, ANIMATION_DURATION);
		return () => clearInterval(interval);
	});

	useEffect(() => {
		const { length, startIdx } = categoryLength[currCategory];
		if (currentPage === length + startIdx) {
			const currCategoryIdx = categories.indexOf(currCategory);
			const nextCategory = categories[currCategoryIdx + 1];
			setCurrCategory(nextCategory);
		}
	}, [currentPage]);
	return (
		<ul
			onClick={onClick}
			className="bg-customGray flex items-center border-b-2 border-customGray dark:border-white/40 h-10"
			role="tablist"
		>
			<TotalCategory
				currentPage={currentPage}
				currCategory={currCategory}
				categoryLength={categoryLength}
			/>
		</ul>
	);
}

export default CategoryTab;

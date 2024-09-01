interface Props {
	lastPage: number;
	currentPage: number;
	isGrid: boolean;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const FIRST_PAGE = 0;

function Swiper({ lastPage, currentPage, setCurrentPage, isGrid }: Props) {
	const clickLeft = () =>
		setCurrentPage((prev) => {
			if (prev > FIRST_PAGE) return prev - 1;
			if (isGrid) return FIRST_PAGE;
			return lastPage;
		});

	const clickRight = () =>
		setCurrentPage((prev) => {
			if (prev < lastPage) return prev + 1;
			if (isGrid) return lastPage;
			return FIRST_PAGE;
		});

	return (
		<div className="absolute top-[42%] text-[70px] text-news-gray/50 dark:text-white/60">
			<i
				onClick={clickLeft}
				className={`fa-solid fa-chevron-left absolute cursor-pointer left-[-70px] hover:text-news-gray transition ${
					isGrid && (currentPage ? "opacity-100" : "opacity-0 cursor-default")
				}`}
			></i>
			<i
				onClick={clickRight}
				className={`fa-solid fa-chevron-right absolute cursor-pointer right-[-1070px] hover:text-news-gray transition ${
					isGrid && (currentPage === lastPage ? "opacity-0 cursor-default" : "opacity-100")
				}`}
			></i>
		</div>
	);
}

export default Swiper;

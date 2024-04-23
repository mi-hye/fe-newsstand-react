interface Props {
	lastPage: number;
	currentPage: number;
	isGrid: boolean;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const FIRST_PAGE = 0;

function Swiper({ lastPage, currentPage, setCurrentPage, isGrid }: Props) {
	//TODO 중복값 리펙토링 예정
	const clickGridLeft = () =>
		setCurrentPage((prev) => {
			if (prev > FIRST_PAGE) return prev - 1;
			return FIRST_PAGE;
		});

	const clickGridRight = () =>
		setCurrentPage((prev) => {
			if (prev < lastPage) return prev + 1;
			return lastPage;
		});

	const clickListLeft = () => {
		setCurrentPage((prev) => {
			if (prev > FIRST_PAGE) return prev - 1;
			return lastPage;
		});
	};
	const ClickListRight = () => {
		setCurrentPage((prev) => {
			if (prev < lastPage) return prev + 1;
			return FIRST_PAGE;
		});
	};

	return (
		<div className="absolute top-[57%] text-[70px] text-news-gray/50 dark:text-white/60">
			<i
				onClick={isGrid ? clickGridLeft : clickListLeft}
				className={`fa-solid fa-chevron-left absolute cursor-pointer left-[-70px] hover:text-news-gray transition ${
					isGrid && (currentPage ? "opacity-100" : "opacity-0")
				}`}
			></i>
			<i
				onClick={isGrid ? clickGridRight : ClickListRight}
				className={`fa-solid fa-chevron-right absolute cursor-pointer right-[-1070px] hover:text-news-gray transition ${
					isGrid && (currentPage === lastPage ? "opacity-0" : "opacity-100")
				}`}
			></i>
		</div>
	);
}

export default Swiper;

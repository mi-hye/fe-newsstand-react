interface Props {
	margin?: string;
}

function News({ margin = "" }: Props) {
	return (
		<div
			className={`my-1 p-2 w-1/2 ${margin} border-2 border-customGray bg-customGray flex items-center`}
		>
			<span className="mx-2 text-sm font-bold dark:text-white">연합뉴스</span>
			<div className="mx-2 flex">
				<a className="cursor-pointer hover:underline font-light pb-1 dark:text-white/80">
					sssssssssss
				</a>
			</div>
		</div>
	);
}

function LatesNews() {
	return (
		<section className="flex">
			<News margin="mr-4" />
			<News />
		</section>
	);
}

export default LatesNews;

import RollingNews from "./RollingNews/RollingNews";

interface Props {
	news: News[];
}

function LatesNews({ news }: Props) {
	return (
		<section className="flex">
			<RollingNews margin="mr-4" news={news} />
			<RollingNews news={news} />
		</section>
	);
}

export default LatesNews;

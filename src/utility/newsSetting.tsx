const SERVER = process.env.REACT_APP_JSON_SERVER;
const GRID_TOTAL_NUM = 96;
const ZERO = 0;
const suffleGridNews = (news: News[]) =>
	news.slice(ZERO, GRID_TOTAL_NUM).sort(() => Math.random() - 0.5);

const fetchTotalNews = async () => {
	try {
		const res = await fetch(`${SERVER}/news`);
		const totalNews = await res.json();
		return totalNews;
	} catch (error) {
		console.error(error);
	}
};

const fetchSubNews = async () => {
	try {
		const res = await fetch(`${SERVER}/subscribe`);
		const subNews = await res.json();
		return subNews;
	} catch (error) {
		console.error(error);
	}
};

const getTotalGridNews = async (setNews: React.Dispatch<React.SetStateAction<News[]>>) => {
	const totalNews = await fetchTotalNews();
	if (totalNews) setNews(suffleGridNews(totalNews));
};

const getTotalNews = async (setNews: React.Dispatch<React.SetStateAction<News[]>>) => {
	const totalNews = await fetchTotalNews();
	if (totalNews) setNews(totalNews);
};

const getSubNews = async (setSubNews: React.Dispatch<React.SetStateAction<News[]>>) => {
	const subNews = await fetchSubNews();
	if (subNews) setSubNews(subNews);
};

export { getTotalGridNews, getTotalNews, getSubNews };

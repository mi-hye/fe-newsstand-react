import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import LatesNews from "./components/LatestNews/LatesNews";

const NEWS_NUM = 50;

function App() {
	const [news, setNews] = useState<News[] | undefined>();
	useEffect(() => {
		fetch(`http://localhost:3001/news`)
			.then((res) => res.json())
			.then((news) => setNews(news))
			.catch((err) => console.error(err));
	}, []);

	return (
		<div className="flex justify-center items-center w-screen h-screen dark:bg-slate-950">
			<div className="w-1000 h-600">
				<Header />
				{news ? <LatesNews news={news.slice(0, NEWS_NUM)} /> : <div>데이터를 불러오지 못했음</div>}
				<div>늉</div>
			</div>
		</div>
	);
}

export default App;

import { createContext, useState, useEffect } from "react";

interface Props {
	children: React.ReactNode;
}
const SERVER = process.env.REACT_APP_JSON_SERVER;
const NewsContext = createContext<[News[]]>([[]]);

function NewsProvider({ children }: Props) {
	const [news, setNews] = useState<News[]>([]);
	useEffect(() => {
		const fetchNews = async () => {
			try {
				const res = await fetch(`${SERVER}/news`);
				const news = await res.json();
				setNews(news);
			} catch (error) {
				console.error(error);
			}
		};
		fetchNews();
	}, []);
	return <NewsContext.Provider value={[news]}>{children}</NewsContext.Provider>;
}

export { NewsContext, NewsProvider };

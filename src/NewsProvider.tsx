import { createContext, useState, useEffect } from "react";

interface Props {
	children: React.ReactNode;
}
const SERVER = process.env.REACT_APP_JSON_SERVER;

const NewsContext = createContext<[News[], React.Dispatch<React.SetStateAction<News[]>>]>([
	[],
	() => {},
]);

function NewsProvider(props: Props) {
	const [news, setNews] = useState<News[]>([]);
	useEffect(() => {
		fetch(`${SERVER}/news`)
			.then((res) => res.json())
			.then((news) => setNews(news))
			.catch((err) => console.error(err));
	}, []);
	return <NewsContext.Provider value={[news, setNews]}>{props.children}</NewsContext.Provider>;
}

export { NewsContext, NewsProvider };

import { createContext, useState, useEffect } from "react";

interface CategoryInfo {
	[key: string]: {
		length: number;
		startIdx: number;
	};
}

interface Props {
	children: React.ReactNode;
}
const SERVER = process.env.REACT_APP_JSON_SERVER;
const NewsContext = createContext<[{}]>([{}]);

const APIs = {
	CATEGORY_ECONOMY: `${SERVER}/news?category=종합/경제`,
	CATEGORY_FINANCE: `${SERVER}/news?category=방송/통신`,
	CATEGORY_IT: `${SERVER}/news?category=IT`,
	CATEGORY_ENGLISH_NEWS: `${SERVER}/news?category=영자지`,
	CATEGORY_SPORTS: `${SERVER}/news?category=스포츠/연예`,
	CATEGORY_MAGAZINE: `${SERVER}/news?category=매거진/전문지`,
	CATEGORY_REGION: `${SERVER}/news?category=지역`,
};

function NewsProvider({ children }: Props) {
	const [categoryLength, setCategoryLength] = useState<{}>({});

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const res = Object.values(APIs).map((api) => fetch(api));
				const promiseRes = await Promise.all(res);

				let startIdx = 0;
				const categoryInfo: CategoryInfo = {};
				for (const promise of promiseRes) {
					const category = await promise.json();
					categoryInfo[category[0].category] = { length: category.length, startIdx: startIdx };
					startIdx += category.length;
				}
				setCategoryLength(categoryInfo);
			} catch (error) {
				console.error(error);
			}
		};
		fetchNews();
	}, []);

	return <NewsContext.Provider value={[categoryLength]}>{children}</NewsContext.Provider>;
}

export { NewsContext, NewsProvider };

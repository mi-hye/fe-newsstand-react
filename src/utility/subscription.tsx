const SERVER = process.env.REACT_APP_JSON_SERVER;

const subscribe = (targetNews: News) =>
	fetch(`${SERVER}/subscribe`, {
		method: "POST",
		body: JSON.stringify(targetNews),
	});

const unsubscribe = (targetNews: News, id: string) =>
	fetch(`${SERVER}/subscribe/${id}`, {
		method: "DELETE",
		body: JSON.stringify(targetNews),
	});

const updateNews = (targetNews: News, id: string) =>
	fetch(`${SERVER}/news/${id}`, {
		method: "PUT",
		body: JSON.stringify(targetNews),
	});

const fetchTargetNews = async (id: string): Promise<News | undefined> => {
	try {
		const res = await fetch(`${SERVER}/news/${id}`);
		const targetNews = await res.json();
		return targetNews;
	} catch (error) {
		console.error(error);
	}
};

async function handleSubscription({ target }: React.MouseEvent<HTMLElement>) {
	const $target = target as HTMLElement;
	if ($target.tagName === "BUTTON") {
		const targetNews = await fetchTargetNews($target.id);
		if (targetNews) {
			targetNews.subscription = targetNews.subscription ? false : true;
			targetNews.subscription ? subscribe(targetNews) : unsubscribe(targetNews, $target.id);
			updateNews(targetNews, $target.id);
		}
	}
}

export default handleSubscription;

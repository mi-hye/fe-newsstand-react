type SetTarget = React.Dispatch<React.SetStateAction<News | null>>;
type Dispatch = React.Dispatch<Action>;
interface Action {
	type: string;
	payload?: true | undefined;
}

const SERVER = process.env.REACT_APP_JSON_SERVER;
const MODAL_DELAY = 1000;

const fetchSubscribe = (targetNews: News, id: string) => {
	updateNews(targetNews, id);
	fetch(`${SERVER}/subscribe`, {
		method: "POST",
		body: JSON.stringify(targetNews),
	});
};

const fetchUnsubscribe = async (targetNews: News, id: string) => {
	updateNews(targetNews, id);
	await fetch(`${SERVER}/subscribe/${id}`, {
		method: "DELETE",
		body: JSON.stringify(targetNews),
	});
};

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

async function handleSubscription(
	{ target }: React.MouseEvent<HTMLElement>,
	setTarget: SetTarget,
	dispatch: Dispatch
) {
	const $target = target as HTMLElement;
	if ($target.tagName !== "BUTTON") return;

	const targetNews = await fetchTargetNews($target.id);
	if (!targetNews) return;

	setTarget(targetNews);
	if (!targetNews.subscription) subscribe(targetNews, $target.id, setTarget, dispatch);
}

function subscribe(targetNews: News, id: string, setTarget: SetTarget, dispatch: Dispatch) {
	const updatetargetNews = { ...targetNews, subscription: true };
	fetchSubscribe(updatetargetNews, id);
	setTimeout(() => {
		setTarget(null);
		dispatch({ type: "SET_VIEW_SUB", payload: true });
	}, MODAL_DELAY);
}

async function unsubscribe(targetNews: News, id: string, setTarget: SetTarget) {
	const updatetargetNews = { ...targetNews, subscription: false };
	await fetchUnsubscribe(updatetargetNews, id);
	setTarget(null);
}

export { handleSubscription, unsubscribe };

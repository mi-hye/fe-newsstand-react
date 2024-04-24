type SetTarget = React.Dispatch<React.SetStateAction<News | null>>;
type Dispatch = React.Dispatch<Action>;
type Action =
	| { type: "SET_VIEW_TOTAL" }
	| { type: "SET_VIEW_SUB" }
	| { type: "SET_VIEW_GRID" }
	| { type: "SET_VIEW_LIST" };
const SERVER = process.env.REACT_APP_JSON_SERVER;
const MODAL_DELAY = 1000;

const fetchSubscribe = (targetNews: News, id: string) => {
	updateNews(targetNews, id);
	fetch(`${SERVER}/subscribe`, {
		method: "POST",
		body: JSON.stringify(targetNews),
	});
};

const fetchUnsubscribe = (targetNews: News, id: string) => {
	updateNews(targetNews, id);
	fetch(`${SERVER}/subscribe/${id}`, {
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
		dispatch({ type: "SET_VIEW_SUB" });
	}, MODAL_DELAY);
}

async function unsubscribe(targetNews: News, id: string, setTarget: SetTarget) {
	const updatetargetNews = { ...targetNews, subscription: false };
	fetchUnsubscribe(updatetargetNews, id);
	setTarget(null);
}

export { handleSubscription, unsubscribe };

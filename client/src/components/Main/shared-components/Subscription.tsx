import { unsubscribe } from "../../../utility/subscription";

interface Props {
	target: News;
	setTarget: React.Dispatch<React.SetStateAction<News | null>>;
	getNews: () => {};
}

function Subscription() {
	return (
		<>
			<span className="absolute top-[43%] left-[36.5%] bg-gray-200/70 py-3 px-5 rounded-xl border-news-gray border-2 dark:bg-blue-950 dark:text-white dark:border-white">
				구독한 언론사에 추가 되었습니다
			</span>
		</>
	);
}

function Unsubscription({ target, setTarget, getNews }: Props) {
	return (
		<div className="absolute shadow-md text-sm top-[35%] left-[37%] w-1/4 bg-white border-2 dark:bg-blue-950 dark:text-white dark:border-white border-customGray">
			<span className="block text-center mt-5 font-bold">
				{target.pressName} <span className="font-medium text-gray-500">을(를)</span>
			</span>
			<span className="block text-center mb-5 text-gray-500 dark:text-white/70">
				구독 해지 하시겠습니까
			</span>
			<div className="h-10 border-t-2">
				<button
					onClick={async () => {
						await unsubscribe(target, target.id, setTarget);
						getNews();
					}}
					className="bg-customGray/10 w-1/2 h-full border-r-2 hover:underline"
				>
					예
				</button>
				<button
					onClick={() => setTarget(null)}
					className="bg-customGray/10 w-1/2 h-full hover:underline"
				>
					아니오
				</button>
			</div>
		</div>
	);
}

export { Subscription, Unsubscription };

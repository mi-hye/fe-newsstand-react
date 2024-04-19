interface VeiwState {
	media: string;
	display: string;
}
type Action = { type: "total" } | { type: "sub" } | { type: "grid" } | { type: "list" };

interface Props {
	dispatch: (action: Action) => void;
	state: VeiwState;
}

const bold = "font-extrabold text-black dark:text-white ";

function Tab({ dispatch, state }: Props) {
	return (
		<nav className="my-3 flex justify-between w-full">
			<div className="flex items-center">
				<div
					className={`cursor-pointer ${state.media === "total" ? bold : "text-news-gray"}`}
					onClick={() => dispatch({ type: "total" })}
				>
					전체 언론사
				</div>
				<div
					className={`ml-4 cursor-pointer ${state.media === "sub" ? bold : "text-news-gray"}`}
					onClick={() => dispatch({ type: "sub" })}
				>
					내가 구독한 언론사
				</div>
			</div>
			<div className="flex items-center">
				<i
					className={`fas fa-th-large cursor-pointer text-xl ${
						state.display === "grid" ? "text-news-blue " : "text-news-gray"
					}`}
					onClick={() => dispatch({ type: "grid" })}
				></i>
				<i
					className={`fa-solid fa-list cursor-pointer text-xl ml-4 ${
						state.display === "list" ? "text-news-blue" : "text-news-gray "
					}`}
					onClick={() => dispatch({ type: "list" })}
				></i>
			</div>
		</nav>
	);
}

export default Tab;

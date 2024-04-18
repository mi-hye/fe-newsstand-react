interface VeiwState {
	media: string;
	display: string;
}
type Action = { type: "total" } | { type: "sub" } | { type: "grid" } | { type: "list" };

interface Props {
	dispatch: (action: Action) => void;
	state: VeiwState;
}

const bold = "font-extrabold text-black";

function Tab({ dispatch, state }: Props) {
	return (
		<nav className="my-3 flex justify-between w-full">
			<div className="flex items-center">
				<div className="text-font-color cursor-pointer" onClick={() => dispatch({ type: "total" })}>
					전체 언론사
				</div>
				<div
					className="ml-4 text-font-color cursor-pointer"
					onClick={() => dispatch({ type: "sub" })}
				>
					내가 구독한 언론사
				</div>
			</div>
			<div className="flex items-center">
				<i
					className="fas fa-th-large cursor-pointer text-xl text-font-color text-news-blue"
					onClick={() => dispatch({ type: "grid" })}
				></i>
				<i
					className="fa-solid fa-list cursor-pointer text-xl mx-4 text-font-color"
					onClick={() => dispatch({ type: "list" })}
				></i>
			</div>
		</nav>
	);
}

export default Tab;

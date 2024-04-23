import { useContext } from "react";
import { ViewContext } from "../ViewProvider";

const bold = "font-extrabold text-black dark:text-white ";

function Tab() {
	const [state, dispatch] = useContext(ViewContext);
	return (
		<nav className="my-3 flex justify-between w-full">
			<div className="flex items-center">
				<div
					className={`cursor-pointer ${state.media === "total" ? bold : "text-news-gray"}`}
					onClick={() => dispatch({ type: "SET_VIEW_TOTAL" })}
				>
					전체 언론사
				</div>
				<div
					className={`ml-4 cursor-pointer ${state.media === "sub" ? bold : "text-news-gray"}`}
					onClick={() => dispatch({ type: "SET_VIEW_SUB" })}
				>
					내가 구독한 언론사
				</div>
			</div>
			<div className="flex items-center">
				<i
					className={`fas fa-th-large cursor-pointer text-xl ${
						state.display === "grid" ? "text-news-blue " : "text-news-gray"
					}`}
					onClick={() => dispatch({ type: "SET_VIEW_GRID" })}
				></i>
				<i
					className={`fa-solid fa-list cursor-pointer text-xl ml-4 ${
						state.display === "list" ? "text-news-blue" : "text-news-gray "
					}`}
					onClick={() => dispatch({ type: "SET_VIEW_LIST" })}
				></i>
			</div>
		</nav>
	);
}

export default Tab;

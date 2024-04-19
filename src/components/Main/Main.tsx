import { useReducer } from "react";
import SubGrid from "./Grid/SubGrid";
import TotalGrid from "./Grid/TotalGrid";
import SubList from "./List/SubList";
import TotalList from "./List/TotalList";
import Tab from "./Tab/Tab";
import Swiper from "./Swiper/Swiper";

interface VeiwState {
	media: string;
	display: string;
}
type Action = { type: "total" } | { type: "sub" } | { type: "grid" } | { type: "list" };

const initialState = { media: "total", display: "grid" };

function reducer(state: VeiwState, action: Action): VeiwState {
	switch (action.type) {
		case "total":
			return { media: "total", display: "grid" };
		case "sub":
			return { media: "sub", display: "list" };
		case "grid":
			return { media: state.media, display: "grid" };
		case "list":
			return { media: state.media, display: "list" };
		default:
			throw new Error();
	}
}

function Main() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<>
			<Tab dispatch={dispatch} state={state} />
			<div className="mt-4 h-[450px] border-2 border-customGray">
				{state.media === "total" && state.display === "grid" && <TotalGrid />}
				{state.media === "sub" && state.display === "grid" && <SubGrid />}
				{state.media === "total" && state.display === "list" && <TotalList />}
				{state.media === "sub" && state.display === "list" && <SubList />}
			</div>
			<Swiper />
		</>
	);
}

export default Main;

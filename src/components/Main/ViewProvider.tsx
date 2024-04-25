import { createContext, useReducer } from "react";

interface Props {
	children: React.ReactNode;
}
interface ViewState {
	media: string;
	display: string;
	page?: true | undefined;
}

interface Action {
	type: string;
	payload?: true | undefined;
}

const initialState = { media: "total", display: "grid" };

function reducer(state: ViewState, action: Action): ViewState {
	switch (action.type) {
		case "SET_VIEW_TOTAL":
			return { media: "total", display: "grid" };
		case "SET_VIEW_SUB":
			return { media: "sub", display: "list", page: action?.payload };
		case "SET_VIEW_GRID":
			return { media: state.media, display: "grid" };
		case "SET_VIEW_LIST":
			return { media: state.media, display: "list" };
		default:
			throw new Error();
	}
}

const ViewContext = createContext<[ViewState, React.Dispatch<Action>]>([initialState, () => {}]);

function ViewProvider({ children }: Props) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return <ViewContext.Provider value={[state, dispatch]}>{children}</ViewContext.Provider>;
}

export { ViewContext, ViewProvider };

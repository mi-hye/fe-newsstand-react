import { createContext, useReducer } from "react";

interface Props {
	children: React.ReactNode;
}
interface ViewState {
	media: string;
	display: string;
}

//action은 행동이다 "동사+명사로 지어야 명시적임"
type Action = { type: "setTotal" } | { type: "setSub" } | { type: "setGrid" } | { type: "setList" };

const initialState = { media: "total", display: "grid" };

function reducer(state: ViewState, action: Action): ViewState {
	switch (action.type) {
		case "setTotal":
			return { media: "total", display: "grid" };
		case "setSub":
			return { media: "sub", display: "list" };
		case "setGrid":
			return { media: state.media, display: "grid" };
		case "setList":
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

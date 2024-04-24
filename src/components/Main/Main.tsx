import SubGrid from "./SubGrid/SubGrid";
import TotalGrid from "./TotalGrid/TotalGrid";
import SubList from "./SubList/SubList";
import TotalList from "./TotalList/TotalList";
import Tab from "./Tab/Tab";
import { useContext } from "react";
import { ViewContext, ViewProvider } from "./ViewProvider";

interface VeiwStateMap {
	[key: string]: () => JSX.Element;
}

const veiwStateMap: VeiwStateMap = {
	"total-grid": () => <TotalGrid />,
	"sub-grid": () => <SubGrid />,
	"total-list": () => <TotalList />,
	"sub-list": () => <SubList />,
};

function Main() {
	return (
		<ViewProvider>
			<Tab />
			<ContentView />
		</ViewProvider>
	);
}

function ContentView() {
	const [state] = useContext(ViewContext);
	return (
		<div className="relative h-[400px]">{veiwStateMap[`${state.media}-${state.display}`]()}</div>
	);
}

export default Main;

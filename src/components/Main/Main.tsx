import SubGrid from "./Grid/SubGrid";
import TotalGrid from "./Grid/TotalGrid";
import SubList from "./List/SubList";
import TotalList from "./List/TotalList";
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
	return <div className="h-[400px]">{veiwStateMap[`${state.media}-${state.display}`]()}</div>;
}

export default Main;

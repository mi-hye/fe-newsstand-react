import SubGrid from "./Grid/SubGrid";
import TotalGrid from "./Grid/TotalGrid";
import SubList from "./List/SubList";
import TotalList from "./List/TotalList";
import Tab from "./Tab/Tab";
import { useContext } from "react";
import { ViewContext, ViewProvider } from "./ViewProvider";

interface Props {
	news: News[];
}

interface VeiwStateMap {
	[key: string]: (news: News[]) => JSX.Element;
}

const veiwStateMap: VeiwStateMap = {
	"total-grid": (news: News[]) => <TotalGrid news={news} />,
	"sub-grid": () => <SubGrid />,
	"total-list": () => <TotalList />,
	"sub-list": () => <SubList />,
};

function Main({ news }: Props) {
	return (
		<ViewProvider>
			<Tab />
			<ContentView news={news} />
		</ViewProvider>
	);
}

function ContentView({ news }: Props) {
	const [state] = useContext(ViewContext);
	return (
		<div className="mt-4 h-[400px]">{veiwStateMap[`${state.media}-${state.display}`](news)}</div>
	);
}

export default Main;

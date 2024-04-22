import Header from "./components/Header/Header";
import LatesNews from "./components/LatestNews/LatesNews";
import Main from "./components/Main/Main";
import { NewsProvider } from "./NewsProvider";

function App() {
	return (
		<div className="flex justify-center items-center w-screen h-screen dark:bg-slate-950">
			<div className="w-1000 h-600">
				<Header />
				<NewsProvider>
					<LatesNews />
					<Main></Main>
				</NewsProvider>
			</div>
		</div>
	);
}

export default App;

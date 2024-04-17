import Header from "./components/Header/Header";
import LatesNews from "./components/LatestNews/LatesNews";

function App() {
	return (
		<div className="flex justify-center items-center w-screen h-screen dark:bg-slate-950">
			<div className="w-1000 h-600">
				<Header />
				<LatesNews />
				<div>늉</div>
			</div>
		</div>
	);
}

export default App;

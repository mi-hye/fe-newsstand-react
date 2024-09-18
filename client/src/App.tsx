import Header from "./components/Header/Header";
import LatesNews from "./components/LatestNews/LatesNews";
import Main from "./components/Main/Main";
import { NewsProvider } from "./NewsProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="flex justify-center items-center w-screen h-screen dark:bg-slate-950">
				<div className="w-1000 h-600">
					<Header />
					<NewsProvider>
						<LatesNews />
						<Main></Main>
					</NewsProvider>
				</div>
			</div>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;

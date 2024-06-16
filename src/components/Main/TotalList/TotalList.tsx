import { useContext, useState, useEffect } from "react";
import CategoryTab from "./CategoryTab/CategoryTab";
import SingleNews from "../shared-components/SingleNews";
import Swiper from "../shared-components/Swiper";
import { handleSubscription } from "../../../utility/subscription";
import { ViewContext } from "../ViewProvider";
import { Unsubscription, Subscription } from "../shared-components/Subscription";
import { getTotalNews } from "../../../utility/newsSetting";

const ZERO = 0;
const LAST_PAGE = 213;

function TotalList() {
	const [totalNews, setTotalNews] = useState<News[]>([]);
	const [, dispatch] = useContext(ViewContext);
	const [target, setTarget] = useState<News | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(ZERO);

	useEffect(() => {
		getTotalNews(setTotalNews);
	}, []);

	if (!totalNews.length) return <></>;
	return (
		<>
			<div
				onClick={(e) => handleSubscription(e, setTarget, dispatch)}
				className="border-2 border-customGray dark:border-white/40 h-full"
			>
				<CategoryTab currentPage={currentPage} setCurrentPage={setCurrentPage} />
				<SingleNews singleNews={totalNews[currentPage]} />
			</div>
			<Swiper
				lastPage={LAST_PAGE}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				isGrid={false}
			/>
			{target &&
				(target.subscription ? (
					<Unsubscription
						target={target}
						setTarget={setTarget}
						getNews={() => getTotalNews(setTotalNews)}
					/>
				) : (
					<Subscription />
				))}
		</>
	);
}

export default TotalList;

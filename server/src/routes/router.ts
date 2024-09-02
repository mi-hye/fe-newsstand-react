import express, { Request, Response } from "express";
import { readDatabase, writeDatabase } from "../helper/fileSystem";

const router = express.Router();

// About /news
router.get("/news", (req: Request, res: Response) => {
	const { news } = readDatabase();
	const category = req.query.category;
	if (!category) {
		res.json(news);
		return;
	}

	const categoriedNews = news.filter((newsData: News) => newsData.category === category);
	res.json(categoriedNews);
});

router.get("/news/:id", (req: Request, res: Response) => {
	const { news } = readDatabase();
	const { id } = req.params;
	const target = news.filter((newsData: News) => newsData.id === id);
	res.json(target);
});

router.put("/news/:id", (req: Request, res: Response) => {
	const data: DBData = readDatabase();
	const { id } = req.params;
	const target = data.news.find((newsData: News) => newsData.id === id);

	if (!target) {
		res.json({ message: "업데이트 실패" });
		return;
	}

	target.subscription = true;
	writeDatabase(data);
	console.log("id: ", id);
});

//About /subscribe
router.get("/subscribe", (_, res: Response) => {
	const { subscribe } = readDatabase();
	res.json(subscribe);
});

export default router;

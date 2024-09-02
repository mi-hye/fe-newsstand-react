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
	const target = news.find((newsData: News) => newsData.id === id);
	res.json(target);
});

router.put("/news/:id", (req: Request, res: Response) => {
	const data: DBData = readDatabase();
	const { id } = req.params;
	const targetIdx = data.news.findIndex((newsData: News) => newsData.id === id);
	if (!targetIdx) {
		res.json({ message: "업데이트 실패" });
		return;
	}

	data.news[targetIdx] = req.body;
	writeDatabase(data);
	res.json({ message: "업데이트 성공" });
});

//About /subscribe
router.get("/subscribe", (_, res: Response) => {
	const { subscribe } = readDatabase();
	res.json(subscribe);
});

router.post("/subscribe", (req: Request, res: Response) => {
	const data: DBData = readDatabase();
	data.subscribe.push(req.body);
	writeDatabase(data);
	res.json({ message: "추가 성공" });
});

router.delete("/subscribe/:id", (req: Request, res: Response) => {
	const data: DBData = readDatabase();
	const { id } = req.params;
	const deletedSubscribe = data.subscribe.filter((news: News) => news.id !== id);
	data.subscribe = deletedSubscribe;
	writeDatabase(data);
	res.json({ message: "삭제 성공" });
});

export default router;

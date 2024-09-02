import express, { Request, Response } from "express";
import { readDatabase } from "../helper/fileSystem";

const router = express.Router();

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
	const { id } = req.params;
	console.log(id); //DELETE
});

router.get("/subscribe", (_, res: Response) => {
	const { subscribe } = readDatabase();
	res.json(subscribe);
});

export default router;

import express, { Request, Response } from "express";
import { client } from "../connectDB";

const router = express.Router();
const db = client.db("news-stand"); // 사용할 데이터베이스
const collection = db.collection("news"); // 사용할 컬렉션

// About /news
router.get("/news", async (req: Request, res: Response) => {
	const news = await collection.find<News>({}).toArray();
	const category = req.query.category;
	if (!category) {
		res.json(news);
		return;
	}

	const categoriedNews = news.filter((newsData: News) => newsData.category === category);
	res.json(categoriedNews);
});

router.get("/news/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const target = await collection.findOne({ id });
	res.json(target);
});

router.put("/news/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const { subscription } = req.body;
	const result = await collection.updateOne(
		{ id },
		{ $set: { subscription: subscription } } // 업데이트할 필드
	);
	if (result.matchedCount === 0) {
		return res.status(404).json({ message: "해당하는 뉴스가 없음" });
	}
	res.json({ message: "업데이트 성공" });
});

//About /subscribe
router.get("/subscribe", async (_, res: Response) => {
	const subscribe = await collection.find({ subscription: true }).toArray();
	res.json(subscribe);
});

export default router;

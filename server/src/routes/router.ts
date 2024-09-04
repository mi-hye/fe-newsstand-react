import express, { Request, Response } from "express";
import connectDB from "../connectDB";

const router = express.Router();

// About /news
router.get("/news", async (req: Request, res: Response) => {
	try {
		const { db } = await connectDB();
		const collection = db.collection("news"); // 사용할 컬렉션
		const news = await collection.find<News>({}).toArray();
		const category = req.query.category;
		if (!category) {
			res.json(news);
			return;
		}
		const categoriedNews = news.filter((newsData: News) => newsData.category === category);
		res.json(categoriedNews);
	} catch (error) {
		console.error("데이터 패치 에러:", error);
		res.status(500).json({ message: "서버 에러" });
	}
});

router.get("/news/:id", async (req: Request, res: Response) => {
	try {
		const { db } = await connectDB();
		const collection = db.collection("news");
		const { id } = req.params;
		const target = await collection.findOne({ id });
		res.json(target);
	} catch (error) {
		console.error("데이터 패치 에러:", error);
		res.status(500).json({ message: "서버 에러" });
	}
});

router.put("/news/:id", async (req: Request, res: Response) => {
	try {
		const { db } = await connectDB();
		const collection = db.collection("news");
		const { id } = req.params;
		const { subscription } = req.body;
		const result = await collection.updateOne(
			{ id },
			{ $set: { subscription: subscription } } // 업데이트할 필드
		);

		if (result.matchedCount === 0) {
			res.status(404).json({ message: "해당하는 뉴스가 없음" });
			return;
		}
		res.json({ message: "업데이트 성공" });
	} catch (error) {
		console.error("데이터 패치 에러:", error);
		res.status(500).json({ message: "서버 에러" });
	}
});

//About /subscribe
router.get("/subscribe", async (_, res: Response) => {
	try {
		const { db } = await connectDB();
		const collection = db.collection("news");
		const subscribe = await collection.find({ subscription: true }).toArray();
		res.json(subscribe);
	} catch (error) {
		console.error("데이터 패치 에러:", error);
		res.status(500).json({ message: "서버 에러" });
	}
});

export default router;

import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import readDatabase from "./helper/getNews";

const app = express();
dotenv.config();

app.use(cors());

app.get("/news", (req: Request, res: Response) => {
	const { news } = readDatabase();
	const category = req.query.category;
	if (!category) {
		res.json(news);
		return;
	}

	const categoriedNews = news.filter((newsData: News) => newsData.category === category);
	res.json(categoriedNews);
});

app.get("/news/:id", (req: Request, res: Response) => {
	const { id } = req.params;
	console.log(id); //DELETE
});

app.get("/subscribe", (_, res: Response) => {
	const { subscribe } = readDatabase();
	res.json(subscribe);
});

const PORT = process.env.PORT; //DELETE
app.listen(PORT, () => console.log("서버응답", PORT));
module.exports = app; // Vercel에서 서버리스 함수로 인식

import express, { Request, Response } from "express";
import cors from "cors";
import readDatabase from "./helper/getNews";

const app = express();
app.use(cors());

app.get("/news", (_, res: Response) => {
	const { news } = readDatabase();
	console.log("오닝?"); //DELETE
	res.json(news);
});

// 서버리스 함수로 내보내기
module.exports = app;

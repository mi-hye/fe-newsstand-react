import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import readDatabase from "./helper/getNews";

const app = express();
dotenv.config();

app.use(cors());

app.get("/news", (_, res: Response) => {
	const { news } = readDatabase();
	res.json(news);
});

app.get("/subscribe", (_, res: Response) => {
	const { subscribe } = readDatabase();
	res.json(subscribe);
});

module.exports = app; // Vercel에서 서버리스 함수로 인식

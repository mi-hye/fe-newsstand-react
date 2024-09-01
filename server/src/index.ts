import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import readDatabase from "./helper/getNews";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use((req, res, next) => {
	console.log(`Request received: ${req.method} ${req.url}`);
	next();
});

app.use(
	cors({
		origin: "https://192.168.108.1:3000/",
	})
);

app.get("/news", (_, res: Response) => {
	const { news } = readDatabase();
	res.json(news);
});

app.listen(PORT, () => console.log("서버 응답", PORT));
module.exports = app; // Vercel에서 서버리스 함수로 인식

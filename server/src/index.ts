import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import APIRouter from "./routes/router";
import { connectDB } from "./connectDB";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json()); //요청 본문 파싱을 위한 미들웨어 설정
app.use("/", APIRouter);

// MongoDB 연결 설정
connectDB()
	.then((db) => {
		// 서버 시작
		const PORT = process.env.PORT;
		app.listen(PORT, () => console.log("서버 응답 중", PORT));
	})
	.catch((err) => console.error("Failed to connect to the database:", err));

module.exports = app; // Vercel에서 서버리스 함수로 인식

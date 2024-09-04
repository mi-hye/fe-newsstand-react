import express from "express";
import cors from "cors";
import APIRouter from "./routes/router";

const app = express();

app.use(cors());
app.use(express.json()); //요청 본문 파싱을 위한 미들웨어 설정
app.use("/", APIRouter);

module.exports = app; // Vercel에서 서버리스 함수로 인식

import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import APIRouter from "./routes/router";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json()); //요청 본문 파싱을 위한 미들웨어 설정
app.use("/", APIRouter);

const PORT = process.env.PORT; //DELETE
app.listen(PORT, () => console.log("서버응답", PORT));
module.exports = app; // Vercel에서 서버리스 함수로 인식

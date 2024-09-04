import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const URI = process.env.URI;
const client = new MongoClient(URI!);

// MongoDB 연결 함수
async function connectDB() {
	try {
		await client.connect();
		console.log("Connected to MongoDB");
		return client.db("news-stand");
	} catch (err) {
		console.error("Failed to connect to MongoDB", err);
		process.exit(1); // 연결 실패 시 프로세스 종료
	}
}

export { connectDB, client };

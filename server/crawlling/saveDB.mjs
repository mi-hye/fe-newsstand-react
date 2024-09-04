import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.URI;
const client = new MongoClient(URI);

async function saveDB(jsonData) {
	try {
		await client.connect();
		const db = client.db("news-stand"); // 사용할 데이터베이스 이름 설정
		const collection = db.collection("news"); // 사용할 컬렉션 이름 설정

		// JSON 데이터를 MongoDB에 삽입
		const result = await collection.insertMany(jsonData);
		console.log(`${result.insertedCount} documents were inserted.`);
	} catch (err) {
		console.error("Failed to save data to MongoDB:", err);
	} finally {
		await client.close();
	}
}

export default saveDB;

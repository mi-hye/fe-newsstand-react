import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const URI = process.env.URI;

//버셀이 서버리스로 동작하기 때문에 인스턴스를 캐시 시킴
const cache = {
	cachedClient: null, // 캐시된 MongoClient 인스턴스
	cachedDb: null, // 캐시된 데이터베이스 인스턴스
};

// MongoDB 연결 함수
// 서버리스 환경에서는 실행 후 자동으로 닫힘
async function connectDB() {
	const { cachedClient, cachedDb } = cache;
	// 이미 연결된 클라이언트가 있다면, 이를 재사용
	if (cachedClient && cachedDb) {
		return { client: cachedClient, db: cachedDb };
	}

	const client = new MongoClient(URI!, {
		maxPoolSize: 10, // 연결 풀의 최대 크기 설정
	});
	await client.connect();
	const db = client.db("news-stand");
	return { client, db };
}

export default connectDB;

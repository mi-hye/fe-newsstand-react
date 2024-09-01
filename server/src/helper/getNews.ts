import fs from "fs";
import path from "path";

const dbPath = path.join(__dirname, "../../db/news.json");

const readDatabase = () => {
	const { subscribe, news } = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
	return { subscribe, news };
};

export default readDatabase;

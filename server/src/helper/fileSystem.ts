import fs from "fs";
import path from "path";

const dbPath = path.join(__dirname, "../../db/news.json");
const encoding = "utf-8";

const readDatabase = () => {
	const { subscribe, news } = JSON.parse(fs.readFileSync(dbPath, encoding));
	return { subscribe, news };
};

const writeDatabase = (newData: DBData) => {
	try {
		fs.writeFileSync(dbPath, JSON.stringify(newData), "utf-8");
		console.log("Database written successfully");
	} catch (err) {
		console.error("Error writing to the database:", err);
	}
};

export { readDatabase, writeDatabase };

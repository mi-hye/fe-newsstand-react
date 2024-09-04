import { writeFile } from "node:fs/promises";

async function saveJSON(file, data) {
	try {
		await writeFile(`../server/db/${file}.json`, JSON.stringify(data));
		console.log("생성");
	} catch (err) {
		console.log(err);
	}
}

export default saveJSON;

/** Fogli di contatto per il controllo visivo, salvati fuori dal sito. */
import fs from "node:fs";
import { createRequire } from "node:module";
const sharp = createRequire(import.meta.resolve("next"))("sharp");
const prompts = JSON.parse(fs.readFileSync("public/illustrations/problems/prompts.json", "utf8"));
for (let start = 0; start < prompts.length; start += 6) {
    const jobs = prompts.slice(start, start + 6);
    if (!jobs.every(j => fs.existsSync("public/" + j.output))) continue;
    const tiles = await Promise.all(jobs.map(async (job, i) => ({
        input: await sharp("public/" + job.output).resize(400, 267).png().toBuffer(),
        left: (i % 3) * 400,
        top: Math.floor(i / 3) * 300,
    })));
    for (let i = 0; i < jobs.length; i++) tiles.push({
        input: Buffer.from(`<svg width="400" height="30"><rect width="400" height="30" fill="#292d36"/><text x="15" y="22" fill="white" font-size="18">${jobs[i].problem} · ${jobs[i].step}</text></svg>`),
        left: (i % 3) * 400,
        top: Math.floor(i / 3) * 300 + 267,
    });
    const path = `/tmp/cc-problem-slides-${Math.floor(start / 6) + 1}.png`;
    await sharp({ create: { width: 1200, height: 600, channels: 3, background: "#292d36" } }).composite(tiles).png().toFile(path);
    console.log(path);
}

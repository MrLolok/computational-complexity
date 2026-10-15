import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";

const sharp = createRequire(import.meta.resolve("next"))("sharp");
const source = fs.readFileSync("src/data/theorems.ts", "utf8");
const start = source.indexOf(" = [", source.indexOf("export const THEOREMS")) + 3;
const theorems = JSON.parse(source.slice(start, source.indexOf("];", start) + 1));
const lessons = JSON.parse(fs.readFileSync("src/data/theoremWalkthroughs.json", "utf8"));
const prompts = JSON.parse(fs.readFileSync("public/illustrations/theorems/prompts.json", "utf8"));
assert.deepEqual(Object.keys(lessons).sort(), theorems.map((t) => t.id).sort());
const used = new Set();
let count = 0;
for (const t of theorems) {
    const lesson = lessons[t.id];
    assert(lesson.slides.length >= 3 && lesson.slides.length <= 6, t.id);
    assert(["proof", "outline", "conditional"].includes(lesson.kind), t.id);
    for (const slide of lesson.slides) {
        assert(slide.title && slide.caption && slide.alt && slide.src, t.id);
        const { columns, rows, index } = slide.crop;
        assert.equal(columns, 3);
        assert.equal(rows, 4);
        assert(Number.isInteger(index) && index >= 0 && index < columns * rows, t.id);
        const position = slide.src + "#" + index;
        assert(!used.has(position), `Duplicate frame ${position}`);
        used.add(position);
        assert(!/\b(?:dispensa|slide|appunti|PDF|file)\b|\bM[1-6]\b/.test(slide.caption), t.id);
        count++;
    }
}
assert(Object.values(lessons).some((l) => l.slides.length === 3));
assert(Object.values(lessons).some((l) => l.slides.length === 6));
for (const job of prompts) {
    const file = "public/" + job.output;
    assert(fs.existsSync(file), `Missing storyboard ${file}`);
    const meta = await sharp(file).metadata();
    assert.equal(meta.format, "webp");
    assert(meta.width >= 1024 && meta.height >= 1024, file);
    assert(Math.abs(meta.width / meta.height - job.columns / job.rows) < 0.03, `Unexpected grid ratio: ${file}`);
    assert.equal(job.panels, [...used].filter((k) => k.startsWith("/" + job.output + "#")).length);
}
for (const x of [false, true])
    for (const y of [false, true])
        for (const z of [false, true]) {
            const best = Math.max(
                ...[false, true].map(
                    (w) => [x, y, z, w, !x || !y, !y || !z, !z || !x, x || !w, y || !w, z || !w].filter(Boolean).length,
                ),
            );
            assert.equal(best, x || y || z ? 7 : 6);
        }
for (let bits = 0; bits < 16; bits++) {
    const [a, b, c, d] = [0, 1, 2, 3].map((i) => !!(bits & (1 << i)));
    assert.equal(
        [false, true].some((z) => (a || b || z) && (!z || c || d)),
        a || b || c || d,
    );
}
console.log(
    `OK: ${theorems.length} theorem carousels, ${count} distinct illustrated steps, ${prompts.length} storyboards and reduction examples.`,
);

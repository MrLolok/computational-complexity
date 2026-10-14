import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";

const sharp = createRequire(import.meta.resolve("next"))("sharp");
const source = fs.readFileSync("src/data/problems.ts", "utf8");
const problemIds = [
    ...source
        .slice(source.indexOf("export const PROBLEMS"), source.indexOf("export const PROBLEM_BY"))
        .matchAll(/"id":\s*"([^"]+)"/g),
].map((m) => m[1]);
const walkthroughs = JSON.parse(fs.readFileSync("src/data/problemWalkthroughs.json", "utf8"));
assert.deepEqual(Object.keys(walkthroughs).sort(), problemIds.sort());
const missing = [];
for (const [id, lesson] of Object.entries(walkthroughs)) {
    assert.equal(lesson.slides.length, 3, `${id}: expected three steps`);
    assert(lesson.outcome && lesson.note);
    for (const slide of lesson.slides) {
        assert(slide.title && slide.caption && slide.alt && slide.src);
        const file = "public" + slide.src;
        if (!fs.existsSync(file)) {
            missing.push(file);
            continue;
        }
        const meta = await sharp(file).metadata();
        assert(meta.width > 0 && meta.height > 0 && meta.format === "webp", file);
        const expectedRatio = id === "SC" && slide.src.endsWith("-3.webp") ? 3 : 1.5;
        assert(Math.abs(meta.width / meta.height - expectedRatio) < 0.02, `${file}: unexpected diagram aspect ratio`);
    }
}
assert.equal(missing.length, 0, `Missing ${missing.length} images: ${missing.slice(0, 3).join(", ")}`);
// Verifica gli esempi numerici e combinatori mostrati nelle slide.
const sat = (x, y, z) => (x || y) && (!x || z) && (!y || !z);
assert(sat(true, false, true));
for (const x of [false, true])
    for (const y of [false, true]) {
        const clauses = [x || y, x || !y, !x || y, !x || !y];
        assert.equal(clauses.filter(Boolean).length, 3);
    }
assert.equal(2 + 3 + 4, 9); // giri TSP a tre città, in entrambi gli ordini
assert.equal(2 + 3, 5);
assert.equal(3 + 4, 7); // zaino A+B
assert([false, true].every((y) => true || y)); // ∃x ∀y (x∨y), scegli x=1
assert([false, true].every((x) => ![false, true].every((y) => x && y))); // co-QSAT₂
assert([false, true].every((y) => [false, true].some((z) => z === (false !== y)))); // QSAT, x=0
const edges = [
    ["A", "B"],
    ["B", "C"],
    ["C", "D"],
];
const independent = new Set(["A", "C"]);
const cover = new Set(["B", "D"]);
assert(edges.every(([a, b]) => !(independent.has(a) && independent.has(b))));
assert(edges.every(([a, b]) => cover.has(a) || cover.has(b)));
const isIndependent = (vertices) => edges.every(([a, b]) => !(vertices.includes(a) && vertices.includes(b)));
assert(isIndependent(["A", "C"]));
assert(isIndependent(["A", "D"]));
assert(isIndependent(["B", "D"]));
assert(!isIndependent(["A", "B"]));
for (const omitted of ["A", "B", "C", "D"]) {
    assert(!isIndependent(["A", "B", "C", "D"].filter((v) => v !== omitted)));
}
const models = [["p"], ["q"], ["p", "q"]];
const minimal = models.filter((m) => !models.some((n) => n.length < m.length && n.every((atom) => m.includes(atom))));
assert.deepEqual(minimal, [["p"], ["q"]]);
assert(minimal.some((m) => m.includes("p")));
assert(!minimal.every((m) => m.includes("p")));
const start = source.indexOf(" = [", source.indexOf("export const PROBLEMS")) + 3;
const problems = JSON.parse(source.slice(start, source.indexOf("];", start) + 1));
for (const p of problems) {
    const visible = [p.why, p.def, p.compl, ...p.traps.flatMap((t) => [t.n, t.q, t.e, t.ac])].filter(Boolean).join(" ");
    assert(
        !/\b(?:dispensa|slide|appunti|PDF|Lezione)\b|il file|sbagliat|imprecis/i.test(visible),
        `${p.id}: editorial note in visible explanation`,
    );
}
console.log(`OK: ${problemIds.length} problems, 108 WebP slides and worked examples.`);

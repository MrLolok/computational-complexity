import assert from "node:assert/strict";
import fs from "node:fs";
import { readableMath } from "../src/lib/mathNotation.ts";

assert.equal(readableMath(String.raw`$\mathrm{P} \neq \mathrm{NP}$`), "P ≠ NP");
assert.equal(readableMath(String.raw`$\Sigma_2^{\mathrm{P}} \subseteq \mathrm{PSPACE}$`), "Σ₂ᴾ ⊆ PSPACE");
assert.equal(readableMath(String.raw`$\mathrm{co\text{-}QSAT}_3$`), "co-QSAT₃");
assert.equal(readableMath(String.raw`$2^{n/2}$`), String.raw`$2^{n/2}$`);
assert.equal(readableMath(String.raw`$$\mathrm{P}$$`), String.raw`$$\mathrm{P}$$`);
assert.equal(readableMath(String.raw`$\mathrm{SPACE}(n^2)$`), String.raw`$\mathrm{SPACE}(n^2)$`);
const { traces } = JSON.parse(fs.readFileSync("src/data/tracce.json", "utf8"));
for (const trace of traces) {
  for (const q of trace.questions) {
    assert(q.explanation.trim(), `${trace.code}/${q.n}: missing explanation`);
    assert(!/\bM[1-6]\b|🔁|Traccia \w+, domanda|[Ll]a soluzione a mano|[Ii]l file/.test(q.explanation), `${trace.code}/${q.n}: editorial annotation`);
    for (const r of q.seeAlso) assert(traces.some(t => t.code === r.code && t.questions.some(x => x.n === r.n)), `invalid reference ${r.code}/${r.n}`);
  }
}
const q6 = traces.find(t => t.code === "F03").questions.find(q => q.n === 6);
assert.equal(q6.answer, "SI");
assert(q6.explanation.includes("Grover") && q6.explanation.includes("2n"));
const clique = traces.find(t => t.code === "L18").questions.find(q => q.n === 6);
assert.equal(clique.answer, "SI");
assert(clique.explanation.includes("lunghezza dell’intero input in bit") && clique.explanation.includes("matrice di adiacenza"));
assert.equal(2 ** 10, 1024);
for (const nodes of [16, 32, 64]) {
  const bits = BigInt(nodes * nodes);
  assert((2n ** BigInt(nodes)) * bits * bits <= 2n ** (bits / 2n));
}
console.log("OK: notation, clean explanations, reference targets and F03/6.");

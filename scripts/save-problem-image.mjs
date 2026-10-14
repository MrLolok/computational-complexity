/** Ottimizza un output GPT-Image senza cambiare il contenuto del diagramma. */
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
const requireNext = createRequire(import.meta.resolve("next"));
const sharp = requireNext("sharp");
const [input, target] = process.argv.slice(2);
if (!input || !target || !target.startsWith("illustrations/problems/")) throw new Error("Expected generated image and a problem illustration target");
const output = resolve("public", target);
await mkdir(dirname(output), { recursive: true });
await sharp(input).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 88 }).toFile(output);
console.log(target);

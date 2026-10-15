/** Ottimizza un’immagine generata senza cambiare il contenuto del diagramma. */
import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";

const sharp = createRequire(import.meta.resolve("next"))("sharp");
const [input, target] = process.argv.slice(2);
if (!input || !/^illustrations\/theorems\/[a-z0-9-]+\.webp$/.test(target))
    throw new Error("Expected generated image and theorem illustration target");
const output = resolve("public", target);
await mkdir(dirname(output), { recursive: true });
await sharp(input)
    .resize({ width: target.includes("-storyboard") ? 1536 : 1200, withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(output);
console.log(target);

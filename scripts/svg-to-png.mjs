// Convierte los SVG de public/expo (recursivo) a PNG en public/expo/png.
// Uso: node scripts/svg-to-png.mjs

import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SVG_DIR = path.join(ROOT, "public", "expo");
const PNG_DIR = path.join(SVG_DIR, "png");

const PRESETS = {
  "cartel.svg": { width: 3508 },                    // A2 a 150 DPI
  "logo.svg": { width: 1600 },
  "logo-expo.svg": { width: 2000 },
  "logo-cuadrado-instagram.svg": { width: 1080 },
  "motivo-cierva.svg": { width: 1200 },
  "pasapaginas.svg": { width: 591 },
  "octavilla.svg": { width: 1240 },
  "mapa-cuevas-asturias.svg": { width: 2000 },
  "marcapaginas-1-venus-gravetienses.svg": { width: 591 },
  "marcapaginas-2-arte-franco-cantabrico.svg": { width: 591 },
  "marcapaginas-3-cierva-trilineal.svg": { width: 591 },
  "marcapaginas-4-cuevas-unesco-asturias.svg": { width: 591 },
  "mockup-escaparate.svg": { width: 1600 },
  "slide-1-cover.svg": { width: 1080 },
  "slide-2-cierva.svg": { width: 1080 },
  "slide-3-venus.svg": { width: 1080 },
  "slide-4-piedra-oso.svg": { width: 1080 },
  "slide-5-mapa-cuevas.svg": { width: 1080 },
  "slide-6-domingo.svg": { width: 1080 },
  "slide-7-cta.svg": { width: 1080 },
};

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const result = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "png") continue;
      result.push(...(await walk(full)));
    } else if (e.isFile() && e.name.endsWith(".svg")) {
      result.push(full);
    }
  }
  return result;
}

async function main() {
  await fs.mkdir(PNG_DIR, { recursive: true });

  const svgs = await walk(SVG_DIR);
  if (svgs.length === 0) {
    console.error("No se encontraron SVG en", SVG_DIR);
    process.exit(1);
  }

  for (const svg of svgs) {
    const rel = path.relative(SVG_DIR, svg);
    const png = path.join(PNG_DIR, rel.replace(/\.svg$/, ".png"));
    await fs.mkdir(path.dirname(png), { recursive: true });

    const base = path.basename(svg);
    const preset = PRESETS[base] ?? { width: 2000 };
    const buf = await fs.readFile(svg);

    try {
      await sharp(buf, { density: 300 })
        .resize({ width: preset.width })
        .png({ compressionLevel: 9 })
        .toFile(png);
      const stat = await fs.stat(png);
      console.log(
        `OK ${rel.padEnd(48)} -> ${String(preset.width).padStart(5)}px ${String(Math.round(stat.size / 1024)).padStart(5)} KB`
      );
    } catch (err) {
      console.error(`ERR ${rel}: ${err.message}`);
    }
  }

  console.log(`\nPNG guardados en: ${PNG_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

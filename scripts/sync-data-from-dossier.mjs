/**
 * Sincroniza datos y derivados desde el repo del dossier (D:\Antigravity\proyecto-domingo)
 * hacia este sitio web (D:\Antigravity\proyecto-domingo-web/public).
 *
 * Outputs:
 *   public/data/catalog.json
 *   public/data/kpis.json
 *   public/data/sites.geojson  (copia del Nalón ovetense)
 *   public/images/thumb/<sec>/<file>_400.webp  (copia)
 *   public/images/web/<sec>/<file>_800.webp    (copia)
 *
 * Ejecutar: node scripts/sync-data-from-dossier.mjs
 */
import { promises as fs } from "node:fs";
import path from "node:path";

const DOSSIER_ROOT = "D:/Antigravity/proyecto-domingo";
const WEB_ROOT = "D:/Antigravity/proyecto-domingo-web";

const PUBLIC_DATA = path.join(WEB_ROOT, "public", "data");
const PUBLIC_THUMB = path.join(WEB_ROOT, "public", "images", "thumb");
const PUBLIC_WEB = path.join(WEB_ROOT, "public", "images", "web");

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

function parseCsv(text) {
  // Parser ligero: el CSV no contiene comas dentro de campos en este corpus.
  const lines = text.replace(/\r/g, "").split("\n").filter((l) => l.length);
  const header = lines.shift().split(",");
  return lines.map((line) => {
    const cells = line.split(",");
    const obj = {};
    header.forEach((h, i) => {
      obj[h.trim()] = (cells[i] ?? "").trim();
    });
    return obj;
  });
}

async function syncCatalog() {
  const csv = await fs.readFile(path.join(DOSSIER_ROOT, "00_corpus", "catalog.csv"), "utf-8");
  const rows = parseCsv(csv);
  const enriched = rows.map((r) => {
    const sec = r.id_pieza.startsWith("DOM-ESC") ? "1_ESCULTURAS" : "2_OTRAS";
    const stem = (r.archivo_master || "").replace(/\.jpg$/i, "");
    return {
      ...r,
      seccion: sec,
      thumb: stem ? `/images/thumb/${sec}/${stem}_400.webp` : "",
      web: stem ? `/images/web/${sec}/${stem}_800.webp` : "",
      web_jpg: stem ? `/images/web/${sec}/${stem}_800.jpg` : "",
    };
  });
  await ensureDir(PUBLIC_DATA);
  await fs.writeFile(path.join(PUBLIC_DATA, "catalog.json"), JSON.stringify(enriched, null, 2));
  console.log(`[+] catalog.json: ${enriched.length} piezas`);
  return enriched;
}

async function syncKpis() {
  const csv = await fs.readFile(path.join(DOSSIER_ROOT, "04_indicadores", "kpis.csv"), "utf-8");
  const rows = parseCsv(csv);
  await fs.writeFile(path.join(PUBLIC_DATA, "kpis.json"), JSON.stringify(rows, null, 2));
  console.log(`[+] kpis.json: ${rows.length} indicadores`);
}

async function syncSites() {
  const src = path.join(DOSSIER_ROOT, "02_visuales", "mapas", "nalon_ovetense.geojson");
  const dst = path.join(PUBLIC_DATA, "sites.geojson");
  await fs.copyFile(src, dst);
  console.log(`[+] sites.geojson copiado`);
}

async function copyImagesByPattern(srcDir, dstDir, pattern) {
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  let count = 0;
  for (const e of entries) {
    if (!e.isFile()) continue;
    if (!pattern.test(e.name)) continue;
    await ensureDir(dstDir);
    await fs.copyFile(path.join(srcDir, e.name), path.join(dstDir, e.name));
    count++;
  }
  return count;
}

async function syncImages() {
  const sections = ["1_ESCULTURAS", "2_OTRAS"];
  let totalThumb = 0;
  let totalWeb = 0;
  for (const sec of sections) {
    totalThumb += await copyImagesByPattern(
      path.join(DOSSIER_ROOT, "00_corpus", "images_thumb", sec),
      path.join(PUBLIC_THUMB, sec),
      /_400\.(webp|jpg)$/i
    );
    totalWeb += await copyImagesByPattern(
      path.join(DOSSIER_ROOT, "00_corpus", "images_web", sec),
      path.join(PUBLIC_WEB, sec),
      /_800\.(webp|jpg)$/i
    );
  }
  console.log(`[+] thumbnails copiados: ${totalThumb}`);
  console.log(`[+] web 800 copiados: ${totalWeb}`);
}

async function main() {
  await ensureDir(PUBLIC_DATA);
  await syncCatalog();
  await syncKpis();
  await syncSites();
  await syncImages();
  console.log("[done]");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

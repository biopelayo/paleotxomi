/**
 * build-mycology-compensation.mjs
 *
 * Pase incremental: añade fotos extra hasta alcanzar ~150 totales, partiendo
 * del estado actual de public/data/setas.json. No reprocesa fotos ya hechas.
 * Compensa el déficit de Especies (solo 11 válidas) con más fotos de
 * Ultimas_Setas y Catalogo_Fungipedia.
 */

import { promises as fs } from "node:fs";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const OUT_IMG_DIR = path.join(PROJECT_ROOT, "public", "images", "micologia");
const OUT_INDEX = path.join(PROJECT_ROOT, "public", "data", "setas.json");

const SIZES = [1600, 800, 400];
const JPG_QUALITY = 82;
const WEBP_QUALITY = 80;
const MIN_BYTES = 100 * 1024;
const MIN_SIDE_PX = 800;

// Cuotas de compensación.
const EXTRA = [
  {
    clave: "ultimas_setas_extra",
    objetivo: 20,
    categoria: "recolecciones",
    categoria_humana: "Recolección",
    carpetas: ["E:/Domingo_Organizado/02_Micologia/Ultimas_Setas/ULTIMAS SETAS"],
    anho_fallback: null,
  },
  {
    clave: "catalogo_extra",
    objetivo: 10,
    categoria: "catalogo",
    categoria_humana: "Catálogo Fungipedia",
    carpetas: ["E:/Domingo_Organizado/02_Micologia/Catalogo_Fungipedia/catalogo fungipedia"],
    anho_fallback: null,
  },
];

const GENEROS = [
  "Agaricus","Agrocybe","Aleuria","Amanita","Armillaria","Auricularia",
  "Boletus","Calocera","Calocybe","Calvatia","Cantharellus","Cerrena",
  "Chlorophyllum","Chondrostereum","Chroogomphus","Clathrus","Clavaria",
  "Clavulina","Clavulinopsis","Clitocybe","Coltricia","Coprinus","Coprinellus",
  "Coprinopsis","Cortinarius","Craterellus","Cuphophyllus","Cyathus",
  "Daedalea","Daedaleopsis","Discina","Entoloma","Fistulina","Flammulina",
  "Fomes","Fomitopsis","Galerina","Ganoderma","Geastrum","Gyromitra",
  "Hebeloma","Helvella","Hericium","Hydnum","Hygrocybe","Hygrophorus",
  "Hypholoma","Hypomyces","Inocybe","Inonotus","Laccaria","Lacrymaria",
  "Lactarius","Laetiporus","Langermannia","Leccinum","Lentinula","Lentinus",
  "Lepiota","Lepista","Leucoagaricus","Leucocoprinus","Lycoperdon","Macrolepiota",
  "Marasmius","Meripilus","Morchella","Mycena","Omphalotus","Otidea",
  "Panaeolus","Panus","Paxillus","Peziza","Phallus","Phellinus",
  "Pholiota","Pisolithus","Pleurotus","Pluteus","Polyporus","Psathyrella",
  "Pseudohydnum","Psilocybe","Ramaria","Rhizopogon","Rozites","Russula",
  "Sarcodon","Sarcoscypha","Schizophyllum","Scleroderma","Sparassis","Stereum",
  "Strobilurus","Stropharia","Suillus","Trametes","Tremella","Tricholoma",
  "Tuber","Tubaria","Tylopilus","Verpa","Volvariella","Xerocomus","Xerula",
];

function slugify(s) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function inferEspecie(nombre) {
  const limpio = nombre.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  for (const g of GENEROS) {
    const re = new RegExp("\\b" + g + "\\b", "i");
    if (re.test(limpio)) {
      const epitetoRe = new RegExp("\\b" + g + "[\\s_\\-]+([a-z]{3,})", "i");
      const m = limpio.match(epitetoRe);
      const generoCap = g[0].toUpperCase() + g.slice(1).toLowerCase();
      if (m && !/jpg|jpeg|png|gif|tif|tiff|heic/i.test(m[1])) {
        return `${generoCap} ${m[1].toLowerCase()}`;
      }
      return generoCap;
    }
  }
  return null;
}

function inferAnoDesdeNombre(nombre) {
  const m1 = nombre.match(/(?<![0-9])(19[89]\d|20[0-2]\d)(?![0-9])/);
  if (m1) { const y = parseInt(m1[1], 10); if (y >= 1990 && y <= 2030) return y; }
  return null;
}

function altText({ categoria_humana, anho, especie }) {
  if (especie) return `Seta ${especie} · ${categoria_humana}${anho ? ` (${anho})` : ""}`;
  return `Seta · ${categoria_humana}${anho ? ` (${anho})` : ""}`;
}

function debeDescartarse(nombre, bytes) {
  if (bytes < MIN_BYTES) return "tamano_pequeno";
  const n = nombre.toLowerCase();
  if (n.endsWith(".tmp") || n === "thumbs.db" || n.endsWith(".ini")) return "archivo_sistema";
  if (/screenshot|screen|captura/i.test(nombre)) return "screenshot";
  if (/\.(zip|rar|7z|mp4|mov|avi)$/i.test(nombre)) return "no_imagen";
  if (!/\.(jpe?g|png|tif?f|heic|gif)$/i.test(nombre)) return "no_imagen";
  return null;
}

async function listarCandidatos(cfg, archivosUsados) {
  const todos = [];
  for (const carpeta of cfg.carpetas) {
    if (!existsSync(carpeta)) continue;
    const archivos = await fs.readdir(carpeta);
    for (const archivo of archivos) {
      const abs = path.join(carpeta, archivo);
      if (archivosUsados.has(abs.replace(/\\/g, "/"))) continue;
      let stat;
      try { stat = await fs.stat(abs); } catch { continue; }
      if (!stat.isFile()) continue;
      const motivo = debeDescartarse(archivo, stat.size);
      if (motivo) continue;
      todos.push({ archivo, abs, bytes: stat.size, carpeta });
    }
  }
  return todos;
}

function muestrearEspaciado(arr, n) {
  if (arr.length <= n) return [...arr];
  const out = [];
  const step = arr.length / n;
  for (let i = 0; i < n; i++) out.push(arr[Math.min(arr.length - 1, Math.floor(i * step))]);
  return out;
}

async function procesarArchivo({ srcAbs, archivo, cfg, slug }) {
  const inputBuffer = await fs.readFile(srcAbs);
  const meta = await sharp(inputBuffer, { failOn: "none" }).metadata();
  const ladoMax = Math.max(meta.width ?? 0, meta.height ?? 0);
  if (ladoMax < MIN_SIDE_PX) throw new Error(`resolucion_baja_${ladoMax}px`);
  let anho = inferAnoDesdeNombre(archivo) ?? cfg.anho_fallback ?? null;
  const especie = inferEspecie(archivo);
  const base = sharp(inputBuffer, { failOn: "none" }).rotate();
  const salidas = {};
  for (const size of SIZES) {
    const target = Math.min(size, ladoMax);
    const jpgPath = path.join(OUT_IMG_DIR, `${slug}_${size}.jpg`);
    const webpPath = path.join(OUT_IMG_DIR, `${slug}_${size}.webp`);
    const resized = base.clone().resize({ width: target, height: target, fit: "inside", withoutEnlargement: true });
    await Promise.all([
      resized.clone().jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toFile(jpgPath),
      resized.clone().webp({ quality: WEBP_QUALITY }).toFile(webpPath),
    ]);
    salidas[size] = {
      jpg: `/images/micologia/${slug}_${size}.jpg`,
      webp: `/images/micologia/${slug}_${size}.webp`,
    };
  }
  return {
    slug,
    archivo_origen: srcAbs.replace(/\\/g, "/"),
    carpeta_origen: cfg.categoria_humana,
    anho,
    src_400: salidas[400].webp,
    src_800: salidas[800].webp,
    src_1600: salidas[1600].webp,
    src_400_jpg: salidas[400].jpg,
    src_800_jpg: salidas[800].jpg,
    src_1600_jpg: salidas[1600].jpg,
    alt: altText({ categoria_humana: cfg.categoria_humana, anho, especie }),
    categoria: cfg.categoria,
    especie_sugerida: especie ?? null,
  };
}

async function main() {
  console.log("[compensación] inicio");
  const t0 = Date.now();
  const previo = JSON.parse(await fs.readFile(OUT_INDEX, "utf-8"));
  console.log(`  fotos previas: ${previo.total}`);
  const archivosUsados = new Set(previo.fotos.map((f) => f.archivo_origen));
  const slugsUsados = new Set(previo.fotos.map((f) => f.slug));

  const nuevos = [];
  const errores = [...(previo.errores ?? [])];
  const resumen = previo.resumen_por_carpeta ?? {};

  for (const cfg of EXTRA) {
    console.log(`\n[carpeta] ${cfg.clave} · objetivo ${cfg.objetivo}`);
    const candidatos = await listarCandidatos(cfg, archivosUsados);
    candidatos.sort((a, b) => a.archivo.localeCompare(b.archivo));
    const seleccion = muestrearEspaciado(candidatos, cfg.objetivo);
    console.log(`  candidatos: ${candidatos.length}, seleccionados: ${seleccion.length}`);
    let procesados = 0, descartados = 0;
    for (const c of seleccion) {
      let slug = slugify(c.archivo);
      if (slugsUsados.has(slug)) {
        const h = Buffer.from(c.abs).toString("hex").slice(0, 6);
        slug = `${slug}-${h}`;
      }
      slugsUsados.add(slug);
      try {
        const entrada = await procesarArchivo({ srcAbs: c.abs, archivo: c.archivo, cfg, slug });
        nuevos.push(entrada);
        procesados++;
        if (procesados % 5 === 0) process.stdout.write(`  · ${procesados}/${seleccion.length}\n`);
      } catch (err) {
        descartados++;
        errores.push({ clave: cfg.clave, archivo: c.archivo, motivo: err.message });
      }
    }
    resumen[cfg.clave] = { procesados, descartados };
    console.log(`  procesados ${procesados}, descartados ${descartados}`);
  }

  const indiceFinal = [...previo.fotos, ...nuevos];
  const distAnho = {};
  for (const f of indiceFinal) {
    const k = f.anho ?? "sin_anho";
    distAnho[k] = (distAnho[k] ?? 0) + 1;
  }

  await fs.writeFile(OUT_INDEX, JSON.stringify({
    actualizado: new Date().toISOString().slice(0, 10),
    fuente: "Archivo personal Domingo González de Lena Díaz",
    total: indiceFinal.length,
    fotos: indiceFinal,
    resumen_por_carpeta: resumen,
    distribucion_anho: distAnho,
    errores,
  }, null, 2), "utf-8");

  const seg = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`\n[ok] total: ${indiceFinal.length} (+${nuevos.length}) en ${seg} s`);
}

main().catch((err) => { console.error(err); process.exit(1); });

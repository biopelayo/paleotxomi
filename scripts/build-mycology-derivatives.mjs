/**
 * build-mycology-derivatives.mjs
 *
 * Cura ~150 fotos icónicas de setas del archivo de Domingo y genera derivados
 * web (1600/800/400 px en JPG+WebP) para la galería de /micologia.
 *
 * Fuente: E:/Domingo_Organizado/02_Micologia/{Especies,Ultimas_Setas,...}
 * Salida: public/images/micologia/{slug}_{tamaño}.{jpg,webp}
 * Índice: public/data/setas.json
 *
 * Reglas:
 *  - No modifica originales (solo lectura).
 *  - No copia originales: solo derivados.
 *  - Strip EXIF GPS (sharp por defecto si no hay withMetadata).
 *  - Conserva rotación EXIF (.rotate()).
 *  - Descarta < 100 KB, < 800 px lado mayor, screenshots, miniaturas web.
 *
 * Uso:
 *   node scripts/build-mycology-derivatives.mjs
 */

import { promises as fs } from "node:fs";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// --- Configuración ---------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const OUT_IMG_DIR = path.join(PROJECT_ROOT, "public", "images", "micologia");
const OUT_INDEX = path.join(PROJECT_ROOT, "public", "data", "setas.json");

const SIZES = [1600, 800, 400];
const JPG_QUALITY = 82;
const WEBP_QUALITY = 80;
const MIN_BYTES = 100 * 1024; // 100 KB
const MIN_SIDE_PX = 800;

// Cuotas objetivo por carpeta. Si una carpeta no alcanza, compensa con otras.
const CUOTAS = [
  {
    clave: "especies",
    objetivo: 40,
    categoria: "especies",
    categoria_humana: "Especies",
    carpetas: [
      "E:/Domingo_Organizado/02_Micologia/Especies/especies",
    ],
    anho_fallback: null,
  },
  {
    clave: "ultimas_setas",
    objetivo: 40,
    categoria: "recolecciones",
    categoria_humana: "Recolección",
    carpetas: [
      "E:/Domingo_Organizado/02_Micologia/Ultimas_Setas/ULTIMAS SETAS",
    ],
    anho_fallback: null,
  },
  {
    clave: "catalogo",
    objetivo: 30,
    categoria: "catalogo",
    categoria_humana: "Catálogo Fungipedia",
    carpetas: [
      "E:/Domingo_Organizado/02_Micologia/Catalogo_Fungipedia/catalogo fungipedia",
    ],
    anho_fallback: null,
  },
  {
    clave: "setas_2014",
    objetivo: 25,
    categoria: "recolecciones",
    categoria_humana: "Recolección 2014",
    carpetas: [
      "E:/Domingo_Organizado/02_Micologia/Fotos_Setas_2014/2014-09-27 Setes y más",
      "E:/Domingo_Organizado/02_Micologia/Fotos_Setas_2014/2014-10-28 nuevas setas fon",
      "E:/Domingo_Organizado/02_Micologia/Fotos_Setas_2014/nuevas",
      "E:/Domingo_Organizado/02_Micologia/Fotos_Setas_2014/otras",
    ],
    anho_fallback: 2014,
  },
  {
    clave: "raiz_sueltas",
    objetivo: 10,
    categoria: "campo",
    categoria_humana: "Campo",
    carpetas: [
      "E:/Domingo_Organizado/01_Fotos/Otras/raiz_sueltas",
    ],
    filtro_nombre: /^nuevas setas fon/i,
    anho_fallback: null,
  },
  {
    clave: "curso",
    objetivo: 5,
    categoria: "especies",
    categoria_humana: "Curso · Especies",
    carpetas: [
      "E:/Domingo_Organizado/02_Micologia/Curso inicia ESPECIES",
    ],
    anho_fallback: null,
  },
];

// Géneros micológicos comunes. Si el nombre del archivo empieza con uno de
// estos (case-insensitive) y va seguido por una palabra que parece un epíteto
// específico, lo extraemos. Lista no exhaustiva pero cubre lo habitual en
// España.
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
  "Rebozuelo","Niscalo","Niscalos",
];

// --- Utilidades ------------------------------------------------------------

function slugify(s) {
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "") // quita extensión final
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

function inferEspecie(nombre) {
  const limpio = nombre.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  // Busca un género conocido como token aislado.
  for (const g of GENEROS) {
    const re = new RegExp("\\b" + g + "\\b", "i");
    if (re.test(limpio)) {
      // Capitaliza canónicamente y busca epíteto a continuación.
      const epitetoRe = new RegExp(
        "\\b" + g + "[\\s_\\-]+([a-z]{3,})",
        "i"
      );
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
  // 2011-09-19 21.14.58.jpg, 20101208014642.jpg, Boletus_edulis_2014.jpg
  const m1 = nombre.match(/(?<![0-9])(19[89]\d|20[0-2]\d)(?![0-9])/);
  if (m1) {
    const y = parseInt(m1[1], 10);
    if (y >= 1990 && y <= 2030) return y;
  }
  return null;
}

function exifAno(exif) {
  if (!exif) return null;
  const candidatos = [
    exif.DateTimeOriginal,
    exif.CreateDate,
    exif.ModifyDate,
  ].filter(Boolean);
  for (const c of candidatos) {
    const m = String(c).match(/(19[89]\d|20[0-2]\d)/);
    if (m) return parseInt(m[1], 10);
  }
  return null;
}

function altText({ categoria_humana, anho, especie }) {
  if (especie) {
    return `Seta ${especie} · ${categoria_humana}${anho ? ` (${anho})` : ""}`;
  }
  return `Seta · ${categoria_humana}${anho ? ` (${anho})` : ""}`;
}

function debeDescartarse(nombre, bytes) {
  if (bytes < MIN_BYTES) return "tamano_pequeno";
  const n = nombre.toLowerCase();
  if (n.endsWith(".tmp") || n === "thumbs.db" || n.endsWith(".ini")) {
    return "archivo_sistema";
  }
  if (/screenshot|screen|captura/i.test(nombre)) return "screenshot";
  if (/\.(zip|rar|7z|mp4|mov|avi)$/i.test(nombre)) return "no_imagen";
  if (!/\.(jpe?g|png|tif?f|heic|gif)$/i.test(nombre)) return "no_imagen";
  return null;
}

// --- Selección -------------------------------------------------------------

async function listarCandidatos(cfg) {
  const todos = [];
  for (const carpeta of cfg.carpetas) {
    if (!existsSync(carpeta)) {
      console.warn(`  [aviso] carpeta no encontrada: ${carpeta}`);
      continue;
    }
    const archivos = await fs.readdir(carpeta);
    for (const archivo of archivos) {
      if (cfg.filtro_nombre && !cfg.filtro_nombre.test(archivo)) continue;
      const abs = path.join(carpeta, archivo);
      let stat;
      try {
        stat = await fs.stat(abs);
      } catch {
        continue;
      }
      if (!stat.isFile()) continue;
      const motivo = debeDescartarse(archivo, stat.size);
      if (motivo) continue;
      todos.push({ archivo, abs, bytes: stat.size, carpeta });
    }
  }
  return todos;
}

function muestrearEspaciado(arr, n) {
  // Muestreo uniforme sin repetición para máxima variedad temporal/espacial.
  if (arr.length <= n) return [...arr];
  const out = [];
  const step = arr.length / n;
  for (let i = 0; i < n; i++) {
    const idx = Math.min(arr.length - 1, Math.floor(i * step));
    out.push(arr[idx]);
  }
  return out;
}

async function seleccionarPorCuota(cfg) {
  const candidatos = await listarCandidatos(cfg);
  // Estrategia:
  //  - "especies" y "catalogo": prioriza candidatos con género micológico
  //    reconocible en el nombre, complementa con los más grandes.
  //  - "ultimas_setas" / "setas_2014" / "raiz_sueltas" / "curso":
  //    ordena por nombre y muestrea uniformemente para evitar series.
  if (cfg.clave === "especies" || cfg.clave === "catalogo") {
    const conNombre = candidatos.filter((c) => inferEspecie(c.archivo));
    const restantes = candidatos
      .filter((c) => !inferEspecie(c.archivo))
      .sort((a, b) => b.bytes - a.bytes);
    const objetivo = cfg.objetivo;
    const cuotaNombrados = Math.min(conNombre.length, Math.ceil(objetivo * 0.7));
    const seleccion = [
      ...conNombre.slice(0, cuotaNombrados),
      ...restantes.slice(0, Math.max(0, objetivo - cuotaNombrados)),
    ];
    return seleccion.slice(0, objetivo);
  }
  // Orden estable por nombre y muestreo espaciado.
  candidatos.sort((a, b) => a.archivo.localeCompare(b.archivo));
  return muestrearEspaciado(candidatos, cfg.objetivo);
}

// --- Procesado -------------------------------------------------------------

async function procesarArchivo({ srcAbs, archivo, cfg, slugBase }) {
  const slug = slugBase;
  const inputBuffer = await fs.readFile(srcAbs);
  let meta;
  try {
    meta = await sharp(inputBuffer, { failOn: "none" }).metadata();
  } catch (err) {
    throw new Error(`metadata_fallida: ${err.message}`);
  }
  const ladoMax = Math.max(meta.width ?? 0, meta.height ?? 0);
  if (ladoMax < MIN_SIDE_PX) {
    throw new Error(`resolucion_baja_${ladoMax}px`);
  }

  // Año desde EXIF -> nombre -> fallback de carpeta
  let anho = exifAno(meta.exif ? null : null); // sharp metadata no expone DateTimeOriginal parseado
  // Sharp da exif como buffer; vamos a intentar exifr alternativo o parseo manual.
  // Por simplicidad, usamos solo el nombre y fallback de carpeta.
  if (!anho) anho = inferAnoDesdeNombre(archivo);
  if (!anho) anho = cfg.anho_fallback;

  const especie = inferEspecie(archivo);

  // Pipeline base: rota según EXIF, no preserva metadatos (Sharp default).
  const base = sharp(inputBuffer, { failOn: "none" }).rotate();

  const salidas = {};
  for (const size of SIZES) {
    const target = Math.min(size, ladoMax);
    const jpgPath = path.join(OUT_IMG_DIR, `${slug}_${size}.jpg`);
    const webpPath = path.join(OUT_IMG_DIR, `${slug}_${size}.webp`);

    const resized = base.clone().resize({
      width: target,
      height: target,
      fit: "inside",
      withoutEnlargement: true,
    });

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
    anho: anho ?? null,
    src_400: salidas[400].webp,
    src_800: salidas[800].webp,
    src_1600: salidas[1600].webp,
    src_400_jpg: salidas[400].jpg,
    src_800_jpg: salidas[800].jpg,
    src_1600_jpg: salidas[1600].jpg,
    alt: altText({
      categoria_humana: cfg.categoria_humana,
      anho: anho ?? null,
      especie,
    }),
    categoria: cfg.categoria,
    especie_sugerida: especie ?? null,
  };
}

// --- Main ------------------------------------------------------------------

async function main() {
  console.log("[mycology] inicio");
  const t0 = Date.now();
  await ensureDir(OUT_IMG_DIR);

  const indice = [];
  const errores = [];
  const slugsUsados = new Set();
  const resumenPorClave = {};

  for (const cfg of CUOTAS) {
    console.log(`\n[carpeta] ${cfg.clave} · objetivo ${cfg.objetivo}`);
    let seleccion;
    try {
      seleccion = await seleccionarPorCuota(cfg);
    } catch (err) {
      console.warn(`  error al listar: ${err.message}`);
      seleccion = [];
    }
    console.log(`  candidatos seleccionados: ${seleccion.length}`);
    let procesados = 0;
    let descartados = 0;
    for (const c of seleccion) {
      // slug único; si choca, añade hash corto del path.
      let slug = slugify(c.archivo);
      if (!slug) slug = "seta-" + Math.random().toString(16).slice(2, 8);
      if (slugsUsados.has(slug)) {
        const h = Buffer.from(c.abs).toString("hex").slice(0, 6);
        slug = `${slug}-${h}`;
      }
      slugsUsados.add(slug);
      try {
        const entrada = await procesarArchivo({
          srcAbs: c.abs,
          archivo: c.archivo,
          cfg,
          slugBase: slug,
        });
        indice.push(entrada);
        procesados++;
        if (procesados % 5 === 0) {
          process.stdout.write(`  · ${procesados}/${seleccion.length}\n`);
        }
      } catch (err) {
        descartados++;
        errores.push({ clave: cfg.clave, archivo: c.archivo, motivo: err.message });
      }
    }
    resumenPorClave[cfg.clave] = { procesados, descartados };
    console.log(`  procesados ${procesados}, descartados ${descartados}`);
  }

  await ensureDir(path.dirname(OUT_INDEX));
  const distAnho = {};
  for (const f of indice) {
    const k = f.anho ?? "sin_anho";
    distAnho[k] = (distAnho[k] ?? 0) + 1;
  }

  await fs.writeFile(
    OUT_INDEX,
    JSON.stringify(
      {
        actualizado: new Date().toISOString().slice(0, 10),
        fuente: "Archivo personal Domingo González de Lena Díaz",
        total: indice.length,
        fotos: indice,
        resumen_por_carpeta: resumenPorClave,
        distribucion_anho: distAnho,
        errores,
      },
      null,
      2
    ),
    "utf-8"
  );

  const t1 = Date.now();
  const seg = ((t1 - t0) / 1000).toFixed(1);
  console.log(`\n[ok] ${indice.length} fotos en ${seg} s. Errores/descartes: ${errores.length}`);
  console.log(`[ok] índice: ${OUT_INDEX}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

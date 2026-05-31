/**
 * build-photo-derivatives.mjs
 *
 * Genera derivados de la galería del archivo personal de Domingo a partir
 * de fotografías originales en `E:/Domingo_Organizado/01_Fotos/`.
 *
 * Para cada archivo fuente produce tres tamaños (1600, 800, 400 px en el lado
 * mayor) en JPG y WebP, conserva orientación EXIF y elimina GPS y otros
 * metadatos que puedan filtrar información privada. Calidades fijas: JPG 82,
 * WebP 80. La salida cae en `public/img/domingo/{carpeta}/{slug}-{tamaño}.{ext}`
 * y un `public/data/photos.json` recoge el índice usado por la galería.
 *
 * Uso:
 *   node scripts/build-photo-derivatives.mjs
 *
 * No se copia nunca el original a `public/`: solo derivados sin GPS.
 */

import { promises as fs } from "node:fs";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// --- Configuración -----------------------------------------------------------

const FOTOS_ROOT = "E:/Domingo_Organizado/01_Fotos";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const OUT_IMG_DIR = path.join(PROJECT_ROOT, "public", "img", "domingo");
const OUT_INDEX = path.join(PROJECT_ROOT, "public", "data", "photos.json");

const SIZES = [1600, 800, 400];
const JPG_QUALITY = 82;
const WEBP_QUALITY = 80;

// Selección curada manual. Solo carpetas marcadas a_curar y sin material privado.
// Distribución 60 fotos: 30 Nápoles + 15 Pravia + 15 WeTransfer.
//
// Nápoles: Sony DSLR-A230 + Panasonic FZ50, octubre 2010, viaje. Sampleamos
// dispersamente sobre los archivos disponibles para evitar series repetitivas.
// Se descartan las fotos con personas reconocibles si las hay (criterio: nombres
// neutros DSC*/P10*). Sin nombres tipo "fuocco" o personas.
//
// Pravia: Samsung Galaxy Ace S5830, septiembre 2011, sub-galería "Domingo en
// campo" (paisaje rural asturiano). Sampleamos 15 a lo largo del rango temporal.
//
// WeTransfer: Canon EOS 400D, mayo 2009, conjunto pequeño y homogéneo, tomamos
// 15 sobre 35 disponibles.

const SELECCION = {
  PELA_Napoles: {
    subcarpeta: "fotos nápoles pelayo",
    categoria: "viajes",
    anho: 2010,
    dispositivo: "Sony DSLR-A230",
    archivos: [
      "DSC00369.JPG",
      "DSC00400.JPG",
      "DSC00423.JPG",
      "DSC00440.JPG",
      "DSC00453.JPG",
      "DSC00484.JPG",
      "DSC00490.JPG",
      "DSC00496.JPG",
      "DSC00513.JPG",
      "DSC00525.JPG",
      "DSC00539.JPG",
      "DSC00548.JPG",
      "DSC00567.JPG",
      "DSC00581.JPG",
      "DSC00591.JPG",
      "DSC00617.JPG",
      "DSC00622.JPG",
      "DSC00633.JPG",
      "DSC00640.JPG",
      "DSC00659.JPG",
      "DSC00693.JPG",
      "P1050705.JPG",
      "P1050712.JPG",
      "P1050720.JPG",
      "P1050728.JPG",
      "P1050740.JPG",
      "P1050780.JPG",
      "P1050810.JPG",
      "P1050830.JPG",
      "P1050847.JPG",
    ],
  },
  Pravia: {
    subcarpeta: "learning/fotos pravia",
    categoria: "campo",
    anho: 2011,
    dispositivo: "Samsung Galaxy Ace S5830",
    archivos: [
      "2011-09-19 21.14.58.jpg",
      "2011-09-24 12.00.21.jpg",
      "2011-09-24 12.45.54.jpg",
      "2011-09-24 13.02.59.jpg",
      "2011-09-24 13.48.55.jpg",
      "2011-09-24 15.19.49.jpg",
      "2011-09-24 16.03.28.jpg",
      "2011-09-24 16.04.02.jpg",
      "2011-09-24 16.04.21.jpg",
      "2011-09-24 20.25.15.jpg",
      "2011-09-24 20.26.53.jpg",
      "2011-09-24 20.28.25.jpg",
      "2011-09-25 19.08.33.jpg",
      "2011-09-29 18.10.42.jpg",
      "2011-09-30 11.31.27.jpg",
    ],
  },
  WeTransfer: {
    subcarpeta: "",
    categoria: "viajes",
    anho: 2009,
    dispositivo: "Canon EOS 400D",
    archivos: [
      "IMG_0076.JPG",
      "IMG_0080.JPG",
      "IMG_0085.JPG",
      "IMG_0088.JPG",
      "IMG_0096.JPG",
      "IMG_0098.JPG",
      "IMG_0105.JPG",
      "IMG_0108.JPG",
      "IMG_0110.JPG",
      "IMG_0112.JPG",
      "IMG_0114.JPG",
      "IMG_0116.JPG",
      "IMG_0118.JPG",
      "IMG_0124.JPG",
      "IMG_0136.JPG",
    ],
  },
};

// --- Utilidades --------------------------------------------------------------

function slugify(s) {
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\.(jpg|jpeg|png|tif|tiff|heic)$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

function altDescriptivo({ carpeta, anho, idx }) {
  const carpetaNombres = {
    PELA_Napoles: "Nápoles",
    Pravia: "Pravia, Asturias",
    WeTransfer: "Material de archivo",
  };
  const lugar = carpetaNombres[carpeta] ?? carpeta;
  return `Fotografía del archivo personal de Domingo, ${lugar}, ${anho}. Imagen ${idx + 1}.`;
}

function publicSrc(rel) {
  // Las rutas en photos.json son relativas a /public, con barra inicial.
  return "/" + rel.split(path.sep).join("/");
}

// --- Procesado ---------------------------------------------------------------

async function procesarArchivo({ srcAbs, carpeta, archivo, idx, anho, categoria }) {
  const slug = slugify(archivo);
  const carpetaSalida = path.join(OUT_IMG_DIR, carpeta);
  await ensureDir(carpetaSalida);

  // Lectura única, luego varias resizes a partir del mismo buffer rotado.
  const inputBuffer = await fs.readFile(srcAbs);

  // Pipeline base: rota según EXIF y elimina perfil/EXIF privado.
  // sharp aplica EXIF Orientation con `rotate()` antes de escribir.
  // No usamos `withMetadata({ exif: ... })` para evitar copiar GPS y datos
  // privados. La rotación queda quemada en el píxel por `rotate()`.
  const base = sharp(inputBuffer, { failOn: "none" }).rotate();

  // Tamaño máximo del lado mayor según resolución del original.
  const meta = await sharp(inputBuffer).metadata();
  const ladoMax = Math.max(meta.width ?? 0, meta.height ?? 0);

  const salidas = {};

  for (const size of SIZES) {
    if (size > ladoMax && size !== Math.min(...SIZES)) {
      // Si el original es más pequeño que este tamaño objetivo, no hacemos
      // upscaling: la imagen mayor disponible se reusa para sizes superiores.
    }

    const target = Math.min(size, ladoMax || size);

    const jpgPath = path.join(carpetaSalida, `${slug}-${size}.jpg`);
    const webpPath = path.join(carpetaSalida, `${slug}-${size}.webp`);

    // Clonamos para no consumir el pipeline.
    const resized = base.clone().resize({
      width: target,
      height: target,
      fit: "inside",
      withoutEnlargement: true,
    });

    await Promise.all([
      resized
        .clone()
        .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
        .toFile(jpgPath),
      resized
        .clone()
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpPath),
    ]);

    salidas[size] = {
      jpg: publicSrc(path.relative(path.join(PROJECT_ROOT, "public"), jpgPath)),
      webp: publicSrc(path.relative(path.join(PROJECT_ROOT, "public"), webpPath)),
    };
  }

  return {
    slug,
    anho,
    carpeta_origen: carpeta,
    src_1600: salidas[1600].jpg,
    src_1600_webp: salidas[1600].webp,
    src_800: salidas[800].jpg,
    src_800_webp: salidas[800].webp,
    src_400: salidas[400].jpg,
    src_400_webp: salidas[400].webp,
    alt: altDescriptivo({ carpeta, anho, idx }),
    categoria,
  };
}

async function main() {
  console.log("[build-photo-derivatives] inicio");
  const t0 = Date.now();

  await ensureDir(OUT_IMG_DIR);

  const indice = [];
  const errores = [];

  for (const [carpeta, cfg] of Object.entries(SELECCION)) {
    const carpetaFs = path.join(FOTOS_ROOT, carpeta, cfg.subcarpeta);
    if (!existsSync(carpetaFs)) {
      console.warn(`[aviso] carpeta no encontrada: ${carpetaFs}`);
      continue;
    }
    console.log(`[carpeta] ${carpeta} -> ${cfg.archivos.length} fotos`);
    for (let i = 0; i < cfg.archivos.length; i++) {
      const archivo = cfg.archivos[i];
      const srcAbs = path.join(carpetaFs, archivo);
      if (!existsSync(srcAbs)) {
        console.warn(`  · no existe: ${archivo}`);
        errores.push({ carpeta, archivo, motivo: "no_existe" });
        continue;
      }
      try {
        const entrada = await procesarArchivo({
          srcAbs,
          carpeta,
          archivo,
          idx: i,
          anho: cfg.anho,
          categoria: cfg.categoria,
        });
        indice.push(entrada);
        process.stdout.write(`  · ${archivo} ✓\n`);
      } catch (err) {
        console.warn(`  · error ${archivo}: ${err.message}`);
        errores.push({ carpeta, archivo, motivo: err.message });
      }
    }
  }

  await ensureDir(path.dirname(OUT_INDEX));
  await fs.writeFile(
    OUT_INDEX,
    JSON.stringify(
      {
        actualizado: new Date().toISOString().slice(0, 10),
        total: indice.length,
        fotos: indice,
        errores,
      },
      null,
      2
    ),
    "utf-8"
  );

  const t1 = Date.now();
  const segundos = ((t1 - t0) / 1000).toFixed(1);
  console.log(`[ok] ${indice.length} fotos procesadas en ${segundos} s. Errores: ${errores.length}`);
  console.log(`[ok] índice: ${OUT_INDEX}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

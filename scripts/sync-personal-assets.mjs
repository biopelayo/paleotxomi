/**
 * Sincroniza imágenes y documentos personales de Domingo
 * desde E:\Domingo_Organizado\ a public/personal/ y public/micologia/.
 *
 * Procesa cada imagen: long-edge 1600 px JPG q=88 (vía sharp si está, fallback copia).
 * Para evitar dependencias extra, usa solo Node + fs y delega el resize a un
 * script Python auxiliar (PIL ya disponible) llamado vía child_process.
 *
 * Uso:
 *   node scripts/sync-personal-assets.mjs
 */
import { execFileSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

const SRC = "E:\\Domingo_Organizado";
const DEST = "D:\\Antigravity\\proyecto-domingo-web\\public";

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[ñ]/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function resizeOne(srcPath, dstPath, target = 1600, quality = 88) {
  const py = `
import sys
from PIL import Image, ImageOps
src, dst, target, quality = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
im = Image.open(src)
im = ImageOps.exif_transpose(im).convert('RGB')
w, h = im.size
if max(w, h) > target:
    if w >= h:
        im = im.resize((target, round(h*target/w)), Image.LANCZOS)
    else:
        im = im.resize((round(w*target/h), target), Image.LANCZOS)
im.save(dst, 'JPEG', quality=quality, optimize=True, progressive=True)
print('OK')
`;
  try {
    execFileSync("python", ["-c", py, srcPath, dstPath, String(target), String(quality)], {
      stdio: ["ignore", "pipe", "pipe"],
    });
    return true;
  } catch (e) {
    console.error("[!]", srcPath, "->", e.message);
    return false;
  }
}

async function listFiles(dir, predicate) {
  let out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out = out.concat(await listFiles(full, predicate));
    } else if (predicate(e.name)) {
      out.push(full);
    }
  }
  return out;
}

async function syncExposicion() {
  const dst = path.join(DEST, "personal", "exposicion");
  await ensureDir(dst);
  const dirs = [
    path.join(SRC, "06_Documentos_Personales", "Papa_Arte_Piedras", "EXPOSICIÓN"),
  ];
  let i = 1;
  for (const d of dirs) {
    const files = (await listFiles(d, (n) => /\.(jpe?g|JPE?G)$/.test(n)))
      .filter((p) => !p.includes(path.join("EXPOSICIÓN", "EXPOSICIÓN")));
    for (const f of files) {
      const out = path.join(dst, `exposicion-${String(i).padStart(2, "0")}.jpg`);
      const ok = await resizeOne(f, out);
      if (ok) i++;
    }
  }
  console.log(`[+] exposicion: ${i - 1} fotos`);
}

async function syncPiezas() {
  const dst = path.join(DEST, "personal", "piezas");
  await ensureDir(dst);
  const groups = [
    { dir: path.join(SRC, "06_Documentos_Personales", "Papa_Arte_Piedras", "VENUS DEL CUERNO"), prefix: "venus-cuerno" },
    { dir: path.join(SRC, "06_Documentos_Personales", "Papa_Arte_Piedras", "piedras"), prefix: "pieza" },
  ];
  let total = 0;
  for (const g of groups) {
    const files = await listFiles(g.dir, (n) => /\.(jpe?g|JPE?G|png|PNG)$/.test(n));
    let j = 1;
    for (const f of files) {
      const out = path.join(dst, `${g.prefix}-${String(j).padStart(2, "0")}.jpg`);
      const ok = await resizeOne(f, out);
      if (ok) j++;
    }
    total += j - 1;
    console.log(`[+] ${g.prefix}: ${j - 1} fotos`);
  }
  console.log(`[+] piezas total: ${total}`);
}

async function syncPerfil() {
  const src = path.join(SRC, "07_Web_Archivada", "Perfil_Domingo");
  const profileFiles = path.join(src, "Domingo González de Lena_files");
  const photosFiles = path.join(src, "Fotos del perfil - Domingo González de Lena_files");
  const dst = path.join(DEST, "personal", "perfil");
  await ensureDir(dst);
  const candidates = [
    ...(await listFiles(profileFiles, (n) => /\.(jpe?g|png)$/i.test(n))),
    ...(await listFiles(photosFiles, (n) => /\.(jpe?g|png)$/i.test(n))),
  ];
  // Solo fotos con tamaño > 30 KB (filtra iconos)
  const sized = [];
  for (const f of candidates) {
    try {
      const st = await fs.stat(f);
      if (st.size > 30000) sized.push(f);
    } catch {}
  }
  let i = 1;
  for (const f of sized.slice(0, 60)) {
    const out = path.join(dst, `perfil-${String(i).padStart(2, "0")}.jpg`);
    const ok = await resizeOne(f, out, 1200, 85);
    if (ok) i++;
  }
  console.log(`[+] perfil: ${i - 1} fotos`);
}

async function syncSetas() {
  const src = path.join(SRC, "02_Micologia", "Fotos_Setas_2014");
  const dst = path.join(DEST, "micologia", "setas");
  await ensureDir(dst);
  const files = await listFiles(src, (n) => /\.(jpe?g|JPE?G)$/.test(n));
  // Tomamos 60 fotos representativas
  const sample = files.slice(0, 60);
  let i = 1;
  for (const f of sample) {
    const out = path.join(dst, `seta-${String(i).padStart(3, "0")}.jpg`);
    const ok = await resizeOne(f, out, 1200, 85);
    if (ok) i++;
  }
  console.log(`[+] setas: ${i - 1} fotos`);
}

async function main() {
  await syncExposicion();
  await syncPiezas();
  await syncPerfil();
  await syncSetas();
  console.log("[done]");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

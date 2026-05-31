// Helper para resolver rutas en GitHub Pages.
// En desarrollo NEXT_PUBLIC_BASE_PATH = "" y la función devuelve la ruta tal cual.
// En el build de GitHub Actions, NEXT_PUBLIC_BASE_PATH = "/domingo-archivo" y
// la función antepone ese prefijo a las rutas absolutas que empiezan por "/".

const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

export function withBasePath(input: string | null | undefined): string {
  if (!input) return "";
  if (!BASE_PATH) return input;
  // URLs absolutas externas: no tocar.
  if (/^https?:\/\//i.test(input) || input.startsWith("data:")) return input;
  // Rutas relativas: tampoco tocar.
  if (!input.startsWith("/")) return input;
  // Evitar doble prefijo.
  if (input.startsWith(`${BASE_PATH}/`)) return input;
  return `${BASE_PATH}${input}`;
}

export const basePath = BASE_PATH;

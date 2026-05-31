import Image from "next/image";
import Link from "next/link";
import path from "node:path";
import { promises as fs } from "node:fs";

type Piece = { id_pieza: string; archivo_master: string; seccion: string; thumb: string; web: string };

async function loadFirst(n: number): Promise<Piece[]> {
  const file = path.join(process.cwd(), "public", "data", "catalog.json");
  const text = await fs.readFile(file, "utf-8");
  const all = JSON.parse(text) as Piece[];
  return all.filter((p) => p.seccion === "1_ESCULTURAS").slice(0, n);
}

export default async function GalleryTeaser() {
  const pieces = await loadFirst(8);
  return (
    <section className="section" style={{ background: "var(--pel-card)", borderTop: "1px solid var(--pel-border)", borderBottom: "1px solid var(--pel-border)" }}>
      <div className="container-page">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
          <div>
            <p className="kicker mb-2">Galería</p>
            <h2 className="headline" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
              Ocho piezas para empezar
            </h2>
            <div className="h-divider" />
          </div>
          <Link href="/galeria/corpus" className="btn btn-primary">Ver el corpus entero</Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {pieces.map((p) => (
            <Link
              key={p.id_pieza}
              href="/galeria/corpus"
              className="card p-0 overflow-hidden block relative"
              style={{ aspectRatio: "2/3", borderRadius: 12 }}
              aria-label={p.id_pieza}
            >
              {p.web ? (
                <Image
                  src={p.web}
                  alt={p.id_pieza}
                  width={534}
                  height={800}
                  sizes="(max-width: 640px) 50vw, 25vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--pel-green-4)" }} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

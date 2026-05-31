import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { promises as fs } from "node:fs";
import path from "node:path";
import { useTranslations } from "next-intl";

import DomingoBubbles from "@/components/ui/DomingoBubbles";

export const metadata: Metadata = { title: "Arte paleolítico — proyecto expositivo" };

type Pieza = { id: number; motivo: string; ancho_cm: number | null; alto_cm: number | null };
type Cueva = { id: string; nombre: string; concejo: string; unesco: boolean; piezas: Pieza[] };
type Exposicion = {
  fuente: string;
  objeto: string;
  estudios_referencia: string[];
  cuevas: Cueva[];
};

async function loadExposicion(): Promise<Exposicion> {
  const txt = await fs.readFile(path.join(process.cwd(), "public", "data", "exposicion.json"), "utf-8");
  return JSON.parse(txt);
}

async function listImages(dir: string): Promise<string[]> {
  try {
    const full = path.join(process.cwd(), "public", dir);
    const files = await fs.readdir(full);
    return files
      .filter((f) => /\.jpe?g$/i.test(f))
      .sort()
      .map((f) => `/${dir}/${f}`);
  } catch {
    return [];
  }
}

function ExpoHeader() {
  const t = useTranslations("exposicion");
  return (
    <>
      <p className="kicker mb-2">Archivo personal · arte</p>
      <h1 className="headline">{t("title")}</h1>
      <div className="h-divider" />
      <p className="lead text-lg mt-4">{t("subtitle")}</p>
    </>
  );
}

function dim(p: Pieza): string {
  if (p.ancho_cm == null || p.alto_cm == null) return "(dimensión sin determinar)";
  return `${p.ancho_cm} × ${p.alto_cm} cm`;
}

export default async function ExposicionPage() {
  const data = await loadExposicion();
  const fotosExpo = await listImages("personal/exposicion");
  const fotosPiezas = await listImages("personal/piezas");
  const totalPiezas = data.cuevas.reduce((acc, c) => acc + c.piezas.length, 0);

  return (
    <section className="section relative overflow-hidden">
      <DomingoBubbles theme="paleolithic" count={26} giant />
      <div className="container-page max-w-5xl relative" style={{ zIndex: 2 }}>
        <ExpoHeader />

        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          <div className="card">
            <p className="kicker mb-1" style={{ color: "var(--pel-warm)" }}>Objeto</p>
            <p className="lead" style={{ fontSize: "0.95rem" }}>{data.objeto}</p>
          </div>
          <div className="card">
            <p className="kicker mb-1" style={{ color: "var(--pel-warm)" }}>Cuevas representadas</p>
            <p className="lead" style={{ fontSize: "0.95rem" }}>{data.cuevas.length} cuevas asturianas</p>
            <p className="text-sm mt-2" style={{ color: "var(--pel-ink-soft)" }}>
              {data.cuevas.map((c) => c.nombre.replace(/^Cueva del? |^Cueva o abrigo de la |^Cueva de la /, "")).join(" · ")}
            </p>
          </div>
          <div className="card">
            <p className="kicker mb-1" style={{ color: "var(--pel-warm)" }}>Piezas</p>
            <p style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "2rem", lineHeight: 1.05 }}>{totalPiezas}</p>
            <p className="text-sm" style={{ color: "var(--pel-ink-soft)" }}>en piedra, exposición entera</p>
          </div>
        </div>

        <p className="mt-3 text-xs" style={{ color: "var(--pel-muted)" }}>
          Fuente del proyecto: {data.fuente}.
        </p>

        {fotosExpo.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-10" style={{ color: "var(--pel-green)" }}>
              Fotos de la exposición
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {fotosExpo.map((src, i) => (
                <div key={src} className="card p-0 overflow-hidden" style={{ aspectRatio: "4/3", borderRadius: 12 }}>
                  <Image
                    src={src}
                    alt={`Foto exposición ${i + 1}`}
                    width={800}
                    height={600}
                    sizes="(max-width: 640px) 50vw, 33vw"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <h2 className="text-2xl font-bold mt-10" style={{ color: "var(--pel-green)" }}>
          Las {data.cuevas.length} cuevas y sus piezas
        </h2>
        <div className="space-y-6 mt-4">
          {data.cuevas.map((c) => (
            <div key={c.id} className="card">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h3 style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "1.2rem" }}>{c.nombre}</h3>
                {c.unesco && (
                  <span className="text-xs" style={{ background: "var(--pel-warm)", color: "#fff", padding: "2px 8px", borderRadius: 999 }}>
                    UNESCO
                  </span>
                )}
                <span className="text-sm" style={{ color: "var(--pel-muted)" }}>{c.concejo}</span>
              </div>
              {c.piezas.length === 0 ? (
                <p className="text-sm mt-2" style={{ color: "var(--pel-muted)" }}>Sin piezas detalladas en el proyecto.</p>
              ) : (
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 mt-3 text-sm">
                  {c.piezas.map((p) => (
                    <li key={p.id} style={{ color: "var(--pel-ink-soft)" }}>
                      <span style={{ color: "var(--pel-warm)", fontWeight: 700, marginRight: 6 }}>#{p.id}</span>
                      <strong style={{ color: "var(--pel-ink)" }}>{p.motivo}</strong>
                      <span style={{ marginLeft: 6, color: "var(--pel-muted)" }}>· {dim(p)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <p className="lead mt-10" style={{ fontSize: "0.95rem" }}>
          <strong style={{ color: "var(--pel-green)" }}>Estudios de referencia:</strong>{" "}
          {data.estudios_referencia.join(", ")}.
        </p>

        {fotosPiezas.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-10" style={{ color: "var(--pel-green)" }}>
              Piezas y la Venus del cuerno
            </h2>
            <p className="lead mt-2" style={{ fontSize: "0.95rem" }}>
              {fotosPiezas.length} fotografías de piedras del archivo personal, incluida la Venus del cuerno.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
              {fotosPiezas.map((src, i) => (
                <div key={src} className="card p-0 overflow-hidden" style={{ aspectRatio: "1", borderRadius: 12 }}>
                  <Image
                    src={src}
                    alt={`Pieza ${i + 1}`}
                    width={400}
                    height={400}
                    sizes="(max-width: 640px) 50vw, 25vw"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-10">
          <Link href="/galeria/corpus" className="btn btn-ghost">
            Ver el corpus fotográfico
          </Link>
        </div>
      </div>
    </section>
  );
}

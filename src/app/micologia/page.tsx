import type { Metadata } from "next";
import Image from "next/image";
import { promises as fs } from "node:fs";
import path from "node:path";
import { Download, Calendar, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";

import DomingoBubbles from "@/components/ui/DomingoBubbles";
import SetasGallery, { type Seta } from "@/components/micologia/SetasGallery";
import { withBasePath } from "@/lib/basePath";

export const metadata: Metadata = { title: "Micología y docencia" };

const CURSOS = [
  { ano: 2013, lugar: "Oviedo" },
  { ano: 2014, lugar: "Oviedo (San Claudio)" },
  { ano: 2015, lugar: "Oviedo" },
];

async function loadSetas(): Promise<Seta[]> {
  try {
    const file = path.join(process.cwd(), "public", "data", "setas.json");
    const raw = await fs.readFile(file, "utf-8");
    const data = JSON.parse(raw) as { fotos?: Seta[] };
    return Array.isArray(data.fotos) ? data.fotos : [];
  } catch {
    return [];
  }
}

function MicHeader() {
  const t = useTranslations("micologia");
  return (
    <>
      <p className="kicker mb-2">Archivo personal · setas</p>
      <h1 className="headline">{t("title")}</h1>
      <div className="h-divider" />
      <p className="lead text-lg mt-4">{t("subtitle")}</p>
    </>
  );
}

function GaleriaHeader() {
  const t = useTranslations("micologia.galeria");
  return (
    <>
      <h2 className="text-2xl font-bold mt-10" style={{ color: "var(--pel-green)" }}>
        {t("titulo")}
      </h2>
      <p className="lead mt-2" style={{ fontSize: "0.92rem" }}>{t("subtitulo")}</p>
    </>
  );
}

export default async function MicologiaPage() {
  const setas = await loadSetas();
  return (
    <section className="section relative overflow-hidden">
      <DomingoBubbles theme="mushroom" count={26} giant />
      <div className="container-page max-w-5xl relative" style={{ zIndex: 2 }}>
        <MicHeader />

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-2 card">
            <div className="flex items-center gap-2 mb-2" style={{ color: "var(--pel-warm)" }}>
              <BookOpen size={18} /> <span className="kicker" style={{ color: "var(--pel-warm)" }}>Libreto</span>
            </div>
            <h2 style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "1.3rem" }}>
              «Iniciación a la micología»
            </h2>
            <p className="lead mt-2" style={{ fontSize: "0.95rem" }}>
              Libreto de 30 páginas escrito por Domingo en 2013 para sus cursos en Oviedo. Cubre clasificación de hongos, partes del carpóforo, especies comestibles y tóxicas, y claves de búsqueda y degustación.
            </p>
            <a
              href={withBasePath("/micologia/libreto-iniciacion-micologia.pdf")}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary mt-5 inline-flex"
              style={{ background: "var(--pel-warm)", color: "#fff", borderColor: "var(--pel-warm)" }}
            >
              <Download size={16} /> Descargar PDF
            </a>
          </div>
          <div className="card">
            <Image
              src={withBasePath("/micologia/libreto-portada.jpg")}
              alt="Portada del libreto"
              width={400}
              height={560}
              style={{ width: "100%", height: "auto", borderRadius: 8 }}
            />
            <p className="text-xs text-center mt-2" style={{ color: "var(--pel-muted)" }}>
              Portada original
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-10" style={{ color: "var(--pel-green)" }}>Cursos impartidos</h2>
        <ul className="grid sm:grid-cols-3 gap-4 mt-4">
          {CURSOS.map((c) => (
            <li key={c.ano} className="card">
              <div className="flex items-center gap-2 mb-1" style={{ color: "var(--pel-warm)" }}>
                <Calendar size={16} /> <span className="kicker" style={{ color: "var(--pel-warm)" }}>Curso</span>
              </div>
              <p style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "1.6rem" }}>{c.ano}</p>
              <p style={{ color: "var(--pel-ink-soft)", fontSize: "0.9rem" }}>{c.lugar}</p>
            </li>
          ))}
        </ul>

        {setas.length > 0 && (
          <>
            <GaleriaHeader />
            <div className="mt-6">
              <SetasGallery setas={setas} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

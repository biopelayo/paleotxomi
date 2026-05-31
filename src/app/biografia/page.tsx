import type { Metadata } from "next";
import Image from "next/image";
import { promises as fs } from "node:fs";
import path from "node:path";
import { getTranslations } from "next-intl/server";
import { Hammer, Leaf, Mountain } from "lucide-react";

import DomingoBubbles from "@/components/ui/DomingoBubbles";
import Timeline, { type TimelineItem } from "@/components/biografia/Timeline";
import { withBasePath } from "@/lib/basePath";

export const metadata: Metadata = { title: "Biografía" };

type CronologiaEntry = TimelineItem & {
  incierto?: boolean;
};

type Bio = {
  nombre: string;
  nombre_completo?: string;
  lugar: string;
  datos_publicos?: {
    lugar_nacimiento?: string;
    anho_nacimiento?: number;
    fecha_nacimiento_completa?: string;
  };
  cronologia: CronologiaEntry[];
  heraldica?: {
    paterno?: { apellido?: string; fuente_imagen?: string };
  };
};

async function loadBio(): Promise<Bio> {
  const txt = await fs.readFile(
    path.join(process.cwd(), "public", "data", "biografia.json"),
    "utf-8"
  );
  return JSON.parse(txt);
}

export default async function BiografiaPage() {
  const bio = await loadBio();
  const t = await getTranslations("biografia");

  const hitos = bio.cronologia
    .filter((h) => h.incierto !== true)
    .sort((a, b) => a.anho - b.anho);

  const nombre = bio.nombre_completo ?? bio.nombre;
  const lugarNac = bio.datos_publicos?.lugar_nacimiento ?? "Pajares (Lena)";
  const anhoNac = bio.datos_publicos?.anho_nacimiento ?? 1959;
  const escudo = bio.heraldica?.paterno;

  const facetas = [
    { id: "escultor", Icon: Hammer, label: t("facetas.escultor") },
    { id: "micologo", Icon: Leaf, label: t("facetas.micologo") },
    { id: "naturalista", Icon: Mountain, label: t("facetas.naturalista") },
  ];

  return (
    <section className="section relative overflow-hidden">
      <DomingoBubbles theme="mixed" count={18} giant />
      <div className="container-page max-w-4xl relative" style={{ zIndex: 2 }}>
        {/* Hero */}
        <header>
          <p className="kicker mb-2">{t("titulo")}</p>
          <h1 className="headline">{nombre}</h1>
          <div className="h-divider" />
          <p
            className="lead text-lg mt-4"
            style={{ color: "var(--pel-ink)" }}
          >
            {t("subtitulo", { lugar: lugarNac, anho: String(anhoNac) })}
          </p>
          <p className="lead mt-3">{t("intro")}</p>

          {/* Facetas con icono */}
          <ul className="flex flex-wrap gap-2 mt-5" aria-label="Facetas">
            {facetas.map(({ id, Icon, label }) => (
              <li
                key={id}
                className="inline-flex items-center gap-2"
                style={{
                  background: "var(--pel-green-4)",
                  color: "var(--pel-green)",
                  border: "1px solid var(--pel-green-3)",
                  padding: "0.4rem 0.85rem",
                  borderRadius: 999,
                  fontSize: "0.88rem",
                  fontWeight: 600,
                }}
              >
                <Icon size={16} aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </header>

        {/* Timeline */}
        <section className="mt-10" aria-labelledby="timeline-titulo">
          <h2
            id="timeline-titulo"
            className="text-2xl font-bold"
            style={{ color: "var(--pel-green)" }}
          >
            {t("timeline_titulo")}
          </h2>
          <p
            className="mt-1"
            style={{ color: "var(--pel-muted)", fontSize: "0.88rem" }}
          >
            {hitos.length} hitos documentados.
          </p>
          <Timeline items={hitos} />
        </section>

        {/* Heráldica · detalle discreto */}
        {escudo?.fuente_imagen && (
          <div
            className="mt-8 flex items-center gap-3"
            style={{ borderTop: "1px solid var(--pel-border)", paddingTop: "1.1rem" }}
          >
            <Image
              src={withBasePath(escudo.fuente_imagen)}
              alt={`Escudo del apellido ${escudo.apellido ?? "González de Lena"}`}
              width={44}
              height={52}
              style={{ width: "auto", height: 52 }}
            />
            <p style={{ fontSize: "0.82rem", color: "var(--pel-muted)" }}>
              Escudo del apellido {escudo.apellido ?? "González de Lena"}.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

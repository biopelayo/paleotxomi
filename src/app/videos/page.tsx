import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import { getTranslations } from "next-intl/server";
import { Tv, Video as VideoIcon } from "lucide-react";

import VideoCard, { type Video } from "@/components/videos/VideoCard";

export const metadata: Metadata = { title: "Videos" };

type Seccion = {
  id: string;
  titulo: string;
  programa: string;
  cadena: string;
  descripcion: string;
  videos: Video[];
};

type VideosFile = {
  actualizado: string;
  secciones: Seccion[];
};

async function loadVideos(): Promise<VideosFile> {
  const file = path.join(process.cwd(), "public", "data", "videos.json");
  const txt = await fs.readFile(file, "utf-8");
  return JSON.parse(txt) as VideosFile;
}

export default async function VideosPage() {
  const data = await loadVideos();
  const t = await getTranslations("videos");

  const fmtActualizado = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(data.actualizado + "T00:00:00"));

  return (
    <section className="section">
      <div className="container-page max-w-5xl">
        <p className="kicker mb-2">Archivo personal</p>
        <h1 className="headline">{t("titulo")}</h1>
        <div className="h-divider" />
        <p className="lead text-lg mt-4">{t("subtitulo")}</p>
        <p
          className="text-xs mt-2"
          style={{ color: "var(--pel-muted)" }}
        >
          Última actualización: {fmtActualizado}
        </p>

        {data.secciones.map((seccion) => (
          <article key={seccion.id} className="mt-10">
            <header>
              <h2
                className="flex items-center gap-3 text-2xl md:text-3xl font-bold"
                style={{ color: "var(--pel-green)", lineHeight: 1.2 }}
              >
                <VideoIcon
                  size={26}
                  aria-hidden="true"
                  style={{ color: "var(--pel-warm)" }}
                />
                {seccion.titulo}
              </h2>
              <p
                className="mt-2 text-sm flex items-center gap-2"
                style={{ color: "var(--pel-ink-soft)" }}
              >
                <Tv size={14} aria-hidden="true" />
                <span>
                  <strong style={{ fontWeight: 600 }}>{seccion.programa}</strong>
                  {" · "}
                  {seccion.cadena}
                </span>
              </p>
              <p
                className="mt-3 max-w-3xl"
                style={{ color: "var(--pel-ink-soft)" }}
              >
                {seccion.descripcion}
              </p>
            </header>

            {seccion.videos.length === 0 ? (
              <div className="card mt-6">
                <p
                  className="kicker mb-2"
                  style={{ color: "var(--pel-warm)" }}
                >
                  En recuperación
                </p>
                <p className="lead" style={{ fontSize: "1rem" }}>
                  {t("placeholder")}
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                {seccion.videos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    labelDuracion={t("duracion")}
                    labelFecha={t("fechaEmision")}
                    labelCerrar={t("cerrar")}
                  />
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

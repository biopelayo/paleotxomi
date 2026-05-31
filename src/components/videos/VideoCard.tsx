"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, Calendar, Clock, ExternalLink, X } from "lucide-react";

import { withBasePath } from "@/lib/basePath";

export type Video = {
  id: string;
  titulo: string;
  fecha_emision: string;
  url: string;
  embed_url?: string;
  thumbnail?: string;
  duracion_min?: number;
  descripcion?: string;
};

function formatFecha(iso: string): string {
  // Tolerante a cadenas vacías o mal formadas: si Intl no puede parsearlo,
  // devolvemos la cadena original sin romper la card.
  try {
    const d = new Date(iso + "T00:00:00");
    if (Number.isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return iso;
  }
}

export default function VideoCard({
  video,
  labelDuracion,
  labelFecha,
  labelCerrar,
}: {
  video: Video;
  labelDuracion: string;
  labelFecha: string;
  labelCerrar: string;
}) {
  const [open, setOpen] = useState(false);
  const tieneEmbed = Boolean(video.embed_url);

  // Bloquear scroll del body mientras el modal está abierto.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const thumb = video.thumbnail ? withBasePath(video.thumbnail) : null;

  const inner = (
    <>
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 9",
          background: "var(--pel-green-4)",
          overflow: "hidden",
        }}
      >
        {thumb ? (
          <Image
            src={thumb}
            alt={`Miniatura: ${video.titulo}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--pel-green)",
              opacity: 0.4,
            }}
          >
            <Play size={48} />
          </div>
        )}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%)",
            transition: "background 220ms ease",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "var(--pel-warm)",
              color: "#fff",
              boxShadow: "0 6px 18px -4px rgba(0,0,0,0.35)",
            }}
          >
            <Play size={24} fill="#fff" />
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col grow gap-2">
        <h3
          className="text-lg font-bold"
          style={{ color: "var(--pel-green)", lineHeight: 1.25 }}
        >
          {video.titulo}
        </h3>
        <p
          className="text-sm flex items-center gap-2"
          style={{ color: "var(--pel-ink-soft)" }}
        >
          <Calendar size={14} aria-hidden="true" />
          <span>
            {labelFecha}: {formatFecha(video.fecha_emision)}
          </span>
        </p>
        {typeof video.duracion_min === "number" && (
          <p
            className="text-sm flex items-center gap-2"
            style={{ color: "var(--pel-ink-soft)" }}
          >
            <Clock size={14} aria-hidden="true" />
            <span>
              {labelDuracion}: {video.duracion_min} min
            </span>
          </p>
        )}
        {video.descripcion && (
          <p
            className="text-sm mt-1"
            style={{ color: "var(--pel-ink-soft)" }}
          >
            {video.descripcion}
          </p>
        )}
        {!tieneEmbed && (
          <p
            className="text-xs mt-2 flex items-center gap-1"
            style={{ color: "var(--pel-muted)" }}
          >
            <ExternalLink size={12} aria-hidden="true" />
            Abre en una pestaña nueva
          </p>
        )}
      </div>
    </>
  );

  if (tieneEmbed) {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-label={`Reproducir: ${video.titulo}`}
          className="card flex flex-col h-full text-left"
          style={{
            padding: 0,
            overflow: "hidden",
            cursor: "pointer",
            width: "100%",
            background: "var(--pel-card)",
          }}
        >
          {inner}
        </button>

        {open && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={video.titulo}
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(0,0,0,0.78)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.25rem",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "min(960px, 100%)",
                aspectRatio: "16 / 9",
                background: "#000",
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: "0 24px 60px -10px rgba(0,0,0,0.6)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={labelCerrar}
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  zIndex: 2,
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  background: "rgba(0,0,0,0.55)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.25)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={18} aria-hidden="true" />
              </button>
              <iframe
                src={video.embed_url}
                title={video.titulo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ver en origen: ${video.titulo}`}
      className="card flex flex-col h-full"
      style={{
        padding: 0,
        overflow: "hidden",
        background: "var(--pel-card)",
      }}
    >
      {inner}
    </a>
  );
}

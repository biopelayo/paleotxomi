"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

import { withBasePath } from "@/lib/basePath";

type Piece = {
  id_pieza: string;
  archivo_master: string;
  fotografo: string;
  fecha_fotografia: string;
  resolucion_max_px: string;
  seccion: string;
  thumb: string;
  web: string;
  web_jpg: string;
  certeza: string;
  validacion_cientifica: string;
};

type Filter = "all" | "esc" | "otr";

export default function GalleryClient({ pieces }: { pieces: Piece[] }) {
  const t = useTranslations("gallery");
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number>(-1);

  const filtered = useMemo(() => {
    return pieces.filter((p) => {
      if (filter === "esc" && p.seccion !== "1_ESCULTURAS") return false;
      if (filter === "otr" && p.seccion !== "2_OTRAS") return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !p.id_pieza.toLowerCase().includes(q) &&
          !p.archivo_master.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [pieces, filter, query]);

  const slides = useMemo(
    () =>
      filtered.map((p) => {
        const seccionLabel = p.seccion === "1_ESCULTURAS" ? "Escultura" : "Otra pieza";
        const meta = [
          `Fotografía: ${p.fotografo || "—"}`,
          `Validación: ${p.validacion_cientifica || "pendiente"}`,
        ].join(" · ");
        return {
          src: withBasePath(p.web),
          alt: p.id_pieza,
          title: `${p.id_pieza} · ${seccionLabel}`,
          description: `${meta}\nReproducción de Domingo González de Lena · foto de Amanda C. Blanco.`,
        };
      }),
    [filtered],
  );

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex gap-2">
          {(["all", "esc", "otr"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className="btn"
              style={{
                background: filter === f ? "var(--pel-green)" : "transparent",
                color: filter === f ? "#fff" : "var(--pel-green)",
                border: `1px solid var(--pel-green)`,
                padding: "0.45rem 0.95rem",
                fontSize: "0.85rem",
              }}
              aria-pressed={filter === f}
            >
              {f === "all" ? t("filterAll") : f === "esc" ? t("filterEsc") : t("filterOtr")}
            </button>
          ))}
        </div>
        <div
          className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ border: "1px solid var(--pel-border)", background: "var(--pel-card)" }}
        >
          <Search size={16} style={{ color: "var(--pel-muted)" }} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por ID o archivo…"
            className="bg-transparent outline-none text-sm"
            style={{ color: "var(--pel-ink)", minWidth: 200 }}
            aria-label="Buscar"
          />
        </div>
        <p className="ml-auto text-sm" style={{ color: "var(--pel-muted)" }}>
          {filtered.length} / {pieces.length}
        </p>
      </div>

      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        }}
      >
        {filtered.map((p, idx) => (
          <button
            key={p.id_pieza}
            type="button"
            onClick={() => setOpenIndex(idx)}
            className="card p-0 overflow-hidden group block text-left relative"
            style={{ aspectRatio: "2/3", borderRadius: 12 }}
            aria-label={`${t("openImage")} — ${p.id_pieza}`}
          >
            {p.thumb ? (
              <Image
                src={withBasePath(p.thumb)}
                alt={p.id_pieza}
                width={267}
                height={400}
                sizes="(max-width: 640px) 50vw, 200px"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 320ms ease",
                }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "var(--pel-green-4)" }} />
            )}
            <div
              className="absolute opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                bottom: 0,
                left: 0,
                right: 0,
                padding: "8px 10px",
                color: "#fff",
                background: "linear-gradient(to top, rgba(0,0,0,.55), transparent)",
              }}
            >
              <span style={{ fontSize: "0.78rem", fontWeight: 600 }}>{p.id_pieza}</span>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={openIndex >= 0}
        index={Math.max(0, openIndex)}
        close={() => setOpenIndex(-1)}
        slides={slides}
        plugins={[Zoom, Captions, Counter]}
        carousel={{ finite: true, preload: 2 }}
        controller={{ closeOnBackdropClick: true }}
        animation={{ fade: 220, swipe: 320 }}
        zoom={{
          maxZoomPixelRatio: 4,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
        captions={{ descriptionTextAlign: "start", descriptionMaxLines: 4 }}
        counter={{ container: { style: { top: 12, left: 12 } } }}
        styles={{
          container: { backgroundColor: "rgba(15, 26, 20, 0.94)" },
          icon: { color: "#fff" },
        }}
      />
    </>
  );
}

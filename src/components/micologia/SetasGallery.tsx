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

export type Seta = {
  slug: string;
  archivo_origen: string;
  carpeta_origen: string;
  anho: number | null;
  src_400: string;
  src_800: string;
  src_1600: string;
  alt: string;
  categoria: "especies" | "recolecciones" | "catalogo" | "campo" | "curso";
  especie_sugerida: string | null;
};

type FilterCat = "all" | "especies" | "recolecciones" | "catalogo" | "campo" | "curso";

// Las 5 entradas con carpeta_origen "Curso · Especies" llegan etiquetadas
// como categoria "especies" en setas.json. Aquí las reasignamos a "curso"
// para que aparezcan bajo su propio filtro sin duplicarse en "especies".
function effectiveCat(s: Seta): Seta["categoria"] {
  if (s.carpeta_origen === "Curso · Especies") return "curso";
  return s.categoria;
}

const BADGE_COLORS: Record<Seta["categoria"], string> = {
  especies: "#56B4E9",
  recolecciones: "#009E73",
  catalogo: "#E69F00",
  campo: "#D55E00",
  curso: "#CC79A7",
};

function catLabel(c: Seta["categoria"], t: (k: string) => string): string {
  switch (c) {
    case "especies":
      return t("filtroEspecies");
    case "recolecciones":
      return t("filtroRecolecciones");
    case "catalogo":
      return t("filtroCatalogo");
    case "campo":
      return t("filtroCampo");
    case "curso":
      return t("filtroCurso");
  }
}

export default function SetasGallery({ setas }: { setas: Seta[] }) {
  const t = useTranslations("micologia.galeria");
  const [filter, setFilter] = useState<FilterCat>("all");
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number>(-1);

  const normalized = useMemo(
    () => setas.map((s) => ({ ...s, categoria: effectiveCat(s) })),
    [setas],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return normalized.filter((s) => {
      if (filter !== "all" && s.categoria !== filter) return false;
      if (q) {
        const hayEspecie = s.especie_sugerida?.toLowerCase().includes(q) ?? false;
        const haySlug = s.slug.toLowerCase().includes(q);
        const hayAlt = s.alt.toLowerCase().includes(q);
        if (!hayEspecie && !haySlug && !hayAlt) return false;
      }
      return true;
    });
  }, [normalized, filter, query]);

  const slides = useMemo(
    () =>
      filtered.map((s) => {
        const partes: string[] = [];
        if (s.especie_sugerida) partes.push(s.especie_sugerida);
        partes.push(catLabel(s.categoria, t));
        if (s.anho) partes.push(String(s.anho));
        const description = partes.join(" · ");
        return {
          src: withBasePath(s.src_1600),
          alt: s.alt,
          title: s.especie_sugerida ?? s.slug,
          description: `${description}\n${s.alt}`,
        };
      }),
    [filtered, t],
  );

  const filtros: FilterCat[] = ["all", "especies", "recolecciones", "catalogo", "campo", "curso"];

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {filtros.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className="btn"
              style={{
                background: filter === f ? "var(--pel-green)" : "transparent",
                color: filter === f ? "#fff" : "var(--pel-green)",
                border: "1px solid var(--pel-green)",
                padding: "0.4rem 0.85rem",
                fontSize: "0.82rem",
              }}
              aria-pressed={filter === f}
            >
              {f === "all" ? t("filtroAll") : catLabel(f as Seta["categoria"], t)}
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
            placeholder={t("buscar")}
            className="bg-transparent outline-none text-sm"
            style={{ color: "var(--pel-ink)", minWidth: 220 }}
            aria-label={t("buscar")}
          />
        </div>
        <p className="text-sm" style={{ color: "var(--pel-muted)" }}>
          {t("contadorFmt", { n: filtered.length, total: normalized.length })}
        </p>
      </div>

      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
      >
        {filtered.map((s, idx) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => setOpenIndex(idx)}
            className="card p-0 overflow-hidden group block text-left relative"
            style={{ aspectRatio: "1 / 1", borderRadius: 10 }}
            aria-label={s.especie_sugerida ?? s.slug}
          >
            <Image
              src={withBasePath(s.src_400)}
              alt={s.alt}
              width={400}
              height={400}
              sizes="(max-width: 640px) 50vw, 200px"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 320ms ease",
              }}
            />
            <span
              className="absolute"
              style={{
                top: 6,
                left: 6,
                background: BADGE_COLORS[s.categoria],
                color: "#fff",
                fontSize: "0.65rem",
                fontWeight: 600,
                padding: "2px 7px",
                borderRadius: 999,
                letterSpacing: "0.02em",
              }}
            >
              {catLabel(s.categoria, t)}
            </span>
            {s.especie_sugerida && (
              <div
                className="absolute opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "8px 10px",
                  color: "#fff",
                  background: "linear-gradient(to top, rgba(0,0,0,.6), transparent)",
                }}
              >
                <span style={{ fontSize: "0.78rem", fontWeight: 600, fontStyle: "italic" }}>
                  {s.especie_sugerida}
                </span>
              </div>
            )}
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

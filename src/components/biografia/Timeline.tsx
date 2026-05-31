import {
  GraduationCap,
  Presentation,
  ImageIcon,
  Award,
  BookText,
  Hammer,
  Briefcase,
  Pencil,
  User,
  Circle,
} from "lucide-react";

export type TimelineItem = {
  anho: number;
  hito: string;
  descripcion: string;
  categoria?: string;
  fuente?: string;
};

type CategoriaConfig = {
  label: string;
  color: string;
  ink: string;
  Icon: typeof Circle;
};

// Paleta Okabe-Ito + ajustes para categorías que aparecen en los datos.
// Las claves piden el usuario (formacion, docencia, exposicion, premio,
// publicacion, obra, otro) y las que están en biografia.json (trabajo,
// escritos, biografia).
const CATEGORIAS: Record<string, CategoriaConfig> = {
  formacion: { label: "Formación", color: "#56B4E9", ink: "#0B3F5E", Icon: GraduationCap },
  docencia: { label: "Docencia", color: "#009E73", ink: "#FFFFFF", Icon: Presentation },
  exposicion: { label: "Exposición", color: "#E69F00", ink: "#3D2A00", Icon: ImageIcon },
  premio: { label: "Premio", color: "#F0E442", ink: "#3D3700", Icon: Award },
  publicacion: { label: "Publicación", color: "#0072B2", ink: "#FFFFFF", Icon: BookText },
  obra: { label: "Obra", color: "#D55E00", ink: "#FFFFFF", Icon: Hammer },
  trabajo: { label: "Trabajo", color: "#0072B2", ink: "#FFFFFF", Icon: Briefcase },
  escritos: { label: "Escritos", color: "#CC79A7", ink: "#3D1B2D", Icon: Pencil },
  biografia: { label: "Biografía", color: "#999999", ink: "#FFFFFF", Icon: User },
  otro: { label: "Otro", color: "#999999", ink: "#FFFFFF", Icon: Circle },
};

const PEL_GREEN = "#2D6A4F";

function getConfig(cat?: string): CategoriaConfig {
  if (cat && CATEGORIAS[cat]) return CATEGORIAS[cat];
  return CATEGORIAS.otro;
}

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative mt-6" aria-label="Cronología">
      {/* Línea vertical conectora */}
      <div
        aria-hidden
        className="absolute"
        style={{
          left: "calc(5rem + 0.5rem)",
          top: "0.4rem",
          bottom: "0.4rem",
          width: 2,
          background: "linear-gradient(to bottom, #2D6A4F33, #2D6A4F)",
        }}
      />

      {items.map((it, idx) => {
        const cfg = getConfig(it.categoria);
        const Icon = cfg.Icon;
        return (
          <li
            key={`${it.anho}-${idx}-${it.hito}`}
            className="relative flex gap-4 pb-8 last:pb-0"
          >
            {/* Año a la izquierda en grande */}
            <div
              className="flex-shrink-0 text-right"
              style={{ width: "5rem" }}
              aria-hidden
            >
              <span
                style={{
                  color: PEL_GREEN,
                  fontWeight: 800,
                  fontSize: "1.65rem",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {it.anho}
              </span>
            </div>

            {/* Punto de la línea */}
            <div
              aria-hidden
              className="flex-shrink-0 relative"
              style={{ width: "1rem" }}
            >
              <span
                className="absolute"
                style={{
                  left: 0,
                  top: "0.55rem",
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  background: "var(--pel-paper)",
                  border: `3px solid ${PEL_GREEN}`,
                  boxShadow: "0 0 0 4px var(--pel-paper)",
                }}
              />
            </div>

            {/* Tarjeta del hito */}
            <div className="card flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <h3
                  style={{
                    color: PEL_GREEN,
                    fontWeight: 700,
                    fontSize: "1.08rem",
                    lineHeight: 1.3,
                  }}
                >
                  <span className="sr-only">{it.anho}. </span>
                  {it.hito}
                </h3>
                <span
                  className="inline-flex items-center gap-1.5 flex-shrink-0"
                  style={{
                    background: cfg.color,
                    color: cfg.ink,
                    padding: "0.22rem 0.62rem",
                    borderRadius: 999,
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  <Icon size={12} aria-hidden />
                  {cfg.label}
                </span>
              </div>
              <p
                className="mt-2"
                style={{
                  color: "var(--pel-ink-soft)",
                  fontSize: "0.95rem",
                  lineHeight: 1.55,
                }}
              >
                {it.descripcion}
              </p>
              {it.fuente && (
                <p
                  className="mt-2"
                  style={{
                    color: "var(--pel-muted)",
                    fontSize: "0.74rem",
                    fontStyle: "italic",
                  }}
                >
                  Fuente: {it.fuente}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

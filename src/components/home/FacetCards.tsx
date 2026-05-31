import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const FACETS = [
  { href: "/biografia", title: "Biografía", body: "Trayectoria profesional y cronología documentada del archivo personal." },
  { href: "/exposicion", title: "Arte paleolítico", body: "23 piezas en 7 cuevas asturianas. Bibliografía de Breuil, Vega del Sella y Fortea." },
  { href: "/micologia", title: "Micología y docencia", body: "Cursos de iniciación 2013–2015, libreto propio de 30 páginas y galería de setas." },
  { href: "/encargos", title: "Encargos", body: "Piezas disponibles, plazos y contacto directo con el taller." },
];

export default function FacetCards() {
  return (
    <section className="section">
      <div className="container-page">
        <p className="kicker mb-2">Cuatro facetas del archivo</p>
        <h2 className="headline" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
          Por dónde empezar
        </h2>
        <div className="h-divider" />
        <div className="grid gap-4 mt-6 sm:grid-cols-2">
          {FACETS.map((f) => (
            <Link key={f.href} href={f.href} className="card group">
              <div className="flex items-start justify-between gap-3">
                <h3 style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "1.15rem" }}>
                  {f.title}
                </h3>
                <ArrowUpRight size={18} style={{ color: "var(--pel-warm)", flexShrink: 0 }} />
              </div>
              <p className="lead mt-2" style={{ fontSize: "0.92rem" }}>{f.body}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

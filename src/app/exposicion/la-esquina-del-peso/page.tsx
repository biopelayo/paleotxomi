import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { promises as fs } from "node:fs";
import path from "node:path";
import { MapPin, Calendar, Phone, Mail } from "lucide-react";

import DomingoBubbles from "@/components/ui/DomingoBubbles";
import { withBasePath } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "Exposición en La Esquina del Peso · Oviedo",
};

type Pieza = { id: number; motivo: string; ancho_cm: number | null; alto_cm: number | null };
type Cueva = { id: string; nombre: string; concejo: string; unesco: boolean; piezas: Pieza[] };

async function loadExposicion(): Promise<{ cuevas: Cueva[] }> {
  const txt = await fs.readFile(
    path.join(process.cwd(), "public", "data", "exposicion.json"),
    "utf-8"
  );
  return JSON.parse(txt);
}

function nombreCorto(c: string): string {
  return c.replace(/^Cueva del? |^Cueva o abrigo de la |^Cueva de la /, "");
}

function dim(p: Pieza): string {
  if (p.ancho_cm == null || p.alto_cm == null) return "Dimensiones por confirmar";
  return `${p.ancho_cm} × ${p.alto_cm} cm`;
}

export default async function ExposicionLaEsquinaPage() {
  const data = await loadExposicion();
  const grabados = data.cuevas.flatMap((c) =>
    c.piezas.map((p) => ({ ...p, cueva: c.nombre, concejo: c.concejo, unesco: c.unesco }))
  );

  return (
    <section className="section relative overflow-hidden">
      <DomingoBubbles theme="paleolithic" count={20} giant />
      <div className="container-page max-w-5xl relative" style={{ zIndex: 2 }}>
        {/* Cabecera */}
        <p className="kicker mb-2">Exposición en curso · Oviedo</p>
        <h1 className="headline">Domingo González de Lena</h1>
        <p
          className="text-xl mt-1"
          style={{ color: "var(--pel-ink)", fontWeight: 500, fontStyle: "italic" }}
        >
          Arte Paleolítico parietal y Venus gravetienses
        </p>
        <p
          className="mt-1"
          style={{ color: "var(--pel-ink-soft)", fontSize: "0.95rem" }}
        >
          Grabados y figurillas en piedra de bulto redondo
        </p>
        <div className="h-divider" />

        {/* Tarjetas de datos clave */}
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <div className="card">
            <p className="kicker mb-1" style={{ color: "var(--pel-warm)" }}>Lugar</p>
            <p style={{ fontWeight: 700, color: "var(--pel-green)", fontSize: "1.1rem" }}>
              La Esquina del Peso
            </p>
            <p style={{ color: "var(--pel-ink-soft)", fontSize: "0.95rem" }}>
              Calle del Peso 1 · Oviedo
            </p>
          </div>
          <div className="card">
            <p className="kicker mb-1" style={{ color: "var(--pel-warm)" }}>Fechas</p>
            <p style={{ fontWeight: 700, color: "var(--pel-green)", fontSize: "1.1rem" }}>
              Del 20 al 30 de junio
            </p>
            <p style={{ color: "var(--pel-ink-soft)", fontSize: "0.95rem" }}>
              Inauguración: sábado 20 a las 19:30
            </p>
          </div>
        </div>

        {/* Cartel */}
        <div className="mt-10 card" style={{ padding: "0.5rem", background: "var(--pel-paper)" }}>
          <Image
            src={withBasePath("/expo/cartel.svg")}
            alt="Cartel de la exposición"
            width={594}
            height={420}
            style={{ width: "100%", height: "auto", display: "block" }}
            unoptimized
          />
        </div>

        {/* Fotos de la exposición · sesión Amanda Blanco mayo 2026 */}
        <h2 className="text-2xl font-bold mt-10" style={{ color: "var(--pel-green)" }}>
          Fotos de la exposición
        </h2>
        <p className="lead mt-2" style={{ fontSize: "0.95rem" }}>
          Piezas escogidas para La Esquina del Peso. Selección visual.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {[
            { src: "venus-hongo.webp", alt: "Venus con hongo · pieza ritual" },
            { src: "venus-manos-main.jpeg", alt: "Venus rosada en manos del autor" },
            { src: "cierva-circular.jpg", alt: "Colgante circular con cierva grabada" },
            { src: "ciervas.jpeg", alt: "Dos piedras con cierva trilineal" },
            { src: "mas-ciervas.jpeg", alt: "Más piedras con cierva trilineal" },
            { src: "mas-mas-ciervas.jpeg", alt: "Otras piedras con cierva trilineal" },
            { src: "esculturas.jpeg", alt: "Conjunto de Venus y figuras zoomorfas en hierba" },
            { src: "manos_para_bg-expo-cartel.jpeg", alt: "Manos del autor con propulsor zoomorfo" },
            { src: "descarga-4.jpeg", alt: "Pieza de la exposición" },
          ].map((foto) => (
            <div
              key={foto.src}
              className="card"
              style={{ padding: 0, overflow: "hidden", aspectRatio: "1", background: "var(--pel-paper)" }}
            >
              <Image
                src={withBasePath(`/personal/sesion-amanda-2026/${foto.src}`)}
                alt={foto.alt}
                width={600}
                height={600}
                sizes="(max-width: 640px) 50vw, 33vw"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Sobre la exposición */}
        <h2 className="text-2xl font-bold mt-10" style={{ color: "var(--pel-green)" }}>
          Sobre la exposición
        </h2>
        <p className="lead mt-3">
          Domingo González de Lena Díaz reúne en esta muestra <strong>24 piezas</strong>{" "}
          talladas a mano. La exposición combina dos vertientes de su obra: las{" "}
          <strong>reproducciones en piedra de grabados paleolíticos</strong> de siete cuevas
          asturianas (Pindal, Tito Bustillo, Les Pedroses, Buxu, Llonín, Lluera y Candamo) y las{" "}
          <strong>figurillas gravetienses</strong> talladas en bulto redondo, herederas de las
          Venus paleolíticas de Willendorf, Laussel, Lespugue y Brassempouy.
        </p>
        <p className="lead mt-3">
          Cuatro hilos atraviesan la muestra: las <strong>Venus gravetienses</strong>{" "}
          (~30.000-22.000 AP), el <strong>arte franco-cantábrico</strong> que se extiende del
          suroeste de Francia a la cornisa cantábrica, la <strong>cierva trilineal</strong>{" "}
          asturiana definida por Javier Fortea, y las <strong>5 cuevas asturianas Patrimonio
          Mundial UNESCO</strong> desde 2008 (Tito Bustillo, La Peña de Candamo, El Pindal,
          Llonín y Covaciella).
        </p>
        <p className="lead mt-3">
          Los originales rupestres están protegidos en las cuevas. Estas reproducciones permiten
          ver los motivos de cerca, a la altura de cualquier visitante. El trabajo se apoya en los
          estudios de Henri Breuil, el Conde de la Vega del Sella, Eduardo Hernández-Pacheco,
          Hugo Obermaier, Francisco Jordá Cerdá y Javier Fortea Pérez.
        </p>

        {/* Recorrido por las siete cuevas */}
        <h2 className="text-2xl font-bold mt-10" style={{ color: "var(--pel-green)" }}>
          Recorrido por las siete cuevas
        </h2>
        <p className="lead mt-2" style={{ fontSize: "0.95rem" }}>
          Las cuevas siguen un orden geográfico de oriente a occidente, terminando con la Venus del cuerno como pieza singular del autor.
        </p>
        <div
          className="mt-4 card"
          style={{ padding: "0.6rem", background: "var(--pel-paper)" }}
        >
          <Image
            src={withBasePath("/expo/mapa-cuevas-asturias.svg")}
            alt="Mapa esquemático de Asturias con las siete cuevas representadas en la exposición"
            width={800}
            height={400}
            style={{ width: "100%", height: "auto", display: "block" }}
            unoptimized
          />
        </div>

        {/* Galería 24 piezas */}
        <h2 className="text-2xl font-bold mt-10" style={{ color: "var(--pel-green)" }}>
          Las 24 piezas
        </h2>
        <p className="lead mt-2" style={{ fontSize: "0.95rem" }}>
          Orden de recorrido: Pindal → Tito Bustillo → Les Pedroses → Buxu → Llonín → Lluera →
          Candamo → Venus del cuerno.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6">
          {grabados.map((p) => (
            <article
              key={p.id}
              className="card"
              style={{ padding: 0, overflow: "hidden" }}
            >
              <div style={{ aspectRatio: "1", background: "var(--pel-paper)" }}>
                <Image
                  src={withBasePath(`/personal/piezas/pieza-${String(p.id).padStart(2, "0")}.jpg`)}
                  alt={`#${p.id} ${p.motivo}`}
                  width={400}
                  height={400}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "0.55rem 0.7rem" }}>
                <p style={{ color: "var(--pel-warm)", fontWeight: 700, fontSize: "0.78rem", margin: 0 }}>
                  #{p.id}
                </p>
                <p style={{ color: "var(--pel-ink)", fontWeight: 600, fontSize: "0.85rem", margin: "0.1rem 0" }}>
                  {p.motivo}
                </p>
                <p style={{ color: "var(--pel-muted)", fontSize: "0.72rem", margin: 0 }}>
                  {nombreCorto(p.cueva)} · {dim(p)}
                </p>
              </div>
            </article>
          ))}
          {/* Venus del cuerno como #24 */}
          <article className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ aspectRatio: "1", background: "var(--pel-paper)" }}>
              <Image
                src={withBasePath("/personal/piezas/venus-cuerno-01.jpg")}
                alt="Venus del cuerno"
                width={400}
                height={400}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "0.55rem 0.7rem" }}>
              <p style={{ color: "var(--pel-warm)", fontWeight: 700, fontSize: "0.78rem", margin: 0 }}>
                #24 ★
              </p>
              <p style={{ color: "var(--pel-ink)", fontWeight: 600, fontSize: "0.85rem", margin: "0.1rem 0" }}>
                Venus del cuerno
              </p>
              <p style={{ color: "var(--pel-muted)", fontSize: "0.72rem", margin: 0 }}>
                Pieza singular del autor
              </p>
            </div>
          </article>
        </div>

        {/* Biografía corta */}
        <h2 className="text-2xl font-bold mt-12" style={{ color: "var(--pel-green)" }}>
          El autor
        </h2>
        <div className="card mt-4">
          <p style={{ fontWeight: 700, color: "var(--pel-green)", fontSize: "1.05rem", margin: 0 }}>
            Domingo González de Lena Díaz
          </p>
          <p className="mt-2" style={{ color: "var(--pel-ink-soft)", fontSize: "0.95rem", lineHeight: 1.55 }}>
            Pajares, concejo de Lena (Asturias), 1959. Trabaja la piedra a mano en su taller de
            Lena, con cincel y maza. Reproduce el arte paleolítico parietal de las cuevas
            asturianas y talla figurillas gravetienses en bulto redondo. Su proyecto, iniciado en
            2009, se apoya en los estudios de Henri Breuil, el Conde de la Vega del Sella, Eduardo
            Hernández-Pacheco, Hugo Obermaier, Francisco Jordá Cerdá y Javier Fortea Pérez.
          </p>
          <p className="mt-3" style={{ fontSize: "0.85rem" }}>
            <Link href="/biografia" style={{ color: "var(--pel-warm)" }}>
              Biografía completa →
            </Link>
          </p>
        </div>

        {/* Datos prácticos */}
        <h2 className="text-2xl font-bold mt-10" style={{ color: "var(--pel-green)" }}>
          Cómo llegar y visitar
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="card">
            <p className="kicker mb-2" style={{ color: "var(--pel-warm)" }}>El local</p>
            <p style={{ fontSize: "0.95rem", color: "var(--pel-ink-soft)", margin: "0.2rem 0" }}>
              <MapPin size={14} aria-hidden="true" style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
              Calle del Peso 1 · 33009 Oviedo
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--pel-ink-soft)", margin: "0.2rem 0" }}>
              <Calendar size={14} aria-hidden="true" style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
              L-J 8:30-17:30 · V 8:30-00:30 · S 9:30-00:30 · D 9:30-17:30
            </p>
            <p style={{ fontSize: "0.82rem", color: "var(--pel-muted)", marginTop: 8 }}>
              Casco antiguo, junto al Mercado del Fontán. Entrada libre.
            </p>
          </div>
          <div className="card">
            <p className="kicker mb-2" style={{ color: "var(--pel-warm)" }}>Contacto del autor</p>
            <p style={{ fontSize: "0.95rem", color: "var(--pel-ink-soft)", margin: "0.2rem 0" }}>
              <Phone size={14} aria-hidden="true" style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
              <a href="tel:+34662585798">662 58 57 98</a>
            </p>
            <p style={{ fontSize: "0.95rem", color: "var(--pel-ink-soft)", margin: "0.2rem 0" }}>
              <Mail size={14} aria-hidden="true" style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
              <a href="mailto:domingodelena@gmail.com">domingodelena@gmail.com</a>
            </p>
            <p style={{ fontSize: "0.82rem", color: "var(--pel-muted)", marginTop: 8 }}>
              Para reservas, encargos o consultas de prensa.
            </p>
          </div>
        </div>

        {/* Mapa Google embebido del local */}
        <h2 className="text-2xl font-bold mt-10" style={{ color: "var(--pel-green)" }}>
          Ubicación
        </h2>
        <p className="lead mt-2" style={{ fontSize: "0.95rem" }}>
          La Esquina del Peso está en pleno casco antiguo de Oviedo, junto al Mercado del Fontán y al Ayuntamiento.
        </p>
        <div
          className="mt-4 card"
          style={{ padding: 0, overflow: "hidden", borderRadius: 14 }}
        >
          <iframe
            src="https://www.google.com/maps?q=Calle+del+Peso+1,+Oviedo,+Asturias&output=embed"
            width="100%"
            height="360"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            title="Ubicación de La Esquina del Peso en Oviedo"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

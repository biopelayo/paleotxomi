import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { promises as fs } from "node:fs";
import path from "node:path";
import { Calendar, MapPin, Phone, Mail, Download, ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";

import EventosMap from "@/components/eventos/EventosMap";

export const metadata: Metadata = { title: "Eventos" };

type Evento = {
  id: string;
  titulo: string;
  fecha_inicio: string;
  fecha_fin: string;
  sede: string;
  ciudad: string;
  tipo: "exposicion" | "charla" | "taller" | "feria" | "otro";
  cartel: string | null;
  descripcion: string;
  pendiente_confirmar?: boolean;
  coords?: { lat: number; lon: number } | null;
};

type EventosFile = {
  actualizado: string;
  eventos: Evento[];
};

async function loadEventos(): Promise<EventosFile> {
  const file = path.join(process.cwd(), "public", "data", "eventos.json");
  const txt = await fs.readFile(file, "utf-8");
  return JSON.parse(txt);
}

function formatRango(inicio: string, fin: string): string {
  const ini = new Date(inicio + "T00:00:00");
  const f = new Date(fin + "T00:00:00");
  const fmt = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" });
  if (inicio === fin) return fmt.format(ini);
  const fmtCorto = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long" });
  if (ini.getFullYear() === f.getFullYear()) {
    return `${fmtCorto.format(ini)} – ${fmt.format(f)}`;
  }
  return `${fmt.format(ini)} – ${fmt.format(f)}`;
}

function tipoLabel(tipo: Evento["tipo"]): string {
  const map: Record<Evento["tipo"], string> = {
    exposicion: "Exposición",
    charla: "Charla",
    taller: "Taller",
    feria: "Feria",
    otro: "Otro",
  };
  return map[tipo] ?? "Otro";
}

function EventoCard({ evento }: { evento: Evento }) {
  return (
    <article
      className="card flex flex-col h-full"
      style={{ padding: 0, overflow: "hidden" }}
    >
      {evento.cartel && (
        <div style={{ position: "relative", aspectRatio: "3 / 4", background: "var(--pel-green-4)" }}>
          <Image
            src={evento.cartel}
            alt={`Cartel: ${evento.titulo}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div className="p-5 flex flex-col grow gap-2">
        <p className="kicker" style={{ color: "var(--pel-warm)" }}>{tipoLabel(evento.tipo)}</p>
        <h3
          className="text-xl font-bold"
          style={{ color: "var(--pel-green)", lineHeight: 1.2 }}
        >
          {evento.titulo}
        </h3>
        <p className="text-sm flex items-center gap-2" style={{ color: "var(--pel-ink-soft)" }}>
          <Calendar size={14} aria-hidden="true" />
          {formatRango(evento.fecha_inicio, evento.fecha_fin)}
        </p>
        <p className="text-sm flex items-center gap-2" style={{ color: "var(--pel-ink-soft)" }}>
          <MapPin size={14} aria-hidden="true" />
          {evento.sede}
          {evento.ciudad ? ` · ${evento.ciudad}` : ""}
        </p>
        {evento.descripcion && (
          <p className="text-sm mt-2" style={{ color: "var(--pel-ink-soft)" }}>
            {evento.descripcion}
          </p>
        )}
      </div>
    </article>
  );
}

export default async function EventosPage() {
  const data = await loadEventos();
  const t = await getTranslations("eventos");

  // En producción ocultamos los placeholders.
  const isProd = process.env.NODE_ENV === "production";
  const visibles = data.eventos.filter((e) => !(isProd && e.pendiente_confirmar));

  // Partición por fecha (referencia: hoy a las 00:00 UTC).
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const proximos = visibles
    .filter((e) => new Date(e.fecha_inicio + "T00:00:00") >= hoy)
    .sort((a, b) => a.fecha_inicio.localeCompare(b.fecha_inicio));

  const pasados = visibles
    .filter((e) => new Date(e.fecha_inicio + "T00:00:00") < hoy)
    .sort((a, b) => b.fecha_inicio.localeCompare(a.fecha_inicio));

  const conCoords = visibles.filter(
    (e): e is Evento & { coords: { lat: number; lon: number } } =>
      !!e.coords && typeof e.coords.lat === "number" && typeof e.coords.lon === "number",
  );
  const showMap = conCoords.length >= 2;

  const fmtActualizado = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(data.actualizado + "T00:00:00"));

  return (
    <section className="section">
      <div className="container-page max-w-5xl">
        <p className="kicker mb-2">Archivo personal</p>
        <h1 className="headline">{t("title")}</h1>
        <div className="h-divider" />
        <p className="lead text-lg mt-4">{t("subtitle")}</p>
        <p className="text-xs mt-2" style={{ color: "var(--pel-muted)" }}>
          {t("actualizado")}: {fmtActualizado}
        </p>

        {visibles.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="/api/eventos.ics" className="btn btn-ghost" style={{ fontSize: "0.9rem" }}>
              <Download size={16} aria-hidden="true" /> {t("subscribe")}
            </a>
            <Link href="/contacto" className="btn btn-ghost" style={{ fontSize: "0.9rem" }}>
              <Mail size={16} aria-hidden="true" /> {t("contact")}
            </Link>
          </div>
        )}

        {visibles.length === 0 ? (
          <div className="card mt-10">
            <p className="kicker mb-2" style={{ color: "var(--pel-warm)" }}>{t("emptyKicker")}</p>
            <h2
              className="text-2xl font-bold"
              style={{ color: "var(--pel-green)", lineHeight: 1.25 }}
            >
              {t("emptyTitle")}
            </h2>
            <p className="lead mt-3" style={{ fontSize: "1rem" }}>
              {t("emptyBody")}
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <Link href="/contacto" className="btn btn-primary" style={{ fontSize: "0.95rem" }}>
                <Mail size={16} aria-hidden="true" /> {t("emptyCtaContact")}
              </Link>
              <a
                href="https://wa.me/34662585798?text=Hola%20Domingo%2C%20quer%C3%ADa%20hablar%20contigo%20sobre%20una%20posible%20exposici%C3%B3n%20del%20corpus."
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
                style={{ fontSize: "0.95rem" }}
              >
                <Phone size={16} aria-hidden="true" /> {t("emptyCtaWhatsapp")}
              </a>
            </div>
          </div>
        ) : (
          <>
            {proximos.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold" style={{ color: "var(--pel-green)" }}>
                  {t("proximosTitle")}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                  {proximos.map((e) => (
                    <EventoCard key={e.id} evento={e} />
                  ))}
                </div>
              </div>
            )}

            {pasados.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold" style={{ color: "var(--pel-green)" }}>
                  {t("pasadosTitle")}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                  {pasados.map((e) => (
                    <EventoCard key={e.id} evento={e} />
                  ))}
                </div>
              </div>
            )}

            {showMap && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold" style={{ color: "var(--pel-green)" }}>
                  {t("mapaTitle")}
                </h2>
                <p className="lead mt-1" style={{ fontSize: "0.95rem" }}>{t("mapaSubtitle")}</p>
                <div className="card mt-4 p-2">
                  <EventosMap
                    points={conCoords.map((e) => ({
                      id: e.id,
                      titulo: e.titulo,
                      sede: e.sede,
                      ciudad: e.ciudad,
                      lat: e.coords.lat,
                      lon: e.coords.lon,
                    }))}
                  />
                </div>
              </div>
            )}
          </>
        )}

        <p className="text-xs mt-10 flex items-center gap-1" style={{ color: "var(--pel-muted)" }}>
          <ExternalLink size={12} aria-hidden="true" />
          {t("calendarHint")}
        </p>
      </div>
    </section>
  );
}

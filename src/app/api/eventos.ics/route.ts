import { promises as fs } from "node:fs";
import path from "node:path";

// Compatibilidad con `output: "export"`: el feed se genera en build y se sirve
// como archivo estático. Cada rebuild lo refresca a partir de eventos.json.
export const dynamic = "force-static";

type Evento = {
  id: string;
  titulo: string;
  fecha_inicio: string;
  fecha_fin: string;
  sede: string;
  ciudad: string;
  tipo: string;
  cartel: string | null;
  descripcion: string;
  pendiente_confirmar?: boolean;
};

type EventosFile = {
  actualizado: string;
  eventos: Evento[];
};

const PRODID = "-//Trilineal Domingo//Eventos//ES";
const CALNAME = "Eventos · Domingo González de Lena";
const TZID = "Europe/Madrid";

// Escape de texto según RFC 5545: backslash, coma, punto y coma, salto de línea.
function escapeIcs(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

// Plegado de líneas largas a 75 octetos según RFC 5545 §3.1.
function fold(line: string): string {
  if (line.length <= 75) return line;
  const parts: string[] = [];
  let rest = line;
  parts.push(rest.slice(0, 75));
  rest = rest.slice(75);
  while (rest.length > 74) {
    parts.push(" " + rest.slice(0, 74));
    rest = rest.slice(74);
  }
  if (rest.length > 0) parts.push(" " + rest);
  return parts.join("\r\n");
}

// "2026-09-01" → "20260901". Para DTEND all-day se suma un día (cierre exclusivo).
function toIcsDate(iso: string): string {
  return iso.replace(/-/g, "");
}

function addOneDay(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

function nowStamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

function buildIcs(data: EventosFile): string {
  const visibles = data.eventos.filter((e) => !e.pendiente_confirmar);
  const stamp = nowStamp();

  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:${PRODID}`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeIcs(CALNAME)}`,
    `X-WR-TIMEZONE:${TZID}`,
    `X-WR-CALDESC:${escapeIcs("Calendario público de exposiciones, charlas y actividades de Domingo González de Lena.")}`,
  ];

  for (const e of visibles) {
    const summary = escapeIcs(e.titulo);
    const location = escapeIcs([e.sede, e.ciudad].filter(Boolean).join(", "));
    const desc = escapeIcs(e.descripcion || "");

    lines.push(
      "BEGIN:VEVENT",
      `UID:${e.id}@trilineal-domingo`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${toIcsDate(e.fecha_inicio)}`,
      // En iCal all-day, DTEND es exclusivo: sumamos 1 día a la fecha de fin.
      `DTEND;VALUE=DATE:${toIcsDate(addOneDay(e.fecha_fin))}`,
      `SUMMARY:${summary}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${desc}`,
      `CATEGORIES:${escapeIcs(e.tipo.toUpperCase())}`,
      "STATUS:CONFIRMED",
      "TRANSP:OPAQUE",
      "END:VEVENT",
    );
  }

  lines.push("END:VCALENDAR");

  // Plegado y CRLF según RFC 5545.
  return lines.map(fold).join("\r\n") + "\r\n";
}

export async function GET() {
  const file = path.join(process.cwd(), "public", "data", "eventos.json");
  const txt = await fs.readFile(file, "utf-8");
  const data = JSON.parse(txt) as EventosFile;
  const ics = buildIcs(data);

  return new Response(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "inline; filename=\"eventos-domingo.ics\"",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

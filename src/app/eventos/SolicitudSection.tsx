"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, Phone } from "lucide-react";

const EMAIL = "domingodelena@gmail.com";
const TELEFONO = "+34662585798";

function buildMailto(payload: Record<string, string>) {
  const subject = `Solicitud de exposición · ${payload.sede || "(sin sede)"}`;
  const lines = [
    `Nombre: ${payload.nombre || ""}`,
    `Sede / institución: ${payload.sede || ""}`,
    `Ciudad: ${payload.ciudad || ""}`,
    `Fechas previstas: ${payload.fechas || "(sin fechas)"}`,
    "",
    "Mensaje:",
    payload.mensaje || "",
  ];
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

function buildWhatsapp(payload: Record<string, string>) {
  const lines = [
    "Hola Domingo, quería proponerte una exposición o préstamo:",
    `· Nombre: ${payload.nombre || ""}`,
    `· Sede: ${payload.sede || ""}`,
    `· Ciudad: ${payload.ciudad || ""}`,
    `· Fechas previstas: ${payload.fechas || ""}`,
    payload.mensaje ? `· Mensaje: ${payload.mensaje}` : "",
  ].filter(Boolean);
  return `https://wa.me/${TELEFONO.replace("+", "")}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function SolicitudSection() {
  const t = useTranslations("eventos.solicitud");
  const [data, setData] = useState({
    nombre: "",
    sede: "",
    ciudad: "",
    fechas: "",
    mensaje: "",
  });

  function update<K extends keyof typeof data>(k: K, v: string) {
    setData((d) => ({ ...d, [k]: v }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.location.href = buildMailto(data);
  }

  const inputCls = "w-full px-3 py-2.5 rounded-lg outline-none transition-colors";
  const inputStyle: React.CSSProperties = {
    background: "var(--pel-card)",
    border: "1px solid var(--pel-border)",
    color: "var(--pel-ink)",
  };

  return (
    <div>
      <h2 className="text-2xl font-bold" style={{ color: "var(--pel-green)" }}>
        {t("title")}
      </h2>
      <p className="lead mt-2" style={{ fontSize: "0.95rem" }}>{t("lead")}</p>

      <form onSubmit={onSubmit} className="card space-y-4 mt-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block text-sm">
            <span style={{ color: "var(--pel-ink-soft)", fontWeight: 600 }}>{t("nombre")}</span>
            <input
              required
              name="nombre"
              value={data.nombre}
              onChange={(e) => update("nombre", e.target.value)}
              className={inputCls + " mt-1"}
              style={inputStyle}
            />
          </label>
          <label className="block text-sm">
            <span style={{ color: "var(--pel-ink-soft)", fontWeight: 600 }}>{t("sede")}</span>
            <input
              required
              name="sede"
              value={data.sede}
              onChange={(e) => update("sede", e.target.value)}
              className={inputCls + " mt-1"}
              style={inputStyle}
            />
          </label>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block text-sm">
            <span style={{ color: "var(--pel-ink-soft)", fontWeight: 600 }}>{t("ciudad")}</span>
            <input
              required
              name="ciudad"
              value={data.ciudad}
              onChange={(e) => update("ciudad", e.target.value)}
              className={inputCls + " mt-1"}
              style={inputStyle}
            />
          </label>
          <label className="block text-sm">
            <span style={{ color: "var(--pel-ink-soft)", fontWeight: 600 }}>{t("fechas")}</span>
            <input
              name="fechas"
              placeholder={t("fechasPlaceholder")}
              value={data.fechas}
              onChange={(e) => update("fechas", e.target.value)}
              className={inputCls + " mt-1"}
              style={inputStyle}
            />
          </label>
        </div>

        <label className="block text-sm">
          <span style={{ color: "var(--pel-ink-soft)", fontWeight: 600 }}>{t("mensaje")}</span>
          <textarea
            required
            name="mensaje"
            rows={5}
            value={data.mensaje}
            onChange={(e) => update("mensaje", e.target.value)}
            className={inputCls + " mt-1"}
            style={inputStyle}
          />
        </label>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button type="submit" className="btn btn-primary">
            {t("submitEmail")} <Send size={16} />
          </button>
          <a href={buildWhatsapp(data)} target="_blank" rel="noreferrer" className="btn btn-ghost">
            <Phone size={16} /> {t("submitWhatsapp")}
          </a>
        </div>

        <p className="text-xs" style={{ color: "var(--pel-muted)" }}>
          {t("nota")}
        </p>
      </form>
    </div>
  );
}

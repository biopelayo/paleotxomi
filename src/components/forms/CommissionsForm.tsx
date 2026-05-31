"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, Mail } from "lucide-react";

const ENDPOINT = process.env.NEXT_PUBLIC_ENCARGOS_ENDPOINT || "";
const FALLBACK_EMAIL = "domingodelena@gmail.com";

export default function CommissionsForm() {
  const t = useTranslations("commissions.form");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  function buildMailto(payload: Record<string, unknown>): string {
    const subject = `Encargo Trilineal · ${String(payload.type ?? "consulta")}`;
    const lines = [
      `Nombre: ${payload.name ?? ""}`,
      `Correo: ${payload.email ?? ""}`,
      `Institución: ${payload.organization ?? "(particular)"}`,
      `Tipo de encargo: ${payload.type ?? ""}`,
      `Fecha deseada: ${payload.deadline ?? "(sin fecha)"}`,
      "",
      "Descripción:",
      String(payload.message ?? ""),
    ];
    return `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = {};
    fd.forEach((v, k) => (payload[k] = v));

    if (ENDPOINT && ENDPOINT.startsWith("http")) {
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        setStatus(res.ok ? "ok" : "error");
        if (res.ok) (e.currentTarget as HTMLFormElement).reset();
        return;
      } catch {
        // Caemos al mailto
      }
    }

    // Sin endpoint: abrimos el cliente de correo con todo prellenado.
    window.location.href = buildMailto(payload);
    setStatus("ok");
  }

  const inputCls = "w-full px-3 py-2.5 rounded-lg outline-none transition-colors";
  const inputStyle: React.CSSProperties = {
    background: "var(--pel-card)",
    border: "1px solid var(--pel-border)",
    color: "var(--pel-ink)",
  };

  return (
    <form onSubmit={onSubmit} className="card space-y-4 mt-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-sm">
          <span style={{ color: "var(--pel-ink-soft)", fontWeight: 600 }}>{t("name")}</span>
          <input required name="name" className={inputCls + " mt-1"} style={inputStyle} />
        </label>
        <label className="block text-sm">
          <span style={{ color: "var(--pel-ink-soft)", fontWeight: 600 }}>{t("email")}</span>
          <input required type="email" name="email" className={inputCls + " mt-1"} style={inputStyle} />
        </label>
      </div>

      <label className="block text-sm">
        <span style={{ color: "var(--pel-ink-soft)", fontWeight: 600 }}>{t("organization")}</span>
        <input name="organization" className={inputCls + " mt-1"} style={inputStyle} />
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-sm">
          <span style={{ color: "var(--pel-ink-soft)", fontWeight: 600 }}>{t("type")}</span>
          <select required name="type" className={inputCls + " mt-1"} style={inputStyle} defaultValue="">
            <option value="" disabled>—</option>
            <option value="reproduction">{t("typeOptions.reproduction")}</option>
            <option value="custom">{t("typeOptions.custom")}</option>
            <option value="workshop">{t("typeOptions.workshop")}</option>
            <option value="loan">{t("typeOptions.loan")}</option>
            <option value="other">{t("typeOptions.other")}</option>
          </select>
        </label>
        <label className="block text-sm">
          <span style={{ color: "var(--pel-ink-soft)", fontWeight: 600 }}>{t("deadline")}</span>
          <input type="date" name="deadline" className={inputCls + " mt-1"} style={inputStyle} />
        </label>
      </div>

      <label className="block text-sm">
        <span style={{ color: "var(--pel-ink-soft)", fontWeight: 600 }}>{t("message")}</span>
        <textarea required name="message" rows={5} className={inputCls + " mt-1"} style={inputStyle} />
      </label>

      <label className="flex items-start gap-2 text-sm" style={{ color: "var(--pel-ink-soft)" }}>
        <input required type="checkbox" name="consent" className="mt-1" />
        <span>{t("consent")}</span>
      </label>

      <div className="flex items-center gap-3 pt-1 flex-wrap">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary">
          {status === "sending" ? t("sending") : <>{t("submit")} <Send size={16} /></>}
        </button>
        <a className="btn btn-ghost" href={`mailto:${FALLBACK_EMAIL}`}>
          <Mail size={16} /> Escribir directamente
        </a>
        {status === "ok" && (
          <span style={{ color: "var(--pel-green)", fontSize: "0.9rem" }}>
            Se abrió tu cliente de correo con la solicitud preparada.
          </span>
        )}
        {status === "error" && (
          <span style={{ color: "#B5341E", fontSize: "0.9rem" }}>
            Hubo un problema. Escribe a {FALLBACK_EMAIL}.
          </span>
        )}
      </div>
    </form>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export const metadata: Metadata = { title: "Contacto" };

export default function ContactPage() {
  const t = useTranslations("contact");
  return (
    <section className="section">
      <div className="container-page max-w-2xl">
        <p className="kicker mb-2">Archivo personal</p>
        <h1 className="headline">{t("title")}</h1>
        <div className="h-divider" />
        <p className="lead text-lg mt-5">{t("lead")}</p>

        <div className="card mt-6">
          <p className="kicker mb-2" style={{ color: "var(--pel-warm)" }}>Encargos y reservas</p>
          <p className="text-lg" style={{ fontWeight: 700, color: "var(--pel-green)" }}>
            Domingo González de Lena
          </p>
          <p className="mt-1 flex items-center gap-2">
            <Phone size={16} style={{ color: "var(--pel-warm)" }} />
            <a className="text-lg" href="tel:662585798">662 58 57 98</a>
          </p>
          <p className="mt-1 flex items-center gap-2">
            <Mail size={16} style={{ color: "var(--pel-warm)" }} />
            <a href="mailto:domingodelena@gmail.com">domingodelena@gmail.com</a>
          </p>
          <Link href="/encargos" className="btn btn-ghost mt-3 inline-flex" style={{ fontSize: "0.85rem" }}>
            Ver encargos
          </Link>
        </div>

        <div className="card mt-4">
          <p className="kicker mb-2" style={{ color: "var(--pel-warm)" }}>Prensa, instituciones e investigación</p>
          <p className="text-sm" style={{ color: "var(--pel-ink-soft)" }}>
            Para prensa, instituciones e investigación en torno al proyecto Trilineal, escribe a Domingo al teléfono o correo de arriba.
          </p>
          <Link href="/trilineal" className="btn btn-ghost mt-3 inline-flex" style={{ fontSize: "0.85rem" }}>
            Ir al proyecto Trilineal
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import LogoMark from "@/components/ui/LogoMark";

const WHATSAPP = "https://wa.me/34662585798";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-12"
      style={{
        background: "var(--pel-card)",
        borderTop: "1px solid var(--pel-border)",
      }}
    >
      <div className="container-page py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <LogoMark size={40} />
            <div>
              <p style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "1rem" }}>
                Domingo González de Lena Díaz
              </p>
              <p style={{ color: "var(--pel-muted)", fontSize: "0.78rem" }}>
                Archivo personal
              </p>
            </div>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--pel-ink-soft)" }}>
            {t("credits")}
          </p>
        </div>

        <div>
          <p className="kicker mb-3">El archivo</p>
          <ul className="space-y-1.5 text-sm" style={{ color: "var(--pel-ink-soft)" }}>
            <li><Link href="/biografia">{tNav("biografia")}</Link></li>
            <li><Link href="/exposicion">{tNav("exposicion")}</Link></li>
            <li><Link href="/micologia">{tNav("micologia")}</Link></li>
            <li><Link href="/videos">{tNav("videos")}</Link></li>
            <li><Link href="/encargos">{tNav("commissions")}</Link></li>
            <li><Link href="/eventos">{tNav("eventos")}</Link></li>
            <li><Link href="/contacto">{tNav("contact")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="kicker mb-3">Proyecto Trilineal</p>
          <ul className="space-y-1.5 text-sm" style={{ color: "var(--pel-ink-soft)" }}>
            <li><Link href="/trilineal">{tNav("trilineal")}</Link></li>
            <li><Link href="/galeria/corpus">{tNav("gallery")}</Link></li>
            <li><Link href="/mapa">{tNav("map")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="kicker mb-3">Contacto</p>
          <ul className="space-y-2 text-sm" style={{ color: "var(--pel-ink-soft)" }}>
            <li className="flex items-center gap-2">
              <Phone size={14} style={{ color: "var(--pel-warm)" }} aria-hidden="true" />
              <a href="tel:+34662585798">662 58 57 98</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} style={{ color: "var(--pel-warm)" }} aria-hidden="true" />
              <a href="mailto:domingodelena@gmail.com">domingodelena@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle size={14} style={{ color: "var(--pel-warm)" }} aria-hidden="true" />
              <a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp</a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="container-page py-4 flex flex-col md:flex-row justify-between gap-2"
        style={{ borderTop: "1px solid var(--pel-border)", fontSize: "0.78rem", color: "var(--pel-muted)" }}
      >
        <p>© {year} Archivo Domingo González de Lena. {t("rights")}</p>
        <p>@pelamovic</p>
      </div>
    </footer>
  );
}

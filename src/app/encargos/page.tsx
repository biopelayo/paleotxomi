import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import Image from "next/image";
import {
  Phone,
  Mail,
  MessageCircle,
  Gift,
  Home,
  TreePine,
  Building2,
  Sparkles,
  Pencil,
  Library,
  Mountain,
  Smartphone,
  Banknote,
  HandCoins,
  CreditCard,
  Wallet,
  PiggyBank,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

import CommissionsForm from "@/components/forms/CommissionsForm";

export const metadata: Metadata = { title: "Encargos" };

type Destacado = {
  slug: string | null;
  id_pieza_catalog: string;
  ref_precio: string;
  nombre: string | null;
  tipo_pieza: string;
  precio_eur: number;
  foto_principal: string;
  thumb: string;
  descripcion_corta: string | null;
  dimensiones: string | null;
  materiales: string | null;
  razon_destacado: string;
};

type DestacadosFile = {
  destacados: Destacado[];
  destacados_nota: string;
};

const WHATSAPP_NUMBER = "34662585798";
const PHONE_DISPLAY = "662 58 57 98";
const EMAIL = "domingodelena@gmail.com";

async function loadDestacados(): Promise<Destacado[]> {
  const txt = await fs.readFile(
    path.join(process.cwd(), "public", "data", "encargos_destacados.json"),
    "utf-8"
  );
  const parsed = JSON.parse(txt) as DestacadosFile;
  return parsed.destacados ?? [];
}

function waUrl(ref: string, precio: number): string {
  const text = `Hola Domingo, me interesa la pieza ${ref} (${precio} €) del catálogo.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function ComHeader() {
  const t = useTranslations("commissions");
  return (
    <>
      <p className="kicker mb-2">{t("encargos.kicker")}</p>
      <h1 className="headline">{t("title")}</h1>
      <div className="h-divider" />
      <p className="lead text-lg mt-4">{t("lead")}</p>
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl sm:text-3xl font-bold mt-10"
      style={{ color: "var(--pel-green)" }}
    >
      {children}
    </h2>
  );
}

function SectionLead({ children }: { children: React.ReactNode }) {
  return (
    <p className="lead mt-3" style={{ fontSize: "1rem" }}>
      {children}
    </p>
  );
}

// =====================================================
// Bloque 1 · Galería de destacados
// =====================================================

function DestacadosBlock({ destacados }: { destacados: Destacado[] }) {
  const t = useTranslations("commissions.encargos.destacados");
  return (
    <div className="mt-6">
      <SectionTitle>{t("title")}</SectionTitle>
      <SectionLead>{t("lead")}</SectionLead>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {destacados.map((d) => (
          <article
            key={d.id_pieza_catalog}
            className="card p-0 overflow-hidden flex flex-col"
            style={{ padding: 0 }}
          >
            <div
              style={{
                position: "relative",
                aspectRatio: "1 / 1",
                background: "var(--pel-paper)",
              }}
            >
              <Image
                src={d.foto_principal}
                alt={`Pieza ${d.ref_precio} de Domingo González de Lena`}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="p-4 flex flex-col gap-2 flex-grow">
              <div className="flex items-baseline justify-between gap-3">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    color: "var(--pel-warm)",
                    fontSize: "0.95rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  {d.ref_precio}
                </span>
                <span
                  style={{
                    color: "var(--pel-green)",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                  }}
                >
                  {d.precio_eur} €
                </span>
              </div>
              <p
                className="text-xs"
                style={{ color: "var(--pel-muted)", textTransform: "capitalize", margin: 0 }}
              >
                {d.tipo_pieza}
              </p>
              <a
                className="btn btn-primary justify-center mt-3"
                href={waUrl(d.ref_precio, d.precio_eur)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: "var(--pel-warm)" }}
              >
                <MessageCircle size={16} /> {t("ctaReservar")}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// =====================================================
// Bloque 2 · Casos de uso
// =====================================================

const CASOS: { key: string; Icon: typeof Gift }[] = [
  { key: "regalo", Icon: Gift },
  { key: "interior", Icon: Home },
  { key: "exterior", Icon: TreePine },
  { key: "publico", Icon: Building2 },
  { key: "coleccion", Icon: Sparkles },
  { key: "personalizado", Icon: Pencil },
  { key: "institucional", Icon: Library },
  { key: "cuevas", Icon: Mountain },
];

function CasosBlock() {
  const t = useTranslations("commissions.encargos.casos");
  return (
    <div>
      <SectionTitle>{t("title")}</SectionTitle>
      <SectionLead>{t("lead")}</SectionLead>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {CASOS.map(({ key, Icon }) => (
          <div key={key} className="card flex flex-col gap-2">
            <Icon size={28} style={{ color: "var(--pel-green)" }} />
            <h3
              style={{
                color: "var(--pel-ink)",
                fontWeight: 700,
                fontSize: "1.05rem",
                margin: "0.4rem 0 0",
              }}
            >
              {t(`items.${key}.title`)}
            </h3>
            <p style={{ color: "var(--pel-ink-soft)", fontSize: "0.93rem", margin: 0 }}>
              {t(`items.${key}.body`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================
// Bloque 3 · Plazos
// =====================================================

function PlazosBlock() {
  const t = useTranslations("commissions.encargos.plazos");
  const filas = ["pequena", "mediana", "grande"];
  return (
    <div>
      <SectionTitle>{t("title")}</SectionTitle>
      <SectionLead>{t("lead")}</SectionLead>

      <div className="card mt-6 p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--pel-green-4)", color: "var(--pel-green)" }}>
              <th className="text-left p-3">{t("tabla.tamano")}</th>
              <th className="text-left p-3">{t("tabla.plazo")}</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((f) => (
              <tr key={f} style={{ borderTop: "1px solid var(--pel-border)" }}>
                <td className="p-3" style={{ color: "var(--pel-ink-soft)" }}>
                  {t(`tabla.filas.${f}.tamano`)}
                </td>
                <td className="p-3" style={{ fontWeight: 700, color: "var(--pel-green)" }}>
                  {t(`tabla.filas.${f}.plazo`)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =====================================================
// Bloque 4 · Métodos de pago
// =====================================================

const PAGOS: { key: string; Icon: typeof Smartphone }[] = [
  { key: "bizum", Icon: Smartphone },
  { key: "transferencia", Icon: Banknote },
  { key: "efectivo", Icon: HandCoins },
  { key: "paypal", Icon: Wallet },
  { key: "tarjeta", Icon: CreditCard },
  { key: "fraccionado", Icon: PiggyBank },
];

function PagosBlock() {
  const t = useTranslations("commissions.encargos.pagos");
  return (
    <div>
      <SectionTitle>{t("title")}</SectionTitle>
      <SectionLead>{t("lead")}</SectionLead>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {PAGOS.map(({ key, Icon }) => (
          <div key={key} className="card flex items-start gap-3">
            <Icon size={20} style={{ color: "var(--pel-green)", flexShrink: 0, marginTop: 2 }} />
            <div>
              <h3
                style={{
                  color: "var(--pel-ink)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  margin: "0 0 0.25rem",
                }}
              >
                {t(`items.${key}.title`)}
              </h3>
              <p style={{ color: "var(--pel-ink-soft)", fontSize: "0.9rem", margin: 0 }}>
                {t(`items.${key}.body`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================
// Bloque 5 · Envíos
// =====================================================

function EnviosBlock() {
  const t = useTranslations("commissions.encargos.envios");
  const filas = ["esp1", "esp2", "esp3", "baleares", "canarias", "ue", "taller"];
  return (
    <div>
      <SectionTitle>{t("title")}</SectionTitle>
      <SectionLead>{t("lead")}</SectionLead>

      <div className="card mt-6 p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--pel-green-4)", color: "var(--pel-green)" }}>
              <th className="text-left p-3">
                <span className="inline-flex items-center gap-2">
                  <Truck size={14} /> {t("tabla.zona")}
                </span>
              </th>
              <th className="text-left p-3">{t("tabla.peso")}</th>
              <th className="text-left p-3">{t("tabla.coste")}</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((f) => (
              <tr key={f} style={{ borderTop: "1px solid var(--pel-border)" }}>
                <td className="p-3" style={{ color: "var(--pel-ink-soft)" }}>
                  {t(`tabla.filas.${f}.zona`)}
                </td>
                <td className="p-3" style={{ color: "var(--pel-ink-soft)" }}>
                  {t(`tabla.filas.${f}.peso`)}
                </td>
                <td className="p-3" style={{ fontWeight: 700, color: "var(--pel-green)" }}>
                  {t(`tabla.filas.${f}.coste`)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =====================================================
// Bloque 6 · Contacto WhatsApp
// =====================================================

function ContactoBlock() {
  const t = useTranslations("commissions.encargos.contacto");
  return (
    <div>
      <SectionTitle>{t("title")}</SectionTitle>
      <SectionLead>{t("lead")}</SectionLead>

      <div
        className="card mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        style={{
          background: "var(--pel-green-4)",
          borderColor: "var(--pel-green-3)",
          padding: "2rem",
        }}
      >
        <div className="flex items-start gap-4">
          <div
            style={{
              background: "var(--pel-green)",
              color: "#fff",
              width: 56,
              height: 56,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <MessageCircle size={28} />
          </div>
          <div>
            <p
              className="kicker"
              style={{ color: "var(--pel-green)", marginBottom: "0.25rem" }}
            >
              {t("wa")}
            </p>
            <p
              style={{
                color: "var(--pel-green)",
                fontWeight: 700,
                fontSize: "1.6rem",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {PHONE_DISPLAY}
            </p>
            <p style={{ color: "var(--pel-ink-soft)", fontSize: "0.9rem", margin: "0.5rem 0 0" }}>
              {t("horario")}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ background: "var(--pel-warm)", fontSize: "1.05rem" }}
          >
            <MessageCircle size={18} /> {t("ctaWhatsapp")}
          </a>
          <a href={`tel:+${WHATSAPP_NUMBER}`} className="btn btn-ghost">
            <Phone size={16} /> {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      <div className="card mt-4 flex items-center gap-3">
        <Mail size={20} style={{ color: "var(--pel-green)", flexShrink: 0 }} />
        <a
          href={`mailto:${EMAIL}`}
          style={{ color: "var(--pel-green)", fontWeight: 600, fontSize: "1rem" }}
        >
          {t("ctaEmail")}
        </a>
      </div>
    </div>
  );
}

// =====================================================
// Bloque 7 · Devoluciones
// =====================================================

function DevolucionesBlock() {
  const t = useTranslations("commissions.encargos.devoluciones");
  return (
    <div className="card mt-4 flex items-start gap-4">
      <ShieldCheck
        size={26}
        style={{ color: "var(--pel-green)", flexShrink: 0, marginTop: 2 }}
      />
      <div>
        <h3 style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "1rem", margin: "0 0 0.3rem" }}>
          {t("title")}
        </h3>
        <p style={{ color: "var(--pel-ink-soft)", fontSize: "0.95rem", margin: 0, lineHeight: 1.6 }}>
          {t("body")}
        </p>
      </div>
    </div>
  );
}

// =====================================================
// Página
// =====================================================

export default async function CommissionsPage() {
  const destacados = await loadDestacados();
  const t = await getTranslations("commissions");

  return (
    <section className="section">
      <div className="container-page max-w-5xl">
        <ComHeader />

        <DestacadosBlock destacados={destacados} />

        <CasosBlock />

        <PlazosBlock />

        <PagosBlock />

        <EnviosBlock />

        <ContactoBlock />

        <DevolucionesBlock />

        <h2 className="text-2xl font-bold mt-10" style={{ color: "var(--pel-green)" }}>
          Solicitud por escrito
        </h2>
        <p className="lead mt-3" style={{ fontSize: "0.95rem" }}>
          Si prefieres dejar la solicitud por correo, puedes usar este formulario en lugar de WhatsApp.
        </p>
        <CommissionsForm />

        <p className="mt-6 text-sm" style={{ color: "var(--pel-muted)" }}>
          {t.raw("form.consent") as string} · Tus datos solo se usan para responder a tu solicitud.
        </p>
      </div>
    </section>
  );
}

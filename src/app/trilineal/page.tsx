import type { Metadata } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Proyecto Trilineal · ECoC 2031" };

const ENLACES = [
  { href: "/galeria/corpus", labelKey: "verGaleriaCorpus", body: "120 fotografías Fujifilm X-T4 sobre obra de Domingo." },
  { href: "/mapa", labelKey: "verMapa", body: "Yacimientos del concejo de Oviedo y cuevas UNESCO de Asturias." },
];

function TriHeader() {
  const t = useTranslations("trilineal");
  return (
    <>
      <p className="kicker mb-2">Capa institucional</p>
      <h1 className="headline">{t("title")}</h1>
      <div className="h-divider" />
      <p className="lead text-lg mt-4">{t("subtitle")}</p>
    </>
  );
}

export default function TrilinealPage() {
  const t = useTranslations("trilineal");
  return (
    <section className="section">
      <div className="container-page max-w-5xl">
        <TriHeader />

        <p className="lead mt-6" style={{ color: "var(--pel-ink)" }}>{t("intro")}</p>

        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {ENLACES.map((e) => (
            <Link key={e.href} href={e.href} className="card group">
              <div className="flex items-start justify-between gap-3">
                <h3 style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "1.05rem" }}>
                  {t(e.labelKey)}
                </h3>
                <ArrowRight size={18} style={{ color: "var(--pel-warm)", flexShrink: 0 }} />
              </div>
              <p className="lead mt-2" style={{ fontSize: "0.9rem" }}>{e.body}</p>
            </Link>
          ))}
        </div>

        <div className="card mt-10">
          <p className="kicker mb-2">Dossier institucional</p>
          <p className="lead" style={{ fontSize: "0.95rem" }}>
            El proyecto cuenta con un dossier institucional para su presentación a entidades y administraciones, disponible bajo petición.
          </p>
        </div>
      </div>
    </section>
  );
}

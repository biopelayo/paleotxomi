import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

export default function ManifestoTeaser() {
  const t = useTranslations("manifesto");
  return (
    <section className="section">
      <div className="container-page grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <p className="kicker mb-2">Manifiesto</p>
          <h2 className="headline" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
            {t("title")}
          </h2>
          <div className="h-divider" />
        </div>
        <div className="lg:col-span-8 space-y-4">
          <p className="lead text-lg" style={{ color: "var(--pel-ink)" }}>{t("lead")}</p>
          <p className="lead">{t("verbs")}</p>
          <p className="lead">{t("warning")}</p>
          <Link href="/manifesto" className="btn btn-ghost mt-3">
            Leer el manifiesto entero <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { useTranslations } from "next-intl";

import NalonMap from "@/components/map/NalonMap";

export const metadata: Metadata = { title: "Mapa del Nalón ovetense" };

function MapHeader() {
  const t = useTranslations("map");
  return (
    <>
      <p className="kicker mb-2">Trilineal</p>
      <h1 className="headline">{t("title")}</h1>
      <div className="h-divider" />
      <p className="lead text-lg mt-4">{t("subtitle")}</p>
    </>
  );
}

export default function MapPage() {
  return (
    <section className="section">
      <div className="container-page">
        <MapHeader />
        <div className="mt-8 card p-2">
          <NalonMap />
        </div>
      </div>
    </section>
  );
}

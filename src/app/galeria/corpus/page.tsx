import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import { useTranslations } from "next-intl";

import GalleryClient from "@/components/gallery/GalleryClient";

export const metadata: Metadata = { title: "Galería del corpus" };

async function loadPieces() {
  const file = path.join(process.cwd(), "public", "data", "catalog.json");
  const text = await fs.readFile(file, "utf-8");
  return JSON.parse(text);
}

function GalleryHeader() {
  const t = useTranslations("gallery");
  return (
    <>
      <p className="kicker mb-2">Trilineal</p>
      <h1 className="headline">{t("title")}</h1>
      <div className="h-divider" />
      <p className="lead text-lg mt-4">{t("subtitle")}</p>
    </>
  );
}

export default async function GalleryCorpusPage() {
  const pieces = await loadPieces();
  return (
    <section className="section">
      <div className="container-page">
        <GalleryHeader />
        <div className="mt-8">
          <GalleryClient pieces={pieces} />
        </div>
      </div>
    </section>
  );
}

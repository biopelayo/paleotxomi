"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

import DomingoBubbles from "@/components/ui/DomingoBubbles";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "min(86vh, 800px)", paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      <DomingoBubbles theme="mixed" count={34} giant />

      <div className="container-page grid lg:grid-cols-12 gap-10 items-center relative" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <p className="kicker mb-3">{t("kicker")}</p>
          <h1 className="headline">{t("title")}</h1>
          <div className="h-divider" />
          <p className="lead mt-4 text-lg" style={{ color: "var(--pel-ink)" }}>{t("subtitle")}</p>
          <p className="lead mt-3" style={{ color: "var(--pel-ink-soft)" }}>{t("lead")}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/biografia" className="btn btn-primary">
              {t("ctaPrimary")} <ArrowRight size={16} />
            </Link>
            <Link href="/exposicion" className="btn btn-ghost">
              <BookOpen size={16} /> {t("ctaSecondary")}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center"
          aria-hidden
        >
          <svg viewBox="0 0 240 160" width="100%" style={{ maxWidth: 520, filter: "drop-shadow(0 6px 30px rgba(45,106,79,0.28))" }}>
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 22 70 C 60 38, 130 36, 168 52 L 184 44 L 196 52" stroke="var(--pel-green)" strokeWidth={11} className="draw-line" />
              <path d="M 22 90 C 64 62, 134 60, 170 78 L 188 70 L 204 80" stroke="var(--pel-warm)" strokeWidth={11} className="draw-line" style={{ animationDelay: "0.25s" }} />
              <path d="M 22 110 C 66 90, 134 88, 168 106 L 188 100 L 204 110" stroke="var(--pel-green)" strokeWidth={11} className="draw-line" style={{ animationDelay: "0.5s" }} />
              <path d="M 174 44 L 170 30 M 184 44 L 188 28 M 196 48 L 202 34" stroke="var(--pel-green)" strokeWidth={6} />
              <path d="M 50 112 L 50 144 M 78 112 L 78 144 M 144 110 L 144 144 M 168 110 L 168 144" stroke="var(--pel-green)" strokeWidth={5} />
            </g>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

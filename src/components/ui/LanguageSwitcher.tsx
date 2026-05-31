"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

const LOCALES = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  function setLocale(next: string) {
    if (next === locale) return;
    document.cookie = `locale=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.refresh();
  }

  return (
    <div
      role="group"
      aria-label="Cambiar idioma"
      className="flex items-center gap-1 px-1 py-1 rounded-full"
      style={{ background: "var(--pel-green-4)" }}
    >
      {LOCALES.map(({ code, label }) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className="text-xs font-bold px-2.5 py-1 rounded-full transition-colors"
            style={{
              background: active ? "var(--pel-green)" : "transparent",
              color: active ? "#fff" : "var(--pel-ink-soft)",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

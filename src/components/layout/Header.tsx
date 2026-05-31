"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Menu,
  X,
  Home,
  User,
  Sparkles,
  Leaf,
  ShoppingBag,
  Video,
  type LucideIcon,
} from "lucide-react";

import DarkModeToggle from "@/components/ui/DarkModeToggle";
import LogoMark from "@/components/ui/LogoMark";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/biografia", key: "biografia" },
  { href: "/exposicion", key: "exposicion" },
  { href: "/micologia", key: "micologia" },
  { href: "/videos", key: "videos" },
  { href: "/encargos", key: "commissions" },
] as const;

const navIcons: Record<string, LucideIcon> = {
  home: Home,
  biografia: User,
  exposicion: Sparkles,
  micologia: Leaf,
  videos: Video,
  commissions: ShoppingBag,
};

export default function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md"
      style={{
        background: "color-mix(in srgb, var(--pel-paper) 86%, transparent)",
        borderBottom: "1px solid var(--pel-border)",
      }}
    >
      <div className="container-page flex items-center justify-between py-3 gap-4">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Domingo González de Lena · inicio">
          <LogoMark size={36} animated />
          <span className="hidden sm:flex flex-col leading-tight">
            <span style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "1.05rem" }}>
              Domingo González de Lena
            </span>
            <span style={{ color: "var(--pel-muted)", fontSize: "0.74rem" }}>
              Archivo personal
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => {
            const Icon = navIcons[item.key];
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium relative"
                style={{ color: "var(--pel-ink-soft)" }}
              >
                {Icon && <Icon size={16} aria-hidden="true" className="shrink-0" />}
                <span>{t(item.key)}</span>
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                  style={{ background: "var(--pel-warm)" }}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <DarkModeToggle />
          <button
            className="lg:hidden p-2 rounded-md"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{ color: "var(--pel-ink)" }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="lg:hidden border-t"
          style={{ borderColor: "var(--pel-border)", background: "var(--pel-card)" }}
          aria-label="Navegación móvil"
        >
          <ul className="container-page py-3 grid grid-cols-2 gap-x-3 gap-y-2">
            {NAV_ITEMS.map((item) => {
              const Icon = navIcons[item.key];
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-2 text-sm font-medium"
                    style={{ color: "var(--pel-ink)" }}
                  >
                    {Icon && <Icon size={16} aria-hidden="true" className="shrink-0" />}
                    <span>{t(item.key)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default: "Domingo González de Lena · archivo personal",
    template: "%s — Domingo González de Lena",
  },
  description:
    "Archivo personal de Domingo González de Lena Díaz: guarda de campo y caza, cultivador de setas, autor de un proyecto de exposición sobre arte paleolítico asturiano. Encargos directos: 662 58 57 98 · domingodelena@gmail.com.",
  authors: [
    { name: "Domingo González de Lena Díaz" },
  ],
  keywords: [
    "Domingo González de Lena",
    "arte paleolítico asturiano",
    "grabado paleolítico",
    "cuevas asturianas",
    "Nalón",
    "Oviedo",
    "micología",
    "setas Asturias",
    "encargos reproducción patrimonial",
  ],
  openGraph: {
    title: "Domingo González de Lena · archivo personal",
    description:
      "Cuatro facetas en un solo archivo: arte paleolítico, micología, videos y biografía. Encargos directos.",
    type: "website",
    locale: "es_ES",
  },
  icons: {
    icon: [{ url: "/logo/favicon.svg", type: "image/svg+xml" }],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Aplicar tema antes del primer render para evitar flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('trilineal-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.setAttribute('data-theme','dark');}catch(e){}`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <a href="#main" className="skip-link">
            Saltar al contenido principal
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

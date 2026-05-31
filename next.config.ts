import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// PaleoTxomi · servido temporalmente en https://biopelayo.github.io/paleotxomi/
// hasta que paleotxomi.com (Porkbun) pase la verificación Veriff y los DNS
// apunten a GitHub Pages. Cuando eso ocurra: quitar basePath/assetPrefix y
// añadir public/CNAME con paleotxomi.com.
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/paleotxomi",
  assetPrefix: "/paleotxomi",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: "/paleotxomi",
  },
};

export default withNextIntl(nextConfig);

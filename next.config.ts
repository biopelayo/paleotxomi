import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// PaleoTxomi · servido en GitHub Pages bajo subpath /paleotxomi.
// El sitio vive en https://biopelayo.github.io/paleotxomi/.
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

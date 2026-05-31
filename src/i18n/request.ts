import { getRequestConfig } from "next-intl/server";

const DEFAULT = "es";

// Locale fijo para que el sitio sea totalmente estático (compatible con
// `output: "export"` y GitHub Pages). Si en el futuro se quiere bilingüe,
// la opción correcta es generar `/es/...` y `/en/...` como rutas separadas.
export default getRequestConfig(async () => {
  const locale = DEFAULT;
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

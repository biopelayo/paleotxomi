# Cambios pendientes en messages/es.json

**Este archivo lo lleva Pelayo.** Claude no toca `es.json` para no pisar tus cambios.
Lista de textos a ajustar según el plan maestro (`PLAN_MAESTRO_REDUCCION.md`).

## Textos a cambiar

1. **`hero.lead`** — dice «las 25 piezas en piedra». Cambiar **25 → 23**.
2. **`exposicion.subtitle`** — dice «25 piezas en piedra … de 8 cuevas». Cambiar **25 → 23** y **8 → 7**.
3. **`videos.placeholder`** — hoy son 3 frases largas. Dejarlo en **una sola frase**, sobria, sin la petición de aportar videos al correo.
4. **`trilineal.intro`** — acortar el párrafo de introducción.
5. **`commissions.lead`** — reescribir la intro: breve y factual, sin lenguaje de venta ni mención a «precios» (el bloque de precios se elimina).
6. **`commissions.encargos.kicker`** — dice «Funnel comercial». Cambiar por un rótulo sobrio (p. ej. «Encargos directos»).
7. **`eventos.emptyTitle` / `eventos.emptyBody`** — acortar el mensaje del estado vacío.
8. **`biografia.facetas.escultor`** — el valor es «Escultor», pero Domingo no es escultor: reproduce arte paleolítico. Cambiar el **valor** (no la clave) por un término exacto, p. ej. «Arte paleolítico».

## Claves que quedan sin uso (limpieza opcional)

Al retirar componentes y páginas, estas claves dejan de mostrarse. Puedes borrarlas o dejarlas:

- `stats.*` — se quitó la banda de cifras del Inicio.
- `catalog`, `research`, `resources` — páginas eliminadas.
- `eventos.solicitud.*` — se quitó el formulario de Eventos.
- `commissions.preciosTitle`, `commissions.preciosNota` — se quitó el bloque de precios.
- `commissions.encargos.destacados.fichasNota` — se quitó la nota de las fichas.
- `videos.aportar` — se quitó el CTA de aportaciones.
- `trilineal.verDashboard`, `trilineal.verInvestigacion`, `trilineal.verRecursos` — enlaces retirados.
- `footer.license` — se quitó la nota de licencia del pie.
- `biografia.para_saber_mas_titulo`, `biografia.para_saber_mas_intro` — se quitó el bloque «Para saber más».

## No tocar

- `meta.title` y `meta.description` — el SEO se revisa en otra sesión. Seguirán diciendo «25 piezas, 8 cuevas» hasta entonces (es invisible en la página; solo lo ve Google).

# Plan maestro · limpieza y reducción
## Web · Archivo Domingo González de Lena Díaz

**Versión:** v0 (borrador inicial) · **Fecha:** 21 may 2026
**Estado:** esqueleto a la espera de las respuestas a los 13 bloques de preguntas.
Cada bloque respondido actualiza este documento (sección 5).

---

## 1. Qué se pide

Tres cosas, con fecha: la web tiene que estar lista mañana para enseñarla a un cliente.

1. Reducir mucho el texto.
2. Reducir el número de pestañas.
3. Dejar el sitio más compacto.

## 2. Estado actual del sitio

15 rutas, 9 pestañas en el menú superior. El sitio mezcla dos cosas:

**Cara A — archivo personal de Domingo** (lo que busca un visitante o un cliente de encargos):
inicio, biografía, arte paleolítico, micología, videos, encargos, eventos, contacto.

**Cara B — capa institucional «Trilineal»** (administración, prensa, investigadores; candidatura de Oviedo a Capital Europea de la Cultura 2031):
trilineal, galería del corpus, catálogo de cifras, mapa, investigación (OpenAlex), recursos.

La cara B no está en el menú superior: cuelga de `/trilineal` y del pie. Aun así suma 6 rutas y bastante texto técnico.

### Inventario de las 15 rutas

| Ruta | Qué es | Texto | Primer diagnóstico |
|------|--------|-------|--------------------|
| `/` | Inicio: portada + 4 cifras + 6 tarjetas | Medio | Portada muy alta (86 % de pantalla); recortar |
| `/biografia` | Portada + cronología + «para saber más» | Alto | Cronología de 24 hitos (varios menores); dejar ~15 |
| `/exposicion` | Arte paleolítico: 7 cuevas + 23 piezas | Medio | Cifras corregidas; bibliografía a una línea; «Objeto» más corto |
| `/micologia` | Libreto + 3 cursos + galería de 150 setas | Medio | Quitar 2.º párrafo del libreto; cursos compactos |
| `/videos` | 1 sección (TPA), sin videos aún | Vacío | Se mantiene en el menú; aviso a 1 frase, sin CTA |
| `/trilineal` | Centro de la cara B, 5 enlaces | Corto | Hub: 5 enlaces a 2; quitar la ruta local del bloque dossier |
| `/encargos` | Piezas, casos, plazos, pagos, envíos, contacto, formulario | Alto | Fuera el bloque de precios y la nota; contacto+devoluciones fundidos |
| `/eventos` | Calendario (vacío en producción) | Vacío | Al pie; fuera el formulario; estado vacío acortado |
| `/contacto` | 2 fichas de contacto | Corto | Se mantiene al pie, simplificada |
| `/galeria` | Redirección a /galeria/corpus | — | **Se elimina** |
| `/galeria/corpus` | 120 fotos del corpus | Corto | Se mantiene (cara institucional) |
| `/catalogo` | Cifras del corpus | Medio | **Se retira del sitio** |
| `/mapa` | Mapa del Nalón + 3 tarjetas | Corto | Se mantiene; quitar las 3 tarjetas |
| `/investigacion` | OpenAlex, 5 búsquedas en vivo | Muy alto | **Se retira del sitio** |
| `/recursos` | 31 enlaces en 7 categorías | Muy alto | **Se retira del sitio** |

## 3. Plan propuesto — cuatro ejes

### Eje 1 · Navegación: de 9 pestañas a 5-6 — CONFIRMADO (bloque 2)
Menú nuevo (6): **Inicio · Biografía · Arte paleolítico · Micología · Videos · Encargos**. Pie de página: Contacto, Eventos, Trilineal.
- Contacto: deja de ser pestaña. Teléfono y correo van al pie de página; el contenido de contacto se concentra en Encargos.
- Proyecto Trilineal y la cara B entera (corpus, catálogo, mapa, investigación, recursos): fuera del menú; acceso desde el pie.
- Videos: en el menú (bloque 7). Eventos: fuera del menú, al pie (bloque 9). Menú final: 6 pestañas.
- Selector de idioma: se retira (sitio solo en español).

### Eje 2 · Reducción de texto
Recorte estimado de la mitad del texto. Por página:
- Inicio: portada y su texto se mantienen. Se quita la banda de cifras. Tarjetas de 6 a 4.
- Biografía: cronología de 24 a ~15 hitos (quitar los menores: carta al colegio, CV cerrado, cartas sueltas).
- Arte paleolítico: corregir cifras (23 piezas, 7 cuevas); quitar Covaciella; bibliografía a una línea; acortar el texto de «Objeto».

### Bloque 5 · Arte paleolítico _(respondido)_

- **Número de piezas:** se corrige a **23** (cifra del catálogo) en todos los textos. Hoy varios dicen «25».
- **Cabecera:** se mantienen las 3 tarjetas (Objeto, Cuevas, Piezas); se acorta el texto de «Objeto».
- **Covaciella:** se retira de la lista (no tiene piezas catalogadas). La página pasa a **7 cuevas**.
- **Estudios de referencia:** los 6 autores se reducen a una sola línea, sin sección propia.
- **Tarea de ejecución:** sustituir «25 piezas» → «23», «8 cuevas» → «7» en hero, meta, exposición y biografía (revisar el hito 17 de la cronología).
- Micología: quitar el párrafo del subtítulo del libreto; cursos más compactos; galería intacta (150 fotos).

### Bloque 6 · Micología _(respondido)_

- **Libreto:** se mantiene el párrafo de descripción; se elimina el párrafo aparte con el subtítulo del libreto.
- **Cursos:** se mantienen los 3 (2013, 2014, 2015), con tarjetas más compactas y menos texto de material.
- **Galería de setas:** se mantiene entera (150 fotos, 5 filtros, buscador).
- **Número de cursos:** fueron 3. Tarea de ejecución: corregir la cronología (el hito de 2015 dice «4.ª edición», debe ser «3.ª»).

### Bloque 7 · Videos _(respondido)_

- **Página Videos:** se mantiene en el menú. El menú sube a **6 pestañas** (Inicio · Biografía · Arte paleolítico · Micología · Videos · Encargos).
- **«La huerta de Txomi» (TPA):** el dato se queda solo en la página Videos, no se lleva a la biografía.
- **Aviso:** se recorta a una sola frase, sobria.
- **CTA de aportaciones:** se elimina (ya no se pide aportar videos al correo).

### Bloque 8 · Encargos — parte 1 _(respondido)_

- **Tabla de precios:** se elimina el bloque de precios entero (tabla y rangos mín/máx/pequeñas). El precio se ve en cada pieza destacada y por WhatsApp. `precios.json` deja de usarse en Encargos.
- **Casos de uso:** se mantienen las 8 tarjetas.
- **Contacto + Devoluciones:** se funden en un solo bloque.
- **Formulario de solicitud:** se mantiene.
- Encargos: fuera el bloque de precios entero y la nota de fichas; contacto+devoluciones fundidos; rótulo e intro reescritos sobrios; pagos compactos. Se mantienen los 8 casos y el formulario.

### Bloque 8 · Encargos — parte 2 _(respondido)_

- **Rótulo superior:** se sustituye «Funnel comercial» por un rótulo sobrio (p. ej. «Encargos directos»).
- **Intro:** se reescribe entera, breve y factual, sin lenguaje de venta ni mención a precios.
- **Métodos de pago:** se mantienen los 6, con tarjetas más compactas.
- **Nota de las fichas destacadas:** se elimina («se están redactando con Domingo…»).

### Bloque 9 · Eventos _(respondido)_

- **Página Eventos:** fuera del menú; se enlaza desde el pie. El menú queda definitivo en **6 pestañas**.
- **Eventos placeholder:** se mantienen los 2 en el JSON (el sitio en producción ya los oculta).
- **Formulario (SolicitudSection):** se elimina. El correo y el WhatsApp cubren las propuestas.
- **Estado vacío:** se acorta el mensaje, conservando los botones de contacto.

### Bloque 10 · Contacto y pie de página _(respondido)_

- **Página /contacto:** se mantiene, simplificada, accesible desde el pie.
- **Tarjetas:** se mantienen las 2; en la de prensa/instituciones se acorta y suaviza el texto sobre Trilineal.
- **Pie — contacto:** columna propia con teléfono, correo y WhatsApp.
- **Pie — enlaces:** una columna con los enlaces del menú (6) y otra, más pequeña, con los de Trilineal.
- **Tarea de ejecución:** el botón de Contacto dice «Ver tabla de precios y formulario»; corregir a «Ver encargos» (la tabla de precios se elimina).

### Bloque 11 · Cara institucional (Trilineal) _(respondido)_

- **Páginas que se quedan:** Trilineal (hub) + galería del corpus + mapa. **3 páginas.**
- **Páginas que se retiran:** Catálogo (cifras), Investigación (OpenAlex) y Recursos. Tarea de ejecución: quitarlas del sitio (confirmar con Pelayo si se borran los archivos o solo se desenlazan).
- **Hub /trilineal:** los 5 enlaces bajan a 2 (corpus y mapa). En el bloque «Dossier institucional» se quita la ruta local del ordenador y se reescribe más sobrio.
- **/galeria:** se elimina la redirección (queda solo /galeria/corpus).
- **Consecuencias:** el pie pierde 3 enlaces de la columna Trilineal (quedan Trilineal, corpus, mapa). `kpis.json`, el módulo OpenAlex y `resources.ts` dejan de usarse.

### Bloque 11b · Trilineal, corpus y mapa _(respondido)_

- **Hub /trilineal:** se acorta el párrafo de intro; se mantienen rótulo, título y subtítulo. 2 accesos (corpus, mapa).
- **Galería del corpus:** se simplifican los metadatos del visor (referencia, motivo, crédito corto); fuera resolución y fecha de fotografía.
- **Mapa:** se quitan las 3 tarjetas de texto; el mapa con sus etiquetas se explica solo.
- **Puente:** se añade un enlace a la galería del corpus desde la página de Arte paleolítico.

### Bloque 12 · Compactación visual _(respondido)_

- **Espaciado:** se compacta. `.section` baja de 4 rem; se reducen los huecos grandes entre bloques.
- **Tarjetas:** más densas, menos relleno (`.card` de 1,4 rem a ~1,1 rem).
- **Tamaño de texto:** no se toca (se queda en 1,12 rem).
- **Animaciones:** no se tocan (burbujas, fade-up, draw-line se mantienen).

### Bloque 13 · Cierre _(respondido)_

- **Pie:** se acortan los textos; se quita la nota de licencia detallada (CC BY 4.0, Amanda C. Blanco, «cesión pendiente»). Quedan solo los créditos.
- **SEO / metadatos:** no se tocan en esta sesión. Aviso: las cifras visibles pasan a 23/7, pero el `meta.description` no se toca, así que seguirá diciendo «25 piezas, 8 cuevas» hasta la sesión de SEO.
- **Ejecución:** página por página; tras cada una, Pelayo revisa en el navegador.
- **Despliegue:** a GitHub Pages al terminar, con confirmación de Pelayo antes del push.

---

## 6. Plan de ejecución consolidado (v1)

Orden: navegación → Inicio → páginas del menú → cara institucional → cierre. Tras cada bloque, Pelayo revisa en `localhost:3000`.

**Actualización 21 may (Pelayo con su padre):** el `es.json` lo edita Pelayo; Claude no lo toca. La lista de textos pendientes está en `CAMBIOS_ES_JSON.md`. Dominio propio nuevo: `paleotxomi.com`.

### 6.0 · Dominio paleotxomi.com
- [x] Crear `public/CNAME` con `paleotxomi.com`.
- [x] Quitar el `basePath /domingo-archivo` de `next.config.ts` (con dominio propio el sitio va en la raíz).
- [ ] Pelayo: configurar los DNS del dominio (registros A de GitHub Pages) y el custom domain en Settings → Pages.
- [ ] Revisar `sitemap.ts`, `robots.ts` y `README.md` con la URL nueva (en el cierre).

### 6.1 · Navegación y marco (transversal)
- [x] **Header:** menú de 6 — Inicio · Biografía · Arte paleolítico · Micología · Videos · Encargos. Quitar Trilineal, Eventos y Contacto del menú. Quitar el selector de idioma.
- [x] **Footer:** columna de contacto (teléfono, correo, WhatsApp); columna con los enlaces del menú; columna Trilineal discreta (Trilineal, corpus, mapa); enlaces a Eventos y Contacto. Acortar créditos; quitar la nota de licencia.
- [x] **globals.css:** `.section` 4 rem → ~2,75 rem; `.card` 1,4 rem → ~1,1 rem; reducir huecos entre bloques.

### 6.2 · Inicio
- [x] Quitar la banda de cifras (StatsBand).
- [x] Tarjetas de 6 a 4: Biografía, Arte paleolítico, Micología, Encargos.
- [x] Portada (hero): no se toca.

### 6.3 · Biografía
- [x] Cronología: quitados 13, 15, 16; fusionados 7+8 y 21+22 → 18 hitos visibles. Corregido «4.ª edición» → «3.ª».
- [x] Facetas: la página ya muestra 3; el label «Escultor» lo corrige Pelayo en es.json.
- [x] Quitado el bloque «Para saber más».
- [x] Heráldica: añadido un detalle discreto al pie de la biografía con el escudo del apellido González de Lena.
- [x] Hito de 2009: quitadas las cifras «25 piezas / 8 cuevas» y los precios; redactado sin números.
- [x] Quitados los 2 hitos de «Escritos» (ensayos 2014-2015 y relato «Kefru») a petición de Pelayo. Cronología final: 16 hitos visibles.

### 6.4 · Arte paleolítico
- [x] Covaciella retirada del catálogo (`exposicion.json`); la página pasa a 7 cuevas, 23 piezas (conteo automático).
- [x] Texto de «Objeto» acortado (`exposicion.json`).
- [x] Bibliografía (6 autores) reducida a una sola línea, sin sección propia.
- [x] Añadido enlace a la galería del corpus al pie de la página.
- Nota: el subtítulo con cifras vive en `es.json` (lo ajusta Pelayo).

### 6.5 · Micología
- [x] Quitado el párrafo del subtítulo del libreto.
- [x] Cursos: 3 tarjetas compactadas (fuera el texto de «material»; año más pequeño).
- [x] Galería de 150 setas: intacta.

### 6.6 · Videos
- [x] Se mantiene en el menú.
- [x] Quitado el CTA de aportaciones. El aviso (en `es.json`) lo acorta Pelayo.

### 6.7 · Encargos
- [x] Quitado el bloque de precios entero (tabla + rangos). `precios.json` ya no se usa.
- [x] «Contacto» + «Devoluciones» fundidos en un bloque.
- [x] Métodos de pago: 6, compactados (fuera el recuadro del icono).
- [x] Quitada la nota de las fichas destacadas.
- [~] Rótulo «Funnel comercial» e intro: están en `es.json` (los reescribe Pelayo).
- [x] Se mantienen los 8 casos de uso y el formulario.

### 6.8 · Eventos
- [x] Fuera del menú (al pie).
- [x] Quitado el formulario (SolicitudSection).
- [~] Estado vacío: el texto (emptyTitle/emptyBody) está en `es.json` (lo acorta Pelayo).

### 6.9 · Contacto
- [x] Fuera del menú (al pie). Página mantenida.
- [x] Texto de la tarjeta de prensa/Trilineal suavizado y acortado.
- [x] Botón corregido: «Ver tabla de precios y formulario» → «Ver encargos».

### 6.10 · Cara institucional
- [x] **Trilineal:** enlaces de 5 a 2 (corpus, mapa); ruta local del ordenador eliminada; bloque dossier reescrito sobrio. Intro: en `es.json` (Pelayo).
- [x] **Mapa:** quitadas las 3 tarjetas de texto.
- [x] **Galería del corpus:** metadatos del visor simplificados (fuera fecha y resolución; crédito corto).
- [x] **Eliminadas** las páginas Catálogo, Investigación, Recursos y la redirección /galeria. Recuperables desde Git.
- [x] `sitemap.ts` y `robots.ts` actualizados: dominio paleotxomi.com y rutas eliminadas fuera.

### 6.11 · Cierre
- [x] Build de verificación (`npm run build`) — pasa. 17 rutas generadas; las páginas eliminadas ya no aparecen.
- [ ] Revisión de la web con Pelayo.
- [ ] Despliegue a GitHub Pages (push con confirmación).

### Pendiente de verificar con Domingo
- Número real de piezas (23 catalogadas vs. 25 del proyecto original).
- Hito 18 de la cronología (Café Bar Plaza, dato marcado como incierto).
- Número de cursos de micología (la web asume 3: 2013, 2014, 2015).
- Investigación: de 5 búsquedas a 2-3; «top 6» a «top 3».
- Recursos: de 31 enlaces a 12-15.
- Catálogo: 3 gráficos a 1; tabla de 15 a 5.
- Mapa: fuera las 3 tarjetas de texto.

### Eje 3 · Compactación visual (CSS) — CONFIRMADO (bloque 12)
Tocar `globals.css` y los componentes:
- `.section` de 4 rem a ~2,75 rem; reducir los huecos grandes entre bloques (mt-12, mt-16).
- `.card` de 1,4 rem a ~1,1 rem de relleno.
- Portada (hero): **no se toca** (decisión del bloque 3).
- Tamaño de texto (`.lead`, 1,12 rem): **no se toca**.
- Animaciones (burbujas, fade-up, draw-line): **no se tocan**.

### Eje 4 · Páginas a fusionar o retirar — CONFIRMADO
- `/videos`: se mantiene (en el menú). `/eventos`: se mantiene (al pie).
- `/galeria`: se elimina (era solo una redirección).
- `/catalogo`, `/investigacion`, `/recursos`: **se retiran del sitio.**
- La cara institucional queda en 3 páginas: Trilineal, galería del corpus y mapa.
- El sitio pasa de 15 rutas a 11 (se eliminan galeria, catalogo, investigacion, recursos).

## 4. Cómo vamos a pulir el plan — 13 bloques de preguntas

Unas 52 preguntas en 13 tandas. Tras cada tanda se actualiza este documento.

- [x] Bloque 1 · Encuadre — respondido (ver §5)
- [x] Bloque 2 · Navegación y pestañas — respondido (ver §5)
- [x] Bloque 3 · Inicio — respondido (ver §5)
- [x] Bloque 4 · Biografía — respondido (ver §5)
- [x] Bloque 5 · Arte paleolítico — respondido (ver §5)
- [x] Bloque 6 · Micología — respondido (ver §5)
- [x] Bloque 7 · Videos — respondido (ver §5)
- [x] Bloque 8 · Encargos — respondido (ver §5)
- [x] Bloque 9 · Eventos — respondido (ver §5)
- [x] Bloque 10 · Contacto — respondido (ver §5)
- [x] Bloque 11 · Cara institucional Trilineal — respondido (ver §5)
- [x] Bloque 12 · Compactación visual — respondido (ver §5)
- [x] Bloque 13 · Cierre — respondido (ver §5)

## 5. Registro de decisiones

Se rellena con cada bloque respondido.

### Bloque 1 · Encuadre _(respondido)_

- **Cliente:** no es el foco. La persona ya está interesada en la obra de Domingo; la web es un complemento.
- **Objetivo de mañana:** mostrar el trabajo. No hay que publicar ni vender, es una muestra.
- **Idioma:** solo español. Se retira el selector de idioma (hoy no funciona) y se simplifica el i18n.
- **Las dos caras:** manda el archivo personal de Domingo. Trilineal se mantiene, pero secundario, discreto y bien separado.
- **Principio rector (tono):** la web debe quedar **ajustada y sobria**. Al recortar, conservar los hechos verificables (fechas, lugares, cifras del archivo) y eliminar adjetivos, frases de relleno y lenguaje promocional. Nada inventado ni inflado.

### Bloque 2 · Navegación y pestañas _(respondido)_

- **Tamaño del menú:** 5-6 pestañas.
- **Menú base confirmado:** Inicio · Biografía · Arte paleolítico · Micología · Encargos.
- **Trilineal:** fuera del menú superior; acceso desde el pie de página.
- **Contacto:** se elimina como pestaña. Teléfono y correo pasan al pie; el contenido de contacto se concentra dentro de Encargos.
- **Videos y Eventos:** se deciden una a una (bloques 7 y 9). El menú final tendrá 5-6 pestañas según ese resultado.

### Bloque 3 · Inicio _(respondido)_

- **Portada (hero):** se mantiene tal cual, con las burbujas animadas y su texto. No se toca.
- **Banda de cifras** (25 piezas, 8 cuevas, 3 años, 7 escritos): se elimina de la portada.
- **Tarjetas «Por dónde empezar»:** de 6 a 4 (Biografía, Arte paleolítico, Micología, Encargos). Fuera Videos y Trilineal.
- **Resultado:** la home queda en portada + 4 tarjetas.

### Bloque 4 · Biografía _(respondido)_

- **Cronología:** de 24 a ~18 hitos. Se quitan el 13 (carta al colegio), el 15 (carta a la Fundación Oso Pardo) y el 16 (CV cerrado). Se fusionan 7+8 (formación agraria 1990-1991) y 21+22 (primeros ensayos 2014-2015). El hito 18 (Café Bar Plaza) se mantiene con su nota de dato incierto.
- **Facetas:** se muestran **tres** (arte paleolítico, micología, guarda/naturalista). Se corrige la incoherencia «cinco facetas» y el término impreciso «escultor».
- **«Para saber más»:** se elimina (redundante con el menú).
- **Heráldica:** se mantiene, pero discreta y pequeña al pie de la biografía, sin sección propia.

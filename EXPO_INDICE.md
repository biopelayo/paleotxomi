# Índice · Exposición Domingo González de Lena
## La Esquina del Peso · Oviedo

> 🟢 **¿Sesión nueva? Empieza por [`HANDOFF_EXPO.md`](./HANDOFF_EXPO.md).** Es el punto de entrada autocontenido: contexto, datos, corpus, web, pendientes, estilo. Este índice queda como mapa exhaustivo de la carpeta.

**Última actualización:** jueves 28 may 2026 · handoff escrito.
**Estado:** v7 — auditoría del corpus aplicada (10 piezas «otras» eliminadas del catalog local, web desplegada con subtítulo nuevo y 4 hilos temáticos). **Pendiente principal:** Pelayo pasa las 24 piezas finales con ID, título, descripción, foto y precio.

**Bloqueos resueltos en esta sesión (28 may):**
- ✓ Catalog limpio (120→110, 40 archivos físicos borrados, carpetas 2_OTRAS eliminadas).
- ✓ Web pública desplegada en `paleotxomi.com` y `biopelayo.github.io/domingo-archivo/`.
- ✓ Subtítulo nuevo aplicado: «Arte Paleolítico parietal y Venus gravetienses».
- ✓ Bio corta canónica (36 palabras) cerrada.
- ✓ Datos del padre para Eden listos en `PAQUETE_EDEN.md`.
- ✓ Contact sheet interactivo para limpiar galería de setas (`CONTACT_SHEET_SETAS.html`).

Fecha bloqueo anterior (21 jun = domingo): decidido opción A (sáb 20 jun) y aplicado en docs.

Este archivo lista todos los documentos y entregables generados para la exposición. Sirve de mapa para navegar la carpeta.

---

## 0 · Auditoría y plan de la semana W-4

| Archivo | Propósito |
|---------|-----------|
| [`INFORME_AUDIT_25MAY.md`](./INFORME_AUDIT_25MAY.md) | Auditoría coherencia documental + bloqueo fecha (resuelto opción A) |
| [`PLAN_W4_25MAY.md`](./PLAN_W4_25MAY.md) | Plan accionable lunes 25 may – domingo 31 may |
| [`CORPUS_REVISION_25MAY.md`](./CORPUS_REVISION_25MAY.md) | Revisión del corpus real · descubre mismatch JSON ↔ fotos |
| [`CORPUS_AUDIT_FOTOS.md`](./CORPUS_AUDIT_FOTOS.md) | **Audit foto a foto · 43 imágenes abiertas y descritas · tabla maestra para sesión con Domingo** |
| [`MARCAPAGINAS_REVISION.md`](./MARCAPAGINAS_REVISION.md) | Verificación a mano de los 4 marcapáginas temáticos |
| [`INSTRUCCIONES_PDFS.md`](./INSTRUCCIONES_PDFS.md) | Cómo generar los PDFs para imprenta |

**Bloqueos críticos abiertos:**

1. **Mismatch corpus.** 18 de 23 fotos `pieza-NN.jpg` tienen motivos distintos a los del JSON. El motivo del cartel (cierva) está mal identificado. **Bloquea:** SVG/iconos, fichas, dossier, nota prensa, guion §3.
2. **Catalog.json sin metadatos.** 120 fotos profesionales de Amanda Blanco (28-abr-2026) con todos los campos vacíos. **Bloquea:** identificación pieza por pieza.

**Bloqueos resueltos:**

- ✓ Fecha 21 jun = domingo → opción A aplicada: inauguración pública sáb 20 jun, privada vie 19 jun.
- ✓ Coherencia documental: «trece grabados» corregido en 4 docs, fechas rectificadas en 11 docs + 2 componentes web.
- ✓ messages/es.json actualizado (25→23, 8→7).
- ✓ Email imprenta personalizado con 3 destinatarios.

## 1 · Plan maestro

| Archivo | Propósito |
|---------|-----------|
| [`EXPO_CAFE_DEL_PESO.md`](./EXPO_CAFE_DEL_PESO.md) | Plan maestro: contexto, estado, identidad, todas las decisiones |
| [`STYLE_GUIDE_EXPO.md`](./STYLE_GUIDE_EXPO.md) | Identidad visual: paleta, tipografía, motivo cierva, reglas |

## 2 · Contrato y fichas

| Archivo | Propósito |
|---------|-----------|
| [`CONTRATO_CESION_OBRAS.md`](./CONTRATO_CESION_OBRAS.md) | Borrador del contrato Domingo-Local. Anexo I con las 24 piezas. **Aviso:** revisar con asesor antes de firmar. |
| [`FICHAS_DE_SALA.md`](./FICHAS_DE_SALA.md) | 24 cartelas A5, una por pieza |

## 3 · Comunicación · documentos

| Archivo | Para qué |
|---------|----------|
| [`DOSSIER_EXPO.md`](./DOSSIER_EXPO.md) | Dossier 1-2 páginas para adjuntar a prensa y TPA |
| [`NOTA_PRENSA.md`](./NOTA_PRENSA.md) | Texto para LNE, El Comercio, RTPA, Asturies24 |
| [`EMAIL_ALBA_VAZQUEZ.md`](./EMAIL_ALBA_VAZQUEZ.md) | Mensaje a Alba Vázquez (Onda Cero) por LinkedIn / X |
| [`EMAIL_TPA.md`](./EMAIL_TPA.md) | Email para el programa *Pieces* (RTPA) |
| [`EMAIL_INAUGURACION_PRIVADA.md`](./EMAIL_INAUGURACION_PRIVADA.md) | Invitaciones a la inauguración privada (3 versiones: formal, WhatsApp, DM) |
| [`EMAIL_IMPRENTA.md`](./EMAIL_IMPRENTA.md) | Email a imprenta con especificaciones técnicas y tabla de adjuntos |
| [`CALENDARIO_PUBLICACION.md`](./CALENDARIO_PUBLICACION.md) | Plan W-4 → W+1, con versión Txomi + bio y post fijado de Bluesky |
| [`GUION_INAUGURACION.md`](./GUION_INAUGURACION.md) | Guion 8-12 min para Domingo + Pelayo en la inauguración |
| [`CAMBIOS_ES_JSON.md`](./CAMBIOS_ES_JSON.md) | Lista de textos a tocar en `messages/es.json` (lo lleva Pelayo) |

## 4 · Identidad visual

Todos los SVG en [`public/expo/`](./public/expo/). PNG a 300 DPI generados en [`public/expo/png/`](./public/expo/png/).

### Documentados y referenciados por web/imprenta

| Pieza | SVG | PNG (DPI alto) |
|-------|-----|----------------|
| Cartel A2 (594×420 mm) | `cartel.svg` | `cartel.png` (3508 px de ancho) |
| Logo del autor | `logo.svg` | `logo.png` (1600 px) |
| Logo de la exposición | `logo-expo.svg` | `logo-expo.png` (2000 px) |
| Logo cuadrado IG | `logo-cuadrado-instagram.svg` | `logo-cuadrado-instagram.png` (1080×1080) |
| Pasapáginas (50×200 mm) | `pasapaginas.svg` | `pasapaginas.png` (591 px) |
| Octavilla A6 (105×148 mm) | `octavilla.svg` | `octavilla.png` (1240 px) |
| Motivo cierva aislado | `motivo-cierva.svg` | `motivo-cierva.png` (1200 px) |
| Mapa de Asturias con 7 cuevas | `mapa-cuevas-asturias.svg` | `mapa-cuevas-asturias.png` (2000 px) |
| Marcapáginas 1 · Venus gravetienses | `marcapaginas-1-venus-gravetienses.svg` | `marcapaginas-1-venus-gravetienses.png` |
| Marcapáginas 2 · Arte franco-cantábrico | `marcapaginas-2-arte-franco-cantabrico.svg` | `marcapaginas-2-arte-franco-cantabrico.png` |
| Marcapáginas 3 · Cierva trilineal | `marcapaginas-3-cierva-trilineal.svg` | `marcapaginas-3-cierva-trilineal.png` |
| Marcapáginas 4 · 5 cuevas UNESCO Asturias | `marcapaginas-4-cuevas-unesco-asturias.svg` | `marcapaginas-4-cuevas-unesco-asturias.png` |

### Activos auxiliares (presentación, regencia, mockup)

| Pieza | SVG | PNG |
|-------|-----|-----|
| Mockup del escaparate | `mockup-escaparate.svg` | `mockup-escaparate.png` |
| Slide 1 · Portada | `slide-1-cover.svg` | `slide-1-cover.png` |
| Slide 2 · Cierva (motivo central) | `slide-2-cierva.svg` | `slide-2-cierva.png` |
| Slide 3 · Venus del cuerno | `slide-3-venus.svg` | `slide-3-venus.png` |
| Slide 4 · Piedra del oso | `slide-4-piedra-oso.svg` | `slide-4-piedra-oso.png` |
| Slide 5 · Mapa de cuevas | `slide-5-mapa-cuevas.svg` | `slide-5-mapa-cuevas.png` |
| Slide 6 · Domingo en taller | `slide-6-domingo.svg` | `slide-6-domingo.png` |
| Slide 7 · CTA / contacto | `slide-7-cta.svg` | `slide-7-cta.png` |

Regenerar los PNG en cualquier momento:

```bash
node scripts/svg-to-png.mjs
```

PDFs para imprenta (pendientes de generar, ver `EMAIL_IMPRENTA.md` §2):

```bash
for f in public/expo/{cartel,pasapaginas,octavilla,marcapaginas-1-venus-gravetienses,marcapaginas-2-arte-franco-cantabrico,marcapaginas-3-cierva-trilineal,marcapaginas-4-cuevas-unesco-asturias}.svg; do
  rsvg-convert -f pdf -o "${f%.svg}.pdf" "$f"
done
```

Alternativa Windows: abrir cada SVG en Inkscape y exportar a PDF.

## 5 · Portfolio web dentro del sitio de Domingo

| Ruta pública | Archivo |
|--------------|---------|
| `/` (banner verde de aviso) | `src/components/home/ExpoActualBanner.tsx` |
| `/exposicion/la-esquina-del-peso` | `src/app/exposicion/la-esquina-del-peso/page.tsx` |

Cuando Pelayo cierre las fechas reales, hay que sustituir los placeholders `[21 de junio]`, `[30 de junio]`, `[sábado 21]` y `[19:30]` en estos dos archivos. Ver INFORME_AUDIT_25MAY.md §3 para la tabla exacta de líneas y sugerencias.

## 6 · Scripts auxiliares

| Archivo | Propósito |
|---------|-----------|
| `scripts/svg-to-png.mjs` | Convierte los SVG de `public/expo/` a PNG (300 DPI) |
| `scripts/sync-data-from-dossier.mjs` | Existente: sincronización de datos del dossier (no relacionado con la expo del Café) |

---

## 7 · Pendiente

### CRÍTICO (decisión bloqueante)

- **Fecha real**: 21 jun 2026 es domingo. Decidir opción A (sáb 20 jun, recomendado), B (aceptar dom 21) o C (sáb 27). Ver INFORME_AUDIT_25MAY.md §1.

### De Pelayo

- Llamar al **685 660 938** (regencia) y cerrar: fecha, capacidad, privada víspera, restricciones cuelgue, coste cóctel.
- Sustituir `[móvil]` en los 5 docs que lo llevan o decidir dejar sólo email.
- Actualizar `messages/es.json` (25→23 piezas, 8→7 cuevas en L4, L44, L49).
- **Lista de invitados** a la inauguración privada (sugerencia: ≤ 30).
- **Foto del taller** si quiere reel/teaser (W-2 / W-4).

### De Domingo

- Año de cada pieza, técnica, peso, material.
- **Motivo y dimensiones de la pieza #8** (en `exposicion.json` aparece como «Sin determinar»).
- Dimensiones y datos completos de la Venus del cuerno.

### De la regencia de La Esquina del Peso

- Fecha de inauguración y de cierre.
- Capacidad para colgar 24 piezas.
- Si autorizan inauguración privada el día anterior y en qué horario.
- Coste del vino y picoteos para la privada.
- Si hay restricciones para colgar en pared (peso máximo, tornillos, etc.).

### De los medios

- Confirmar contacto en *Pieces* (RTPA) tras envío del email (W-3 jue 4 jun).
- Confirmar Alba Vázquez (Onda Cero) tras DM (W-3 mié 3 jun).

### Verificación humana antes de imprimir marcapáginas

Los textos de los 4 marcapáginas temáticos se redactaron con base de conocimiento general. **Antes de imprimir conviene revisar a mano:**

- **Marcapáginas 1 (Venus gravetienses):** datación 33.000-22.000 AP del Gravetiense; algunas fuentes acotan a 28.000-22.000. La Venus de Hohle Fels (Alemania) es Auriñaciense, no Gravetiense estricta, pero suele incluirse en la tradición.
- **Marcapáginas 2 (Arte franco-cantábrico):** cronología 40.000-12.000 AP; algunas fuentes acotan a 35.000-11.000.
- **Marcapáginas 3 (Cierva trilineal):** la etimología «trilineal» (tres líneas paralelas del trazo) se basa en los estudios de Fortea Pérez de la cueva. Pelayo o Domingo pueden afinar el matiz exacto.
- **Marcapáginas 4 (UNESCO 2008):** sitio oficial «Cueva de Altamira y arte rupestre paleolítico del norte de España», ID UNESCO 310. Ampliación en 2008 (32.ª sesión, Quebec, julio). Las 5 cuevas asturianas: Tito Bustillo, La Peña de Candamo, Pindal, Llonín, Covaciella.

---

## 8 · Cómo convertir el dossier a PDF

**Opción A · Pandoc (si está instalado):**

```bash
pandoc DOSSIER_EXPO.md -o dossier.pdf
```

**Opción B · VS Code:**

- Instalar la extensión «Markdown PDF» de yzane.
- Abrir el `.md`, click derecho → «Markdown PDF: Export (pdf)».

**Opción C · Navegador (más fácil):**

- Abrir el `.md` en VS Code con la vista de previsualización.
- `Ctrl+P` → «Guardar como PDF».

---

## 9 · Calendario rectificado (opción A · recomendada · pendiente confirmar)

| Cuándo | Qué |
|--------|-----|
| Hoy lun 25 may (W-4) | Llamar a regencia. Decidir fecha. Pasar lista a Domingo. |
| mar 26-mié 27 may | Tanda de Edits «fecha real». Documentar huérfanos. |
| jue 29-vie 30 may | Generar PDFs. Actualizar es.json. Verificar marcapáginas. Foto taller. |
| mar 2 jun (W-3) | Post de anuncio en redes propias (versión Txomi). Etiquetar @laesquinadelpeso. |
| mié 3 jun (W-3) | Enviar a Alba Vázquez (DM LinkedIn y X). |
| jue 4 jun (W-3) | Enviar a *Pieces* (RTPA) por email. Copia a `noticias@rtpa.es`. Nota de prensa a LNE, El Comercio, Asturies24. Envío a imprenta. |
| mié 10 jun (W-2) | Avance pieza estrella. Cerrar invitados privados. |
| vie 19 jun (W-1) | Recordatorio víspera + actualizar bio y post fijado de Bluesky. |
| **vie 19 jun (Día -1)** | **Inauguración privada 19:30.** |
| **sáb 20 jun (Día D)** | **Inauguración pública 19:30. Stories en directo.** |
| dom 21 jun (Día +1) | Post de agradecimiento. |
| mié 24 jun + sáb 28 jun | 2 posts de mantenimiento durante la expo. |
| mar 30 jun | Cierre. Desmontaje en 7 días naturales. |

# Identidad visual · Exposición Domingo González de Lena
## La Esquina del Peso · Oviedo

**Versión:** v1 · 24 may 2026

---

## 1 · Paleta

| Rol | HEX | Uso |
|-----|-----|-----|
| Verde botánico Pelamovic | `#2D6A4F` | Principal: títulos, motivo cierva, marca |
| Coral cálido | `#D4845A` | Acento: líneas, énfasis, hashtags |
| Tinta | `#1B1B1B` | Texto principal |
| Texto secundario | `#3D3D3D` | Subtítulos, descripciones |
| Texto muted | `#767676` / `#999999` | Pies, leyendas |
| Borde sutil | `#E5E5E0` | Encuadres |
| Papel | `#FAFAF7` | Fondo (nunca blanco puro) |

## 2 · Tipografía

- **Familia:** Inter (sans-serif). Sustitutos aceptables: Helvetica Neue, Helvetica, Arial.
- **Pesos:**
  - 800 (extra bold) — títulos grandes (DOMINGO, EXPOSICIÓN).
  - 700 (bold) — subtítulos y nombre completo.
  - 600 — kickers (rótulos pequeños en mayúsculas, espaciados).
  - 500 — cuerpo en piezas pequeñas.
  - 400 — cuerpo regular.
- **Tracking de mayúsculas** (kickers): `letter-spacing 0.18em` a `0.22em` (≈ 2.4-3.5 px en cuerpo 14).
- **Tracking de títulos grandes:** negativo, `-0.5` a `-1.5`. Para que respiren apretados, sin parecer descuidados.

## 3 · Motivo gráfico

- **Cierva esquemática**, una sola tinta verde botánico.
- Líneas con `stroke-width` 2-3 (proporcional al tamaño).
- `stroke-linecap` y `stroke-linejoin`: `round`.
- Estilo: trazo único, esquemático, evocador de grabado paleolítico. No fotorrealista.
- Archivo aislado: `public/expo/motivo-cierva.svg`.

## 4 · Reglas de composición

- **Fondo:** siempre papel `#FAFAF7`. Nunca blanco puro ni colores saturados.
- **Bordes:** finos (`#E5E5E0`, 0.3-1 px), discretos. Para enmarcar, nunca para destacar.
- **Línea separadora coral:** ancho 2-3 px, longitud 60-80 px, corta.
- **Jerarquía vertical:** kicker → título → subtítulo → motivo → datos → pie. Espacio generoso entre bloques.
- **Una sola tinta** principal por pieza impresa (verde botánico). El coral es acento puntual.

## 5 · Voz de texto (coherente con la web)

- **Tono:** sobrio, factual, sin marketing inflado.
- **Sin vocabulario IA:** delve, leverage, harness, robust, seamless, streamline.
- **Sin reframe** («No es X, es Y»).
- **Cero analogías** salvo necesidad clara.
- **Números concretos:** 24 piezas, 7 cuevas, fecha exacta, no aproximaciones.
- **Castellano de España** completo: tildes, ñ, «», ¿?, ¡!, coma decimal.

## 6 · Aplicación por pieza

| Pieza | Tamaño | Archivo |
|-------|--------|---------|
| Cartel | A2 (594×420 mm) | `public/expo/cartel.svg` |
| Logo del autor | 480×180 | `public/expo/logo.svg` |
| Logo de la expo | 600×280 | `public/expo/logo-expo.svg` |
| Logo cuadrado IG | 1080×1080 | `public/expo/logo-cuadrado-instagram.svg` |
| Pasapáginas | 50×200 mm | `public/expo/pasapaginas.svg` |
| Octavilla A6 | 105×148 mm | `public/expo/octavilla.svg` |
| Motivo cierva (aislado) | 260×180 | `public/expo/motivo-cierva.svg` |

## 7 · Para producción / imprenta

- **Papel:** verjurado o reciclado de gramaje medio. 170-250 g/m² para cartel; 300 g/m² para pasapáginas y octavilla.
- **Tinta:** una sola tinta verde botánico (`#2D6A4F`) + acentos coral (`#D4845A`) si se permite.
- **Acabado:** mate o sin acabado. Sin laminados brillantes.
- **Sangrado:** 3 mm en todos los lados para impresión profesional.

## 8 · Pendiente

- Sustituir los placeholders `[fecha inicio]`, `[fecha fin]`, `[día y hora]` cuando Pelayo cierre fechas con el Local.
- Decidir si la cierva esquemática del SVG actual es la definitiva, o si un ilustrador la afina a partir de la pieza #17 (Cierva de Lluera) del corpus.
- Generar versiones PNG de los SVG si la imprenta los pide.

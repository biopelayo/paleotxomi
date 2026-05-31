# Informe de auditoría · 25 may 2026
## Exposición Domingo González de Lena · La Esquina del Peso

**Auditor:** Claude (Opus 4.7) a petición de Pelayo.
**Versión documental:** v4 → v5 propuesto.
**Alcance:** los 13 .md raíz + portfolio web + activos visuales + datos `messages/es.json`.

---

## 1 · BLOQUEO CRÍTICO · día de la semana mal calculado

Todos los documentos asumen **sábado 21 jun 2026** como inauguración. El 21 jun 2026 es **domingo**. Verificado con `python -c "datetime.date(2026,6,21).strftime('%A')"` → `Sunday`. Análogamente, [CALENDARIO_PUBLICACION.md](CALENDARIO_PUBLICACION.md):3 dice «Hoy: sábado 24 mayo 2026» y el 24 may 2026 fue domingo.

Días reales:

| Fecha | Día real | Asumido en docs |
|-------|----------|-----------------|
| 24-may-2026 | domingo | sábado |
| 25-may-2026 | **lunes** (hoy) | — |
| **20-jun-2026** | **sábado** | viernes (víspera) |
| **21-jun-2026** | **domingo** | sábado (inauguración) |
| 27-jun-2026 | sábado | — |
| 30-jun-2026 | martes (cierre) | — |

Opciones:

- **A · Mover inauguración pública a sábado 20 jun. Privada viernes 19 jun (recomendada).** Cierre 30 jun se mantiene. Mínima fricción con la lógica «inaugurar en sábado, víspera viernes».
- **B · Aceptar domingo 21 jun.** Privada sábado 20. Cierre 30 jun. Atípico, prensa local atiende menos los domingos y el horario del local cambia (D 9:30-17:30, no 00:30 como S).
- **C · Mover a sábado 27 jun.** Sólo 3 días de exposición hasta el cierre del 30 jun. Mal encaje.

**Recomendación:** opción A.

---

## 2 · Error factual «trece grabados» · CORREGIDO HOY

4 docs decían «trece grabados de siete cuevas + Venus» → 14 piezas, no 24. Realidad: 23 grabados (#1-#23) + 1 Venus (#24) = 24. Era arrastre de la propuesta inicial de 15 piezas (§4 de [EXPO_CAFE_DEL_PESO.md](EXPO_CAFE_DEL_PESO.md)).

Corregido a «23 reproducciones en piedra de grabados de siete cuevas» en:

- [NOTA_PRENSA.md:13](NOTA_PRENSA.md)
- [EMAIL_TPA.md:29](EMAIL_TPA.md)
- [CALENDARIO_PUBLICACION.md:46](CALENDARIO_PUBLICACION.md)
- [EXPO_CAFE_DEL_PESO.md:183](EXPO_CAFE_DEL_PESO.md) (guion §3)

---

## 3 · Placeholders sin sustituir (sólo cuando se cierre fecha)

| Archivo:linea | Placeholder | Sugerencia (opción A) |
|---------------|-------------|------------------------|
| `src/app/exposicion/la-esquina-del-peso/page.tsx:70` | `Del [21 de junio] al [30 de junio]` | Del 20 al 30 de junio |
| `page.tsx:73` | `Inauguración: [sábado 21] a las [19:30]` | sábado 20 a las 19:30 |
| `src/components/home/ExpoActualBanner.tsx:23` | `del [21 de junio] al [30 de junio]` | del 20 al 30 de junio |
| [DOSSIER_EXPO.md:5, 39, 40](DOSSIER_EXPO.md) | `[21 de junio]`, `[sábado 21 de junio de 2026]`, `[19:30]` | sábado 20 jun 2026, 19:30 |
| [NOTA_PRENSA.md:11, 23, 24](NOTA_PRENSA.md) | `[día y hora]`, `[fecha inicio]`, `[fecha fin]`, `[fecha de envío]` | sábado 20 jun, 19:30 / 20 jun / 30 jun |
| [EMAIL_TPA.md:21, 29](EMAIL_TPA.md) | `[fechas]`, `[día y hora]`, `[fecha inicio]`, `[fecha fin]` | 20-30 jun 2026 |
| [EMAIL_ALBA_VAZQUEZ.md:24, 40](EMAIL_ALBA_VAZQUEZ.md) | `[día y hora]`, `[día]` | sábado 20 jun, 19:30 |
| [EMAIL_INAUGURACION_PRIVADA.md:6, 12, 20, 35](EMAIL_INAUGURACION_PRIVADA.md) | `viernes 20 de junio` (mal día) | viernes 19 de junio 19:30 |
| [CONTRATO_CESION_OBRAS.md:7-23](CONTRATO_CESION_OBRAS.md) | `[fecha de firma]`, `[DNI]`, `[domicilio]`, `[Nombre del titular]`, `[fecha de inauguración]`, `[fecha de cierre]`, `[día y hora]` | (rellenar al firmar) |
| [FICHAS_DE_SALA.md:50, 156](FICHAS_DE_SALA.md) | `#8 [Motivo por confirmar]`, dimensiones #24 | (dato de Domingo) |
| [GUION_INAUGURACION.md:17](GUION_INAUGURACION.md) | `[nombre regencia La Esquina del Peso]` | (dato a recibir) |

Plus: `[móvil]` de Pelayo en 5 docs.

---

## 4 · messages/es.json sin actualizar (lo lleva Pelayo)

Sigue diciendo «25 piezas, 8 cuevas» en tres sitios:

- L4 `meta.description`: «...proyecto expositivo de arte paleolítico asturiano (25 piezas en piedra, 8 cuevas)...»
- L44 `exposicion.subtitle`: «25 piezas en piedra que reproducen grabados y pinturas de 8 cuevas...»
- L49 `venusBody`: «...fuera del proyecto expositivo de las 8 cuevas.»

Cambios pendientes: **25→23, 8→7**. Documentado en [CAMBIOS_ES_JSON.md](CAMBIOS_ES_JSON.md), pendiente ejecución de Pelayo.

---

## 5 · Activos visuales · 8 archivos huérfanos en disco

En `public/expo/` pero NO listados en [EXPO_INDICE.md §4](EXPO_INDICE.md):

- `mockup-escaparate.svg` + `mockup-escaparate.png`
- `slide-1-cover` … `slide-7-cta` (7 pares SVG/PNG)

Acción: documentarlos en EXPO_INDICE §4 (lo haré en v5) o eliminarlos si no se usan. Probablemente son slides de presentación para regencia o medios.

PDFs prometidos en [EMAIL_IMPRENTA.md §2](EMAIL_IMPRENTA.md) pero aún no existen:

- `cartel.pdf`, `pasapaginas.pdf`, `octavilla.pdf`, `marcapaginas-1.pdf`, `-2.pdf`, `-3.pdf`, `-4.pdf`.

Acción: generar con Inkscape (Archivo → Guardar como → PDF) o `rsvg-convert -f pdf` antes de enviar a imprenta. Bloquea envío a imprenta.

---

## 6 · Integración web · OK

- `ExpoActualBanner` integrado en `src/app/page.tsx:8` ✓.
- Página `/exposicion/la-esquina-del-peso/` carga las 24 piezas desde `public/data/exposicion.json` y la Venus hardcoded ✓.
- Mapa Google embebido del local ✓.
- Imágenes desde `public/personal/piezas/pieza-XX.jpg` + `venus-cuerno-01.jpg`. Verificar que existan los 24 archivos antes de publicar.

---

## 7 · Castellano y estilo · OK

He revisado los 13 .md raíz. **No detecto** vocabulario IA (delve, harness, robust, seamless), reframe «No es X, es Y» retórico, ni analogías gratuitas. Castellano correcto con tildes, ñ, «», ¿?, ¡!. [STYLE_GUIDE_EXPO.md §5](STYLE_GUIDE_EXPO.md) fija bien las reglas.

Único matiz: el «No / Sí» de la cláusula quinta del contrato es un selector legal binario, no retórica.

---

## 8 · Datos pendientes externos (sin cambio respecto v4)

**De Domingo:**

- Año de cada pieza.
- Técnica exacta (grabado, talla, pulido, mixta).
- Material (piedra, origen).
- Peso piezas grandes (#5, #16 sobre todo).
- Datos completos de la Venus del cuerno (título oficial, año, técnica, motivo).
- Motivo y dimensiones de #8 (Tito Bustillo).

**De regencia La Esquina del Peso (685 660 938):**

- Fechas reales inauguración / cierre.
- Capacidad para 24 piezas + 24-30 invitados a la privada.
- Autorización inauguración privada víspera.
- Coste vino y picoteo de la privada.
- Restricciones de cuelgue (peso, tornillos, fijación).

**De medios:**

- Alba Vázquez (DM LinkedIn + X) — envío en W-3.
- *Pieces* RTPA (email `programas@rtpa.es`) — envío en W-3.

---

## 9 · Veredicto

**NO listo para enviar a imprenta hoy 25 may.**

Bloqueos:

1. Fecha real sin cerrar (afecta a TODOS los soportes impresos y a la web).
2. Datos de Domingo sin recoger (afecta a fichas + contrato).
3. Marcapáginas temáticos sin verificar a mano (datación Gravetiense 33.000-22.000 AP, UNESCO 310 ampliación 2008, etc. — ver [EXPO_INDICE.md §7](EXPO_INDICE.md)).
4. PDFs no generados desde los SVG.

Una vez decidida la opción A (sábado 20 jun), una tanda de Edits + datos de Domingo + verificación de marcapáginas + generación de PDFs desbloquea el envío.

**Plazo realista de envío a imprenta:** jueves 4 jun (W-3) si se cierra fecha el martes 26 may. Ver [PLAN_W4_25MAY.md](PLAN_W4_25MAY.md) para el detalle accionable.

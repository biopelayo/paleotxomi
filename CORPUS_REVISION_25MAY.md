# Revisión del corpus real · 25 may 2026 (tarde)
## Exposición Domingo González de Lena · La Esquina del Peso

**Por:** Claude (Opus 4.7), tras petición explícita de Pelayo de «empaparme» del trabajo real del padre con fotos suyas reales y mirar el corpus en `public/personal/`.
**Estado:** auditoría visual de 15 piezas + 4 venus + 3 vistas de exposición. **Hallazgo crítico: mismatch sistemático entre `exposicion.json` y los archivos `pieza-NN.jpg`.**

---

## 0 · Mea culpa

He construido los SVG iconográficos (cierva esquemática, Venus tipo Willendorf en marcapáginas 1) **sin haber abierto las fotos del corpus**. Es mi error. Lo que ha hecho Domingo no es estereotipo paleolítico genérico; es un cuerpo de trabajo concreto, denso, propio. Los SVG actuales del cartel, del logo, del motivo cierva y de los marcapáginas **no representan la obra real**. Hay que rehacerlos a partir de las piezas. No los voy a tocar hasta que Pelayo decida con qué piezas concretas se trabaja.

---

## 1 · El corpus es mucho más amplio que «23 grabados de cuevas»

Lo que he visto en `public/personal/piezas/`, `public/personal/exposicion/` y las fotos que envió Pelayo por chat:

### Tipos de pieza identificados

1. **Grabados en placas de piedra (pizarra, cuarcita ocre)** con motivos zoomorfos: caballos, ciervos, cabras, uros, bisontes, ictiomorfos.
2. **Grabados con motivos antropomorfos**: cazadores con armas, figuras con cabeza zoomorfa.
3. **Grabados de mujer (Venus) en piedra**: una Venus tipo Laussel con cuerno alzado (sobre pizarra), una Venus tipo Willendorf grabada en ocre.
4. **Esculturas y relieves en terracota**: Venus de Laussel, Willendorf, Lespugue, una figura zoomorfa con orejas puntiagudas tipo lince/corzo, una piedra-panel con cierva al fondo.
5. **Colgantes circulares en piedra** con grabado, con cordones de cuero, fragmento óseo embutido.
6. **Reproducciones de objetos líticos y de hueso/asta**: propulsores con remate zoomorfo (estilo Saint-Germain-la-Rivière), azagayas, arpones denticulados, puntas óseas, mandíbulas reproducidas.
7. **Esfera de arcilla** con grabado en rojo (¿caballo? ¿uro?), acompañada de asta natural.
8. **Pulseras / brazaletes** de cuero o asta natural (vistas en la foto de chat).

### Volumen real

- `public/personal/piezas/`: 23 + 4 venus = 27 archivos.
- `public/personal/exposicion/`: 6 vistas de una exposición anterior — **se ven docenas de piezas con etiquetas alfanuméricas C-12, B-50, C-26, C-31, G-31, B-60, B-65...** Centenas de placas grabadas.
- `public/data/catalog.json`: **120 entradas DOM-ESC-001 … DOM-ESC-120** (sección «1_ESCULTURAS»), **todas sin metadatos rellenos** (motivo, yacimiento, cronología, técnica, material, dimensiones, año, peso… todo vacío `""`). Fotografías por Amanda C. Blanco el 28-abr-2026.

El corpus real podría rondar las **120-200 piezas**. Las 23+1 del `exposicion.json` son una selección curada, pero la curación tiene errores graves de mapeo a las fotos.

---

## 2 · Mismatch sistemático JSON ↔ fotos · audit foto a foto

Tabla con lo que dice el JSON vs lo que se ve en la foto, para las piezas que he abierto:

| Archivo | Motivo en `exposicion.json` | Cueva en JSON | Lo que se ve realmente | Veredicto |
|---------|-----------------------------|----------------|------------------------|-----------|
| pieza-01.jpg | Ictiomorfo y bisonte | Pindal | **Colgante circular** con cuadrúpedo simple + fragmento óseo + cordones cuero | ❌ no es placa, es colgante con un solo motivo |
| pieza-05.jpg | Piedra del oso | Tito Bustillo | **Tectiforme/escudo** con líneas verticales y dos «ojos» (un macroesquemático) | ❌ NO es oso |
| pieza-09.jpg | Ciervas acéfalas | Les Pedroses | **Venus tipo Willendorf** grabada en ocre, vista frontal, brazos sobre el pecho, vientre voluminoso | ❌ NO son ciervas — **es una de las venus gravetienses** |
| pieza-11.jpg | Tectiforme | Buxu | **Caballo con crinera** rayado, perfil hacia la derecha | ❌ NO es tectiforme, es caballo |
| pieza-12.jpg | Caballos | Buxu | Gran cuadrúpedo rayado (caballo/bisonte) con líneas paralelas verticales | ✅ aproximado |
| pieza-14.jpg | Cabra I | Llonín | **Caballo** estilizado, perfil hacia la derecha | ❌ NO es cabra |
| pieza-15.jpg | Cabra II | Llonín | **Antropomorfo o ave-serpiente** con cabeza tipo pico | ❌ NO es cabra |
| pieza-16.jpg | Panel de la gran hornacina | Lluera | **Antropomorfo cazador** con armas (dardos/lanzas) | ❌ no es panel uro+bisonte+cierva |
| pieza-17.jpg | Cierva | Lluera | **Venus con cuerno** (tipo Laussel) grabada en pizarra, mujer en pie sosteniendo cuerno | ❌ NO es cierva — **es otra venus** |
| pieza-19.jpg | Bisonte | Lluera | **Dos uros** (bóvidos con cuernos hacia el frente, uno grande y uno pequeño) | ❌ son uros, no bisontes |
| pieza-20.jpg | Ciervo herido | Candamo | **Cabra/ciervo en posición de salto o herido** con dardos | ~✅ aproximado |
| pieza-21.jpg | Uro | Candamo | **Propulsor + azagaya + arpones/puntas** — objetos líticos, no grabado | ❌ NO es grabado |
| pieza-22.jpg | Uro y gran ciervo de los venablos | Candamo | **Puntas líticas/arpones** sobre asta | ❌ NO es grabado |
| pieza-23.jpg | Caballo rayado | Candamo | **Propulsor con remate zoomorfo + azagaya + puntas** | ❌ NO es grabado |
| venus-cuerno-01..04.jpg | Venus del cuerno (pieza singular #24) | — | **4 vistas de la Venus de Laussel en relieve sobre terracota/piedra** (cuerno alzado, sentada/agachada, sin cabeza definida) | ✅ es la venus en relieve, distinta de la venus grabada de pieza-17 |

### Resumen del veredicto

- De las 15 piezas abiertas, **al menos 11 tienen un motivo distinto al que dice el JSON**.
- Aparecen **2 venus distintas** que el JSON no contempla como tales (pieza-09 Willendorf, pieza-17 Laussel grabada). Además de las 4 venus-cuerno-NN.
- Aparecen **4 piezas que son objetos líticos/de hueso** (pieza-21, 22, 23, 01 como colgante), no grabados en placa de piedra como sugiere el JSON.
- Aparecen **antropomorfos y figuras humanas** que el JSON tampoco menciona.
- **«La cierva de Lluera» (#17) en realidad muestra una Venus, no una cierva.** ⚠ Esto invalida la elección de la cierva como motivo del cartel y del logo de la exposición.

---

## 3 · Localización de las piezas que pediste

### Venus gravetienses (en el corpus real, no inventadas)

Hay **6 venus identificadas** entre los archivos:

| Archivo | Tipo | Soporte | Comentario |
|---------|------|---------|------------|
| pieza-09.jpg | Tipo **Willendorf** | grabado en pizarra ocre | Cuerpo voluminoso, brazos sobre el pecho, cabeza pequeña esférica. Mal etiquetada como «Ciervas acéfalas» en el JSON. |
| pieza-17.jpg | Tipo **Laussel con cuerno** | grabado en pizarra oscura | Mujer en pie sosteniendo el cuerno levantado, senos visibles. Mal etiquetada como «Cierva» en el JSON. |
| venus-cuerno-01.jpg | Tipo Laussel | relieve en piedra/terracota oscura | Vista pequeña, agachada. |
| venus-cuerno-02.jpg | Tipo Laussel | relieve en piedra rojiza | Detalle del cuerno alzado, senos colgantes. |
| venus-cuerno-03.jpg | Tipo Laussel | relieve en piedra rojiza, horizontal | Otra vista, cuerno bien definido. |
| venus-cuerno-04.jpg | Tipo Laussel | relieve | Cuerpo entero, mirada hacia el cuerno. |

Y en la foto que enviaste por chat (la del conjunto de estatuillas en hierba) veo **al menos 7 venus / figuras antropomorfas** en terracota (blancas, rojas, negra), incluyendo lo que parece una **Venus tipo Willendorf** blanca, una **tipo Lespugue/Brassempouy** roja, una **figura zoomorfa con orejas** roja (foto 5 del chat) y otras. Esas estatuillas **no están en el corpus digital** del repo — son una colección aparte.

### La cierva real

Las dos piezas con cierva trilineal que enviaste por chat (foto 1) **no están entre los `pieza-NN.jpg`** del repo. Esas dos piedras con cierva sobre base blanca de triángulos parecen **otras piezas del corpus de Domingo** que aún no han entrado al archivo digital, o que están en el `catalog.json` con archivos `_DSF3xxx.jpg` (que no son los `pieza-NN.jpg`).

**La cierva auténtica del Trilineal asturiano (cierva de Lluera I, estudiada por Fortea)** no la he encontrado en el corpus digital como pieza independiente. Lo que sí hay:

- **pieza-17.jpg**: la pieza llamada «Cierva» en el JSON es en realidad una Venus.

Eso significa que **el motivo del cartel y del logo de la exposición — la cierva — no está localizado en el corpus digital**. Hay que pedírselo a Domingo: ¿qué archivo corresponde a la cierva trilineal real?

---

## 4 · Implicaciones para SVG e iconografía

Hay que rehacer:

| Activo | Estado actual | Acción |
|--------|---------------|--------|
| `motivo-cierva.svg` | Cierva esquemática inventada (3 líneas paralelas en la grupa) | Rehacer a partir de la cierva real de Domingo cuando se localice |
| `cartel.svg` | Lleva la cierva esquemática | Rehacer con la cierva real **o** sustituir el motivo principal por algo verdaderamente representativo del corpus (¿una venus de Laussel, dado el peso real que tiene en su obra?) |
| `logo.svg`, `logo-expo.svg`, `logo-cuadrado-instagram.svg` | Usan el motivo cierva esquemático | Rehacer |
| `marcapaginas-1-venus-gravetienses.svg` | Venus tipo Willendorf inventada genérica | **Rehacer con la Venus real de Domingo (pieza-09 o venus-cuerno) y atribuirla como obra del autor**, no como ejemplo de Willendorf |
| `marcapaginas-3-cierva-trilineal.svg` | Cierva esquemática + tres líneas paralelas inventadas | Rehacer con la cierva real |
| `marcapaginas-2-arte-franco-cantabrico.svg` | Bisonte esquemático estilo Altamira | Aceptable como icono temático, pero podría usar una pieza real de Domingo (un bisonte suyo) |
| `marcapaginas-4-cuevas-unesco-asturias.svg` | Mapa esquemático | Aceptable, no representa obra concreta |
| `slide-1-cover` a `slide-7-cta.svg` | Activos huérfanos | Revisar si están alineados o también inventados |
| `mapa-cuevas-asturias.svg` | Mapa esquemático con 7 cuevas | Aceptable |

---

## 5 · Propuesta de acción

### Paso 1 · Decisión de Pelayo

¿Cuál es la fuente de verdad sobre las 24 piezas seleccionadas para la expo?

- **Opción α** — El `exposicion.json` es correcto en los **motivos y cuevas**; las fotos `pieza-NN.jpg` están **desordenadas** y hay que reasignarlas (cada motivo se busca en el corpus completo del catalog.json y se enlaza la foto correcta).
- **Opción β** — Los archivos `pieza-NN.jpg` son las **piezas reales** que se van a colgar; el JSON tiene los **motivos mal asignados** y hay que reescribirlo (mirando foto a foto con Domingo y rellenando motivo/cueva/medidas reales).
- **Opción γ** — Hay que **re-curar desde cero**: Domingo selecciona pieza por pieza del corpus de Amanda Blanco (las 120 fotos `_DSF3xxx.jpg`), Pelayo rellena `catalog.json` con metadatos, y se construye un nuevo `exposicion.json` coherente.

**Mi recomendación:** opción γ si es viable (es la única que da rigor y honra el corpus real). Opción β como mínimo, para no enviar a prensa información incorrecta.

### Paso 2 · Sesión con Domingo

Una mañana en el taller de Lena con Domingo, Pelayo y las fotos. Domingo identifica cada pieza, su cueva de referencia, año, técnica, material. Se rellena el catalog.json con metadatos reales. Se cierran las 24 piezas finales con foto, motivo y cueva correctos.

### Paso 3 · Rehacer iconografía SVG

Una vez identificada la cierva real (o sustituido el motivo principal por una pieza más representativa), rehacer:

- Motivo principal del cartel.
- Logo del autor y de la expo.
- Marcapáginas 1 (Venus) y 3 (Cierva) con piezas reales del corpus.

### Paso 4 · Revertir docs basados en motivos incorrectos

Si la pieza #17 no es cierva sino venus:

- El **guion de inauguración** describe Lluera como «cierva… y la cueva más cerca de casa». Hay que reescribir el §3 con los motivos reales.
- El **dossier**, la **nota de prensa**, las **fichas de sala** y el **anexo del contrato** llevan motivos incorrectos (Ciervas acéfalas, Cierva de Lluera, Caballo rayado de Candamo en piezas que no son eso). Reescribir.
- El **marcapáginas 3** se titula «Cierva trilineal» pero apoya el «logo de la exposición» que está inventado.

### Paso 5 · No tocar nada de imprenta hasta que Paso 1-3 estén cerrados

El envío a imprenta del jue 4 jun queda **bloqueado** hasta que el corpus esté re-curado. Si no llegamos, retrasar la inauguración o limitar la tirada a las piezas que sí estén verificadas (mapa UNESCO + octavilla genérica).

---

## 6 · Lo que voy a hacer ya, sin esperar decisión

- ❌ **Nada en SVG / iconografía / cartel** hasta decisión de Pelayo.
- ❌ **Nada en docs derivados** (guion, dossier, nota prensa) hasta tener motivos correctos.
- ✓ Documentar este audit en este archivo y enlazarlo desde `EXPO_INDICE.md`.
- ✓ Marcar el bloqueo en `PLAN_W4_25MAY.md` como crítico nuevo.

---

## 7 · Archivos que SÍ son seguros y se mantienen

- Datos de la regencia (La Esquina del Peso, calle del Peso 1, casco antiguo de Oviedo, etc.).
- Calendario rectificado de opción A (sáb 20 jun).
- Estructura de los marcapáginas 2 (franco-cantábrico) y 4 (UNESCO 310): contenido histórico verificable.
- Biografía del autor.
- Datos prácticos (horario, contacto, ubicación).
- Plan W-4 de gestión (llamar a la regencia, etc.).

---

## 8 · Próximo paso concreto

Necesito que Pelayo elija una de las tres opciones del §5.1 y, si es la β o la γ, **una sesión con Domingo viendo las fotos**. Yo puedo ir abriendo en bucle las 23 `pieza-NN.jpg` + 120 `_DSF3xxx.jpg` y describiendo lo que veo, pero **Domingo es el único que sabe qué cueva original inspiró cada pieza, qué año la hizo y de qué material es**.

Hasta entonces: **paro de tocar nada relacionado con el corpus visual.**

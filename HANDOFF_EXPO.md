# Handoff · Paleotxomi · exposición La Esquina del Peso
## Punto de partida único para la nueva sesión

**De:** sesión del 1 jun 2026 · Claude Opus 4.7 (1M context).
**Para:** la siguiente sesión.
**Foco exclusivo:** la exposición de Domingo. Nada más.

> 🟢 **Si arrancas ahora:** lee este documento entero antes de tocar nada. Luego salta al §14 «Próxima acción concreta». El resto está agrupado para consulta puntual.

---

## 0 · Estado en una línea

**Web pública desplegada y activa** en <https://biopelayo.github.io/paleotxomi/>. Título cerrado **PALEOTXOMI · Ciervas, Venus y grabados**. **Lista de 41 obras** cerrada con OCR del cuaderno del autor. **Lámina A4 firmada** generada con la firma T+X del autor. Falta: cartel definitivo (Pelayo lo dará), foto + precio de cada pieza, y activación de `paleotxomi.com` (esperando verificación Veriff en Porkbun).

---

## 1 · Dos repositorios · qué hace cada uno

| Repo | Working dir | URL pública | Propósito |
|------|-------------|-------------|-----------|
| **`biopelayo/paleotxomi`** | `D:\Antigravity\paleotxomi\` | <https://biopelayo.github.io/paleotxomi/> | **Sede principal de la expo. Trabajar aquí.** |
| `biopelayo/domingo-archivo` | `D:\Antigravity\proyecto-domingo-web\` | <https://biopelayo.github.io/domingo-archivo/> | Archivo personal completo del autor (micología, videos, escritos). Secundario. |

**Worktree de deploy**: `D:\Antigravity\paleotxomi-deploy\` (rama `gh-pages` montada como worktree separado para no romper el `main`).

### Para desplegar cambios (flujo manual probado)

```bash
cd D:/Antigravity/paleotxomi
npm run build
cd D:/Antigravity/paleotxomi-deploy
# limpiar todo menos .git
find . -maxdepth 1 -mindepth 1 -not -name ".git" -exec rm -rf {} +
# copiar el build
cp -r D:/Antigravity/paleotxomi/out/. .
touch .nojekyll
git add -A
git -c user.email="bio.pelayo@gmail.com" -c user.name="biopelayo" commit -m "deploy: ..."
git push origin gh-pages
```

**Ojo:** al hacer commit en `main`, si en el index aparece `.github/workflows/deploy.yml`, hay que quitarlo con `git rm --cached -r .github && git commit --amend --no-edit` antes del push. El token de Claude no tiene scope `workflow`.

---

## 2 · Estado del dominio paleotxomi.com

**Comprado el 31 may 2026 en Porkbun.** Cuenta en verificación Veriff.

### Lo que está hecho

- ✓ Dominio adquirido (~10 €/año).
- ✓ Repo preparado en local con `basePath: ""` (sin subpath) cuando se active.
- ✓ Public/CNAME preparado con `paleotxomi.com` (no subido a gh-pages todavía).

### Lo que falta · orden obligado

1. **Pelayo recibe correo de Veriff aprobando** la cuenta de Porkbun.
2. **Pelayo configura los DNS** en Porkbun (los 5 records del bloque siguiente).
3. **Yo deploy** con `basePath: ""` y `CNAME` incluido.
4. **Pelayo activa custom domain** en <https://github.com/biopelayo/paleotxomi/settings/pages>.
5. **HTTPS** se emite automáticamente (15-60 min después).

### Records DNS para Porkbun (cuando Pelayo entre)

| Type | Host | Answer | TTL |
|------|------|--------|-----|
| A | (vacío) | `185.199.108.153` | 600 |
| A | (vacío) | `185.199.109.153` | 600 |
| A | (vacío) | `185.199.110.153` | 600 |
| A | (vacío) | `185.199.111.153` | 600 |
| CNAME | `www` | `biopelayo.github.io` | 600 |

**⚠ No tocar el custom domain en GitHub hasta que Pelayo confirme que el DNS está guardado.**

---

## 3 · Datos del autor (cerrados, no preguntar)

- **Nombre completo:** Domingo González de Lena Díaz
- **DNI:** [DNI retirado]
- **Fecha de nacimiento:** 1959 · Pajares, concejo de Lena (Asturias)
- **Domicilio:** c/ [dirección retirada]
- **Teléfono:** 662 58 57 98
- **Correo:** domingodelena@gmail.com
- **Apodo:** Txomi / Chomi
- **Firma:** signo paleolítico en cinabrio sobre arenisca: **T** arriba a la derecha + **X** abajo a la izquierda. Reproducido como SVG inline en `RELACION_OBRAS_LAMINA.html` (clase `.firma-stamp`).

---

## 4 · Identidad de la exposición (cerrada)

| Campo | Valor |
|-------|-------|
| **Título** | **PALEOTXOMI** |
| **Subtítulo** | **Ciervas, Venus y grabados** |
| **Tagline secundario** | Grabados y figurillas en piedra de bulto redondo |
| **Lugar** | La Esquina del Peso · calle del Peso 1 · 33009 Oviedo |
| **Contacto del local** | 685 660 938 · info@laesquinadelpeso.com · @laesquinadelpeso |
| **Dueño del local** | Eden (solo nombre, contrato lo lleva él) |
| **Fechas** | **Del 19 al 30 de junio 2026** |
| **Inauguración pública** | **viernes 19 jun 2026 · 19:30** |
| **Inauguración privada** | descartada o opcional (Pelayo decide cerca de fecha) |
| **Total obras** | **41 piezas** (catalogadas 54, anuladas/retiradas 13) |
| **Web autor** | <https://biopelayo.github.io/paleotxomi/> |
| **Web expo** | <https://biopelayo.github.io/paleotxomi/exposicion/la-esquina-del-peso/> |

### Bio canónica (36 palabras)

> **Domingo González de Lena Díaz.** Pajares, concejo de Lena (Asturias), 1959. Trabaja la piedra a mano en su taller de Lena. Reproduce el arte paleolítico parietal de las cuevas asturianas y talla figurillas gravetienses en bulto redondo.

Las versiones media y larga están en `PAQUETE_EDEN.md`.

### Los 4 pilares conceptuales

Aunque el subtítulo se condensó en «Ciervas, Venus y grabados», los 4 ejes temáticos de la muestra siguen siendo:

1. **Venus gravetienses** (30.000-22.000 AP).
2. **Arte franco-cantábrico** (36.000-11.000 AP).
3. **Cierva trilineal asturiana** (estilo Fortea Pérez · Solutrense-Magdaleniense).
4. **5 cuevas asturianas Patrimonio Mundial UNESCO 2008** (Tito Bustillo, La Peña de Candamo, El Pindal, Llonín, Covaciella).

---

## 5 · Las 41 obras (cerradas)

Numeración del cuaderno original del autor (los huecos son piezas catalogadas pero excluidas de esta selección).

### Venus gravetienses · 12

1. Venus del jabalí
2. Venus arenisca roja
3. Venus arrugas dorsales
4. Venus frontal roto
5. Venus arrodillada acéfala
6. Venus arrodillada acéfala con tocado
7. Venus base yesquero
8. Dios cornudo
9. Venus base cuadrangular
10. Venus roja cabeza pequeña
11. Venus sentada negra
12. Venus de Laussel

### Antropomorfos y chamanes · 5

18. Sorcier del arco musical
19. Brujo bisonte
23. Ídolo Peñatu mancha roja
24. Ídolo Peñatu proyectado
36. Dios cornudo pezuñas grabado

### Fauna paleolítica · 11

15. Oso lanceado · 16. Mamut · 17. Mamut en trampa · 20. Caballito Vogelherd · 21. Caballo lunares · 29. Yegua rayada · 32. Bisonte Covaciella · 33. Panel de las cabras · 34. Uro La Peña · 37. Uro La Peña cuadrado · 38. Uro La Peña violeta

### Grabados y paneles · 7

13. Piedra semicircular siluetas · 25. Panel Buxu · 26. Ictiomorfo y bisonte · 27. Ictiomorfo · 28. Piedra del oso · 35. Muro de los grabados · 39. Tectiforme Buxu

### Cierva trilineal asturiana · 5

44. Cierva trilineal mediana I · 45. Cierva trilineal mediana II · 46. Cierva trilineal mediana III · 47. Cierva trilineal mediana IV · 48. Cierva trilineal mediana V

### Escena humana · 1

40. Coito Los Casares I

### Fuera de la selección · 13

| # | Motivo | Razón |
|---|--------|-------|
| 14 | Grabado mujer tumbada | Retirada Pelayo |
| 22 | Ídolo Peñatu mancha roja (1.ª versión) | Retirada Pelayo |
| 30 | Yegua rayada cuadrada | Retirada Pelayo |
| 31 | Ciervo herido | Anulada por el autor |
| 41 | Coito Los Casares II | Retirada Pelayo |
| 42 | Coito Los Casares III | Retirada Pelayo |
| 43 | Cierva trilineal pequeña | Retirada Pelayo |
| 49-53 | Ciervas trilineales medianas VI-X | Retirada Pelayo |
| 54 | Menina | Retirada Pelayo |

Documentos relacionados:
- `LISTA_OBRAS_RELACION.md` · tabla técnica completa con filtros.
- `LISTA_OBRAS_EDEN.md` · lista limpia con formato WhatsApp para copiar/pegar.
- `RELACION_OBRAS_LAMINA.html` / `.pdf` / `.png` · lámina A4 firmada por el autor.

---

## 6 · Estado de los archivos clave (mapa)

```
D:\Antigravity\paleotxomi\
├── HANDOFF_EXPO.md                  ← ESTE archivo
├── README.md                        ← intro del repo
├── package.json                     ← name: paleotxomi
├── next.config.ts                   ← basePath /paleotxomi (cambiar a "" cuando paleotxomi.com)
├── paleo.css                        ← tema reutilizable
│
├── src/app/exposicion/la-esquina-del-peso/page.tsx  ← página principal de la expo
├── src/components/home/ExpoActualBanner.tsx          ← banner verde de la home
├── messages/es.json                                  ← textos (brand: «PaleoTxomi»)
│
├── public/personal/sesion-amanda-2026/  ← 10 fotos clave (venus-hongo, ciervas, etc.)
├── public/personal/piezas/              ← 23 piezas-NN.jpg + 4 venus-cuerno (mismatch JSON, no fiable)
├── public/images/web/1_ESCULTURAS/      ← 110 fotos catalog Amanda Blanco (sin metadatos)
├── public/data/catalog.json             ← 110 piezas DOM-ESC-* (metadatos vacíos)
├── public/data/exposicion.json          ← 23 piezas con motivo MAL mapeado a pieza-NN.jpg
├── public/data/setas.json               ← 65 fotos (sin recolecciones, ya limpio)
│
├── MENSAJE_EDEN_WHATSAPP.md         ← texto principal para enviar
├── LISTA_OBRAS_EDEN.md              ← lista 41 obras formato WhatsApp
├── LISTA_OBRAS_RELACION.md          ← tabla técnica completa
├── PAQUETE_EDEN.md                  ← datos del padre + 3 bios
├── CONTRATO_CESION_OBRAS.md         ← borrador (Eden lo lleva)
│
├── RELACION_OBRAS_LAMINA.html       ← lámina A4 firmada (fuente)
├── RELACION_OBRAS_LAMINA.pdf        ← 3,3 MB · A4 limpio
├── RELACION_OBRAS_LAMINA.png        ← 1 MB · con canvas blanco al final
│
├── ONE_PAGE_EXPO_VESTIDO.html       ← template A3 paleo (Pelayo lo editó)
│
└── public/expo/                     ← SVG cartel, marcapaginas, octavilla, slides (varios mal mapeados)
```

**No fiable / pendiente de re-curar:**
- `public/data/exposicion.json` y `public/personal/piezas/pieza-NN.jpg`: motivos mal asignados (la #17 dice cierva pero es Venus, etc.). Documentado en `CORPUS_AUDIT_FOTOS.md` y `CORPUS_REVISION_25MAY.md`.
- `public/data/catalog.json`: 110 fotos profesionales sin motivo, año, técnica, dimensiones. Falta sesión con Domingo.
- SVGs de `public/expo/`: cartel, marcapaginas, octavilla, slides usan motivos esquemáticos inventados antes de auditar el corpus real. La página de la expo NO los usa (cartel es placeholder ahora).

---

## 7 · Lo que está cerrado · no volver a abrir

- ✓ Título + subtítulo + fechas + lugar.
- ✓ Datos del padre + DNI + dirección.
- ✓ Bio (3 versiones, canónica = 36 palabras).
- ✓ Identidad visual: paleta paleo + tipografía Cinzel+EB Garamond+Cormorant.
- ✓ Lista de 41 obras (numeración del cuaderno).
- ✓ Firma SVG T+X reproducida.
- ✓ Web pública desplegada y operativa.
- ✓ Recolecciones (85 fotos) eliminadas de la galería de setas.
- ✓ Piezas «2_OTRAS» (10) eliminadas del catalog.
- ✓ Mensaje WhatsApp para Eden redactado.
- ✓ Lámina A4 firmada con las 41 obras.

---

## 8 · Lo que está en curso · bloqueado por terceros

| Bloqueo | Quién | Qué hacer cuando se desbloquee |
|---------|-------|-------------------------------|
| Veriff Porkbun | Pelayo / Porkbun | Configurar 5 DNS records · yo despliego con CNAME |
| Cartel definitivo | Pelayo lo dará | Sustituir placeholder en `page.tsx` |
| Workflow `.github/workflows/deploy.yml` | Pelayo (token con scope workflow) | Push manual para auto-deploy de futuros commits |

---

## 9 · Lo que queda por hacer · orden sugerido

### Bloque A · cuando Pelayo pase fotos de las 41 piezas

1. Recibir foto + precio + descripción de cada pieza.
2. Estructurar en `public/data/exposicion-v2.json` (nuevo, no pisar el viejo).
3. Modificar `src/app/exposicion/la-esquina-del-peso/page.tsx` para leer el JSON nuevo.
4. Generar **galería real de 41 piezas** en la web (en lugar del placeholder actual).
5. Re-generar `RELACION_OBRAS_LAMINA.html` con miniaturas de cada pieza.

### Bloque B · una vez Pelayo confirme cartel definitivo

1. Sustituir el placeholder por la imagen real en `page.tsx`.
2. Actualizar el cartel en `public/expo/cartel.svg` o `.png`.

### Bloque C · imprenta y marcapáginas

1. Verificar 4 marcapáginas temáticos (Venus, F-C, cierva trilineal, UNESCO).
2. Generar PDFs de cartel + marcapáginas + octavilla con Edge headless (Pelayo no tiene Inkscape).
3. Email a 3 imprentas con `EMAIL_IMPRENTA.md`.

### Bloque D · comunicación

1. Enviar nota de prensa (`NOTA_PRENSA.md`) a LNE, El Comercio, Asturies24, RTPA Pieces.
2. DM Alba Vázquez (`EMAIL_ALBA_VAZQUEZ.md`).
3. Programar posts en Bluesky (W-3 → W+1) con `CALENDARIO_PUBLICACION.md`.

### Bloque E · día D y desmontaje

- Vie 19 jun 19:30 inauguración.
- Mar 30 jun cierre.
- 7 días naturales para desmontaje.

---

## 10 · Anticipación · errores y trampas que evitar

**Esto es lo que más fácilmente puede salir mal en la próxima sesión.** Léelo despacio.

### Trampa 1 · Confundir los dos repos

`paleotxomi` ≠ `domingo-archivo`. Si Pelayo dice «sube esto a la web», pregúntale primero CUÁL de las dos. La de la expo es siempre `paleotxomi`.

### Trampa 2 · Tocar el dominio paleotxomi.com prematuramente

El `basePath: "/paleotxomi"` y la ausencia de CNAME son INTENCIONALES hasta que Pelayo confirme:
1. Veriff Porkbun aprobado.
2. DNS records guardados.

Si la próxima sesión hace `git push` con CNAME pero sin DNS, la web pública se rompe (GitHub Pages redirige a un dominio que no resuelve).

### Trampa 3 · `pieza-NN.jpg` están mal mapeadas

Las 23 fotos de `public/personal/piezas/` y el JSON `exposicion.json` tienen los motivos cruzados. La «cierva de Lluera» #17 es realmente una Venus. La #21, 22, 23 no son grabados sino propulsores. **No usar como fuente.** Las fotos buenas son `sesion-amanda-2026/` (10 fotos) y `public/images/web/1_ESCULTURAS/` (catalog Amanda Blanco, 110 fotos).

### Trampa 4 · El workflow `.github/workflows/deploy.yml`

El token de Claude no tiene scope `workflow`. **Cualquier commit que incluya `.github/` será rechazado en el push** con error `remote rejected · refusing to allow an OAuth App to create or update workflow`. Patrón estándar para arreglarlo:

```bash
git rm --cached -r .github
git commit --amend --no-edit
git push origin main
```

Pelayo puede subir el workflow él mismo con sus credenciales completas.

### Trampa 5 · Edge headless con saltos de línea en bash

El comando de Edge para generar PDFs es muy sensible a saltos de línea y al concatenado con `&&`. Si falla, ejecutar Edge en una línea y `ls` en otra después. Patrón probado:

```bash
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=15000 --print-to-pdf="ABSOLUTE\PATH.pdf" "file:///ABSOLUTE/PATH.html"
```

### Trampa 6 · Numeración de las obras

Los huecos en 1→48 son intencionales. La numeración es la del cuaderno del autor. **No renumerar a 1-41** sin pedir permiso. Si lo pides para el contrato, mantener el «#N original» como ID interno.

### Trampa 7 · La firma del autor

La firma es **T+X en cinabrio sobre arenisca**, no una T sola ni un signo aleatorio. Reproducida en SVG inline en `RELACION_OBRAS_LAMINA.html`. Para reutilizarla, copia el bloque `<svg class="firma-stamp">` entero (incluye gradiente y filtros). Pelayo dijo que ese es el sello que su padre usa como membrete.

---

## 11 · Estilo y forma de trabajar con Pelayo

- **Idioma:** español de España con ortotipografía completa (tildes, ñ, ¿?, ¡!, «», coma decimal).
- **Reglas vinculantes:** `D:\Antigravity\memory\writing_rules.md`. Sin vocabulario IA, sin reframe, sin analogías por defecto.
- **Sin emojis** salvo que pida.
- **Sobrio, directo.** Pelayo lee rápido y odia el adorno.
- **Pregunta antes de actuar** si la decisión es ambigua, salvo que diga «paralelize/ejecuta ya».
- **Foto a foto** cuando hay corpus visual: abre, describe, decide. No asumas.
- **Mensajes cortos con erratas** son normales («ds maximo» = «dos máximo»). Si no encaja, pregunta.
- **Cadencia rápida:** Pelayo pide cambios cada pocos mensajes. Aplica lo mínimo necesario, no sobre-implementes.

---

## 12 · Arsenal · skills y MCPs aplicables

Versión completa en la sesión anterior. Aplicables ahora mismo:

- **Ilustración paleolítica:** `generate-image`, `scientific-schematics`, `sci-gemini-prompt`, `imagen`, `fal-generate`.
- **Maquetación editorial:** `anthropic-skills:pdf`, `docx`, `pptx`, `latex-posters`, `landing-page-generator`.
- **Diseño:** `design:design-system`, `design:design-critique`, `canvas-design`.
- **Investigación:** `perplexity-search`, `wiki-researcher`, `openalex-database`.
- **Prosa:** `writing-rules` (obligatoria), `beautiful-prose`, `professional-proofreader`, `avoid-ai-writing`.
- **MCPs:** `Claude_in_Chrome`, `Claude_Preview`, `pdf-viewer:*`, `agentmail`, `gmail-automation`.

Recetas de prompt paleo y ejemplos en la versión anterior de este handoff (v1.1 del 28 may, git log si hace falta recuperar).

---

## 13 · Receta de prompt para imagen paleo (probada)

```
Trazo blanco grueso sobre piedra rugosa ocre con manchas de óxido,
estilo grabado paleolítico magdaleniense, motivo: [cierva con tres
líneas paralelas en el cuerpo / bisonte de Altamira / mano negativa
pulverizada con ocre / signo tectiforme del Buxu]. Sin texto, sin
marco, fondo de roca natural con vetas. Iluminación raseante de
aceite. Estética Lascaux.
```

Variante para Venus gravetienses:

```
Pequeña figurilla femenina paleolítica tallada en piedra caliza,
estilo gravetiense, senos voluminosos, vientre prominente, cabeza
pequeña sin rasgos, base estrecha, fondo neutro crema. Inspirada
en Venus de [Willendorf / Laussel con cuerno / Lespugue /
Brassempouy].
```

---

## 14 · Próxima acción concreta

Cuando arranques:

1. **Saluda corto.** Confirma que has leído este handoff entero.
2. **Verifica el working dir** (`D:\Antigravity\paleotxomi\`) y el repo remoto (`biopelayo/paleotxomi`).
3. **Verifica el estado del deploy actual**: `curl -sI https://biopelayo.github.io/paleotxomi/exposicion/la-esquina-del-peso/`. Debe responder `HTTP/2 200`.
4. **Pregunta a Pelayo** una de estas dos cosas:
   - **a.** «¿Ya pasó la verificación de Veriff en Porkbun? Si sí, te paso los DNS records y desplegamos en paleotxomi.com.»
   - **b.** «¿Quieres que avancemos con la galería de fotos de las 41 piezas (pásamelas), con el cartel definitivo, o con los marcapáginas/octavilla para imprenta?»
5. **Trabaja siempre en `paleotxomi`**, no en `domingo-archivo`.
6. **Build + deploy gh-pages** al cerrar cada bloque (no acumular cambios sin desplegar).

---

## 15 · Cierre de esta sesión

**Sesión cerrada el 1 jun 2026 mediodía.** Versión del handoff: **v2 · post-paleotxomi**.

Hitos de esta sesión:
- Repo `paleotxomi` creado, desplegado y operativo.
- Dominio `paleotxomi.com` comprado en Porkbun (verificación en curso).
- Título PALEOTXOMI + subtítulo «Ciervas, Venus y grabados» aplicados.
- Fechas actualizadas a 19-30 jun (inauguración vie 19).
- Lista de 41 obras OCR del cuaderno cerrada.
- Lámina A4 firmada generada con T+X del autor.
- Mensaje WhatsApp para Eden listo.

**El siguiente paso natural es la galería de fotos de las 41 piezas + activar paleotxomi.com cuando Veriff apruebe.**

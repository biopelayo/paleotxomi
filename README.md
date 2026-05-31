# PaleoTxomi

**Archivo público de Domingo González de Lena Díaz** (Pajares, Lena, Asturias, 1959). Arte Paleolítico parietal y Venus gravetienses talladas en piedra a mano.

🌐 **Web:** <https://biopelayo.github.io/paleotxomi/>
📨 **Contacto del autor:** 662 58 57 98 · domingodelena@gmail.com

---

## Qué es esto

Versión pública y reducida del archivo personal de Domingo, enfocada solo en su obra escultórica:

- **Reproducciones en piedra** de grabados paleolíticos de las cuevas asturianas (Pindal, Tito Bustillo, Les Pedroses, Buxu, Llonín, Lluera, Candamo).
- **Figurillas gravetienses** en bulto redondo: Venus de Willendorf, Laussel, Lespugue, Brassempouy y otras piezas singulares.

El sitio es un Next.js exportado como estático y servido por GitHub Pages bajo el subpath `/paleotxomi`.

## Exposición en curso

**La Esquina del Peso** · Calle del Peso 1, Oviedo · 20-30 junio 2026.
Inauguración pública: sábado 20 jun, 19:30.

Detalle en [`/exposicion/la-esquina-del-peso/`](https://biopelayo.github.io/paleotxomi/exposicion/la-esquina-del-peso/).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera out/
```

## Deploy

GitHub Pages desde la rama `gh-pages`. Para publicar cambios:

```bash
npm run build
git worktree add ../paleotxomi-gh-pages gh-pages
# limpiar y copiar out/ al worktree
cd ../paleotxomi-gh-pages
git add -A && git commit -m "deploy" && git push origin gh-pages
```

## Identidad visual

Paleta y tipografía paleolítica documentadas en `paleo.css`:

- **Crema papel** `#f0e5cc` — fondo.
- **Carbón** `#1e1408` — texto.
- **Ocre rojo** `#8b2c1a` — acentos.
- **Tierra** `#6b3d1c` — secundario.
- **Ocre amarillo** `#c0a87a` — terciario.
- Tipografía: **Cinzel** + **EB Garamond** + **Cormorant Garamond**.

## Repositorio hermano

[`biopelayo/domingo-archivo`](https://github.com/biopelayo/domingo-archivo) contiene el archivo personal completo (micología, videos, escritos, biografía). PaleoTxomi se desgaja como rama reducida pública dedicada al trabajo paleolítico.

---

PaleoTxomi nace en mayo de 2026 como rama pública del archivo personal, dedicada al trabajo paleolítico del autor.

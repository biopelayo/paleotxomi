# Generación de PDFs para imprenta

**Fecha:** lunes 25 may 2026 (actualizado 28 may 2026 con método Edge).
**Estado:** ✓ resuelto · **Microsoft Edge headless funciona donde Chrome falla**.

---

## Método operativo descubierto · Edge headless

Probado el 28 may. Convierte HTML autocontenido (con CSS embebido) a PDF sin instalación adicional. Generó los 3 PDFs del paquete para Eden (`PAQUETE_PADRE_EDEN.pdf`, `ONE_PAGE_EXPO.pdf`, `QUE_HEMOS_HECHO.pdf`) con estética paleolítica completa.

```bash
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="ruta\salida.pdf" \
  "file:///D:/.../entrada.html"
```

Para SVG: convertir primero SVG → HTML autocontenido y luego HTML → PDF con Edge. Pandoc se encarga del primer paso.

---

---

## Por qué no se generan automáticamente

Probado el 25 may, ninguna herramienta disponible localmente convierte SVG a PDF sin instalación adicional:

| Herramienta | Disponibilidad | Genera PDF |
|-------------|----------------|------------|
| `sharp` (devDep del proyecto) | ✓ instalado | ✗ no soporta PDF como output (solo JPEG/PNG/WebP/TIFF/GIF/AVIF) |
| `rsvg-convert` (librsvg) | ✗ no instalado | — |
| Inkscape | ✗ no instalado | sería la opción correcta |
| Chrome headless (`--print-to-pdf`) | ✓ Chrome instalado en `C:\Program Files (x86)\Google\Chrome\Application\chrome.exe` | ✗ falla silenciosamente en este equipo (problemas de elevación / sesión activa) |

---

## Opciones para Pelayo (ordenadas por recomendación)

### Opción 1 · Dejar que la imprenta genere los PDFs · ⭐ recomendada

Las imprentas profesionales (Mercantil, Asturiana) **generan sus propios PDF/X-1a** desde SVG vectorial limpio. Es lo natural: conocen sus máquinas, su perfil de color, sus exigencias de sangrado, y prefieren controlar la conversión.

**Acción:** en el email a las imprentas, adjuntar **SVG + PNG 300 DPI**. Decirles literalmente: «Disponemos también de los SVG originales por si necesitáis vectorial» (texto ya incluido en [EMAIL_IMPRENTA.md](EMAIL_IMPRENTA.md)).

Ventaja: cero trabajo nuestro, mejor resultado profesional.
Desventaja: ninguna real, salvo que una imprenta exija PDF/X-1a entregado.

### Opción 2 · Instalar Inkscape (5 min) y generar localmente

[Inkscape](https://inkscape.org/release/) es gratuito y de código abierto. Compatible con PDF/X-1a, perfil CMYK y sangrado profesional.

**Instalación:**

1. Descargar el instalador Windows 64-bit de inkscape.org (~120 MB).
2. Instalar con opciones por defecto.
3. Asegurarse de que `inkscape.com` queda en `C:\Program Files\Inkscape\bin\`.

**Generación (PowerShell desde la raíz del repo):**

```powershell
$inkscape = "C:\Program Files\Inkscape\bin\inkscape.com"
$svgs = @(
  "cartel",
  "pasapaginas",
  "octavilla",
  "marcapaginas-1-venus-gravetienses",
  "marcapaginas-2-arte-franco-cantabrico",
  "marcapaginas-3-cierva-trilineal",
  "marcapaginas-4-cuevas-unesco-asturias"
)
foreach ($s in $svgs) {
  $svgPath = "public\expo\$s.svg"
  $pdfPath = "public\expo\$s.pdf"
  & $inkscape $svgPath "--export-filename=$pdfPath" --export-pdf-version=1.5 --export-text-to-path
  Write-Host "OK $s -> $pdfPath"
}
```

Comprobar resultado: `ls public/expo/*.pdf` debe listar 7 archivos.

### Opción 3 · Abrir cada SVG en el navegador e imprimir a PDF · 5 min

Para los 7 archivos:

1. Abrir el SVG en Chrome: `D:\Antigravity\proyecto-domingo-web\public\expo\cartel.svg`.
2. `Ctrl+P` → Destino: «Guardar como PDF» → Tamaño de papel: personalizado según la tabla siguiente → Márgenes: ninguno → Guardar.

| Archivo | Tamaño de papel |
|---------|-----------------|
| cartel.svg | A2 horizontal (594×420 mm) |
| pasapaginas.svg | 50×200 mm |
| octavilla.svg | A6 vertical (105×148 mm) |
| marcapaginas-N.svg | 50×200 mm |

Desventaja: 7 archivos manuales. PDFs sin perfil CMYK ni sangrado.

### Opción 4 · WSL + rsvg-convert · si ya tienes WSL

```bash
sudo apt install librsvg2-bin
cd /mnt/d/Antigravity/proyecto-domingo-web
for f in public/expo/{cartel,pasapaginas,octavilla,marcapaginas-1-venus-gravetienses,marcapaginas-2-arte-franco-cantabrico,marcapaginas-3-cierva-trilineal,marcapaginas-4-cuevas-unesco-asturias}.svg; do
  rsvg-convert -f pdf -o "${f%.svg}.pdf" "$f"
done
```

Solo viable si Pelayo tiene WSL ya configurado.

---

## Recomendación final

**Opción 1.** Enviar a las imprentas con SVG + PNG, que cada una genere sus propios PDFs profesionales. Si una imprenta exige PDF/X-1a entregado, en 10 minutos se instala Inkscape y se ejecuta la opción 2.

## Checklist antes de enviar a imprenta

- [ ] Marcapáginas 1 corregido: Hohle Fels → Brassempouy (ver [MARCAPAGINAS_REVISION.md](MARCAPAGINAS_REVISION.md)).
- [ ] PNG regenerados tras correcciones: `node scripts/svg-to-png.mjs`.
- [ ] (Opcional) PDFs generados: opción 2 o 3 si la imprenta los exige.
- [ ] Cartel revisado en pantalla a tamaño A2 (594×420 mm).
- [ ] Tirada definitiva confirmada según aforo real del local.
- [ ] QR del cartel apuntando a `paleotxomi.com/exposicion/la-esquina-del-peso` (decidir si se añade).

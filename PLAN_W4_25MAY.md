# Plan W-4 · 25-31 mayo 2026
## Exposición Domingo González de Lena · La Esquina del Peso

**Hoy:** lunes 25 may 2026 (10:15 GMT+2).
**Inauguración pública estimada (opción A):** sábado 20 jun 2026 a las 19:30. Decisión pendiente.
**Cierre estimado:** martes 30 jun 2026.

Ver [INFORME_AUDIT_25MAY.md](INFORME_AUDIT_25MAY.md) §1 para el hallazgo crítico sobre el día de la semana que motiva esta rectificación.

---

## CRÍTICO · esta semana (sin esto, todo lo demás se bloquea)

| # | Acción | Responsable | Plazo | Bloquea |
|---|--------|-------------|-------|---------|
| 1 | Llamar a regencia La Esquina del Peso al **685 660 938**. Cerrar: fecha real (¿sáb 20 jun?), autorización privada víspera, capacidad 24 piezas + ~30 invitados, restricciones de cuelgue (peso, tornillos), coste vino/picoteo. | Pelayo | mar 26 may | TODO |
| 2 | Decidir opción A/B/C de fecha con la regencia. Comunicar a Claude. | Pelayo | mar 26 may | impresión, web, emails, redes |
| 3 | Aplicar tanda de Edits «fechas reales» a los 11 docs y a los 2 componentes web. | Claude | mié 27 may | impresión, envíos |
| 4 | Pasar lista de 24 piezas a Domingo y pedir: año, técnica, peso, motivo y dimensiones #8, dimensiones Venus. | Pelayo | mié 27 may | fichas, contrato |

## IMPORTANTE · esta semana

| # | Acción | Responsable | Plazo | Bloquea |
|---|--------|-------------|-------|---------|
| 5 | Verificar a mano los 4 marcapáginas temáticos (Gravetiense 33.000-22.000 AP, UNESCO 310 ampliación 2008, etimología trilineal, etc.). Apuntes en EXPO_INDICE.md §7. | Pelayo / Domingo | jue 29 may | imprenta marcapáginas |
| 6 | Generar PDFs de los SVG para imprenta (Inkscape o `rsvg-convert -f pdf`). 7 archivos: cartel, pasapaginas, octavilla, marcapaginas-1..4. | Claude / Pelayo | jue 29 may | envío imprenta |
| 7 | Actualizar `messages/es.json` (25→23, 8→7 en 3 sitios: meta.description L4, exposicion.subtitle L44, venusBody L49). | Pelayo | jue 29 may | SEO |
| 8 | Decidir si Pelayo publica su móvil como contacto en docs o sólo email. Sustituir `[móvil]` en 5 docs. | Pelayo | jue 29 may | envíos prensa |
| 9 | Documentar en EXPO_INDICE.md §4 los 8 activos huérfanos en disco (mockup-escaparate + 7 slides) o decidir borrarlos. | Claude | mié 27 may | nada (limpieza) |

## OPCIONAL · esta semana (W-4 teaser)

| # | Acción | Responsable | Plazo |
|---|--------|-------------|-------|
| 10 | Hacer foto del taller de Domingo trabajando la piedra. | Pelayo / Domingo | vie 29 may |
| 11 | Si hay foto: teaser IG + Bluesky el viernes 29 may a las 12:00. Texto: «Estoy preparando algo en el taller. Pronto, en Oviedo.» | Pelayo | vie 29 may |

## A DESBLOQUEAR (espera respuesta externa, no es acción nuestra)

- Regencia → fechas + capacidad + privada + restricciones cuelgue + coste cóctel.
- Domingo → datos pieza por pieza.
- Alba Vázquez (Onda Cero) → se contacta en W-3 (mié 3 jun).
- *Pieces* RTPA → se contacta en W-3 (jue 4 jun).
- Imprenta → 2-3 presupuestos comparados W-3.

---

## Verificación crítica (hecha 25 may)

```
25-may-2026: lunes
24-may-2026: domingo  (CALENDARIO decía "sábado 24" → falso)
20-jun-2026: sábado   ← inauguración pública recomendada
21-jun-2026: domingo  (todos los docs decían "sábado 21" → falso)
27-jun-2026: sábado   (alternativa, sólo 3 días de expo, mal encaje)
30-jun-2026: martes   (cierre estimado, sin cambio)
```

---

## Calendario rectificado (opción A · recomendada)

| Semana | Día | Hora | Acción |
|--------|-----|------|--------|
| W-4 | vie 29 may | 12:00 | Teaser opcional (foto taller) |
| W-3 | mar 2 jun | 18:00 | **Anuncio principal** · carrusel IG + Bluesky + FB |
| W-3 | mié 3 jun | mañana | DM Alba Vázquez (LinkedIn + X) |
| W-3 | jue 4 jun | 09:00 | Email *Pieces* RTPA + nota prensa a LNE, Comercio, Asturies24 |
| W-3 | jue 4 jun | 12:00 | Envío a imprenta tras comparar 2-3 presupuestos |
| W-2 | mié 10 jun | 12:00 | Avance pieza estrella (Venus o cierva Lluera) |
| W-1 | vie 19 jun | 19:00 | Recordatorio víspera |
| Día -1 | **vie 19 jun** | 19:30-21:30 | **Inauguración privada** (familia, amigos, Alba Vázquez) |
| **Día D** | **sáb 20 jun** | **19:30** | **Inauguración pública** |
| Día +1 | dom 21 jun | 12:00 | Agradecimiento + 3-6 fotos en redes |
| Durante | mié 24 jun | 12:00 | Post de mantenimiento (una pieza + historia) |
| Durante | sáb 28 jun | 12:00 | Recordatorio cierre |
| Cierre | mar 30 jun | — | Fin de exposición · desmontaje en plazo de 7 días naturales |

Si se elige opción B (aceptar domingo 21): todas las fechas se mueven +1 día respecto a esta tabla.

---

## Próxima sesión

Cuando Pelayo cierre con la regencia (martes 26 may), Claude:

1. Aplica tanda de Edits «fechas reales» en una sola pasada coherente.
2. Genera los 7 PDFs.
3. Actualiza EXPO_INDICE.md a v5 con activos huérfanos documentados y nueva línea de tiempo.
4. Deja todo listo para que Pelayo lance redes el martes 2 jun.

"""
Cruza precios.json con catalog.json para identificar piezas vendibles
y generar encargos_destacados.json para el funnel /encargos.

Solo lectura sobre los JSON existentes. No modifica fuentes.
"""
import json
from pathlib import Path

base = Path(r'D:/Antigravity/proyecto-domingo-web/public/data')
precios = json.loads((base / 'precios.json').read_text(encoding='utf-8'))
catalog = json.loads((base / 'catalog.json').read_text(encoding='utf-8'))

leyenda = precios.get('leyenda_referencias', {})


def parse_ref(ref):
    """Extrae prefijo de letras y numero. S1 -> (S, 1), BO7 -> (BO, 7)."""
    i = 0
    while i < len(ref) and ref[i].isalpha():
        i += 1
    return ref[:i], int(ref[i:])


def has_photo(d):
    return bool(d.get('archivo_master', '').strip()) and bool(d.get('thumb', '').strip())


def is_ficha_completa(d):
    descr_keys = ['titulo_es', 'motivo', 'notas_curatoriales']
    dim_keys = ['alto_cm', 'ancho_cm', 'fondo_cm']
    mat_keys = ['material', 'tecnica_original']
    has_descr = any(str(d.get(k, '')).strip() for k in descr_keys)
    has_dim = any(str(d.get(k, '')).strip() for k in dim_keys)
    has_mat = any(str(d.get(k, '')).strip() for k in mat_keys)
    return has_descr and has_dim and has_mat


# Piezas escultura, ordenadas por id_pieza
escultras = sorted(
    (d for d in catalog if d.get('seccion') == '1_ESCULTURAS'),
    key=lambda d: d.get('id_pieza', '')
)
precio_items = precios['piezas']

matched = []
unmatched_precios = []
unmatched_catalog_ids = set(d['id_pieza'] for d in catalog)

for item in precio_items:
    ref = item['ref']
    precio = item['precio']
    prefijo, num = parse_ref(ref)
    tipo = leyenda.get(prefijo, 'desconocido')
    pos = num - 1
    if pos < len(escultras):
        pieza = escultras[pos]
        match_entry = {
            'ref_precio': ref,
            'precio_eur': precio,
            'tipo_pieza': tipo,
            'id_pieza_catalog': pieza.get('id_pieza'),
            'slug': pieza.get('slug') or None,
            'archivo_master': pieza.get('archivo_master') or None,
            'thumb': pieza.get('thumb') or None,
            'web': pieza.get('web') or None,
            'tiene_foto': has_photo(pieza),
            'ficha_completa': is_ficha_completa(pieza),
            'titulo_es': pieza.get('titulo_es') or None,
            'motivo': pieza.get('motivo') or None,
            'material': pieza.get('material') or None,
            'alto_cm': pieza.get('alto_cm') or None,
            'ancho_cm': pieza.get('ancho_cm') or None,
            'fondo_cm': pieza.get('fondo_cm') or None,
            'metodo_match': 'posicional_secuencial',
            'confianza_match': 'media: precios.json no tiene slug; catalog.json tiene los campos descriptivos vacios. Mapeo asumido por orden secuencial.'
        }
        matched.append(match_entry)
        unmatched_catalog_ids.discard(pieza['id_pieza'])
    else:
        unmatched_precios.append({
            'ref': ref,
            'precio_eur': precio,
            'razon': 'sin pieza correspondiente en catalog (indice fuera de rango)'
        })

unmatched_catalog = [
    {
        'id_pieza': d['id_pieza'],
        'seccion': d.get('seccion'),
        'archivo_master': d.get('archivo_master'),
        'razon': 'sin entrada en precios.json'
    }
    for d in catalog if d['id_pieza'] in unmatched_catalog_ids
]

# Destacados: idealmente foto + ficha completa + precio razonable.
# Como ninguna pieza tiene ficha completa, relajamos: foto + precio 15-50 EUR.
candidatos_con_foto = [m for m in matched if m['tiene_foto']]
candidatos_con_ficha = [m for m in candidatos_con_foto if m['ficha_completa']]
candidatos_parciales = [m for m in candidatos_con_foto if not m['ficha_completa']]
candidatos_parciales.sort(key=lambda m: (m['precio_eur'], m['ref_precio']))

filtrados = [m for m in candidatos_parciales if 15 <= m['precio_eur'] <= 50]
top15 = filtrados[:15]

destacados = []
for m in top15:
    dim = None
    if m['alto_cm'] or m['ancho_cm'] or m['fondo_cm']:
        dim = f"{m['alto_cm'] or '?'}x{m['ancho_cm'] or '?'}x{m['fondo_cm'] or '?'} cm"
    destacados.append({
        'slug': m['slug'],
        'id_pieza_catalog': m['id_pieza_catalog'],
        'ref_precio': m['ref_precio'],
        'nombre': m['titulo_es'],
        'tipo_pieza': m['tipo_pieza'],
        'precio_eur': m['precio_eur'],
        'foto_principal': m['web'],
        'thumb': m['thumb'],
        'descripcion_corta': m['motivo'],
        'dimensiones': dim,
        'materiales': m['material'],
        'razon_destacado': (
            f"precio accesible ({m['precio_eur']} EUR) + foto disponible. "
            "Ficha del catalogo aun sin curar: titulo, motivo, dimensiones y material vacios."
        )
    })

piezas_sin_precio = [u['id_pieza'] for u in unmatched_catalog]
piezas_sin_foto = [d['id_pieza'] for d in catalog if not has_photo(d)]
precios_sin_pieza = [u['ref'] for u in unmatched_precios]
piezas_con_precio_sin_ficha = [m['id_pieza_catalog'] for m in matched if not m['ficha_completa']]

salida = {
    'actualizado': '2026-05-09',
    'fuente_precios': 'public/data/precios.json',
    'fuente_catalog': 'public/data/catalog.json',
    'total_precios': len(precio_items),
    'total_catalog': len(catalog),
    'metodo_cruce': {
        'descripcion': (
            'Heuristica posicional secuencial. precios.json no tiene slug ni id_pieza, '
            'solo refs alfanumericas (S1, BO7, TU32). catalog.json tiene id_pieza '
            'DOM-ESC-NNN pero los campos descriptivos (slug, titulo_es, motivo, material, '
            'dimensiones) estan todos vacios. Asumimos que el orden de las 52 piezas de '
            'precios.json corresponde al orden de DOM-ESC-001..DOM-ESC-052 en catalog.json. '
            'Confianza: media. Verificacion pendiente con Domingo o con el doc original '
            '"Precios piedras.docx".'
        ),
        'heuristicas_descartadas': [
            'match por slug: imposible, ningun slug poblado en catalog',
            'match por codigo embebido en titulo: imposible, ningun titulo poblado',
            'match por motivo y leyenda (S=soporte plano, B=bisonte, etc.): imposible, ningun motivo poblado en catalog'
        ],
        'recomendacion': (
            'Cuando se pueble catalog.json con motivo, material y dimensiones, repetir el '
            'cruce y validar el matching posicional contra los prefijos de precios.json '
            '(S, B, P, C, BO, T, F, TU, G).'
        )
    },
    'matched': matched,
    'matched_count': len(matched),
    'matched_con_ficha_completa': len(candidatos_con_ficha),
    'matched_con_foto_sin_ficha': len(candidatos_parciales),
    'unmatched_precios': unmatched_precios,
    'unmatched_catalog': unmatched_catalog,
    'destacados': destacados,
    'destacados_nota': (
        'Como ninguna pieza del catalogo tiene ficha completa (titulo, motivo, dimensiones, '
        'material todos vacios), los 15 destacados se han seleccionado con dos criterios: '
        'foto disponible + precio en rango accesible (15-50 EUR). El tercer criterio '
        '(ficha completa) se aplicara cuando se pueble catalog.json. Estas 15 piezas son '
        'por tanto candidatas provisionales y necesitan curacion antes del lanzamiento del '
        'funnel /encargos.'
    ),
    'huecos': {
        'precios_sin_pieza': precios_sin_pieza,
        'piezas_sin_precio': piezas_sin_precio,
        'piezas_sin_foto': piezas_sin_foto,
        'piezas_con_precio_pero_sin_ficha_curada': piezas_con_precio_sin_ficha,
        'observacion': (
            f"{len(piezas_con_precio_sin_ficha)} de las 52 piezas con precio carecen de "
            "ficha curada. Antes de abrir el funnel /encargos hay que poblar catalog.json "
            "con titulo, motivo, dimensiones y material."
        )
    }
}

out_path = base / 'encargos_destacados.json'
out_path.write_text(json.dumps(salida, ensure_ascii=False, indent=2), encoding='utf-8')

print(f'Escrito: {out_path}')
print(f'Tamano: {out_path.stat().st_size} bytes')
print()
print('--- Resumen ---')
print(f'Total precios: {salida["total_precios"]}')
print(f'Total catalog: {salida["total_catalog"]}')
print(f'Matched: {salida["matched_count"]}')
print(f'  con ficha completa: {salida["matched_con_ficha_completa"]}')
print(f'  con foto pero sin ficha: {salida["matched_con_foto_sin_ficha"]}')
print(f'Unmatched precios: {len(salida["unmatched_precios"])}')
print(f'Unmatched catalog (sin precio): {len(salida["unmatched_catalog"])}')
print(f'Piezas sin foto: {len(salida["huecos"]["piezas_sin_foto"])}')
print(f'Destacados: {len(salida["destacados"])}')
print()
print('Top 15 destacados (id_pieza | ref | precio | tipo):')
for d in salida['destacados']:
    nombre = d['id_pieza_catalog'] or '-'
    ref = d['ref_precio']
    precio = d['precio_eur']
    tipo = d['tipo_pieza']
    print(f"  {nombre:14s} | {ref:5s} | {precio:>3} EUR | {tipo}")

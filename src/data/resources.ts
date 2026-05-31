export type ResourceLink = {
  title: string;
  href: string;
  description: string;
  /** texto pequeño para citar la fuente (ej. "Principado de Asturias") */
  source?: string;
};

export type ResourceCategory = {
  id: string;
  i18nKey: string;
  links: ResourceLink[];
};

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: "primary",
    i18nKey: "primary",
    links: [
      {
        title: "Cueva de la Lluera (San Juan de Priorio, Oviedo)",
        href: "https://yacimientos.asturias.es/cueva-de-la-lluera",
        description: "Yacimiento del Nalón ovetense con arte exterior paleolítico. Ficha oficial del Principado.",
        source: "Yacimientos · Principado de Asturias",
      },
      {
        title: "La Viña (Manzaneda, Oviedo)",
        href: "https://artepaleoliticoenasturias.com/2020/08/01/la-vina/",
        description: "Secuencia amplia del Paleolítico Superior asturiano con fase figurativa (cierva, caballo, bovino).",
        source: "Arte paleolítico en Asturias",
      },
      {
        title: "Cueva de Altamira y arte rupestre paleolítico del norte de España",
        href: "https://whc.unesco.org/en/list/310",
        description: "Bien UNESCO 310 (1985, ampliación 2008). Asturias contribuye con cinco cuevas.",
        source: "UNESCO World Heritage Centre",
      },
      {
        title: "Patrimonio de la Humanidad en Asturias",
        href: "https://www.turismoasturias.es/cultura/patrimonio-humanidad",
        description: "Tito Bustillo, Candamo, El Pindal, Llonín y Covaciella en una página resumen.",
        source: "Turismo Asturias",
      },
      {
        title: "Centro de Arte Rupestre Tito Bustillo",
        href: "https://www.centrodeartetitobustillo.com/",
        description: "Centro de interpretación oficial. Visitas, reservas y contenido educativo.",
      },
      {
        title: "Consejería de Cultura, Política Llingüística y Deporte",
        href: "https://transparencia.asturias.es/consejerias/cultura-politica-llinguistica-deporte",
        description: "Competente en protección, investigación y difusión del patrimonio asturiano.",
        source: "Portal de Transparencia · Principado de Asturias",
      },
      {
        title: "Consejo de Patrimonio Cultural de Asturias",
        href: "https://transparencia.asturias.es/-/organos-colegiados/consejeria-cultura/consejo-patrimonio-cultural",
        description: "Órgano asesor para protección, investigación, fomento y difusión del patrimonio cultural.",
      },
      {
        title: "ICOMOS internacional",
        href: "https://www.icomos.org/",
        description: "Consejo Internacional de Monumentos y Sitios. Doctrina, cartas y estándares de conservación.",
      },
    ],
  },
  {
    id: "europeanArchives",
    i18nKey: "europeanArchives",
    links: [
      {
        title: "Europeana",
        href: "https://www.europeana.eu/",
        description: "Agregador europeo de patrimonio cultural digital. Destino del archivo Trilineal vía EDM.",
      },
      {
        title: "Europeana Data Model · documentación",
        href: "https://pro.europeana.eu/page/edm-documentation",
        description: "Especificación EDM para describir objetos culturales agregables a Europeana.",
      },
      {
        title: "Hispana",
        href: "https://hispana.mcu.es/",
        description: "Agregador estatal de archivos y bibliotecas digitales. Conecta los registros españoles con Europeana.",
        source: "Ministerio de Cultura",
      },
      {
        title: "CER.es · Colecciones en Red",
        href: "https://ceres.mcu.es/",
        description: "Catálogo unificado de colecciones de museos estatales españoles.",
        source: "Ministerio de Cultura",
      },
      {
        title: "OpenAlex",
        href: "https://openalex.org/",
        description: "Grafo abierto de publicaciones, autores e instituciones. Alimenta la sección de investigación.",
      },
    ],
  },
  {
    id: "standards",
    i18nKey: "standards",
    links: [
      {
        title: "IIIF Presentation API 3.0",
        href: "https://iiif.io/api/presentation/3.0/",
        description: "Estándar para describir manifiestos de objetos digitales. Plantilla de prueba en el proyecto.",
      },
      {
        title: "IIIF Image API 3.0",
        href: "https://iiif.io/api/image/3.0/",
        description: "Servicio de imagen interoperable. Servidores compatibles: Cantaloupe, IIPImage, serverless.",
      },
      {
        title: "Dublin Core Metadata Initiative",
        href: "https://www.dublincore.org/",
        description: "Vocabulario de metadatos descriptivos. Cada pieza del corpus se describe en Dublin Core.",
      },
      {
        title: "WCAG 2.2",
        href: "https://www.w3.org/TR/WCAG22/",
        description: "Web Content Accessibility Guidelines. Objetivo del sitio: nivel AA.",
        source: "W3C WAI",
      },
      {
        title: "Creative Commons BY-NC-SA 4.0",
        href: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
        description: "Licencia por defecto de las imágenes del proyecto. Sujeta a la cesión final.",
      },
    ],
  },
  {
    id: "ecoc",
    i18nKey: "ecoc",
    links: [
      {
        title: "Cuatro ciudades preseleccionadas para ECoC 2031 en España",
        href: "https://culture.ec.europa.eu/es/news/4-cities-shortlisted-for-the-european-capital-of-culture-2031-in-spain",
        description: "Cáceres, Granada, Las Palmas y Oviedo. Decisión final en diciembre de 2026.",
        source: "Comisión Europea · DG EAC",
      },
      {
        title: "BOE-A-2024-27264 · convocatoria ECoC 2031 España",
        href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-27264",
        description: "Orden CLT/1483/2024 del Ministerio de Cultura. Criterios oficiales y plazos.",
      },
      {
        title: "Decision (EU) 2017/864 · marco jurídico ECoC",
        href: "https://eur-lex.europa.eu/eli/dec/2017/864/oj",
        description: "Decisión del Parlamento Europeo y del Consejo que establece el programa para 2020-2033.",
      },
    ],
  },
  {
    id: "biblio",
    i18nKey: "biblio",
    links: [
      {
        title: "Rivero, O. (2014). Ciervas «trilineales» y caballos en «bec de canard»",
        href: "https://dialnet.unirioja.es/servlet/articulo?codigo=4924239",
        description: "Revisión morfotipológica del concepto «cierva trilineal». Munibe Antropologia-Arkeologia.",
      },
      {
        title: "Búsqueda Dialnet · arte paleolítico cantábrico",
        href: "https://dialnet.unirioja.es/servlet/listaarticulos?tipo_busqueda=MATERIAS&clave_busqueda=arte%20paleol%C3%ADtico%20cant%C3%A1brico",
        description: "Filtro temático sobre Dialnet para bibliografía en español del ámbito.",
      },
      {
        title: "Zotero · grupo público sobre arte paleolítico cantábrico",
        href: "https://www.zotero.org/search/?q=cantabrian+palaeolithic+art&type=group",
        description: "Grupos de Zotero relacionados. Útil para compartir bibliografía.",
      },
      {
        title: "Bibliografía completa del proyecto (BibTeX)",
        href: "/data/bibliografia.bib",
        description: "Archivo BibTeX exportable a Zotero, JabRef o BibDesk.",
        source: "Trilineal · este sitio",
      },
    ],
  },
  {
    id: "media",
    i18nKey: "media",
    links: [
      {
        title: "Carpeta de prensa · imágenes elegidas",
        href: "/galeria/corpus",
        description: "Selección de fotografías de Amanda C. Blanco. Crédito obligatorio en cada imagen.",
        source: "Trilineal · este sitio",
      },
      {
        title: "Logotipo y manual de uso",
        href: "/recursos/identidad",
        description: "Isotipo, imagotipo, favicon en SVG. Paleta y reglas de uso.",
        source: "Trilineal · este sitio",
      },
      {
        title: "Contacto editor científico",
        href: "mailto:domingodelena@gmail.com",
        description: "Para entrevistas, declaraciones, peticiones de imagen y datos.",
      },
    ],
  },
  {
    id: "datasets",
    i18nKey: "datasets",
    links: [
      {
        title: "catalog.json",
        href: "/data/catalog.json",
        description: "Catálogo de las 120 piezas del corpus, 27 columnas, en JSON. Bajo CC BY 4.0.",
      },
      {
        title: "kpis.json",
        href: "/data/kpis.json",
        description: "15 indicadores del proyecto con línea base y objetivo a 12 meses.",
      },
      {
        title: "sites.geojson",
        href: "/data/sites.geojson",
        description: "GeoJSON con yacimientos del Nalón ovetense y cuevas UNESCO Asturias.",
      },
    ],
  },
];

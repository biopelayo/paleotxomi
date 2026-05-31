/**
 * OpenAlex API helper para la sección de investigación.
 *
 * https://docs.openalex.org/api-entities/works
 *
 * Conviene declarar un mailto en la cabecera (`User-Agent`) para entrar
 * en el "polite pool" y reducir latencia / rate-limit.
 */

const OPENALEX = "https://api.openalex.org";
const MAILTO = process.env.NEXT_PUBLIC_OPENALEX_MAILTO || "bio.pelayo@gmail.com";

const REVALIDATE = 60 * 60 * 24; // 24 h ISR

export type Authorship = {
  author: { id?: string; display_name?: string; orcid?: string | null };
  institutions?: { id?: string; display_name?: string; country_code?: string | null }[];
};

export type Work = {
  id: string;
  doi?: string | null;
  title?: string | null;
  display_name?: string | null;
  publication_year?: number | null;
  publication_date?: string | null;
  cited_by_count?: number;
  open_access?: { is_oa?: boolean; oa_status?: string; oa_url?: string | null };
  authorships?: Authorship[];
  primary_location?: { source?: { display_name?: string | null } | null };
  type?: string;
};

export type WorksResponse = {
  meta: {
    count: number;
    db_response_time_ms: number;
    page: number;
    per_page: number;
  };
  results: Work[];
  group_by?: { key: string; key_display_name?: string; count: number }[];
};

export type ResearchQuery = {
  id: string;
  label: string;
  search: string;
  description?: string;
};

export const RESEARCH_QUERIES: ResearchQuery[] = [
  {
    id: "cantabrian-paleolithic-art",
    label: "Arte paleolítico cantábrico",
    search: "(\"Cantabrian\" OR \"Asturias\") (\"Palaeolithic art\" OR \"Paleolithic art\" OR \"cave art\" OR \"rock art\")",
    description: "Investigación general sobre arte paleolítico en la región cantábrica.",
  },
  {
    id: "trilinear-hind",
    label: "Cierva trilineal · trilinear hind",
    search: "\"trilinear hind\" OR \"cierva trilineal\" OR \"trilineal hind\"",
    description: "Trabajos que usan el término o discuten su validez morfotipológica.",
  },
  {
    id: "nalon-sites",
    label: "Yacimientos del Nalón",
    search: "(\"La Lluera\" OR \"La Viña\" OR \"Cueva de la Viña\" OR \"Nalón valley\" OR \"Nalon valley\" OR \"valle del Nalón\") (\"Palaeolithic\" OR \"Paleolithic\" OR \"engraving\" OR \"rock art\")",
    description: "Foco geográfico del proyecto: Lluera, La Viña, Nalón ovetense.",
  },
  {
    id: "asturian-unesco-caves",
    label: "Cuevas UNESCO Asturias",
    search: "(\"Tito Bustillo\" OR \"Candamo\" OR \"El Pindal\" OR \"Llonín\" OR \"Covaciella\") (\"Palaeolithic\" OR \"Paleolithic\" OR \"cave art\")",
    description: "Las cinco cuevas asturianas del bien UNESCO.",
  },
  {
    id: "tactile-accessibility-heritage",
    label: "Accesibilidad táctil en patrimonio",
    search: "(\"tactile\" OR \"3D printing\" OR \"replicas\") (\"museum\" OR \"heritage\" OR \"accessibility\") (\"visual impairment\" OR \"blind\")",
    description: "Bibliografía aplicable al programa táctil del proyecto.",
  },
];

function url(path: string, params: Record<string, string | number | undefined>) {
  const u = new URL(`${OPENALEX}${path}`);
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    u.searchParams.set(k, String(v));
  }
  u.searchParams.set("mailto", MAILTO);
  return u.toString();
}

async function getJson<T>(u: string): Promise<T> {
  const res = await fetch(u, {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE, tags: ["openalex"] },
  });
  if (!res.ok) {
    throw new Error(`OpenAlex ${res.status} on ${u}`);
  }
  return (await res.json()) as T;
}

export async function fetchWorks(query: ResearchQuery, perPage = 25): Promise<WorksResponse> {
  return getJson<WorksResponse>(
    url("/works", {
      search: query.search,
      per_page: perPage,
      sort: "cited_by_count:desc",
      select:
        "id,doi,title,display_name,publication_year,publication_date,cited_by_count,open_access,authorships,primary_location,type",
    })
  );
}

export async function fetchYearHistogram(query: ResearchQuery): Promise<{ year: number; count: number }[]> {
  const data = await getJson<WorksResponse>(
    url("/works", { search: query.search, group_by: "publication_year", per_page: 1 })
  );
  const items = (data.group_by ?? [])
    .map((g) => ({ year: parseInt(g.key, 10), count: g.count }))
    .filter((g) => Number.isFinite(g.year));
  return items.sort((a, b) => a.year - b.year);
}

export async function fetchInstitutions(query: ResearchQuery, top = 10): Promise<{ name: string; country: string; works: number }[]> {
  const data = await getJson<WorksResponse>(
    url("/works", {
      search: query.search,
      group_by: "authorships.institutions.id",
      per_page: 1,
    })
  );
  return (data.group_by ?? [])
    .slice(0, top)
    .map((g) => ({
      name: g.key_display_name ?? g.key,
      country: "",
      works: g.count,
    }));
}

export async function fetchOpenAccessSplit(query: ResearchQuery): Promise<{ name: string; value: number }[]> {
  const data = await getJson<WorksResponse>(
    url("/works", {
      search: query.search,
      group_by: "open_access.is_oa",
      per_page: 1,
    })
  );
  return (data.group_by ?? []).map((g) => ({
    name: g.key === "true" ? "Abierto" : "Cerrado",
    value: g.count,
  }));
}

export type QueryBundle = {
  query: ResearchQuery;
  total: number;
  topWorks: Work[];
  byYear: { year: number; count: number }[];
  topInstitutions: { name: string; country: string; works: number }[];
  oaSplit: { name: string; value: number }[];
  error?: string;
};

export async function loadAllQueries(): Promise<QueryBundle[]> {
  const out: QueryBundle[] = [];
  for (const q of RESEARCH_QUERIES) {
    try {
      const [works, byYear, insts, oa] = await Promise.all([
        fetchWorks(q, 6),
        fetchYearHistogram(q),
        fetchInstitutions(q, 8),
        fetchOpenAccessSplit(q),
      ]);
      out.push({
        query: q,
        total: works.meta.count,
        topWorks: works.results,
        byYear,
        topInstitutions: insts,
        oaSplit: oa,
      });
    } catch (err) {
      out.push({
        query: q,
        total: 0,
        topWorks: [],
        byYear: [],
        topInstitutions: [],
        oaSplit: [],
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }
  return out;
}

export function authorList(work: Work, max = 4): string {
  const names = (work.authorships ?? [])
    .map((a) => a.author?.display_name)
    .filter(Boolean) as string[];
  if (names.length === 0) return "";
  if (names.length <= max) return names.join(", ");
  return `${names.slice(0, max).join(", ")} et al.`;
}

export function workUrl(work: Work): string | undefined {
  if (work.open_access?.oa_url) return work.open_access.oa_url;
  if (work.doi) return `https://doi.org/${work.doi.replace(/^https?:\/\/doi\.org\//i, "")}`;
  return work.id;
}

export function searchUrl(query: ResearchQuery): string {
  return `https://api.openalex.org/works?search=${encodeURIComponent(query.search)}`;
}

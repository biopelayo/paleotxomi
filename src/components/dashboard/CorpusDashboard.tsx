"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import { ImageIcon, ShieldCheck, Layers, Globe2 } from "lucide-react";

type Piece = {
  id_pieza: string;
  certeza: string;
  validacion_cientifica: string;
  seccion: string;
  resolucion_max_px: string;
};
type Kpi = {
  categoria: string;
  indicador: string;
  unidad: string;
  linea_base: string;
  objetivo_12m: string;
};

const COLORS = {
  green: "#2D6A4F",
  green2: "#52B788",
  green3: "#95D5B2",
  green4: "#D8F3DC",
  warm: "#D4845A",
  warmSoft: "#F0C7B0",
  ink: "#1B1B1B",
  muted: "#888",
};

function tally(arr: string[]) {
  const m = new Map<string, number>();
  for (const v of arr) {
    const k = v || "(vacío)";
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return Array.from(m.entries()).map(([name, value]) => ({ name, value }));
}

export default function CorpusDashboard({ pieces, kpis }: { pieces: Piece[]; kpis: Kpi[] }) {
  const t = useTranslations("catalog");

  const bySection = useMemo(
    () => tally(pieces.map((p) => (p.seccion === "1_ESCULTURAS" ? "Esculturas" : "Otras"))),
    [pieces]
  );
  const byCertainty = useMemo(() => tally(pieces.map((p) => p.certeza)), [pieces]);
  const byValidation = useMemo(() => tally(pieces.map((p) => p.validacion_cientifica)), [pieces]);

  const totals = {
    pieces: pieces.length,
    sculptures: pieces.filter((p) => p.seccion === "1_ESCULTURAS").length,
    others: pieces.filter((p) => p.seccion === "2_OTRAS").length,
    avgRes: Math.round(
      pieces.reduce((acc, p) => acc + (parseInt(p.resolucion_max_px || "0", 10) || 0), 0) / Math.max(1, pieces.length)
    ),
    pending: pieces.filter((p) => p.validacion_cientifica !== "firmada").length,
  };

  const kpiCards: { label: string; value: string; icon: React.ReactNode }[] = [
    { label: "Piezas del corpus", value: totals.pieces.toString(), icon: <Layers size={18} /> },
    { label: "Esculturas", value: totals.sculptures.toString(), icon: <ImageIcon size={18} /> },
    { label: "Resolución media (px)", value: totals.avgRes.toLocaleString("es-ES"), icon: <Globe2 size={18} /> },
    { label: "Pendientes de validación", value: totals.pending.toString(), icon: <ShieldCheck size={18} /> },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiCards.map((c) => (
          <div key={c.label} className="card">
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--pel-warm)" }}>
              {c.icon} <span style={{ fontWeight: 600 }}>{c.label}</span>
            </div>
            <p style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "2rem", lineHeight: 1.05, marginTop: 4 }}>
              {c.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="mb-3" style={{ color: "var(--pel-green)", fontWeight: 700 }}>
            {t("byCategory")}
          </h3>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={bySection} dataKey="value" nameKey="name" outerRadius={90} label>
                  {bySection.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? COLORS.green : COLORS.warm} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="mb-3" style={{ color: "var(--pel-green)", fontWeight: 700 }}>
            {t("byCertainty")}
          </h3>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={byCertainty}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="value" fill={COLORS.green2} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card lg:col-span-2">
          <h3 className="mb-3" style={{ color: "var(--pel-green)", fontWeight: 700 }}>
            {t("byValidation")}
          </h3>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <BarChart data={byValidation} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis type="number" stroke="#888" />
                <YAxis type="category" dataKey="name" stroke="#888" width={120} />
                <Tooltip />
                <Bar dataKey="value" fill={COLORS.warm} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3" style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "1.3rem" }}>
          {t("kpis")}
        </h3>
        <div className="overflow-x-auto card p-0">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--pel-green-4)", color: "var(--pel-green)" }}>
                <th className="text-left p-3">Categoría</th>
                <th className="text-left p-3">Indicador</th>
                <th className="text-right p-3">Unidad</th>
                <th className="text-right p-3">Línea base</th>
                <th className="text-right p-3">Objetivo 12 m</th>
              </tr>
            </thead>
            <tbody>
              {kpis.map((k, i) => (
                <tr
                  key={`${k.categoria}-${k.indicador}-${i}`}
                  style={{ borderTop: "1px solid var(--pel-border)" }}
                >
                  <td className="p-3" style={{ color: "var(--pel-warm)", fontWeight: 600 }}>{k.categoria}</td>
                  <td className="p-3">{k.indicador}</td>
                  <td className="p-3 text-right" style={{ color: "var(--pel-muted)" }}>{k.unidad}</td>
                  <td className="p-3 text-right">{k.linea_base || "—"}</td>
                  <td className="p-3 text-right" style={{ fontWeight: 700, color: "var(--pel-green)" }}>{k.objetivo_12m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

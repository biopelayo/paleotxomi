"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

type Datum = { year: number; count: number };

export default function YearChart({ data }: { data: Datum[] }) {
  const filtered = data.filter((d) => d.year >= 1990).slice(-30);
  if (filtered.length === 0) {
    return (
      <p className="text-sm" style={{ color: "var(--pel-muted)" }}>
        Sin datos para el rango temporal seleccionado.
      </p>
    );
  }
  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer>
        <BarChart data={filtered}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
          <XAxis dataKey="year" stroke="#888" />
          <YAxis stroke="#888" allowDecimals={false} />
          <Tooltip
            contentStyle={{ background: "#fff", border: "1px solid #ccc", borderRadius: 8 }}
            labelStyle={{ color: "#2D6A4F", fontWeight: 700 }}
          />
          <Bar dataKey="count" fill="#2D6A4F" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

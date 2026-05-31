"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });
const CircleMarker = dynamic(() => import("react-leaflet").then((m) => m.CircleMarker), { ssr: false });

type Feature = {
  type: "Feature";
  properties: {
    id: string;
    nombre: string;
    concejo?: string;
    parroquia?: string;
    categoria: string;
    cronologia?: string;
    motivos_principales?: string[];
    descripcion?: string;
    fuente?: string;
    color: string;
  };
  geometry: { type: "Point"; coordinates: [number, number] };
};

const STYLE: Record<string, { radius: number; color: string; weight: number; opacity: number; fill: string }> = {
  yacimiento_principal: { radius: 12, color: "#2D6A4F", weight: 3, opacity: 1, fill: "#2D6A4F" },
  yacimiento_unesco: { radius: 9, color: "#52B788", weight: 2, opacity: 1, fill: "#52B788" },
  ciudad: { radius: 13, color: "#D4845A", weight: 3, opacity: 1, fill: "#D4845A" },
};

export default function NalonMap() {
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    fetch("/data/sites.geojson")
      .then((r) => r.json())
      .then((j) => setFeatures(j.features as Feature[]))
      .catch((err) => console.error("[NalonMap]", err));
  }, []);

  return (
    <div style={{ width: "100%", height: 540 }}>
      <MapContainer
        center={[43.36, -5.5]}
        zoom={9}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {features.map((f) => {
          const [lon, lat] = f.geometry.coordinates;
          const s = STYLE[f.properties.categoria] ?? STYLE.yacimiento_unesco;
          return (
            <CircleMarker
              key={f.properties.id}
              center={[lat, lon]}
              radius={s.radius}
              pathOptions={{ color: s.color, weight: s.weight, opacity: s.opacity, fillColor: s.fill, fillOpacity: 0.85 }}
            >
              <Popup>
                <div style={{ minWidth: 200 }}>
                  <strong style={{ color: "#2D6A4F" }}>{f.properties.nombre}</strong>
                  {f.properties.concejo && (
                    <p style={{ margin: "4px 0", color: "#3D3D3D", fontSize: 12 }}>
                      {f.properties.concejo}{f.properties.parroquia ? ` · ${f.properties.parroquia}` : ""}
                    </p>
                  )}
                  {f.properties.cronologia && (
                    <p style={{ margin: "4px 0", fontSize: 12 }}>{f.properties.cronologia}</p>
                  )}
                  {f.properties.motivos_principales && (
                    <p style={{ margin: "4px 0", fontSize: 12 }}>
                      <em>Motivos:</em> {f.properties.motivos_principales.join(", ")}
                    </p>
                  )}
                  {f.properties.fuente && (
                    <a href={f.properties.fuente} target="_blank" rel="noreferrer" style={{ color: "#D4845A", fontSize: 12 }}>
                      Fuente
                    </a>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}

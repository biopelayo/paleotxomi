"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import("react-leaflet").then((m) => m.CircleMarker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });

export type Punto = {
  id: string;
  titulo: string;
  sede: string;
  ciudad: string;
  lat: number;
  lon: number;
};

function bounds(puntos: Punto[]): [[number, number], [number, number]] {
  const lats = puntos.map((p) => p.lat);
  const lons = puntos.map((p) => p.lon);
  return [
    [Math.min(...lats), Math.min(...lons)],
    [Math.max(...lats), Math.max(...lons)],
  ];
}

export default function EventosMap({ points }: { points: Punto[] }) {
  if (points.length === 0) return null;

  const center: [number, number] =
    points.length === 1
      ? [points[0].lat, points[0].lon]
      : [
          points.reduce((s, p) => s + p.lat, 0) / points.length,
          points.reduce((s, p) => s + p.lon, 0) / points.length,
        ];

  return (
    <div style={{ width: "100%", height: 420 }}>
      <MapContainer
        center={center}
        zoom={points.length === 1 ? 11 : 7}
        bounds={points.length > 1 ? bounds(points) : undefined}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((p) => (
          <CircleMarker
            key={p.id}
            center={[p.lat, p.lon]}
            radius={11}
            pathOptions={{
              color: "#2D6A4F",
              weight: 3,
              opacity: 1,
              fillColor: "#2D6A4F",
              fillOpacity: 0.85,
            }}
          >
            <Popup>
              <div style={{ minWidth: 180 }}>
                <strong style={{ color: "#2D6A4F" }}>{p.titulo}</strong>
                <p style={{ margin: "4px 0", color: "#3D3D3D", fontSize: 12 }}>
                  {p.sede}
                  {p.ciudad ? ` · ${p.ciudad}` : ""}
                </p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

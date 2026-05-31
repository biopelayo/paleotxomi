import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Banner destacado en la home: anuncio de la exposición en curso.
 * Texto hardcoded (no usa es.json) para no pisar el trabajo paralelo de Pelayo en messages/es.json.
 */
export default function ExpoActualBanner() {
  return (
    <div
      style={{
        background: "var(--pel-green)",
        color: "#fff",
      }}
    >
      <div
        className="container-page flex items-center justify-between gap-3 flex-wrap"
        style={{ padding: "0.7rem 1.25rem", fontSize: "0.88rem" }}
      >
        <p style={{ margin: 0, lineHeight: 1.4 }}>
          <strong style={{ letterSpacing: "0.04em", fontWeight: 700 }}>EXPOSICIÓN EN CURSO</strong>
          {" · "}
          La Esquina del Peso · Oviedo · del 20 al 30 de junio
        </p>
        <Link
          href="/exposicion/la-esquina-del-peso"
          style={{
            color: "#fff",
            textDecoration: "underline",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          Más info <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

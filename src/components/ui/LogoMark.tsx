/**
 * Isotipo del archivo personal de Domingo González de Lena Díaz.
 *
 * Composición: una silueta de cierva trilineal (motivo presente en Lluera,
 * Candamo y Les Pedroses) construida con tres trazos paralelos. La línea
 * central va en cálido patrimonial (`--pel-warm`), las dos exteriores en
 * verde botánico (`--pel-green`). Cuernos cortos como remate.
 */
type Props = {
  size?: number;
  animated?: boolean;
  className?: string;
};

export default function LogoMark({ size = 40, animated = false, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * (160 / 240)}
      viewBox="0 0 240 160"
      role="img"
      aria-label="Domingo González de Lena · cierva trilineal"
      className={`${animated ? "draw-line" : ""} ${className ?? ""}`}
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Lomo */}
        <path
          d="M 22 70 C 60 38, 130 36, 168 52 L 184 44 L 196 52"
          stroke="var(--pel-green)"
          strokeWidth={9}
        />
        {/* Costado (cierva, en cálido) */}
        <path
          d="M 22 90 C 64 62, 134 60, 170 78 L 188 70 L 204 80"
          stroke="var(--pel-warm)"
          strokeWidth={9}
        />
        {/* Vientre */}
        <path
          d="M 22 110 C 66 90, 134 88, 168 106 L 188 100 L 204 110"
          stroke="var(--pel-green)"
          strokeWidth={9}
        />
        {/* Cuernos cortos (3 trazos) */}
        <path
          d="M 174 44 L 170 30 M 184 44 L 188 28 M 196 48 L 202 34"
          stroke="var(--pel-green)"
          strokeWidth={5}
        />
        {/* Patas (4 finas) */}
        <path
          d="M 50 112 L 50 144 M 78 112 L 78 144 M 144 110 L 144 144 M 168 110 L 168 144"
          stroke="var(--pel-green)"
          strokeWidth={5}
        />
      </g>
    </svg>
  );
}

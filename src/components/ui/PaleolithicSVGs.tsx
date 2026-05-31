/**
 * Siluetas vectoriales originales inspiradas en motivos del grabado paleolítico
 * cantábrico documentados en el proyecto expositivo de Domingo González de Lena Díaz:
 * cierva (Lluera, Candamo, Les Pedroses), bisonte (Pindal, Lluera),
 * caballo (Tito Bustillo, Buxu, Candamo), uro (Lluera, Candamo),
 * ictiomorfo (Pindal), tectiforme (Buxu), signo triangular (Lluera).
 *
 * Son ilustraciones libres de derechos, estilizadas, no calcos directos.
 */

export type SvgComp = React.FC<{ size?: number; stroke?: string; fill?: string; strokeWidth?: number; opacity?: number }>;

const baseProps = (size: number, opacity: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 240 160",
  xmlns: "http://www.w3.org/2000/svg",
  style: { opacity },
  "aria-hidden": true as const,
});

// CIERVA TRILINEAL: tres trazos paralelos que delimitan la silueta del cérvido,
// con cuernos sugeridos por trazos cortos sobre la cabeza y patas finas.
export const CiervaSvg: SvgComp = ({ size = 240, stroke = "currentColor", fill = "none", strokeWidth = 2.2, opacity = 1 }) => (
  <svg {...baseProps(size, opacity)}>
    <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M 22 78 C 60 50, 130 48, 168 62 L 184 56 L 192 64" />
      <path d="M 22 86 C 62 64, 132 62, 170 76 L 186 70 L 196 78" />
      <path d="M 22 94 C 64 78, 134 76, 170 92 L 186 88 L 200 94" />
      <path d="M 178 50 L 175 38 M 184 50 L 188 36 M 192 52 L 196 40" />
      <path d="M 50 96 L 50 130 M 70 100 L 70 130 M 140 96 L 140 130 M 162 96 L 162 130" />
    </g>
  </svg>
);

// BISONTE DE LOMO ROJO (Pindal): giba pronunciada, cabeza baja, patas cortas.
export const BisonteSvg: SvgComp = ({ size = 240, stroke = "currentColor", fill = "none", strokeWidth = 2.2, opacity = 1 }) => (
  <svg {...baseProps(size, opacity)}>
    <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M 28 92 C 38 74, 56 56, 78 56 C 96 56, 102 76, 118 76 C 138 76, 152 70, 174 78 C 198 86, 208 100, 212 110 L 200 112 L 192 102 L 180 110 L 172 100 L 160 110 L 148 100 L 136 110 L 120 100 L 110 110 L 96 100 L 86 112 L 76 100 L 64 112 L 50 100 L 36 108 Z" />
      <path d="M 80 56 L 76 44 M 88 58 L 92 44" />
      <circle cx="68" cy="78" r="1.5" fill={stroke} />
    </g>
  </svg>
);

// CABALLO CRINERA (Tito Bustillo, Pindal): cuello arqueado, hocico, crinera marcada.
export const CaballoSvg: SvgComp = ({ size = 240, stroke = "currentColor", fill = "none", strokeWidth = 2.2, opacity = 1 }) => (
  <svg {...baseProps(size, opacity)}>
    <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M 26 86 C 40 56, 70 42, 92 50 C 102 54, 108 64, 116 60 L 130 50 L 144 56 C 168 60, 196 70, 214 92 L 200 110 L 188 100 L 174 110 L 158 100 L 142 110 L 124 100 L 102 110 L 84 100 L 64 110 L 46 100 L 30 102 Z" />
      <path d="M 92 50 L 90 38 M 100 52 L 104 40 M 108 56 L 114 46" />
      <path d="M 134 50 L 132 42 M 140 52 L 144 44" />
      <circle cx="78" cy="62" r="1.5" fill={stroke} />
    </g>
  </svg>
);

// URO (Lluera, Candamo): cuerpo macizo, cuernos largos curvos, cabeza alta.
export const UroSvg: SvgComp = ({ size = 240, stroke = "currentColor", fill = "none", strokeWidth = 2.2, opacity = 1 }) => (
  <svg {...baseProps(size, opacity)}>
    <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M 30 90 C 42 70, 62 60, 86 60 L 96 56 L 102 64 C 130 64, 162 70, 198 92 L 188 112 L 174 102 L 160 112 L 144 102 L 124 112 L 102 102 L 78 112 L 56 102 L 36 110 Z" />
      <path d="M 86 60 C 70 40, 60 38, 56 32 M 96 56 C 100 36, 110 32, 118 28" />
      <circle cx="80" cy="74" r="1.6" fill={stroke} />
    </g>
  </svg>
);

// ICTIOMORFO (Pindal): pez estilizado con cuerpo fusiforme y aleta caudal.
export const IctiomorfoSvg: SvgComp = ({ size = 240, stroke = "currentColor", fill = "none", strokeWidth = 2.2, opacity = 1 }) => (
  <svg {...baseProps(size, opacity)}>
    <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M 32 80 C 60 50, 130 50, 178 80 C 130 110, 60 110, 32 80 Z" />
      <path d="M 178 80 L 210 60 L 210 100 Z" />
      <path d="M 60 80 L 96 70 M 60 80 L 96 90" />
      <circle cx="56" cy="78" r="2" fill={stroke} />
    </g>
  </svg>
);

// TECTIFORME (Buxu): signo geométrico característico, casa con líneas internas.
export const TectiformeSvg: SvgComp = ({ size = 240, stroke = "currentColor", fill = "none", strokeWidth = 2.2, opacity = 1 }) => (
  <svg {...baseProps(size, opacity)}>
    <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M 50 40 L 120 16 L 190 40 L 190 130 L 50 130 Z" />
      <path d="M 50 70 L 190 70 M 80 70 L 80 130 M 120 70 L 120 130 M 160 70 L 160 130" />
      <path d="M 50 100 L 190 100" />
    </g>
  </svg>
);

// SIGNO TRIANGULAR (Lluera): triángulo con líneas internas, motivo recurrente.
export const SignoTriangularSvg: SvgComp = ({ size = 240, stroke = "currentColor", fill = "none", strokeWidth = 2.4, opacity = 1 }) => (
  <svg {...baseProps(size, opacity)}>
    <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M 120 20 L 210 140 L 30 140 Z" />
      <path d="M 120 50 L 180 130 L 60 130 Z" />
      <path d="M 120 80 L 150 120 L 90 120 Z" />
    </g>
  </svg>
);

// CABRA (Llonín): silueta esbelta, cuernos rectos curvados hacia atrás.
export const CabraSvg: SvgComp = ({ size = 240, stroke = "currentColor", fill = "none", strokeWidth = 2.2, opacity = 1 }) => (
  <svg {...baseProps(size, opacity)}>
    <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M 30 86 C 50 60, 80 56, 100 60 L 110 54 L 118 62 C 150 60, 184 70, 208 92 L 196 116 L 184 102 L 168 116 L 150 102 L 130 116 L 108 102 L 86 116 L 64 102 L 40 110 Z" />
      <path d="M 100 60 C 88 38, 78 26, 72 18 M 108 54 C 102 38, 98 26, 92 14" />
      <circle cx="92" cy="74" r="1.6" fill={stroke} />
    </g>
  </svg>
);

export const PALEO_SVGS: { id: string; comp: SvgComp; label: string }[] = [
  { id: "cierva", comp: CiervaSvg, label: "Cierva trilineal" },
  { id: "bisonte", comp: BisonteSvg, label: "Bisonte de lomo rojo" },
  { id: "caballo", comp: CaballoSvg, label: "Caballo crinera" },
  { id: "uro", comp: UroSvg, label: "Uro" },
  { id: "ictiomorfo", comp: IctiomorfoSvg, label: "Ictiomorfo" },
  { id: "tectiforme", comp: TectiformeSvg, label: "Tectiforme" },
  { id: "signo", comp: SignoTriangularSvg, label: "Signo triangular" },
  { id: "cabra", comp: CabraSvg, label: "Cabra" },
];

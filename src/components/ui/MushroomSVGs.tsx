/**
 * Setas estilizadas inspiradas en las formas del libreto «Iniciación a la
 * micología» de Domingo: sombrero plano, convexo, mamelonado, infundibuliforme,
 * acampanado, ovoide. Ilustraciones vectoriales originales sin derechos.
 */
import type { SvgComp } from "./PaleolithicSVGs";

const baseProps = (size: number, opacity: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 240 240",
  xmlns: "http://www.w3.org/2000/svg",
  style: { opacity },
  "aria-hidden": true as const,
});

export const SetaConvexa: SvgComp = ({ size = 240, stroke = "currentColor", fill = "none", strokeWidth = 2.4, opacity = 1 }) => (
  <svg {...baseProps(size, opacity)}>
    <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M 40 110 C 60 50, 180 50, 200 110 C 200 120, 180 124, 120 124 C 60 124, 40 120, 40 110 Z" />
      <path d="M 100 124 L 96 196 C 96 206, 144 206, 144 196 L 140 124" />
      <path d="M 60 86 L 56 80 M 90 70 L 90 60 M 120 64 L 120 54 M 150 70 L 150 60 M 180 86 L 184 80" />
      <path d="M 96 196 L 144 196" />
    </g>
  </svg>
);

export const SetaPlana: SvgComp = ({ size = 240, stroke = "currentColor", fill = "none", strokeWidth = 2.4, opacity = 1 }) => (
  <svg {...baseProps(size, opacity)}>
    <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M 30 100 L 210 100 L 200 116 L 40 116 Z" />
      <path d="M 30 100 C 60 70, 180 70, 210 100" />
      <path d="M 96 116 L 96 200 C 96 210, 144 210, 144 200 L 144 116" />
      <path d="M 60 90 L 60 84 M 90 80 L 90 72 M 120 78 L 120 70 M 150 80 L 150 72 M 180 90 L 180 84" />
    </g>
  </svg>
);

export const SetaConica: SvgComp = ({ size = 240, stroke = "currentColor", fill = "none", strokeWidth = 2.4, opacity = 1 }) => (
  <svg {...baseProps(size, opacity)}>
    <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M 60 130 L 120 30 L 180 130 L 174 138 L 66 138 Z" />
      <path d="M 100 138 L 96 198 C 96 208, 144 208, 144 198 L 140 138" />
      <path d="M 90 80 L 86 74 M 120 60 L 120 52 M 150 80 L 154 74" />
    </g>
  </svg>
);

export const SetaMamelonada: SvgComp = ({ size = 240, stroke = "currentColor", fill = "none", strokeWidth = 2.4, opacity = 1 }) => (
  <svg {...baseProps(size, opacity)}>
    <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M 40 116 C 50 90, 80 70, 100 70 C 110 50, 130 50, 140 70 C 160 70, 190 90, 200 116 C 200 124, 180 128, 120 128 C 60 128, 40 124, 40 116 Z" />
      <path d="M 100 128 L 98 200 C 98 208, 142 208, 142 200 L 140 128" />
      <path d="M 60 100 L 56 94 M 90 86 L 90 78 M 150 86 L 150 78 M 180 100 L 184 94" />
    </g>
  </svg>
);

export const SetaInfundibuliforme: SvgComp = ({ size = 240, stroke = "currentColor", fill = "none", strokeWidth = 2.4, opacity = 1 }) => (
  <svg {...baseProps(size, opacity)}>
    <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M 30 70 L 210 70 C 200 110, 160 130, 130 130 L 120 130 C 90 130, 60 110, 30 70 Z" />
      <path d="M 60 80 L 184 80 M 80 92 L 164 92 M 96 104 L 148 104" />
      <path d="M 110 130 L 110 200 C 110 208, 130 208, 130 200 L 130 130" />
    </g>
  </svg>
);

export const SetaOvoide: SvgComp = ({ size = 240, stroke = "currentColor", fill = "none", strokeWidth = 2.4, opacity = 1 }) => (
  <svg {...baseProps(size, opacity)}>
    <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M 70 90 C 70 30, 170 30, 170 90 C 170 110, 150 124, 120 124 C 90 124, 70 110, 70 90 Z" />
      <path d="M 100 124 L 96 196 C 96 206, 144 206, 144 196 L 140 124" />
      <path d="M 100 70 C 102 60, 138 60, 140 70 M 110 50 L 110 44 M 130 50 L 130 44" />
    </g>
  </svg>
);

export const MUSHROOM_SVGS: { id: string; comp: SvgComp; label: string }[] = [
  { id: "convexa", comp: SetaConvexa, label: "Sombrero convexo" },
  { id: "plana", comp: SetaPlana, label: "Sombrero plano" },
  { id: "conica", comp: SetaConica, label: "Sombrero cónico" },
  { id: "mamelonada", comp: SetaMamelonada, label: "Sombrero mamelonado" },
  { id: "infundibuliforme", comp: SetaInfundibuliforme, label: "Infundibuliforme" },
  { id: "ovoide", comp: SetaOvoide, label: "Ovoide" },
];

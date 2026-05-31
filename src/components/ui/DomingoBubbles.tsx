"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PALEO_SVGS } from "./PaleolithicSVGs";
import { MUSHROOM_SVGS } from "./MushroomSVGs";

type Theme = "mixed" | "paleolithic" | "mushroom";

type Bubble = {
  id: number;
  comp: React.ElementType;
  size: number;
  x: number;        // posición base en %
  y: number;
  rotation: number;
  driftSpeed: number;
  driftPhase: number;
  parallax: number; // 0..1, cuánto reacciona al ratón
  color: "green" | "warm" | "soft";
  strokeWidth: number;
};

type Props = {
  /** Mezcla de motivos. `paleolithic` solo grabados, `mushroom` solo setas. */
  theme?: Theme;
  /** Número de figuras. Por defecto 28. */
  count?: number;
  /** Si true, las figuras se renderizan más grandes (hero gigante). */
  giant?: boolean;
  /** Modo de blendeo. Por defecto 'normal'. */
  blend?: "normal" | "screen";
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function DomingoBubbles({
  theme = "mixed",
  count = 28,
  giant = false,
  blend = "normal",
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  // Gate de montaje: las burbujas usan Math.random(), así que solo se
  // pintan tras hidratar para evitar el hydration mismatch entre SSR y
  // cliente. El SSR emite el contenedor vacío y el cliente lo rellena.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const bubbles = useMemo<Bubble[]>(() => {
    const pool =
      theme === "mushroom"
        ? MUSHROOM_SVGS
        : theme === "paleolithic"
        ? PALEO_SVGS
        : [...PALEO_SVGS, ...MUSHROOM_SVGS];

    const minSize = giant ? 110 : 70;
    const maxSize = giant ? 460 : 280;

    return Array.from({ length: count }, (_, i) => {
      const palette: Bubble["color"][] = ["green", "warm", "soft", "green", "soft"];
      const tier = Math.random();
      const size =
        tier < 0.18
          ? rand(maxSize * 0.7, maxSize) // pocos gigantes
          : tier < 0.55
          ? rand(minSize * 1.4, maxSize * 0.6)
          : rand(minSize, minSize * 1.6);
      return {
        id: i,
        comp: pool[i % pool.length].comp,
        size,
        x: rand(-6, 106),
        y: rand(-8, 110),
        rotation: rand(-22, 22),
        driftSpeed: rand(14, 36),
        driftPhase: rand(0, Math.PI * 2),
        parallax: 0.05 + (size / maxSize) * 0.45,
        color: palette[Math.floor(Math.random() * palette.length)],
        strokeWidth: 2 + Math.random() * 1.4,
      };
    });
  }, [theme, count, giant]);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMouse({ x, y });
    }
    function onLeave() {
      setMouse(null);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Animación de flotación ligera independiente: usamos timestamp.
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className="pointer-events-none"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        mixBlendMode: blend === "screen" ? "screen" : "normal",
      }}
    >
      {mounted && bubbles.map((b) => {
        const driftX = Math.sin(t / 4 + b.driftPhase) * 14;
        const driftY = Math.cos(t / 5 + b.driftPhase * 1.3) * 12;
        const rot = b.rotation + Math.sin(t / 8 + b.driftPhase) * 6;

        let mouseDx = 0;
        let mouseDy = 0;
        if (mouse) {
          // Las figuras se desplazan suavemente en sentido contrario al ratón (parallax inverso)
          const dx = (b.x / 100) - mouse.x;
          const dy = (b.y / 100) - mouse.y;
          const distance = Math.hypot(dx, dy);
          const force = Math.max(0, 0.45 - distance) * 220 * b.parallax;
          if (distance > 0) {
            mouseDx = (dx / distance) * force;
            mouseDy = (dy / distance) * force;
          }
        }

        const colorMap = {
          green: "var(--pel-green)",
          warm: "var(--pel-warm)",
          soft: "var(--pel-green-3)",
        } as const;
        const Comp = b.comp;

        return (
          <div
            key={b.id}
            style={{
              position: "absolute",
              left: `${b.x}%`,
              top: `${b.y}%`,
              transform: `translate(-50%, -50%) translate(${driftX + mouseDx}px, ${driftY + mouseDy}px) rotate(${rot}deg)`,
              transition: "transform 220ms ease-out",
              willChange: "transform",
              color: colorMap[b.color],
              opacity: b.color === "warm" ? 0.16 : 0.13,
              filter: "drop-shadow(0 0 22px rgba(45,106,79,0.35))",
            }}
          >
            <Comp size={b.size} stroke={colorMap[b.color]} strokeWidth={b.strokeWidth} />
          </div>
        );
      })}
    </div>
  );
}

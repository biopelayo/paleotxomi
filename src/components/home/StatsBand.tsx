"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Stat = { value: number; key: "pieces" | "caves" | "courses" | "writings" };

const STATS: Stat[] = [
  { value: 25, key: "pieces" },
  { value: 8, key: "caves" },
  { value: 3, key: "courses" },
  { value: 7, key: "writings" },
];

function CountUp({ to }: { to: number }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !seen.current) {
          seen.current = true;
          const start = performance.now();
          const dur = 1000;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setV(Math.round(eased * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{v.toLocaleString("es-ES")}</span>;
}

export default function StatsBand() {
  const t = useTranslations("stats");
  return (
    <section
      className="section-tight"
      style={{ background: "var(--pel-green-4)", borderTop: "1px solid var(--pel-border)", borderBottom: "1px solid var(--pel-border)" }}
    >
      <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
        {STATS.map((s) => (
          <div key={s.key} className="text-center">
            <p
              style={{
                color: "var(--pel-green)",
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                lineHeight: 1.05,
              }}
            >
              <CountUp to={s.value} />
            </p>
            <p style={{ color: "var(--pel-ink-soft)", fontSize: "0.9rem", marginTop: 2 }}>
              {t(s.key)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

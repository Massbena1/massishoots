"use client";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => Math.round(v));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, value]);

  return (
    <span ref={ref} className="font-bebas stat-counter" style={{ fontSize: "clamp(44px, 5vw, 68px)", color: "#c4cdd6", lineHeight: 1, display: "block", transition: "color 0.3s ease" }}>
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

export default function Stats() {
  const t = useTranslations();
  const stats = t.raw("stats") as Array<{ num: number; suffix: string; label: string; sub: string }>;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{ padding: "60px 0" }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 28, overflow: "hidden", position: "relative",
        }} className="stats-grid">
          <div style={{
            position: "absolute", top: 0, left: 24, right: 24, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          }} />
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(196,205,214,0.04)";
                const counter = e.currentTarget.querySelector(".stat-counter") as HTMLElement;
                if (counter) counter.style.color = "#fff";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                const counter = e.currentTarget.querySelector(".stat-counter") as HTMLElement;
                if (counter) counter.style.color = "#c4cdd6";
              }}
              style={{
                textAlign: "center", padding: "40px 20px",
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                transition: "background 0.3s ease",
                cursor: "none",
              }}
            >
              <Counter value={s.num} suffix={s.suffix} />
              <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 8, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>
                {s.label}
              </p>
              <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", marginTop: 4, letterSpacing: "0.06em", fontStyle: "italic" }}>
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 640px) { .stats-grid { grid-template-columns: repeat(2,1fr) !important; } .stats-grid > *:nth-child(2) { border-right: none !important; } }`}</style>
    </section>
  );
}

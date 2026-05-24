"use client";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const stats = [
  { value: 50,  suffix: "+",   label: "Clients satisfaits", icon: "◆" },
  { value: 200, suffix: "+",   label: "Projets livrés",     icon: "◆" },
  { value: 20,  suffix: "K+",  label: "Abonnés Instagram",  icon: "◆" },
  { value: 5,   suffix: " ans",label: "D'expérience",       icon: "◆" },
];

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
    <span ref={ref} className="font-bebas" style={{ fontSize: "clamp(44px, 5vw, 68px)", color: "#c4cdd6", lineHeight: 1, display: "block" }}>
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{ padding: "60px 0" }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Outer glass container */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 28,
          overflow: "hidden",
          position: "relative",
        }} className="stats-grid">
          {/* Top highlight */}
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
              style={{
                textAlign: "center",
                padding: "40px 20px",
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <Counter value={s.value} suffix={s.suffix} />
              <p className="font-dm" style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.32)",
                marginTop: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 640px) { .stats-grid { grid-template-columns: repeat(2,1fr) !important; } .stats-grid > *:nth-child(2) { border-right: none !important; } }`}</style>
    </section>
  );
}

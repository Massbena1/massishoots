"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: "+127%", label: "Engagement moyen après 3 mois" },
  { value: "2M+",   label: "Vues générées pour nos clients" },
  { value: "50+",   label: "Marques accompagnées à Montréal" },
  { value: "48h",   label: "Livraison express disponible" },
];

export default function TarifsStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ padding: "100px 24px", background: "transparent" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64, textAlign: "center" }}
        >
          <span className="font-dm" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A84C" }}>
            — Résultats réels
          </span>
          <h2 className="font-bebas" style={{
            fontSize: "clamp(32px, 4.5vw, 60px)",
            letterSpacing: "0.02em",
            color: "#fff",
            marginTop: 14,
            lineHeight: 0.95,
          }}>
            Ce que nos clients obtiennent.
          </h2>
        </motion.div>

        {/* Stats row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
          border: "0.5px solid rgba(201,168,76,0.2)",
          borderRadius: 20,
          overflow: "hidden",
        }} className="tarifs-stats-grid">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: "48px 32px",
                textAlign: "center",
                borderRight: i < STATS.length - 1 ? "0.5px solid rgba(201,168,76,0.15)" : "none",
                position: "relative",
                background: "rgba(201,168,76,0.02)",
              }}
            >
              {/* Top accent */}
              <div style={{
                position: "absolute", top: 0, left: "20%", right: "20%", height: 1,
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)",
              }} />

              <p className="font-bebas" style={{
                fontSize: "clamp(40px, 4.5vw, 64px)",
                color: "#fff",
                letterSpacing: "0.02em",
                lineHeight: 1,
                marginBottom: 12,
              }}>
                {stat.value}
              </p>
              <p className="font-dm" style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.04em",
                lineHeight: 1.6,
              }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 700px) {
          .tarifs-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .tarifs-stats-grid > div {
            border-right: none !important;
            border-bottom: 0.5px solid rgba(201,168,76,0.15);
          }
        }
      `}</style>
    </section>
  );
}

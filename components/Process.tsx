"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Consultation",
    desc: "On discute de ta vision, tes objectifs et ton univers. On définit le concept créatif parfait pour ton projet.",
    detail: "Appel gratuit · 30 min",
  },
  {
    num: "02",
    title: "Tournage",
    desc: "Direction artistique complète. Lumière maîtrisée, mise en scène soignée. Sony A7 III + DJI Mini 5 Pro.",
    detail: "1–2 jours · sur site",
  },
  {
    num: "03",
    title: "Montage",
    desc: "Post-production cinématique : colorimétrie, retouches, montage vidéo avec musique et motion design.",
    detail: "3–5 jours ouvrables",
  },
  {
    num: "04",
    title: "Livraison",
    desc: "Fichiers HD livrés clés en main. Révisions incluses jusqu'à ta satisfaction totale. Garantie qualité.",
    detail: "Fichiers HD · révisions incluses",
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="processus" style={{ padding: "140px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 80 }}
        >
          <span className="font-dm text-accent" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>
            — Comment ça marche
          </span>
          <h2 className="font-bebas" style={{
            fontSize: "clamp(44px, 7vw, 80px)",
            letterSpacing: "0.02em",
            lineHeight: 0.9,
            marginTop: 16,
            color: "#fff",
          }}>
            LE PROCESSUS
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="process-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
        }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: "40px 32px",
                borderLeft: i === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                borderRight: "1px solid rgba(255,255,255,0.08)",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                position: "relative",
                transition: "background 0.3s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              {/* Step number */}
              <div className="font-bebas" style={{
                fontSize: "clamp(72px, 8vw, 120px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "rgba(255,255,255,0.06)",
                marginBottom: 32,
                userSelect: "none",
              }}>
                {step.num}
              </div>

              {/* Separator line — animates in */}
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: 32 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                style={{
                  height: 1,
                  background: "#c4cdd6",
                  marginBottom: 24,
                }}
              />

              {/* Title */}
              <h3 className="font-bebas" style={{
                fontSize: "clamp(28px, 2.5vw, 38px)",
                letterSpacing: "0.04em",
                color: "#fff",
                lineHeight: 1,
                marginBottom: 16,
              }}>
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-dm" style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.8,
                marginBottom: 24,
              }}>
                {step.desc}
              </p>

              {/* Detail pill */}
              <span className="font-dm" style={{
                fontSize: 10,
                color: "#c4cdd6",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "5px 14px",
                background: "rgba(196,205,214,0.06)",
                border: "1px solid rgba(196,205,214,0.15)",
                borderRadius: 9999,
                display: "inline-block",
              }}>
                {step.detail}
              </span>

              {/* Arrow — sauf dernier */}
              {i < steps.length - 1 && (
                <div style={{
                  position: "absolute",
                  top: "50%",
                  right: -12,
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "#0a0a0a",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>→</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .process-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

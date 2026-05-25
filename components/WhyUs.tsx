"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const equipment = [
  { icon: "🎥", label: "Sony A7 III" },
  { icon: "🚁", label: "DJI Mini 5 Pro" },
  { icon: "💡", label: "Éclairage professionnel" },
  { icon: "🎙️", label: "Audio haute qualité" },
];

const software = [
  { name: "Premiere Pro", color: "#9999ff" },
  { name: "DaVinci Resolve", color: "#fd7b33" },
  { name: "After Effects", color: "#d291ff" },
  { name: "Photoshop", color: "#31a8ff" },
  { name: "Lightroom", color: "#31a8ff" },
];

const motionFeatures = [
  "Animation graphique",
  "Typographie dynamique",
  "Transitions modernes",
  "Motion design premium",
  "Effets cinématiques",
];

const aiUses = [
  "Transitions avancées",
  "Effets visuels",
  "Génération créative",
  "Sound design",
  "Amélioration vidéo",
  "Concepts visuels",
  "Automatisation créative",
];

function Card({
  children,
  delay = 0,
  inView,
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  inView: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 24,
        padding: 32,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 24, right: 24, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
      }} />
      {children}
    </motion.div>
  );
}

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pourquoi" style={{ padding: "140px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 64 }}
        >
          <span className="font-dm text-accent" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>
            — Notre différence
          </span>
          <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginTop: 14, marginBottom: 12, letterSpacing: "0.02em" }}>
            L&apos;image moderne demande plus qu&apos;une caméra.
          </p>
          <h2 className="font-bebas" style={{
            fontSize: "clamp(36px, 5.5vw, 72px)",
            letterSpacing: "0.02em",
            lineHeight: 0.95,
            color: "#fff",
            maxWidth: 860,
          }}>
            Création cinématique propulsée par stratégie, montage avancé &amp; intelligence artificielle.
          </h2>
        </motion.div>

        {/* 3-col grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }} className="whyus-grid">

          {/* 1 — Production */}
          <Card delay={0.1} inView={inView}>
            <span className="font-dm" style={{ fontSize: 10, color: "#c4cdd6", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: 20 }}>
              01 · Production
            </span>
            <h3 className="font-bebas" style={{ fontSize: 28, color: "#fff", letterSpacing: "0.05em", marginBottom: 20, lineHeight: 1 }}>
              Production Haut de Gamme
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {equipment.map((e) => (
                <div key={e.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{e.icon}</span>
                  <span className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", letterSpacing: "0.02em" }}>{e.label}</span>
                </div>
              ))}
            </div>
            <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.75 }}>
              Chaque projet est filmé avec une approche cinématique pensée pour les réseaux sociaux modernes et les marques premium.
            </p>
          </Card>

          {/* 2 — Montage */}
          <Card delay={0.18} inView={inView}>
            <span className="font-dm" style={{ fontSize: 10, color: "#c4cdd6", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: 20 }}>
              02 · Post-production
            </span>
            <h3 className="font-bebas" style={{ fontSize: 28, color: "#fff", letterSpacing: "0.05em", marginBottom: 20, lineHeight: 1 }}>
              Montage & Color Grading
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {software.map((s) => (
                <span key={s.name} className="font-dm" style={{
                  padding: "6px 14px",
                  background: `${s.color}14`,
                  border: `1px solid ${s.color}40`,
                  borderRadius: 8,
                  fontSize: 11,
                  color: s.color,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}>
                  {s.name}
                </span>
              ))}
            </div>
            <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.75 }}>
              Chaque vidéo est montée avec une attention extrême au rythme, à l&apos;émotion et à l&apos;impact visuel.
            </p>
          </Card>

          {/* 3 — Motion Design */}
          <Card delay={0.26} inView={inView}>
            <span className="font-dm" style={{ fontSize: 10, color: "#c4cdd6", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: 20 }}>
              03 · Animation
            </span>
            <h3 className="font-bebas" style={{ fontSize: 28, color: "#fff", letterSpacing: "0.05em", marginBottom: 20, lineHeight: 1 }}>
              Motion Design & Animation
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {motionFeatures.map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#c4cdd6", opacity: 0.6, flexShrink: 0 }} />
                  <span className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", letterSpacing: "0.02em" }}>{f}</span>
                </div>
              ))}
            </div>
            <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.75 }}>
              Des vidéos pensées pour capter l&apos;attention dès les premières secondes.
            </p>
          </Card>
        </div>

        {/* 4 — IA Card (full width) */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: 16,
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            border: "1px solid rgba(196,205,214,0.18)",
            background: "rgba(196,205,214,0.04)",
            padding: "40px 40px",
          }}
        >
          {/* Ambient glow */}
          <div style={{
            position: "absolute", top: -80, right: -80,
            width: 360, height: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,205,214,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: 1, background: "linear-gradient(90deg, transparent, rgba(196,205,214,0.25), transparent)" }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center" }} className="ai-grid">

            {/* Left — text */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span className="font-dm" style={{ fontSize: 10, color: "#c4cdd6", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  04 · Intelligence artificielle
                </span>
                <span className="font-bebas" style={{
                  fontSize: 10, letterSpacing: "0.15em",
                  color: "#0a0a0a", background: "#c4cdd6",
                  padding: "3px 10px", borderRadius: 9999,
                }}>
                  NEW GEN
                </span>
              </div>
              <h3 className="font-bebas" style={{
                fontSize: "clamp(32px, 3.5vw, 48px)",
                color: "#fff", letterSpacing: "0.03em", lineHeight: 1, marginBottom: 16,
              }}>
                Creative Direction<br />
                <span style={{ color: "#c4cdd6" }}>Powered by AI</span>
              </h3>
              <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: 560 }}>
                MassiShoots intègre les outils IA modernes pour créer des visuels plus dynamiques, immersifs et innovants.
                Nous combinons créativité humaine, direction artistique et technologies modernes pour créer du contenu qui se démarque réellement.
              </p>
            </div>

            {/* Right — AI tags */}
            <div style={{ display: "flex", flexDirection: "column", gap: 9, minWidth: 220 }}>
              <span className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
                IA utilisée pour :
              </span>
              {aiUses.map((u) => (
                <div key={u} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(196,205,214,0.55)", flexShrink: 0 }} />
                  <span className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.03em" }}>{u}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Closing phrase */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-dm"
          style={{
            marginTop: 56,
            fontSize: "clamp(14px, 1.6vw, 18px)",
            color: "rgba(255,255,255,0.22)",
            textAlign: "center",
            lineHeight: 1.7,
            fontStyle: "italic",
            maxWidth: 760,
            margin: "56px auto 0",
          }}
        >
          &ldquo;Nous combinons créativité humaine, direction artistique et technologies modernes
          pour créer du contenu qui se démarque réellement.&rdquo;
        </motion.p>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .whyus-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .whyus-grid { grid-template-columns: 1fr !important; }
          .ai-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </section>
  );
}

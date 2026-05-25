"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const EQUIPMENT_ICONS = ["🎥", "🚁", "💡", "🎙️"];
const SOFTWARE_COLORS = ["#9999ff", "#fd7b33", "#d291ff", "#31a8ff", "#31a8ff"];

type AnyCard = {
  label: string;
  title: string;
  desc: string;
  equipment?: string[];
  software?: string[];
  features?: string[];
  badge?: string;
  aiLabel?: string;
  aiUses?: string[];
};

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
      onMouseEnter={e => {
        e.currentTarget.style.background = "rgba(255,255,255,0.055)";
        e.currentTarget.style.borderColor = "rgba(196,205,214,0.22)";
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(196,205,214,0.06) inset";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 24,
        padding: 32,
        position: "relative",
        overflow: "hidden",
        transition: "background 0.35s ease, border-color 0.35s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease",
        cursor: "none",
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
  const t = useTranslations("whyUs");
  const cards = t.raw("cards") as AnyCard[];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [c0, c1, c2, c3] = cards;

  return (
    <section id="pourquoi" style={{ padding: "140px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 64 }}
        >
          <span className="font-dm text-accent" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>
            {t("label")}
          </span>
          <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginTop: 14, marginBottom: 12, letterSpacing: "0.02em" }}>
            {t("introText")}
          </p>
          <h2 className="font-bebas" style={{
            fontSize: "clamp(36px, 5.5vw, 72px)",
            letterSpacing: "0.02em",
            lineHeight: 0.95,
            color: "#fff",
            maxWidth: 860,
          }}>
            {t("heading")}
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }} className="whyus-grid">

          {/* 1 — Production */}
          <Card delay={0.1} inView={inView}>
            <span className="font-dm" style={{ fontSize: 10, color: "#c4cdd6", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: 20 }}>
              {c0.label}
            </span>
            <h3 className="font-bebas" style={{ fontSize: 28, color: "#fff", letterSpacing: "0.05em", marginBottom: 20, lineHeight: 1 }}>
              {c0.title}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {(c0.equipment ?? []).map((label, i) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{EQUIPMENT_ICONS[i]}</span>
                  <span className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", letterSpacing: "0.02em" }}>{label}</span>
                </div>
              ))}
            </div>
            <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.75 }}>
              {c0.desc}
            </p>
          </Card>

          {/* 2 — Post-production */}
          <Card delay={0.18} inView={inView}>
            <span className="font-dm" style={{ fontSize: 10, color: "#c4cdd6", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: 20 }}>
              {c1.label}
            </span>
            <h3 className="font-bebas" style={{ fontSize: 28, color: "#fff", letterSpacing: "0.05em", marginBottom: 20, lineHeight: 1 }}>
              {c1.title}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {(c1.software ?? []).map((name, i) => (
                <span key={name} className="font-dm" style={{
                  padding: "6px 14px",
                  background: `${SOFTWARE_COLORS[i] ?? "#c4cdd6"}14`,
                  border: `1px solid ${SOFTWARE_COLORS[i] ?? "#c4cdd6"}40`,
                  borderRadius: 8,
                  fontSize: 11,
                  color: SOFTWARE_COLORS[i] ?? "#c4cdd6",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}>
                  {name}
                </span>
              ))}
            </div>
            <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.75 }}>
              {c1.desc}
            </p>
          </Card>

          {/* 3 — Motion Design */}
          <Card delay={0.26} inView={inView}>
            <span className="font-dm" style={{ fontSize: 10, color: "#c4cdd6", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: 20 }}>
              {c2.label}
            </span>
            <h3 className="font-bebas" style={{ fontSize: 28, color: "#fff", letterSpacing: "0.05em", marginBottom: 20, lineHeight: 1 }}>
              {c2.title}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {(c2.features ?? []).map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#c4cdd6", opacity: 0.6, flexShrink: 0 }} />
                  <span className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", letterSpacing: "0.02em" }}>{f}</span>
                </div>
              ))}
            </div>
            <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.75 }}>
              {c2.desc}
            </p>
          </Card>
        </div>

        {/* 4 — AI Card (full width) */}
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
          <div style={{
            position: "absolute", top: -80, right: -80,
            width: 360, height: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,205,214,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: 1, background: "linear-gradient(90deg, transparent, rgba(196,205,214,0.25), transparent)" }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center" }} className="ai-grid">

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span className="font-dm" style={{ fontSize: 10, color: "#c4cdd6", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  {c3.label}
                </span>
                <span className="font-bebas" style={{
                  fontSize: 10, letterSpacing: "0.15em",
                  color: "#0a0a0a", background: "#c4cdd6",
                  padding: "3px 10px", borderRadius: 9999,
                }}>
                  {c3.badge}
                </span>
              </div>
              <h3 className="font-bebas" style={{
                fontSize: "clamp(32px, 3.5vw, 48px)",
                color: "#fff", letterSpacing: "0.03em", lineHeight: 1, marginBottom: 16,
              }}>
                {c3.title.split("\n").map((line, i) => (
                  i === 0 ? <span key={i}>{line}<br /></span> : <span key={i} style={{ color: "#c4cdd6" }}>{line}</span>
                ))}
              </h3>
              <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: 560 }}>
                {c3.desc}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 9, minWidth: 220 }}>
              <span className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
                {c3.aiLabel}
              </span>
              {(c3.aiUses ?? []).map((u) => (
                <div key={u} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(196,205,214,0.55)", flexShrink: 0 }} />
                  <span className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.03em" }}>{u}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

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
          &ldquo;{t("quote")}&rdquo;
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

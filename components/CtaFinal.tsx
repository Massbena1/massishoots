"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function CtaFinal() {
  const t = useTranslations("cta");
  const [hoveredPrimary, setHoveredPrimary] = useState(false);
  const [hoveredSecondary, setHoveredSecondary] = useState(false);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="cta"
      ref={sectionRef}
      style={{
        padding: "140px 0",
        background: "transparent",
        position: "relative",
      }}
    >
      {/* Top separator line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 30%, rgba(196,205,214,0.18) 50%, rgba(255,255,255,0.12) 70%, transparent 100%)",
          transformOrigin: "center",
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Label */}
        <motion.span
          className="font-dm text-accent"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}
        >
          {t("label")}
        </motion.span>

        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} style={{ marginTop: 24 }}>
          <h2 className="font-bebas" style={{ fontSize: "clamp(52px, 9vw, 96px)", letterSpacing: "0.02em", lineHeight: 0.92, color: "#fff", margin: 0 }}>
            {t("heading1")}
            <br />
            <em style={{ fontStyle: "italic", color: "#c4cdd6", display: "block" }}>{t("heading2")}</em>
          </h2>
        </motion.div>

        <motion.p className="font-dm" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }} style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.85, maxWidth: 480, margin: "32px auto 0" }}>
          {t("subtext")}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }} style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 48 }}>
          <Link
            href="/contact"
            className="font-dm"
            onMouseEnter={() => setHoveredPrimary(true)}
            onMouseLeave={() => setHoveredPrimary(false)}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "16px 36px", borderRadius: 9999,
              background: hoveredPrimary ? "rgba(242,240,236,0.88)" : "#f2f0ec",
              color: "#0a0a0a", fontSize: 14, fontWeight: 600, letterSpacing: "0.06em",
              textDecoration: "none", whiteSpace: "nowrap",
              transition: "background 0.25s, transform 0.25s, box-shadow 0.25s",
              transform: hoveredPrimary ? "translateY(-2px)" : "translateY(0)",
              boxShadow: hoveredPrimary ? "0 12px 32px rgba(242,240,236,0.15)" : "none",
            }}
          >
            {t("primaryBtn")}
          </Link>
          <a
            href="https://instagram.com/massishoots"
            target="_blank"
            rel="noopener noreferrer"
            className="font-dm"
            onMouseEnter={() => setHoveredSecondary(true)}
            onMouseLeave={() => setHoveredSecondary(false)}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "16px 36px", borderRadius: 9999,
              background: hoveredSecondary ? "rgba(255,255,255,0.06)" : "transparent",
              border: `1px solid ${hoveredSecondary ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)"}`,
              color: hoveredSecondary ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.8)",
              fontSize: 14, fontWeight: 500, letterSpacing: "0.06em",
              textDecoration: "none", whiteSpace: "nowrap",
              transition: "background 0.25s, border-color 0.25s, color 0.25s, transform 0.25s",
              transform: hoveredSecondary ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ opacity: 0.75 }}>
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
            {t("secondaryBtn")}
          </a>
        </motion.div>

        <motion.p className="font-dm" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.58, ease: "easeOut" }} style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginTop: 28, margin: "28px 0 0" }}>
          {t("footnote")}
        </motion.p>
      </div>
    </section>
  );
}

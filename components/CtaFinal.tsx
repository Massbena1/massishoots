"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

// ─── Button components ────────────────────────────────────────────────────────

function PrimaryBtn() {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/contact"
      className="font-dm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 36px",
        borderRadius: 9999,
        background: hovered ? "rgba(242,240,236,0.88)" : "#f2f0ec",
        color: "#0a0a0a",
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textDecoration: "none",
        transition: "background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px rgba(242,240,236,0.15)" : "none",
        whiteSpace: "nowrap",
      }}
    >
      Réserver un appel
    </Link>
  );
}

function SecondaryBtn() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="https://instagram.com/massishoots"
      target="_blank"
      rel="noopener noreferrer"
      className="font-dm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "16px 36px",
        borderRadius: 9999,
        background: hovered ? "rgba(255,255,255,0.06)" : "transparent",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)"}`,
        color: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.8)",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "0.06em",
        textDecoration: "none",
        transition: "background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        whiteSpace: "nowrap",
      }}
    >
      {/* Instagram glyph */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ opacity: 0.75 }}>
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
      Voir Instagram
    </a>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function CtaFinal() {
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
          — Prêt à passer au niveau supérieur ?
        </motion.span>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: 24 }}
        >
          <h2
            className="font-bebas"
            style={{
              fontSize: "clamp(52px, 9vw, 96px)",
              letterSpacing: "0.02em",
              lineHeight: 0.92,
              color: "#fff",
              margin: 0,
            }}
          >
            VOTRE IMAGE
            <br />
            <em
              style={{
                fontStyle: "italic",
                color: "#c4cdd6",
                display: "block",
              }}
            >
              MÉRITE MIEUX.
            </em>
          </h2>
        </motion.div>

        {/* Subtext */}
        <motion.p
          className="font-dm"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.85,
            maxWidth: 480,
            margin: "32px auto 0",
          }}
        >
          Chaque jour sans contenu premium est un jour où votre concurrence prend de l&apos;avance.
          Créons quelque chose d&apos;exceptionnel ensemble.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            marginTop: 48,
          }}
        >
          <PrimaryBtn />
          <SecondaryBtn />
        </motion.div>

        {/* Footer note */}
        <motion.p
          className="font-dm"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.58, ease: "easeOut" }}
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.1em",
            marginTop: 28,
            margin: "28px 0 0",
          }}
        >
          Disponible pour voyages · Réponse sous 24h · Premier appel gratuit
        </motion.p>
      </div>
    </section>
  );
}

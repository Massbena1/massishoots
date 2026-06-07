"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#0a0a0a",
        padding: "0 24px 140px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{
          maxWidth: 860,
          margin: "0 auto",
          textAlign: "center",
          border: "1px solid rgba(201,168,76,0.18)",
          borderRadius: 24,
          padding: "80px 48px",
          background: "linear-gradient(135deg, rgba(201,168,76,0.04) 0%, transparent 60%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Corner accent */}
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 80, height: 1,
          background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
        }} />

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-bebas"
          style={{
            fontSize: "clamp(36px, 6vw, 68px)",
            lineHeight: 0.95,
            letterSpacing: "0.02em",
            color: "#ffffff",
            marginBottom: 20,
          }}
        >
          Vous avez un projet.
          <br />
          <span style={{ color: "#C9A84C" }}>J&apos;ai la vision.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-dm"
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.5)",
            maxWidth: 480,
            margin: "0 auto 44px",
          }}
        >
          Prenons 30 minutes pour voir si on est faits pour travailler ensemble.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <a
            href="https://calendly.com/massishot-ca/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="font-dm"
            style={{
              display: "inline-block",
              background: "#C9A84C",
              color: "#0a0a0a",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "16px 36px",
              borderRadius: 9999,
              textDecoration: "none",
              transition: "background 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#e0bb5a";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#C9A84C";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            Réserver un appel gratuit →
          </a>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="font-dm"
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.22)",
            marginTop: 24,
            letterSpacing: "0.06em",
          }}
        >
          Sans engagement · Réponse sous 24h · 438-464-0607
        </motion.p>
      </motion.div>
    </section>
  );
}

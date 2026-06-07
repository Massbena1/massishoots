"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function AboutHero() {
  const t = useTranslations("aboutPage.hero");
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px 80px",
        background: "#0a0a0a",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Gold top line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 1,
          background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
          transformOrigin: "center",
        }}
      />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 700 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span
            className="font-dm"
            style={{
              display: "inline-block",
              fontSize: 11,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#C9A84C",
              border: "1px solid rgba(201,168,76,0.3)",
              padding: "6px 18px",
              borderRadius: 9999,
              marginBottom: 40,
            }}
          >
            {t("badge")}
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-bebas"
          style={{
            fontSize: "clamp(72px, 14vw, 140px)",
            lineHeight: 0.9,
            letterSpacing: "0.02em",
            color: "#ffffff",
            marginBottom: 24,
          }}
        >
          {t("name")}
        </motion.h1>

        {/* Subtitle italic gold */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(18px, 3vw, 26px)",
            color: "#C9A84C",
            marginBottom: 40,
            lineHeight: 1.3,
          }}
        >
          {t("subtitle")}
        </motion.p>

        {/* Gold separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            width: 48,
            height: 1,
            background: "rgba(201,168,76,0.4)",
            margin: "0 auto 40px",
            transformOrigin: "center",
          }}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="font-dm"
          style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.85,
            maxWidth: 520,
            margin: "0 auto",
          }}
        >
          {t("desc1")}
          <br />
          {t("desc2")}
          <br />
          <span style={{ color: "rgba(255,255,255,0.8)" }}>
            {t("desc3")}
          </span>
        </motion.p>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          pointerEvents: "none",
        }}
      >
        <span
          className="font-dm"
          style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 36,
            background: "linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      </motion.div>
    </section>
  );
}

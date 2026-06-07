"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function TarifsHero() {
  const t = useTranslations("tarifs.hero");
  return (
    <section
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "140px 24px 80px",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle gold gradient glow */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 600,
        height: 400,
        background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 860, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 28 }}
        >
          <span
            className="font-dm"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C9A84C",
              padding: "6px 16px",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: 9999,
              background: "rgba(201,168,76,0.06)",
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9A84C", display: "inline-block" }} />
            {t("badge")}
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          className="font-bebas"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: "clamp(44px, 7vw, 96px)",
            letterSpacing: "0.02em",
            lineHeight: 0.95,
            color: "#fff",
            marginBottom: 32,
          }}
        >
          {t("h1a")}
          <br />
          <span style={{ color: "#C9A84C" }}>{t("h1b")}</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            width: 60,
            height: 1,
            background: "linear-gradient(90deg, #C9A84C, transparent)",
            marginBottom: 28,
            transformOrigin: "left",
          }}
        />

        {/* Subtitle */}
        <motion.p
          className="font-dm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            fontSize: "clamp(15px, 1.8vw, 20px)",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.8,
            maxWidth: 620,
          }}
        >
          {t("subtitle")}
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ marginTop: 64, display: "flex", alignItems: "center", gap: 12 }}
        >
          <div style={{
            width: 1, height: 48,
            background: "linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)",
          }} />
          <span className="font-dm" style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
            {t("scrollHint")}
          </span>
        </motion.div>

      </div>
    </section>
  );
}

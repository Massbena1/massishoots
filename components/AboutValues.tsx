"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";



export default function AboutValues() {
  const t = useTranslations("aboutPage.values");
  const ref = useRef(null);
  const values = [
    { num: "01", title: t("v1title"), text: t("v1text") },
    { num: "02", title: t("v2title"), text: t("v2text") },
    { num: "03", title: t("v3title"), text: t("v3text") },
  ];
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{ background: "#0a0a0a", padding: "0 24px 120px" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-bebas"
          style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            lineHeight: 0.92,
            letterSpacing: "0.02em",
            color: "#ffffff",
            marginBottom: 64,
          }}
        >
          {t("title1")}
          <br />
          {t("title2")}
        </motion.h2>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 2,
          }}
        >
          {values.map((v, i) => (
            <motion.div
              key={v.num}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              style={{
                background: "#111",
                borderTop: "1px solid #C9A84C",
                padding: "40px 36px 44px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Big transparent number */}
              <span
                className="font-bebas"
                style={{
                  position: "absolute",
                  top: 16,
                  right: 24,
                  fontSize: 96,
                  lineHeight: 1,
                  color: "rgba(201,168,76,0.07)",
                  letterSpacing: "0.02em",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {v.num}
              </span>

              {/* Number small */}
              <span
                className="font-dm"
                style={{
                  display: "block",
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  color: "#C9A84C",
                  marginBottom: 20,
                }}
              >
                {v.num}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(18px, 2vw, 22px)",
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: 16,
                  lineHeight: 1.3,
                }}
              >
                {v.title}
              </h3>

              {/* Text */}
              <p
                className="font-dm"
                style={{
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.5)",
                  margin: 0,
                }}
              >
                {v.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

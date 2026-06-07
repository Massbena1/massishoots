"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutStory() {
  const t = useTranslations("aboutPage.story");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#0a0a0a",
        padding: "120px 24px",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* Label */}
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
          className="font-dm"
          style={{
            display: "block",
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#C9A84C",
            marginBottom: 28,
          }}
        >
          {t("label")}
        </motion.span>

        {/* Title */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-bebas"
          style={{
            fontSize: "clamp(44px, 8vw, 88px)",
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

        {/* Paragraphe 1 */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-dm"
          style={{
            fontSize: 17,
            lineHeight: 1.9,
            color: "rgba(255,255,255,0.62)",
            marginBottom: 40,
          }}
        >
          {t("p1")}
        </motion.p>

        {/* Paragraphe 2 */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-dm"
          style={{
            fontSize: 17,
            lineHeight: 1.9,
            color: "rgba(255,255,255,0.62)",
            marginBottom: 56,
          }}
        >
          {t("p2")}
        </motion.p>

        {/* Citation gold */}
        <motion.blockquote
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            borderLeft: "2px solid #C9A84C",
            paddingLeft: 28,
            margin: "0 0 56px",
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(20px, 3vw, 26px)",
              color: "#C9A84C",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {t("quote")}
          </p>
        </motion.blockquote>

        {/* Paragraphe 3 */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-dm"
          style={{
            fontSize: 17,
            lineHeight: 1.9,
            color: "rgba(255,255,255,0.62)",
          }}
        >
          {t("p3a")}{" "}
          <span style={{ color: "rgba(255,255,255,0.88)" }}>
            {t("p3b")}
          </span>{" "}
          {t("p3c")}
        </motion.p>

      </div>
    </section>
  );
}

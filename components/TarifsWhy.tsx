"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";



export default function TarifsWhy() {
  const t = useTranslations("tarifs.why");
  const ARGS = [
    { title: t("a1title"), text: t("a1text") },
    { title: t("a2title"), text: t("a2text") },
    { title: t("a3title"), text: t("a3text") },
  ];
  return (
    <section style={{ background: "#0a0a0a", padding: "100px 24px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>

        {/* Title */}
        <motion.h2
          className="font-bebas"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "clamp(28px, 4vw, 52px)",
            letterSpacing: "0.02em",
            color: "#fff",
            lineHeight: 1.05,
            marginBottom: 64,
            maxWidth: 640,
          }}
        >
          {t("heading")}
        </motion.h2>

        {/* Arguments */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {ARGS.map((arg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              {/* Gold separator */}
              <div style={{
                height: 1,
                background: "linear-gradient(90deg, rgba(201,168,76,0.5), rgba(201,168,76,0.08), transparent)",
                marginBottom: 40,
              }} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48, paddingBottom: 48, alignItems: "start" }} className="why-row">
                <h3 className="font-playfair" style={{
                  fontSize: "clamp(17px, 1.8vw, 22px)",
                  color: "#C9A84C",
                  fontStyle: "italic",
                  lineHeight: 1.45,
                  margin: 0,
                }}>
                  {arg.title}
                </h3>
                <p className="font-dm" style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.85,
                  margin: 0,
                }}>
                  {arg.text}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Final separator */}
          <div style={{
            height: 1,
            background: "linear-gradient(90deg, rgba(201,168,76,0.5), rgba(201,168,76,0.08), transparent)",
          }} />
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .why-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}

"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const AVATARS = [
  "/testimonials/carle.jpg",
  "/testimonials/christine.jpg",
  "/testimonials/stephanie.jpg",
  "/testimonials/emmanuel.jpg",
];

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const rawItems = t.raw("items") as Array<{ name: string; role: string; text: string }>;

  const testimonials = rawItems.map((item, i) => ({
    id: i + 1,
    testimonial: item.text,
    name: item.name,
    role: item.role,
    avatar: AVATARS[i] ?? AVATARS[0],
  }));

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="temoignages" style={{ padding: "140px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 64 }}
        >
          <span className="font-dm" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A84C" }}>
            {t("label")}
          </span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(44px, 7vw, 80px)", letterSpacing: "0.02em", lineHeight: 0.9, marginTop: 16, color: "#fff" }}>
            {t("heading")}
          </h2>
          <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginTop: 12 }}>
            {t("subtitle")}
          </p>
        </motion.div>

        {/* 2x2 Grid */}
        <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {testimonials.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              style={{
                position: "relative",
                background: "#0f0f0f",
                borderLeft: "2px solid #C9A84C",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "0 12px 12px 0",
                padding: 28,
                overflow: "hidden",
              }}
            >
              {/* Gold opening quote */}
              <span style={{
                position: "absolute",
                top: 12,
                left: 20,
                fontSize: 72,
                lineHeight: 1,
                color: "#C9A84C",
                opacity: 0.15,
                fontFamily: "Georgia, serif",
                userSelect: "none",
                pointerEvents: "none",
              }}>
                "
              </span>

              {/* Stars */}
              <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                {[...Array(5)].map((_, s) => (
                  <span key={s} style={{ color: "#C9A84C", fontSize: 12 }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="font-dm" style={{
                fontSize: 14,
                fontStyle: "italic",
                color: "#f0ebe0",
                lineHeight: 1.75,
                marginBottom: 24,
                position: "relative",
                zIndex: 1,
              }}>
                &ldquo;{item.testimonial}&rdquo;
              </p>

              {/* Author row */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
                  padding: 1.5,
                  background: "linear-gradient(135deg, #C9A84C, rgba(201,168,76,0.3))",
                }}>
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="testimonial-avatar"
                    style={{
                      width: "100%", height: "100%",
                      borderRadius: "50%",
                      objectPosition: "center",
                    }}
                  />
                </div>
                <div>
                  <p className="font-dm" style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>
                    {item.name}
                  </p>
                  <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.02em" }}>
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

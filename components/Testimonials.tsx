"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShuffleCards } from "@/components/ui/testimonial-cards";
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
    author: `${item.name} · ${item.role}`,
    avatar: AVATARS[i] ?? AVATARS[0],
  }));

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="temoignages" style={{ padding: "140px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 80 }}
        >
          <span className="font-dm text-accent" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>
            {t("label")}
          </span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(44px, 7vw, 80px)", letterSpacing: "0.02em", lineHeight: 0.9, marginTop: 16, color: "#fff" }}>
            {t("heading")}
          </h2>
          <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginTop: 12 }}>
            {t("subtitle")}
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "400px 1fr", gap: 80, alignItems: "center" }} className="testimonials-layout">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: "relative" }}
          >
            <ShuffleCards testimonials={testimonials} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.borderColor = "rgba(196,205,214,0.2)";
                  e.currentTarget.style.transform = "translateX(6px)";
                  const avatar = e.currentTarget.querySelector("img") as HTMLElement;
                  if (avatar) avatar.style.borderColor = "rgba(196,205,214,0.5)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform = "translateX(0)";
                  const avatar = e.currentTarget.querySelector("img") as HTMLElement;
                  if (avatar) avatar.style.borderColor = "rgba(196,205,214,0.2)";
                }}
                style={{
                  padding: "20px 24px",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  position: "relative",
                  overflow: "hidden",
                  transition: "background 0.3s ease, border-color 0.3s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                  cursor: "none",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 16, right: 16, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />
                <img
                  src={t.avatar}
                  alt={t.author}
                  style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", objectPosition: "center top", flexShrink: 0, border: "1px solid rgba(196,205,214,0.2)" }}
                />
                <div>
                  <p className="font-dm" style={{ fontSize: 12, fontStyle: "italic", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 4 }}>
                    &ldquo;{t.testimonial.slice(0, 70)}…&rdquo;
                  </p>
                  <p className="font-dm" style={{ fontSize: 11, color: "#c4cdd6", fontWeight: 600, letterSpacing: "0.06em" }}>
                    {t.author}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .testimonials-layout {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .testimonials-layout > div:first-child {
            display: flex;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}

"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");
  const gear = t.raw("equipment") as Array<{ name: string; role: string }>;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="apropos" ref={ref} style={{ padding: "140px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="about-grid">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={e => {
            const img = e.currentTarget.querySelector("img");
            if (img) { img.style.transform = "scale(1.1)"; img.style.filter = "brightness(0.85)"; }
            e.currentTarget.style.borderColor = "rgba(196,205,214,0.35)";
            e.currentTarget.style.boxShadow = "0 32px 80px rgba(0,0,0,0.55)";
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={e => {
            const img = e.currentTarget.querySelector("img");
            if (img) { img.style.transform = "scale(1)"; img.style.filter = "brightness(1)"; }
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          style={{ position: "relative", aspectRatio: "3/4", borderRadius: 28, overflow: "hidden", maxWidth: 460, border: "1px solid rgba(255,255,255,0.09)", transition: "border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease", cursor: "none" }}
        >
          <Image
            src="/moi.jpg"
            alt="Massi Bena – Massishoots"
            fill
            style={{ objectFit: "cover", objectPosition: "center top", transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1), filter 0.5s ease" }}
          />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "45%",
            background: "linear-gradient(to top, rgba(7,9,13,0.92) 0%, rgba(7,9,13,0.6) 50%, transparent 100%)",
          }} />
          <div style={{
            position: "absolute", bottom: 28, left: 24, right: 24,
            padding: "16px 20px",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 18,
          }}>
            <div style={{ position: "absolute", top: 0, left: 16, right: 16, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />
            <p className="font-bebas" style={{ fontSize: 20, letterSpacing: "0.12em", color: "#fff", lineHeight: 1.1 }}>{t("nameBadge")}</p>
            <p className="font-dm" style={{ fontSize: 12, color: "#c4cdd6", marginTop: 4, letterSpacing: "0.08em" }}>{t("roleBadge")}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-dm text-accent" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>{t("label")}</span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(44px, 6vw, 72px)", letterSpacing: "0.02em", lineHeight: 0.9, margin: "16px 0 28px", color: "#fff" }}>
            {t("heading1")}<br />{t("heading2")}
          </h2>
          <p className="font-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.9, marginBottom: 18 }}>
            {t("para1")}
          </p>
          <p className="font-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.9, marginBottom: 40 }}>
            {t("para2")}
          </p>

          <div style={{
            padding: "24px 28px",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 20, right: 20, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }} />
            <p className="font-dm" style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase", marginBottom: 18 }}>{t("equipmentLabel")}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {gear.map((g) => (
                <div
                  key={g.name}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(196,205,214,0.06)";
                    e.currentTarget.style.borderRadius = "12px";
                    e.currentTarget.style.paddingLeft = "8px";
                    e.currentTarget.style.paddingRight = "8px";
                    const dot = e.currentTarget.querySelector(".gear-dot") as HTMLElement;
                    if (dot) { dot.style.background = "#fff"; dot.style.boxShadow = "0 0 6px rgba(196,205,214,0.6)"; }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.paddingLeft = "0";
                    e.currentTarget.style.paddingRight = "0";
                    const dot = e.currentTarget.querySelector(".gear-dot") as HTMLElement;
                    if (dot) { dot.style.background = "#c4cdd6"; dot.style.boxShadow = "none"; }
                  }}
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "4px 0", transition: "background 0.3s, padding 0.3s", cursor: "none" }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                    background: "rgba(196,205,214,0.08)",
                    border: "1px solid rgba(196,205,214,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.3s, border-color 0.3s",
                  }}>
                    <span className="gear-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#c4cdd6", display: "block", transition: "background 0.3s, box-shadow 0.3s" }} />
                  </div>
                  <div>
                    <span className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 500, display: "block" }}>{g.name}</span>
                    <span className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{g.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`@media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  );
}

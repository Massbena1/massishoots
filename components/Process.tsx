"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Array<{ title: string; desc: string; detail: string }>;
  const nums = ["01", "02", "03", "04"];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="processus" style={{ padding: "140px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ marginBottom: 80 }}>
          <span className="font-dm text-accent" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>
            {t("label")}
          </span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(44px, 7vw, 80px)", letterSpacing: "0.02em", lineHeight: 0.9, marginTop: 16, color: "#fff" }}>
            {t("heading")}
          </h2>
        </motion.div>

        <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
          {steps.map((step, i) => (
            <motion.div
              key={nums[i]}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{ padding: "40px 32px", borderLeft: i === 0 ? "1px solid rgba(255,255,255,0.08)" : "none", borderRight: "1px solid rgba(255,255,255,0.08)", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "relative", transition: "background 0.35s ease, box-shadow 0.35s ease" }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.boxShadow = "inset 0 0 40px rgba(196,205,214,0.03)";
                const num = e.currentTarget.querySelector(".process-num") as HTMLElement;
                if (num) num.style.color = "rgba(255,255,255,0.10)";
                const line = e.currentTarget.querySelector(".process-line") as HTMLElement;
                if (line) { line.style.width = "56px"; line.style.background = "#fff"; }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
                const num = e.currentTarget.querySelector(".process-num") as HTMLElement;
                if (num) num.style.color = "rgba(255,255,255,0.06)";
                const line = e.currentTarget.querySelector(".process-line") as HTMLElement;
                if (line) { line.style.width = "32px"; line.style.background = "#c4cdd6"; }
              }}
            >
              <div className="font-bebas process-num" style={{ fontSize: "clamp(72px, 8vw, 120px)", lineHeight: 1, letterSpacing: "-0.02em", color: "rgba(255,255,255,0.06)", marginBottom: 32, userSelect: "none", transition: "color 0.35s ease" }}>
                {nums[i]}
              </div>
              <motion.div className="process-line" initial={{ width: 0 }} animate={inView ? { width: 32 } : {}} transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }} style={{ height: 1, background: "#c4cdd6", marginBottom: 24, transition: "width 0.4s cubic-bezier(0.22,1,0.36,1), background 0.3s ease" }} />
              <h3 className="font-bebas" style={{ fontSize: "clamp(28px, 2.5vw, 38px)", letterSpacing: "0.04em", color: "#fff", lineHeight: 1, marginBottom: 16 }}>
                {step.title}
              </h3>
              <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 24 }}>
                {step.desc}
              </p>
              <span className="font-dm" style={{ fontSize: 10, color: "#c4cdd6", letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 14px", background: "rgba(196,205,214,0.06)", border: "1px solid rgba(196,205,214,0.15)", borderRadius: 9999, display: "inline-block" }}>
                {step.detail}
              </span>
              {i < steps.length - 1 && (
                <div style={{ position: "absolute", top: "50%", right: -12, transform: "translateY(-50%)", zIndex: 2, width: 24, height: 24, borderRadius: "50%", background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>→</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .process-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .process-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

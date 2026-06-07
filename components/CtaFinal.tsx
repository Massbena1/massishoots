"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ background: "#0a0a0a" }}
    >
      {/* Lamp effect — decorative only */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center" style={{ zIndex: 0 }}>
        {/* Wide light cone */}
        <div style={{
          width: "100%", maxWidth: "900px", height: "420px",
          background: "radial-gradient(ellipse 50% 100% at 50% 0%, rgba(201,168,76,0.2) 0%, rgba(201,168,76,0.06) 50%, transparent 80%)",
        }} />
      </div>

      {/* Gold line at very top */}
      <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ width: "6rem", opacity: 0 }}
          whileInView={{ width: "28rem", opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          style={{ height: "1px", background: "linear-gradient(to right, transparent, #C9A84C, transparent)" }}
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center px-6 pt-28 pb-24" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
};

export default function CtaFinal() {
  const t = useTranslations("cta");
  const [hoveredSecondary, setHoveredSecondary] = useState(false);

  return (
    <section id="cta" style={{ position: "relative" }}>
      <LampContainer>
        {/* Label */}
        <motion.span
          className="font-dm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 24, display: "block" }}
        >
          {t("label")}
        </motion.span>

        {/* Heading */}
        <motion.h2
          className="font-bebas"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
          style={{
            fontSize: "clamp(52px, 9vw, 96px)",
            letterSpacing: "0.02em",
            lineHeight: 0.92,
            color: "#fff",
            textAlign: "center",
            marginBottom: 0,
          }}
        >
          {t("heading1")}
          <br />
          <em style={{ fontStyle: "italic", color: "#c4cdd6" }}>{t("heading2")}</em>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="font-dm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.85, maxWidth: 480, margin: "28px auto 0", textAlign: "center" }}
        >
          {t("subtext")}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.7 }}
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 44 }}
        >
          <Link
            href="/contact"
            className="font-dm"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "16px 36px", borderRadius: 9999,
              background: "#C9A84C",
              color: "#0a0a0a", fontSize: 14, fontWeight: 700, letterSpacing: "0.06em",
              textDecoration: "none", whiteSpace: "nowrap",
              boxShadow: "0 0 32px rgba(201,168,76,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 48px rgba(201,168,76,0.55)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(201,168,76,0.35)";
            }}
          >
            {t("primaryBtn")}
          </Link>
          <a
            href="https://instagram.com/massishoots"
            target="_blank"
            rel="noopener noreferrer"
            className="font-dm"
            onMouseEnter={() => setHoveredSecondary(true)}
            onMouseLeave={() => setHoveredSecondary(false)}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "16px 36px", borderRadius: 9999,
              background: hoveredSecondary ? "rgba(255,255,255,0.06)" : "transparent",
              border: `1px solid ${hoveredSecondary ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)"}`,
              color: hoveredSecondary ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.8)",
              fontSize: 14, fontWeight: 500, letterSpacing: "0.06em",
              textDecoration: "none", whiteSpace: "nowrap",
              transition: "background 0.25s, border-color 0.25s, color 0.25s, transform 0.25s",
              transform: hoveredSecondary ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ opacity: 0.75 }}>
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
            {t("secondaryBtn")}
          </a>
        </motion.div>

        {/* Footnote */}
        <motion.p
          className="font-dm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", marginTop: 28 }}
        >
          {t("footnote")}
        </motion.p>
      </LampContainer>
    </section>
  );
}

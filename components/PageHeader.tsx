"use client";
import { motion } from "framer-motion";

interface PageHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  return (
    <section className="page-header-section" style={{
      paddingTop: "160px",
      paddingBottom: "80px",
      paddingLeft: "24px",
      paddingRight: "24px",
      maxWidth: 1280,
      margin: "0 auto",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-dm" style={{
          fontSize: 11,
          letterSpacing: "0.32em",
          color: "#c4cdd6",
          textTransform: "uppercase",
          display: "block",
          marginBottom: 18,
        }}>
          — {label}
        </span>
        <h1 className="font-bebas" style={{
          fontSize: "clamp(56px, 9vw, 110px)",
          lineHeight: 0.88,
          letterSpacing: "0.02em",
          color: "#fff",
          marginBottom: subtitle ? 24 : 0,
        }}>
          {title}
        </h1>
        {subtitle && (
          <p className="font-dm" style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.4)",
            maxWidth: 520,
            lineHeight: 1.75,
            marginTop: 20,
          }}>
            {subtitle}
          </p>
        )}
      </motion.div>

      {/* Thin separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: 1,
          background: "linear-gradient(90deg, rgba(0,229,255,0.3), rgba(255,255,255,0.06) 60%, transparent)",
          marginTop: 48,
          transformOrigin: "left",
        }}
      />
      <style>{`
        @media (max-width: 768px) {
          .page-header-section { padding-top: 100px !important; padding-bottom: 48px !important; }
        }
      `}</style>
    </section>
  );
}

"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type FaqItem = { q: string; a: string };

function FaqItemRow({ item, index, inView }: { item: FaqItem; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 24, padding: "26px 0",
          background: "none", border: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, flex: 1 }}>
          <span className="font-bebas" style={{ fontSize: 12, color: "rgba(196,205,214,0.4)", letterSpacing: "0.2em", flexShrink: 0, minWidth: 24 }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-dm" style={{ fontSize: "clamp(14px, 1.8vw, 17px)", color: open ? "#fff" : "rgba(255,255,255,0.75)", fontWeight: open ? 600 : 400, lineHeight: 1.45, transition: "color 0.25s" }}>
            {item.q}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 32, height: 32, borderRadius: "50%",
            border: open ? "1px solid rgba(196,205,214,0.4)" : "1px solid rgba(255,255,255,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            background: open ? "rgba(196,205,214,0.08)" : "transparent",
            transition: "background 0.25s, border-color 0.25s",
          }}
        >
          <Plus size={13} color={open ? "#c4cdd6" : "rgba(255,255,255,0.45)"} strokeWidth={2} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="font-dm" style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.85, paddingBottom: 26, paddingLeft: 40, maxWidth: 760, display: "flex", flexDirection: "column", gap: 12 }}>
              {item.a.split("\n\n").map((para, i) => (
                <p key={i} style={{ margin: 0 }}>{para}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" style={{ padding: "140px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end", marginBottom: 72 }} className="faq-header">
          <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <span className="font-dm text-accent" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: 14 }}>
              {t("label")}
            </span>
            <h2 className="font-bebas" style={{ fontSize: "clamp(48px, 6vw, 88px)", letterSpacing: "0.02em", lineHeight: 0.9, color: "#fff" }}>
              {t("heading1")}<br />
              {t("heading2")}<br />
              <span style={{ color: "#c4cdd6" }}>{t("headingAccent")}</span>
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.12 }}>
            <p className="font-dm" style={{ fontSize: "clamp(14px, 1.6vw, 17px)", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: 28 }}>
              {t("intro")}
            </p>
            <Link
              href="/contact#appel-decouverte"
              className="font-dm"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 24px", borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.55)", textDecoration: "none",
                fontSize: 13, letterSpacing: "0.06em", transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(196,205,214,0.4)"; e.currentTarget.style.color = "#c4cdd6"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
            >
              {t("cta")}
            </Link>
          </motion.div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {items.map((item, i) => (
            <FaqItemRow key={i} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-header { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

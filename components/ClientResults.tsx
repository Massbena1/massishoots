"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

const METRICS = [
  {
    value: "+127%",
    label: "Engagement moyen",
    sub: "Après 3 mois de contenu mensuel",
  },
  {
    value: "2M+",
    label: "Vues générées",
    sub: "Sur les Reels & vidéos clients",
  },
  {
    value: "50+",
    label: "Clients accompagnés",
    sub: "Entrepreneurs & marques à Montréal",
  },
  {
    value: "48h",
    label: "Livraison express",
    sub: "Pour les projets urgents",
  },
];

export default function ClientResults() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 28,
          padding: "56px 48px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, transparent, rgba(196,205,214,0.2), transparent)" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40 }} className="results-layout">

            {/* Left — title */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              style={{ maxWidth: 280 }}
            >
              <span className="font-dm" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c4cdd6", display: "block", marginBottom: 16 }}>
                — Résultats réels
              </span>
              <h2 className="font-bebas" style={{ fontSize: "clamp(36px, 4vw, 52px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, marginBottom: 20 }}>
                CE QUE<br />NOS CLIENTS<br />OBTIENNENT
              </h2>
              <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: 28 }}>
                Du contenu qui performe — pas juste du contenu qui est beau.
              </p>
              <Link href="/contact" className="font-dm"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", background: "#f2f0ec", color: "#0a0a0a", borderRadius: 9999, textDecoration: "none", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em" }}>
                Démarrer <ArrowRight size={12} />
              </Link>
            </motion.div>

            {/* Right — metrics grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, flex: 1, minWidth: 280 }}>
              {METRICS.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                  style={{
                    padding: "24px 20px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 18,
                  }}
                >
                  <div className="font-bebas" style={{ fontSize: "clamp(32px, 4vw, 44px)", color: "#c4cdd6", letterSpacing: "0.02em", lineHeight: 1, marginBottom: 6 }}>
                    {m.value}
                  </div>
                  <p className="font-dm" style={{ fontSize: 13, color: "#fff", fontWeight: 600, marginBottom: 4 }}>
                    {m.label}
                  </p>
                  <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>
                    {m.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .results-layout { flex-direction: column !important; }
        }
      `}</style>
    </section>
  );
}

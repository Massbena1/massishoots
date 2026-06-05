"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import { Zap, ArrowRight } from "lucide-react";

export default function SimulateurCta() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: "0 24px 60px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            padding: "48px 40px",
            background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.03) 100%)",
            border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 28,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)" }} />

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Zap size={22} color="#818cf8" />
            </div>
            <div>
              <p className="font-dm" style={{ fontSize: 11, color: "#818cf8", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>
                Simulateur IA gratuit
              </p>
              <h3 className="font-bebas" style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 1, marginBottom: 6 }}>
                3 IDÉES DE REELS POUR TON BUSINESS
              </h3>
              <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                Choisis ton secteur → reçois des idées de contenu personnalisées en 10 secondes.
              </p>
            </div>
          </div>

          <Link href="/simulateur" className="font-dm"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#818cf8", color: "#fff", borderRadius: 9999, textDecoration: "none", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", whiteSpace: "nowrap", flexShrink: 0 }}>
            Générer mes idées <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

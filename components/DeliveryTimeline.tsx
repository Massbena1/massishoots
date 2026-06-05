"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    day: "J0",
    label: "Appel gratuit",
    desc: "On discute de ton projet, tes objectifs et ton budget. Aucun engagement.",
    color: "#c4cdd6",
  },
  {
    day: "J3",
    label: "Devis & contrat",
    desc: "Tu reçois un devis détaillé. Signature du contrat et confirmation du tournage.",
    color: "#a8b5c0",
  },
  {
    day: "J7",
    label: "Tournage",
    desc: "On tourne selon le plan créatif établi. Toute l'équipe est mobilisée pour toi.",
    color: "#8fa0ae",
  },
  {
    day: "J14",
    label: "Montage",
    desc: "Sélection des meilleures prises, montage professionnel, color grading cinématique.",
    color: "#788e9e",
  },
  {
    day: "J19",
    label: "Livraison",
    desc: "Tu reçois tes fichiers haute résolution. Révisions incluses selon ton forfait.",
    color: "#c4cdd6",
  },
];

export default function DeliveryTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: "80px 0 100px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <span className="font-dm" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c4cdd6" }}>
            — Comment ça marche
          </span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(36px, 5vw, 56px)", color: "#fff", letterSpacing: "0.03em", marginTop: 12, lineHeight: 0.95 }}>
            DE L&apos;APPEL À<br />LA LIVRAISON
          </h2>
          <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 16 }}>
            Un processus clair, sans surprise — de A à Z en moins de 3 semaines.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>

          {/* Line */}
          <div style={{ position: "absolute", top: 28, left: "10%", right: "10%", height: 1, background: "rgba(255,255,255,0.06)" }} className="timeline-line" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            style={{ position: "absolute", top: 28, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, #c4cdd6, rgba(196,205,214,0.3))", transformOrigin: "left" }}
            className="timeline-line"
          />

          {/* Steps */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }} className="timeline-steps">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.day}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
              >
                {/* Dot */}
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "rgba(10,10,12,1)",
                  border: `1.5px solid ${step.color}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20, position: "relative", zIndex: 2,
                  flexShrink: 0,
                }}>
                  <span className="font-bebas" style={{ fontSize: 14, color: step.color, letterSpacing: "0.06em" }}>{step.day}</span>
                </div>

                {/* Label */}
                <p className="font-bebas" style={{ fontSize: 16, color: "#fff", letterSpacing: "0.06em", marginBottom: 8, lineHeight: 1 }}>
                  {step.label}
                </p>

                {/* Desc */}
                <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, maxWidth: 160 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{ textAlign: "center", marginTop: 56 }}
        >
          <Link href="/contact" className="font-dm"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "#f2f0ec", color: "#0a0a0a", borderRadius: 9999, textDecoration: "none", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em" }}>
            Démarrer mon projet <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-steps { flex-direction: column !important; align-items: flex-start !important; gap: 32px !important; }
          .timeline-steps > div { flex-direction: row !important; text-align: left !important; gap: 16px; align-items: flex-start !important; }
          .timeline-steps > div > div:first-child { flex-shrink: 0; margin-bottom: 0 !important; }
          .timeline-line { display: none !important; }
        }
      `}</style>
    </section>
  );
}

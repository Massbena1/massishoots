"use client";

import { motion } from "framer-motion";

const BLOCS = [
  {
    num: "01",
    icon: "📸",
    title: "Contenu Mensuel",
    desc: "Photos, Reels, face caméra — votre présence en ligne gérée chaque mois, clés en main. Idéal pour les entrepreneurs qui veulent scaler leur image sans y penser.",
    full: false,
  },
  {
    num: "02",
    icon: "🎬",
    title: "Couverture d'Événements",
    desc: "Galas, lancements, conférences, soirées privées — photo et vidéo cinématique livrées en 48h. Votre événement immortalisé avec la précision qu'il mérite.",
    full: false,
  },
  {
    num: "03",
    icon: "📱",
    title: "Publicité & Ads",
    desc: "Vidéos courtes et visuels conçus pour convertir sur Meta et Instagram. Formats optimisés, accroches testées, résultats mesurables.",
    full: false,
  },
  {
    num: "04",
    icon: "💍",
    title: "Mariage & Célébrations",
    desc: "Chaque émotion capturée avec une précision rare. Du premier regard à la dernière danse — photo et film cinématique sur mesure.",
    full: false,
  },
  {
    num: "05",
    icon: "✦",
    title: "Projets Sur Mesure",
    desc: "Corporate, editorial, campagne de marque, immobilier de luxe — si votre projet sort des sentiers battus, c'est exactement là où on excelle.",
    full: true,
  },
];

export default function TarifsExpertise() {
  return (
    <section style={{ padding: "100px 24px", background: "transparent" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <span className="font-dm" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A84C" }}>
            — Ce qu&apos;on crée
          </span>
          <h2 className="font-bebas" style={{
            fontSize: "clamp(36px, 5vw, 68px)",
            letterSpacing: "0.02em",
            lineHeight: 0.95,
            color: "#fff",
            marginTop: 16,
          }}>
            Nos domaines d&apos;expertise
          </h2>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
        }}
          className="expertise-grid"
        >
          {BLOCS.map((bloc, i) => (
            <motion.div
              key={bloc.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              style={{
                gridColumn: bloc.full ? "1 / -1" : "span 1",
                position: "relative",
                background: "#111",
                border: "0.5px solid rgba(201,168,76,0.3)",
                borderRadius: 20,
                padding: "40px 40px 36px",
                overflow: "hidden",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.7)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)")}
            >
              {/* Background number */}
              <span style={{
                position: "absolute",
                right: 24,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "clamp(80px, 10vw, 140px)",
                fontFamily: "var(--font-bebas-neue), sans-serif",
                color: "rgba(201,168,76,0.06)",
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
                letterSpacing: "0.02em",
              }}>
                {bloc.num}
              </span>

              {/* Top highlight */}
              <div style={{
                position: "absolute", top: 0, left: 32, right: 32, height: 1,
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)",
              }} />

              {/* Content */}
              <div style={{ position: "relative", zIndex: 1, maxWidth: bloc.full ? 680 : "100%" }}>
                <span style={{ fontSize: 28, display: "block", marginBottom: 20 }}>{bloc.icon}</span>

                <h3 className="font-bebas" style={{
                  fontSize: "clamp(24px, 2.8vw, 36px)",
                  letterSpacing: "0.04em",
                  color: "#fff",
                  marginBottom: 14,
                  lineHeight: 1,
                }}>
                  {bloc.title}
                </h3>

                <p className="font-dm" style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.8,
                  maxWidth: 480,
                }}>
                  {bloc.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 700px) {
          .expertise-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

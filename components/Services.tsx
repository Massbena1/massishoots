"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    id: "01",
    title: "Personal Branding",
    desc: "Photos et vidéos qui définissent ton identité professionnelle. Contenu premium pour Instagram, LinkedIn et ton site web.",
    price: "À partir de 499 $",
    tags: ["Portrait", "Lifestyle", "Réseaux sociaux"],
    wide: true,
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
  },
  {
    id: "02",
    title: "Corporate B2B",
    desc: "Contenu visuel haut de gamme pour entreprises et campagnes publicitaires.",
    price: "À partir de 999 $",
    tags: ["Entreprise", "Publicité"],
    wide: false,
    img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
  },
  {
    id: "03",
    title: "Events & Weddings",
    desc: "Chaque moment capturé avec l'œil d'un artiste. Mariages, galas, conférences.",
    price: "À partir de 799 $",
    tags: ["Mariage", "Événement"],
    wide: false,
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  },
];

function ServiceCard({ s, index }: { s: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      style={{
        gridColumn: s.wide ? "span 2" : "span 1",
        position: "relative",
        borderRadius: 28,
        overflow: "hidden",
        aspectRatio: s.wide ? "16/7" : "4/5",
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "border-color 0.4s, box-shadow 0.4s",
        cursor: "pointer",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(196,205,214,0.3)";
        e.currentTarget.style.boxShadow = "0 0 40px rgba(196,205,214,0.06)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* BG image */}
      <img
        src={s.img}
        alt={s.title}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover",
          transition: "transform 0.9s ease",
          filter: "brightness(0.28) saturate(0.4)",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      />

      {/* Glacial glass overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(7,9,13,0.85) 0%, rgba(7,9,13,0.4) 60%, transparent 100%)",
      }} />
      {/* Top highlight */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, height: "100%", padding: 32, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span className="font-bebas" style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em" }}>{s.id}</span>
          {/* Price glass pill */}
          <span className="font-dm" style={{
            fontSize: 12, color: "#c4cdd6", fontWeight: 600,
            padding: "5px 14px",
            background: "rgba(196,205,214,0.08)",
            border: "1px solid rgba(196,205,214,0.2)",
            borderRadius: 9999,
            backdropFilter: "blur(8px)",
          }}>{s.price}</span>
        </div>

        <div>
          <h3 className="font-bebas" style={{ fontSize: s.wide ? 52 : 34, letterSpacing: "0.03em", color: "#fff", lineHeight: 0.95, marginBottom: 12 }}>{s.title}</h3>
          <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: 380, marginBottom: 20 }}>{s.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {s.tags.map(t => (
              <span key={t} className="font-dm" style={{
                padding: "5px 14px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 9999,
                fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" style={{ padding: "140px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 56 }}
        >
          <span className="font-dm text-accent" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>— Ce que je fais</span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(44px, 7vw, 80px)", letterSpacing: "0.02em", lineHeight: 0.9, marginTop: 16, color: "#fff" }}>MES SERVICES</h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="services-grid">
          {services.map((s, i) => <ServiceCard key={s.id} s={s} index={i} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .services-grid > * { grid-column: span 1 !important; aspect-ratio: 4/3 !important; }
        }
      `}</style>
    </section>
  );
}

"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { PixelCanvas } from "@/components/ui/pixel-canvas";

const services = [
  {
    id: "01",
    title: "Contenu Mensuel",
    badge: "Service Principal",
    desc: "Personal branding, face caméra, Reels, photos — un package complet livré chaque mois pour les entrepreneurs qui veulent une présence forte en ligne.",
    price: "À partir de 499 $/mois",
    tags: ["Personal Branding", "Reels", "Face Caméra", "Photo"],
    wide: true,
    img: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=1200&q=80",
    star: true,
  },
  {
    id: "02",
    title: "Couverture d'Événements",
    badge: null,
    desc: "Soirées, lancements, galas, conférences — photo + vidéo complète. Tu gardes tout, je livre vite.",
    price: "À partir de 699 $",
    tags: ["Soirées", "Galas", "Conférences", "Lancements"],
    wide: false,
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    star: false,
  },
  {
    id: "03",
    title: "Publicité",
    badge: null,
    desc: "Contenu pour les ads Meta & Instagram — vidéo courte, accroches visuelles, formats adaptés aux campagnes qui convertissent.",
    price: "À partir de 599 $",
    tags: ["Meta Ads", "Instagram", "Vidéo Courte", "UGC"],
    wide: false,
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    star: false,
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
      style={{
        gridColumn: s.wide ? "span 2" : "span 1",
        position: "relative",
        borderRadius: 28,
        overflow: "hidden",
        aspectRatio: s.wide ? "16/7" : "4/5",
        border: s.star ? "1px solid rgba(196,205,214,0.2)" : "1px solid rgba(255,255,255,0.08)",
        transition: "border-color 0.4s, box-shadow 0.4s",
        cursor: "pointer",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(196,205,214,0.35)";
        e.currentTarget.style.boxShadow = "0 0 48px rgba(196,205,214,0.07)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = s.star ? "rgba(196,205,214,0.2)" : "rgba(255,255,255,0.08)";
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

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(7,9,13,0.92) 0%, rgba(7,9,13,0.5) 60%, transparent 100%)",
      }} />

      {/* Pixel hover effect — above background layers */}
      <PixelCanvas
        colors={["#ffffff", "#c4cdd6", "#8892a0", "#ffffff"]}
        gap={4}
        speed={40}
        zIndex={8}
      />

      {/* Top highlight */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: s.star
          ? "linear-gradient(90deg, transparent, rgba(196,205,214,0.25), transparent)"
          : "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, height: "100%", padding: 32, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span className="font-bebas" style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em" }}>{s.id}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {s.star && (
              <span className="font-dm" style={{
                fontSize: 10, color: "#0a0a0a", fontWeight: 700,
                padding: "4px 12px",
                background: "#c4cdd6",
                borderRadius: 9999,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>⭐ Populaire</span>
            )}
            <span className="font-dm" style={{
              fontSize: 12, color: "#c4cdd6", fontWeight: 600,
              padding: "5px 14px",
              background: "rgba(196,205,214,0.08)",
              border: "1px solid rgba(196,205,214,0.2)",
              borderRadius: 9999,
              backdropFilter: "blur(8px)",
            }}>{s.price}</span>
          </div>
        </div>

        {/* Bottom content */}
        <div>
          <h3 className="font-bebas" style={{
            fontSize: s.wide ? 56 : 36,
            letterSpacing: "0.03em",
            color: "#fff",
            lineHeight: 0.95,
            marginBottom: 14,
          }}>{s.title}</h3>
          <p className="font-dm" style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.75,
            maxWidth: s.wide ? 520 : 340,
            marginBottom: 20,
          }}>{s.desc}</p>
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
  const ctaRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-40px" });

  return (
    <section id="services" style={{ padding: "140px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 56 }}
        >
          <span className="font-dm text-accent" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>— Ce que je fais</span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(44px, 7vw, 80px)", letterSpacing: "0.02em", lineHeight: 0.9, marginTop: 16, color: "#fff" }}>
            MES SERVICES
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="services-grid">
          {services.map((s, i) => <ServiceCard key={s.id} s={s} index={i} />)}
        </div>

        {/* 4e service — ligne sobre */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: 32,
            padding: "24px 32px",
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", margin: 0 }}>
            Tu as un projet différent ? <span style={{ color: "rgba(255,255,255,0.7)" }}>Mariage, séance photo, portrait...</span>
          </p>
          <Link
            href="/contact"
            className="font-dm"
            style={{
              fontSize: 13,
              color: "#c4cdd6",
              textDecoration: "none",
              letterSpacing: "0.08em",
              display: "flex",
              alignItems: "center",
              gap: 8,
              whiteSpace: "nowrap",
              transition: "gap 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.gap = "12px")}
            onMouseLeave={e => (e.currentTarget.style.gap = "8px")}
          >
            Parlons-en <span style={{ fontSize: 16 }}>→</span>
          </Link>
        </motion.div>

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

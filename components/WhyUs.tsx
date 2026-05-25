"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function IconCamera() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="2" y="9" width="28" height="19" rx="4" stroke="#c4cdd6" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="16" cy="18.5" r="5.5" stroke="#c4cdd6" strokeWidth="1.5" />
      <path d="M11 9l2-4h6l2 4" stroke="#c4cdd6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="25" cy="14" r="1.25" fill="#c4cdd6" />
    </svg>
  );
}

function IconStrategy() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="6" cy="26" r="2.5" stroke="#c4cdd6" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="2.5" stroke="#c4cdd6" strokeWidth="1.5" />
      <circle cx="26" cy="6" r="2.5" stroke="#c4cdd6" strokeWidth="1.5" />
      <line x1="8.25" y1="23.75" x2="13.75" y2="18.25" stroke="#c4cdd6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18.25" y1="13.75" x2="23.75" y2="8.25" stroke="#c4cdd6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 10 L16 4 L28 10" stroke="#c4cdd6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconDiamond() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <polygon points="16,3 29,12 16,29 3,12" stroke="#c4cdd6" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="16,3 29,12 16,14 3,12" stroke="#c4cdd6" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconLightning() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M18 3L6 18h10l-2 11 12-15H16L18 3z" stroke="#c4cdd6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const cards = [
  {
    icon: <IconCamera />,
    title: "Créatif moderne",
    desc: "Chaque contenu est pensé pour capter l'attention dès la première seconde.",
  },
  {
    icon: <IconStrategy />,
    title: "Direction stratégique",
    desc: "On ne filme pas au hasard. Chaque plan sert votre image et vos objectifs.",
  },
  {
    icon: <IconDiamond />,
    title: "Image haut de gamme",
    desc: "Sony A7 III, DJI Mini 5 Pro, étalonnage cinéma. Chaque détail est travaillé.",
  },
  {
    icon: <IconLightning />,
    title: "Contenu optimisé",
    desc: "Formats pensés pour l'engagement Instagram, Reels et campagnes publicitaires.",
  },
];

// ─── Card component ───────────────────────────────────────────────────────────

function WhyCard({
  card,
  index,
  parentInView,
}: {
  card: (typeof cards)[0];
  index: number;
  parentInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      animate={parentInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.75,
        delay: 0.1 + index * 0.13,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(196,205,214,0.2)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 24,
        padding: 36,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "translateY(-4px)" : "translateY(0px)",
        transition: "border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease",
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.25)" : "none",
        cursor: "default",
      }}
    >
      {/* Top glint line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 20,
          right: 20,
          height: 1,
          background: hovered
            ? "linear-gradient(90deg, transparent, rgba(196,205,214,0.18), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
          transition: "background 0.35s ease",
          pointerEvents: "none",
        }}
      />

      {/* Icon container */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: "rgba(196,205,214,0.06)",
          border: "1px solid rgba(196,205,214,0.14)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background 0.35s ease, border-color 0.35s ease",
          ...(hovered && {
            background: "rgba(196,205,214,0.1)",
            borderColor: "rgba(196,205,214,0.25)",
          }),
        }}
      >
        {card.icon}
      </div>

      {/* Text */}
      <div>
        <h3
          className="font-bebas"
          style={{
            fontSize: "clamp(24px, 2.2vw, 30px)",
            letterSpacing: "0.04em",
            color: "#fff",
            lineHeight: 1,
            marginBottom: 12,
          }}
        >
          {card.title}
        </h3>
        <p
          className="font-dm"
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          {card.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function WhyUs() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section id="pourquoi" style={{ padding: "140px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 64 }}
        >
          <span
            className="font-dm text-accent"
            style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}
          >
            — Pourquoi nous choisir
          </span>
          <h2
            className="font-bebas"
            style={{
              fontSize: "clamp(44px, 7vw, 80px)",
              letterSpacing: "0.02em",
              lineHeight: 0.9,
              marginTop: 16,
              color: "#fff",
            }}
          >
            NOTRE DIFFÉRENCE
          </h2>
        </motion.div>

        {/* 2×2 Grid */}
        <div
          ref={gridRef}
          className="why-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {cards.map((card, i) => (
            <WhyCard key={card.title} card={card} index={i} parentInView={gridInView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

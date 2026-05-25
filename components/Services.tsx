"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ImageAccordion, type AccordionService } from "@/components/ui/interactive-image-accordion";

const services: AccordionService[] = [
  {
    id: 1,
    title: "Contenu Mensuel",
    shortLabel: "Mensuel",
    desc: "Personal branding, face caméra, Reels, photos — un package complet livré chaque mois pour les entrepreneurs qui veulent une présence forte en ligne.",
    price: "À partir de 499 $/mois",
    tags: ["Personal Branding", "Reels", "Face Caméra", "Photo"],
    imageUrl: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=900&q=80",
    star: true,
  },
  {
    id: 2,
    title: "Couverture d'Événements",
    shortLabel: "Événements",
    desc: "Soirées, lancements, galas, conférences — photo + vidéo complète. Tu gardes tout, je livre vite.",
    price: "À partir de 699 $",
    tags: ["Soirées", "Galas", "Conférences", "Lancements"],
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
  },
  {
    id: 3,
    title: "Publicité",
    shortLabel: "Publicité",
    desc: "Contenu pour les ads Meta & Instagram — vidéo courte, accroches visuelles, formats adaptés aux campagnes qui convertissent.",
    price: "À partir de 599 $",
    tags: ["Meta Ads", "Instagram", "Vidéo Courte", "UGC"],
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&q=80",
  },
  {
    id: 4,
    title: "Mariage",
    shortLabel: "Mariage",
    desc: "Chaque instant capturé avec une précision émotionnelle rare. De la préparation à la soirée — photo et film cinématique.",
    price: "Sur devis",
    tags: ["Cérémonie", "Préparatifs", "Film", "Album"],
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80",
  },
];

export default function Services() {
  const ref = useRef(null);
  const ctaRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-40px" });

  return (
    <section id="services" style={{ padding: "140px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header + accordion layout */}
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 64, alignItems: "center" }} className="services-layout">

          {/* Left — header + CTA */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-dm text-accent" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>
              — Ce que je fais
            </span>
            <h2 className="font-bebas" style={{
              fontSize: "clamp(44px, 5vw, 72px)",
              letterSpacing: "0.02em",
              lineHeight: 0.9,
              marginTop: 16,
              marginBottom: 24,
              color: "#fff",
            }}>
              MES<br />SERVICES
            </h2>
            <p className="font-dm" style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.8,
              marginBottom: 32,
            }}>
              Survole chaque service pour découvrir les détails. De la création mensuelle au film de mariage, chaque projet est traité comme une œuvre.
            </p>

            <Link
              href="/contact"
              className="font-dm"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 28px",
                background: "#f2f0ec",
                color: "#0a0a0a",
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.08em",
                transition: "gap 0.2s, opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Réserver une séance <span style={{ fontSize: 15 }}>→</span>
            </Link>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <ImageAccordion items={services} defaultActive={0} />
          </motion.div>
        </div>

        {/* Bottom CTA line */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            marginTop: 32,
            padding: "22px 28px",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", margin: 0 }}>
            Tu as un projet différent ?{" "}
            <span style={{ color: "rgba(255,255,255,0.65)" }}>Portrait, corporate, séance sur mesure...</span>
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
            onMouseEnter={e => (e.currentTarget.style.gap = "14px")}
            onMouseLeave={e => (e.currentTarget.style.gap = "8px")}
          >
            Parlons-en <span style={{ fontSize: 16 }}>→</span>
          </Link>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 640px) {
          .services-layout > div:last-child > div {
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
}

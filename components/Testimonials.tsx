"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShuffleCards } from "@/components/ui/testimonial-cards";

const testimonials = [
  {
    id: 1,
    testimonial: "Massi a totalement transformé l'image de ma marque. Les photos sont à couper le souffle — exactement ce que je cherchais pour mon personal branding.",
    author: "Sarah Morin · Coach & Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&fit=crop&q=80",
  },
  {
    id: 2,
    testimonial: "Professionnalisme irréprochable. Notre événement corporate a été capturé avec une précision artistique rare. Je recommande vivement.",
    author: "Thomas Lacroix · CEO InnovateMTL",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&q=80",
  },
  {
    id: 3,
    testimonial: "Notre mariage immortalisé avec une beauté et une émotion incroyables. Chaque photo raconte notre histoire. Merci Massi !",
    author: "Amira & David Côté · Mariage 2025",
    avatar: "https://images.unsplash.com/photo-1519741497674-611481863552?w=256&h=256&fit=crop&q=80",
  },
  {
    id: 4,
    testimonial: "Un vrai collaborateur créatif. Il comprend la vision avant même qu'on finisse de l'expliquer. Du contenu de luxe, livré en temps et en heure.",
    author: "Karim Benali · Fondateur Stüdio Brand",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=256&h=256&fit=crop&q=80",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="temoignages" style={{ padding: "140px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 80 }}
        >
          <span className="font-dm text-accent" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>
            — Ce qu&apos;ils disent
          </span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(44px, 7vw, 80px)", letterSpacing: "0.02em", lineHeight: 0.9, marginTop: 16, color: "#fff" }}>
            TÉMOIGNAGES
          </h2>
          <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginTop: 12 }}>
            50+ clients satisfaits — glissez les cartes pour les parcourir.
          </p>
        </motion.div>

        {/* Cards + right text layout */}
        <div style={{ display: "grid", gridTemplateColumns: "400px 1fr", gap: 80, alignItems: "center" }} className="testimonials-layout">

          {/* Shuffle cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: "relative" }}
          >
            <ShuffleCards testimonials={testimonials} />
          </motion.div>

          {/* Right side — current testimonial list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            {testimonials.map((t) => (
              <div key={t.id} style={{
                padding: "20px 24px",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                gap: 16,
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 0, left: 16, right: 16, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />
                <img
                  src={t.avatar}
                  alt={t.author}
                  style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "1px solid rgba(196,205,214,0.2)" }}
                />
                <div>
                  <p className="font-dm" style={{ fontSize: 12, fontStyle: "italic", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 4 }}>
                    &ldquo;{t.testimonial.slice(0, 70)}…&rdquo;
                  </p>
                  <p className="font-dm" style={{ fontSize: 11, color: "#c4cdd6", fontWeight: 600, letterSpacing: "0.06em" }}>
                    {t.author}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .testimonials-layout {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .testimonials-layout > div:first-child {
            display: flex;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}

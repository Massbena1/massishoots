"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const gear = [
  { name: "Sony A7 III",    role: "Boîtier principal" },
  { name: "DJI Mini 5 Pro", role: "Drone cinématique" },
  { name: "DJI RS 4 Mini",  role: "Stabilisateur gimbal" },
  { name: "Aputure MC Pro", role: "Éclairage LED" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="apropos" ref={ref} style={{ padding: "140px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="about-grid">

        {/* Image panel — glass frame */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", aspectRatio: "3/4", borderRadius: 28, overflow: "hidden", maxWidth: 460, border: "1px solid rgba(255,255,255,0.09)" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=80"
            alt="Massi Bena – Massishoots"
            fill
            style={{ objectFit: "cover" }}
          />
          {/* Frosted bottom overlay */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "45%",
            background: "linear-gradient(to top, rgba(7,9,13,0.92) 0%, rgba(7,9,13,0.6) 50%, transparent 100%)",
            backdropFilter: "blur(0px)",
          }} />
          {/* Name badge */}
          <div style={{
            position: "absolute", bottom: 28, left: 24, right: 24,
            padding: "16px 20px",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 18,
          }}>
            <div style={{ position: "absolute", top: 0, left: 16, right: 16, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />
            <p className="font-bebas" style={{ fontSize: 20, letterSpacing: "0.12em", color: "#fff", lineHeight: 1.1 }}>MASSI BENA</p>
            <p className="font-dm" style={{ fontSize: 12, color: "#c4cdd6", marginTop: 4, letterSpacing: "0.08em" }}>Photographe & Vidéaste — Montréal</p>
          </div>
        </motion.div>

        {/* Text panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-dm text-accent" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>— À propos</span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(44px, 6vw, 72px)", letterSpacing: "0.02em", lineHeight: 0.9, margin: "16px 0 28px", color: "#fff" }}>
            QUI EST<br />MASSI ?
          </h2>
          <p className="font-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.9, marginBottom: 18 }}>
            Passionné par la narration visuelle, Massi Bena transforme chaque projet en contenu cinématique qui marque les esprits. Basé à Montréal, il collabore avec des entrepreneurs, des entreprises et des couples pour créer des images qui ont de l&apos;impact.
          </p>
          <p className="font-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.9, marginBottom: 40 }}>
            Son approche : direction artistique rigoureuse, technique maîtrisée, et une sensibilité humaine qui transparaît dans chaque image.
          </p>

          {/* Gear — glass card */}
          <div style={{
            padding: "24px 28px",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 20, right: 20, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }} />
            <p className="font-dm" style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase", marginBottom: 18 }}>Équipement</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {gear.map((g) => (
                <div key={g.name} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                    background: "rgba(196,205,214,0.08)",
                    border: "1px solid rgba(196,205,214,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#c4cdd6", display: "block" }} />
                  </div>
                  <div>
                    <span className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 500, display: "block" }}>{g.name}</span>
                    <span className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{g.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`@media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  );
}

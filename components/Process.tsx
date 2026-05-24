"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Camera, Film, Package } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const processData = [
  {
    id: 1,
    title: "Consultation",
    date: "Étape 01",
    content: "On discute de ta vision, tes objectifs et ton univers. Ensemble on définit le concept créatif parfait pour ton projet.",
    category: "Discovery",
    icon: MessageSquare,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Tournage",
    date: "Étape 02",
    content: "Direction artistique complète. Lumière maîtrisée, mise en scène soignée. Sony A7 III + DJI Mini 5 Pro + Aputure MC Pro.",
    category: "Production",
    icon: Camera,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Montage",
    date: "Étape 03",
    content: "Post-production cinématique : colorimétrie, retouches, montage vidéo avec musique et motion design sur mesure.",
    category: "Post-Production",
    icon: Film,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 75,
  },
  {
    id: 4,
    title: "Livraison",
    date: "Étape 04",
    content: "Fichiers HD livrés en 5–7 jours ouvrables. Révisions incluses jusqu'à ta satisfaction totale. Garantie qualité.",
    category: "Delivery",
    icon: Package,
    relatedIds: [3],
    status: "pending" as const,
    energy: 60,
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="processus" style={{ background: "transparent" }}>
      {/* Section header */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px 0" }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="font-dm text-accent" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>— Comment ça marche</span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(44px, 7vw, 80px)", letterSpacing: "0.02em", lineHeight: 0.9, marginTop: 16, color: "#fff" }}>LE PROCESSUS</h2>
          <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 12, maxWidth: 480 }}>
            Cliquez sur un nœud pour explorer chaque étape — les connexions s&apos.illuminent en argent.
          </p>
        </motion.div>
      </div>

      {/* Orbital timeline */}
      <RadialOrbitalTimeline timelineData={processData} />
    </section>
  );
}

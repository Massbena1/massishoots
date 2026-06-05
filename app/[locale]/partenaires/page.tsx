"use client";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Check, Building2, Handshake, Zap, Shield } from "lucide-react";
import Footer from "@/components/Footer";

const AVANTAGES = [
  {
    icon: Building2,
    title: "Tarifs agence dédiés",
    desc: "Des prix B2B adaptés aux volumes récurrents. Devis prioritaire en moins de 4h.",
  },
  {
    icon: Handshake,
    title: "Contrat cadre",
    desc: "Un accord simple pour des collaborations répétées sans renégocier à chaque projet.",
  },
  {
    icon: Zap,
    title: "Livraison accélérée",
    desc: "Vos clients passent avant tout. Délais réduits et communication directe dédiée.",
  },
  {
    icon: Shield,
    title: "Droits commerciaux inclus",
    desc: "Tous les livrables livrés avec droits d'utilisation commerciale complets pour vos clients.",
  },
  {
    icon: Handshake,
    title: "Commission de référencement",
    desc: "10% du contrat sur chaque client référé. Versé après la signature et le premier paiement.",
  },
];

const SERVICES_B2B = [
  "Contenu mensuel pour les clients de l'agence",
  "Couverture d'événements corporate",
  "Vidéos publicitaires Meta & LinkedIn",
  "Photographie produits & e-commerce",
  "Portraits d'équipe & headshots",
  "Tournages multi-formats (Reels, YouTube, Ads)",
  "Reportages & documentaires d'entreprise",
  "Brand films & vidéos institutionnelles",
];

export default function PartenairesPage() {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ padding: "160px 24px 100px", maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="font-dm" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c4cdd6", display: "block", marginBottom: 20 }}>
            — Pour les agences & studios
          </span>
          <h1 className="font-bebas" style={{ fontSize: "clamp(48px, 8vw, 88px)", color: "#fff", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: 24 }}>
            PARTENARIATS<br />AGENCES
          </h1>
          <p className="font-dm" style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 580, margin: "0 auto 40px" }}>
            Vous gérez des clients qui ont besoin de contenu visuel premium ? On devient votre partenaire de production — discret, fiable, livré dans les délais.
          </p>
          <Link href="/contact" className="font-dm"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#f2f0ec", color: "#0a0a0a", borderRadius: 9999, textDecoration: "none", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em" }}>
            Discuter d&apos;un partenariat <ArrowRight size={13} />
          </Link>
        </motion.div>
      </section>

      {/* Avantages */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
          {AVANTAGES.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div key={a.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ padding: "28px 24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(196,205,214,0.08)", border: "1px solid rgba(196,205,214,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon size={20} color="#c4cdd6" />
                </div>
                <h3 className="font-bebas" style={{ fontSize: 18, color: "#fff", letterSpacing: "0.06em", marginBottom: 8 }}>{a.title}</h3>
                <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{a.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Services B2B */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 80px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h2 className="font-bebas" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#fff", letterSpacing: "0.04em", marginBottom: 32, textAlign: "center" }}>
            CE QU&apos;ON PRODUIT POUR VOS CLIENTS
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="services-b2b-grid">
            {SERVICES_B2B.map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12 }}>
                <Check size={13} color="#4ade80" style={{ flexShrink: 0 }} />
                <span className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{s}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 120px" }}>
        <div style={{ padding: "56px 40px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, transparent, rgba(196,205,214,0.2), transparent)" }} />
          <h3 className="font-bebas" style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "#fff", letterSpacing: "0.03em", marginBottom: 12 }}>
            PARLONS DE VOTRE PROCHAIN PROJET
          </h3>
          <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 32, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 32px" }}>
            Consultation gratuite · Devis prioritaire en 4h · Basé à Montréal
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="font-dm" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#f2f0ec", color: "#0a0a0a", borderRadius: 9999, textDecoration: "none", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em" }}>
              Contacter pour un partenariat <ArrowRight size={13} />
            </Link>
            <a href="mailto:massi@massishoots.com" className="font-dm" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: 13 }}>
              massi@massishoots.com
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 600px) { .services-b2b-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}

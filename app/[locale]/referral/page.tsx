"use client";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Gift, Users, DollarSign, Check } from "lucide-react";
import Footer from "@/components/Footer";

const STEPS = [
  {
    num: "01",
    icon: Users,
    title: "Tu réfères un ami",
    desc: "Tu partages le nom et les coordonnées d'un entrepreneur, marque ou organisateur d'événement qui a besoin de contenu visuel.",
  },
  {
    num: "02",
    icon: DollarSign,
    title: "Il signe un contrat",
    desc: "Ton ami contacte MassiShoots et signe un contrat pour un projet (contenu mensuel, événement, corporate, etc.).",
  },
  {
    num: "03",
    icon: Gift,
    title: "Tu reçois 1 000 $ de crédit",
    desc: "Dès le premier paiement de ton ami, tu reçois 1 000 $ de crédit à utiliser sur ton prochain projet avec MassiShoots.",
  },
];

const CONDITIONS = [
  "Valable pour tout nouveau client référé non encore en contact avec MassiShoots",
  "Le crédit est activé après le premier paiement du client référé",
  "Crédit applicable sur tout type de projet (événement, mensuel, corporate, etc.)",
  "Pas de limite — tu peux référer autant de personnes que tu veux",
  "Cumulable : 2 références = 2 000 $ de crédit",
];

export default function ReferralPage() {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ padding: "160px 24px 80px", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 9999, marginBottom: 24 }}>
            <Gift size={12} color="#4ade80" />
            <span className="font-dm" style={{ fontSize: 11, color: "#4ade80", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>
              Programme de référencement
            </span>
          </div>
          <h1 className="font-bebas" style={{ fontSize: "clamp(52px, 8vw, 88px)", color: "#fff", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: 20 }}>
            RÉFÈRE UN AMI.<br />
            <span style={{ color: "#c4cdd6" }}>GAGNE 1 000 $.</span>
          </h1>
          <p className="font-dm" style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 40px" }}>
            Tu connais quelqu&apos;un qui a besoin de contenu visuel ? Envoie-le vers MassiShoots et reçois 1 000 $ de crédit sur ton prochain projet.
          </p>
          <a href="mailto:massi@massishoots.com?subject=Référencement&body=Je veux référer quelqu'un !" className="font-dm"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#f2f0ec", color: "#0a0a0a", borderRadius: 9999, textDecoration: "none", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em" }}>
            Référer maintenant <ArrowRight size={13} />
          </a>
        </motion.div>
      </section>

      {/* Steps */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="steps-grid">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.num} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.12 }}
                style={{ padding: "32px 24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, position: "relative" }}>
                <div className="font-bebas" style={{ fontSize: 48, color: "rgba(255,255,255,0.05)", lineHeight: 1, position: "absolute", top: 16, right: 20, letterSpacing: "0.04em" }}>
                  {s.num}
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(196,205,214,0.08)", border: "1px solid rgba(196,205,214,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon size={20} color="#c4cdd6" />
                </div>
                <h3 className="font-bebas" style={{ fontSize: 20, color: "#fff", letterSpacing: "0.06em", marginBottom: 10 }}>{s.title}</h3>
                <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Conditions */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ padding: "36px 32px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20 }}>
          <h3 className="font-bebas" style={{ fontSize: 20, color: "#fff", letterSpacing: "0.08em", marginBottom: 20 }}>CONDITIONS</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {CONDITIONS.map(c => (
              <div key={c} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <Check size={13} color="#4ade80" style={{ flexShrink: 0, marginTop: 2 }} />
                <span className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px 120px", textAlign: "center" }}>
        <h3 className="font-bebas" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#fff", letterSpacing: "0.03em", marginBottom: 12 }}>
          PRÊT À RÉFÉRER ?
        </h3>
        <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>
          Envoie-nous le nom et le contact de ton ami — on s&apos;occupe du reste.
        </p>
        <a href="mailto:massi@massishoots.com?subject=Référencement — je connais quelqu'un&body=Bonjour Massi, je veux référer quelqu'un. Voici ses coordonnées : " className="font-dm"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#f2f0ec", color: "#0a0a0a", borderRadius: 9999, textDecoration: "none", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em" }}>
          Envoyer une référence <ArrowRight size={13} />
        </a>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 700px) { .steps-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}

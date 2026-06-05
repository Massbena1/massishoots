"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Zap, ChevronRight, RotateCcw, Copy, Check } from "lucide-react";
import Footer from "@/components/Footer";

const SECTEURS = [
  { id: "restaurant",  label: "Restaurant / Food",      emoji: "🍽️" },
  { id: "mode",        label: "Mode / Lifestyle",        emoji: "👗" },
  { id: "tech",        label: "Tech / SaaS",             emoji: "💻" },
  { id: "immobilier",  label: "Immobilier",               emoji: "🏠" },
  { id: "wellness",    label: "Santé / Bien-être",       emoji: "🧘" },
  { id: "coach",       label: "Coach / Consultant",      emoji: "🎯" },
  { id: "evenement",   label: "Événementiel",             emoji: "🎉" },
  { id: "corporate",   label: "Corporate / Entreprise",  emoji: "🏢" },
];

const CIBLES = [
  { id: "entrepreneurs", label: "Entrepreneurs" },
  { id: "women",         label: "Femmes 25-45 ans" },
  { id: "young",         label: "Jeunes adultes 18-30" },
  { id: "b2b",           label: "Professionnels B2B" },
  { id: "families",      label: "Familles" },
];

export default function SimulateurPage() {
  const [step, setStep] = useState(1);
  const [secteur, setSecteur] = useState("");
  const [cible, setCible] = useState("");
  const [email, setEmail] = useState("");
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/simulateur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secteur, cible }),
      });
      const data = await res.json();
      setIdeas(data.ideas ?? []);

      // Send email capture to contact API
      if (email) {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nom: "Simulateur IA",
            email,
            message: `Lead simulateur IA\nSecteur: ${secteur}\nCible: ${cible}\nEmail: ${email}`,
            type: "Simulateur",
          }),
        });
      }
      setStep(4);
    } finally {
      setLoading(false);
    }
  };

  const copyIdea = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  const reset = () => { setStep(1); setSecteur(""); setCible(""); setEmail(""); setIdeas([]); };

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ padding: "140px 24px 60px", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 16px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 9999, marginBottom: 24 }}>
            <Zap size={11} color="#818cf8" />
            <span className="font-dm" style={{ fontSize: 11, color: "#818cf8", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>Simulateur IA</span>
          </div>
          <h1 className="font-bebas" style={{ fontSize: "clamp(44px, 8vw, 80px)", color: "#fff", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: 20 }}>
            3 IDÉES DE REELS<br />POUR TON BUSINESS
          </h1>
          <p className="font-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 0 }}>
            Choisis ton secteur et ta cible — on génère des idées de contenu personnalisées en 10 secondes.
          </p>
        </motion.div>
      </section>

      {/* Steps */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px 120px" }}>

        {/* Progress */}
        {step < 4 && (
          <div style={{ display: "flex", gap: 6, marginBottom: 36, justifyContent: "center" }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ height: 3, width: 48, borderRadius: 9999, background: step >= s ? "#818cf8" : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* Step 1 — Secteur */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}>
              <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 20, fontWeight: 600 }}>Ton secteur d&apos;activité :</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 28 }} className="secteur-grid">
                {SECTEURS.map(s => (
                  <button key={s.id} onClick={() => setSecteur(s.id)} className="font-dm"
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", background: secteur === s.id ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.03)", border: `1px solid ${secteur === s.id ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.08)"}`, borderRadius: 14, cursor: "pointer", textAlign: "left", transition: "all 0.18s" }}>
                    <span style={{ fontSize: 22 }}>{s.emoji}</span>
                    <span style={{ fontSize: 13, color: secteur === s.id ? "#fff" : "rgba(255,255,255,0.55)", fontWeight: secteur === s.id ? 600 : 400 }}>{s.label}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} disabled={!secteur} className="font-dm"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 24px", background: secteur ? "#f2f0ec" : "rgba(255,255,255,0.06)", color: secteur ? "#0a0a0a" : "rgba(255,255,255,0.2)", border: "none", borderRadius: 9999, fontSize: 13, fontWeight: 700, cursor: secteur ? "pointer" : "not-allowed", transition: "all 0.2s" }}>
                Continuer <ChevronRight size={14} />
              </button>
            </motion.div>
          )}

          {/* Step 2 — Cible */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}>
              <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 20, fontWeight: 600 }}>Ta cible principale :</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {CIBLES.map(c => (
                  <button key={c.id} onClick={() => setCible(c.id)} className="font-dm"
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 20px", background: cible === c.id ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.02)", border: `1px solid ${cible === c.id ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.07)"}`, borderRadius: 12, cursor: "pointer", transition: "all 0.18s" }}>
                    <span style={{ fontSize: 14, color: cible === c.id ? "#fff" : "rgba(255,255,255,0.55)", fontWeight: cible === c.id ? 600 : 400 }}>{c.label}</span>
                    {cible === c.id && <Check size={15} color="#818cf8" />}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(1)} className="font-dm" style={{ padding: "12px 18px", background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer" }}>← Retour</button>
                <button onClick={() => setStep(3)} disabled={!cible} className="font-dm"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 24px", background: cible ? "#f2f0ec" : "rgba(255,255,255,0.06)", color: cible ? "#0a0a0a" : "rgba(255,255,255,0.2)", border: "none", borderRadius: 9999, fontSize: 13, fontWeight: 700, cursor: cible ? "pointer" : "not-allowed", transition: "all 0.2s" }}>
                  Continuer <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3 — Email */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}>
              <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 8, fontWeight: 600 }}>Ton email pour recevoir les idées :</p>
              <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 20 }}>Optionnel — on n&apos;envoie pas de spam.</p>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ton@email.com"
                style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff", fontSize: 14, outline: "none", fontFamily: "var(--font-dm-sans), sans-serif", boxSizing: "border-box", marginBottom: 20 }} />
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(2)} className="font-dm" style={{ padding: "12px 18px", background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer" }}>← Retour</button>
                <button onClick={handleGenerate} disabled={loading} className="font-dm"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "#818cf8", color: "#fff", border: "none", borderRadius: 9999, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
                  <Zap size={14} /> {loading ? "Génération..." : "Générer mes idées"}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4 — Résultats */}
          {step === 4 && ideas.length > 0 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 10 }}>
                <div>
                  <p className="font-dm" style={{ fontSize: 11, color: "#818cf8", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>3 idées de Reels générées</p>
                  <h2 className="font-bebas" style={{ fontSize: 28, color: "#fff", letterSpacing: "0.04em" }}>TON CONTENU PERSONNALISÉ</h2>
                </div>
                <button onClick={reset} className="font-dm" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, color: "rgba(255,255,255,0.4)", fontSize: 12, cursor: "pointer" }}>
                  <RotateCcw size={11} /> Recommencer
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                {ideas.map((idea, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
                    style={{ padding: "22px 24px", background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 18, position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                      <div style={{ display: "flex", gap: 14, flex: 1 }}>
                        <span className="font-bebas" style={{ fontSize: 32, color: "rgba(99,102,241,0.3)", lineHeight: 1, flexShrink: 0 }}>0{i + 1}</span>
                        <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, margin: 0 }}>{idea}</p>
                      </div>
                      <button onClick={() => copyIdea(i, idea)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: copied === i ? "#4ade80" : "rgba(255,255,255,0.3)", flexShrink: 0, display: "flex" }}>
                        {copied === i ? <Check size={13} /> : <Copy size={13} />}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ padding: "32px 28px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, textAlign: "center" }}>
                <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
                  Tu veux qu&apos;on crée ce contenu pour toi ?
                </p>
                <h3 className="font-bebas" style={{ fontSize: 24, color: "#fff", letterSpacing: "0.04em", marginBottom: 20 }}>
                  ON S&apos;OCCUPE DE TOUT — TOURNAGE, MONTAGE, LIVRAISON
                </h3>
                <Link href="/contact" className="font-dm"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "#f2f0ec", color: "#0a0a0a", borderRadius: 9999, textDecoration: "none", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em" }}>
                  Réserver une consultation gratuite <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 560px) { .secteur-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}

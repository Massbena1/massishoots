"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ChevronRight, RotateCcw, Copy, Check } from "lucide-react";
import Footer from "@/components/Footer";

type Viralite = "Fort" | "Très fort" | "Explosif";
type Idea = { hook: string; titre: string; format: string; viralite: Viralite };

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
  { id: "b2b",     label: "Professionnels & entreprises", emoji: "👔" },
  { id: "b2c",     label: "Grand public & consommateurs", emoji: "🛍️" },
  { id: "premium", label: "Clients premium & luxe",       emoji: "🌟" },
  { id: "young",   label: "Audience jeune & tendance",    emoji: "📱" },
];

export default function SimulateurPage() {
  const [step, setStep] = useState(1);
  const [secteur, setSecteur] = useState("");
  const [cible, setCible] = useState("");
  const [email, setEmail] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  // Lead capture state
  const [leadPrenom, setLeadPrenom] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadInsta, setLeadInsta] = useState("");
  const [leadSending, setLeadSending] = useState(false);
  const [leadSent, setLeadSent] = useState(false);

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

  const copyIdea = (idx: number, idea: Idea) => {
    navigator.clipboard.writeText(`${idea.titre}\n\nOuvre avec : ${idea.hook}`);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  const reset = () => {
    setStep(1); setSecteur(""); setCible(""); setEmail(""); setIdeas([]);
    setLeadPrenom(""); setLeadEmail(""); setLeadInsta(""); setLeadSent(false);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadPrenom || !leadEmail) return;
    setLeadSending(true);
    try {
      await fetch("/api/simulateur-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom: leadPrenom, email: leadEmail, instagram: leadInsta, secteur, cible }),
      });
      setLeadSent(true);
    } finally {
      setLeadSending(false);
    }
  };

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
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              {["Ton secteur", "Ta cible", "Génération"].map((label, i) => {
                const s = i + 1;
                const active = step >= s;
                const current = step === s;
                return (
                  <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: i === 1 ? "center" : i === 2 ? "flex-end" : "flex-start", flex: 1 }}>
                    <span className="font-dm" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: current ? "#818cf8" : active ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)", transition: "color 0.3s", fontWeight: current ? 700 : 400 }}>
                      Étape {s}/3
                    </span>
                    <span className="font-dm" style={{ fontSize: 11, color: current ? "#fff" : active ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)", transition: "color 0.3s", marginTop: 2 }}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {[1, 2, 3].map(s => (
                <div key={s} style={{ height: 3, flex: 1, borderRadius: 9999, background: step >= s ? "#818cf8" : "rgba(255,255,255,0.08)", transition: "background 0.4s" }} />
              ))}
            </div>
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
              <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 20, fontWeight: 600 }}>À qui s&apos;adresse ton contenu ?</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 28 }} className="secteur-grid">
                {CIBLES.map(c => (
                  <button key={c.id} onClick={() => setCible(c.id)} className="font-dm"
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 18px", background: cible === c.id ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.03)", border: `1px solid ${cible === c.id ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.08)"}`, borderRadius: 14, cursor: "pointer", textAlign: "left", transition: "all 0.18s" }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{c.emoji}</span>
                    <span style={{ fontSize: 13, color: cible === c.id ? "#fff" : "rgba(255,255,255,0.55)", fontWeight: cible === c.id ? 600 : 400, lineHeight: 1.35 }}>{c.label}</span>
                    {cible === c.id && <Check size={14} color="#818cf8" style={{ marginLeft: "auto", flexShrink: 0 }} />}
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 10 }}>
                <div>
                  <p className="font-dm" style={{ fontSize: 11, color: "#C9A84C", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>3 idées de Reels générées</p>
                  <h2 className="font-bebas" style={{ fontSize: 32, color: "#fff", letterSpacing: "0.04em" }}>TON CONTENU PERSONNALISÉ</h2>
                </div>
                <button onClick={reset} className="font-dm" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 9999, color: "rgba(255,255,255,0.35)", fontSize: 12, cursor: "pointer" }}>
                  <RotateCcw size={11} /> Recommencer
                </button>
              </div>

              {/* Cartes */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
                {ideas.map((idea, i) => {
                  const virColor = idea.viralite === "Explosif" ? "#C9A84C" : idea.viralite === "Très fort" ? "#C9A84C" : "rgba(255,255,255,0.35)";
                  const virBg = idea.viralite === "Explosif" ? "rgba(201,168,76,0.12)" : idea.viralite === "Très fort" ? "rgba(201,168,76,0.07)" : "rgba(255,255,255,0.04)";
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.13 }}
                      style={{ background: "#111", borderLeft: "2px solid #C9A84C", borderRadius: "0 16px 16px 0", padding: "28px 24px 24px", position: "relative", overflow: "hidden" }}>

                      {/* Big number bg */}
                      <span className="font-bebas" style={{ position: "absolute", top: 8, right: 16, fontSize: 88, lineHeight: 1, color: "rgba(201,168,76,0.07)", userSelect: "none", pointerEvents: "none" }}>
                        0{i + 1}
                      </span>

                      {/* Top row: badges + copy */}
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                        {/* Format badge */}
                        <span className="font-dm" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 10px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
                          {idea.format}
                        </span>
                        {/* Viralité badge */}
                        <span className="font-dm" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 10px", background: virBg, border: `1px solid ${virColor}40`, borderRadius: 9999, color: virColor, fontWeight: 700, animation: idea.viralite === "Explosif" ? "pulse 2s ease-in-out infinite" : "none" }}>
                          ✦ {idea.viralite}
                        </span>
                        {/* Copy button */}
                        <button onClick={() => copyIdea(i, idea)} style={{ marginLeft: "auto", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "5px 8px", cursor: "pointer", color: copied === i ? "#4ade80" : "rgba(255,255,255,0.3)", display: "flex", flexShrink: 0 }}>
                          {copied === i ? <Check size={12} /> : <Copy size={12} />}
                        </button>
                      </div>

                      {/* Titre Playfair italic */}
                      <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: 17, color: "#fff", lineHeight: 1.4, marginBottom: 18 }}>
                        {idea.titre}
                      </p>

                      {/* Hook block */}
                      <div style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 10, padding: "14px 16px" }}>
                        <span className="font-dm" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A84C", display: "block", marginBottom: 6, fontWeight: 600 }}>
                          💬 Ouvre avec :
                        </span>
                        <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>
                          &ldquo;{idea.hook}&rdquo;
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Lead capture */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
                style={{ background: "#111", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 20, padding: "32px 28px", marginBottom: 24 }}>
                <div style={{ position: "relative" }}>
                  {/* Gold top line */}
                  <div style={{ position: "absolute", top: -32, left: "50%", transform: "translateX(-50%)", width: 60, height: 1, background: "linear-gradient(to right, transparent, #C9A84C, transparent)" }} />
                </div>

                {leadSent ? (
                  <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}
                    style={{ textAlign: "center", padding: "8px 0" }}>
                    <div style={{ fontSize: 32, marginBottom: 14 }}>📲</div>
                    <p className="font-dm" style={{ fontSize: 15, color: "#fff", fontWeight: 600, marginBottom: 8, lineHeight: 1.5 }}>
                      Parfait ! Massi va analyser ton profil et te contacter sous 24h avec un plan de contenu sur mesure.
                    </p>
                    <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
                      Vérifie ta boîte mail — on arrive vite.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <p className="font-dm" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 10, fontWeight: 600 }}>
                      ✦ Offre gratuite
                    </p>
                    <h3 className="font-bebas" style={{ fontSize: 26, color: "#fff", letterSpacing: "0.03em", lineHeight: 1.1, marginBottom: 8 }}>
                      TU VEUX QU&apos;ON RÉALISE CES IDÉES ENSEMBLE ?
                    </h3>
                    <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 24, lineHeight: 1.6 }}>
                      Reçois un plan de contenu personnalisé gratuit par email.
                    </p>
                    <form onSubmit={handleLeadSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="lead-grid">
                        <input
                          type="text" placeholder="Ton prénom *" value={leadPrenom} onChange={e => setLeadPrenom(e.target.value)} required
                          className="font-dm"
                          style={{ padding: "12px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#fff", fontSize: 13, outline: "none", fontFamily: "var(--font-dm-sans), sans-serif" }}
                        />
                        <input
                          type="email" placeholder="Email professionnel *" value={leadEmail} onChange={e => setLeadEmail(e.target.value)} required
                          className="font-dm"
                          style={{ padding: "12px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#fff", fontSize: 13, outline: "none", fontFamily: "var(--font-dm-sans), sans-serif" }}
                        />
                      </div>
                      <input
                        type="text" placeholder="Ton Instagram (optionnel)" value={leadInsta} onChange={e => setLeadInsta(e.target.value)}
                        className="font-dm"
                        style={{ padding: "12px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#fff", fontSize: 13, outline: "none", fontFamily: "var(--font-dm-sans), sans-serif" }}
                      />
                      <button type="submit" disabled={!leadPrenom || !leadEmail || leadSending} className="font-dm"
                        style={{ padding: "14px 24px", background: leadPrenom && leadEmail ? "#C9A84C" : "rgba(201,168,76,0.2)", color: leadPrenom && leadEmail ? "#0a0a0a" : "rgba(201,168,76,0.4)", border: "none", borderRadius: 9999, fontSize: 13, fontWeight: 700, cursor: leadPrenom && leadEmail ? "pointer" : "not-allowed", letterSpacing: "0.04em", transition: "all 0.2s" }}>
                        {leadSending ? "Envoi en cours…" : "Recevoir mon plan gratuit →"}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
                <button onClick={reset} className="font-dm"
                  style={{ flex: 1, minWidth: 180, padding: "13px 20px", background: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 9999, color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <RotateCcw size={13} /> Générer 3 nouvelles idées
                </button>
                <a href="https://calendly.com/massishot-ca/30min" target="_blank" rel="noopener noreferrer" className="font-dm"
                  style={{ flex: 1, minWidth: 180, padding: "13px 20px", background: "#C9A84C", color: "#0a0a0a", border: "none", borderRadius: 9999, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none", letterSpacing: "0.04em" }}>
                  Créer ce contenu avec Massi →
                </a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 560px) { .secteur-grid { grid-template-columns: 1fr !important; } .lead-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}

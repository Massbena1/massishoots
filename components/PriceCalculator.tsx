"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Camera, Video, Zap, Heart, Users, ChevronRight } from "lucide-react";

// ─── Pricing config ───────────────────────────────────────────────────────────

const PROJECT_TYPES = [
  {
    id: "mensuel",
    label: "Contenu Mensuel",
    sub: "Personal branding, Reels, Face caméra",
    icon: Zap,
    base: 2500,
    unit: "/ mois",
  },
  {
    id: "evenement",
    label: "Événement",
    sub: "Soirée, gala, lancement, conférence",
    icon: Users,
    base: 1800,
    unit: "",
  },
  {
    id: "mariage",
    label: "Mariage",
    sub: "Cérémonie, préparatifs, réception",
    icon: Heart,
    base: 3500,
    unit: "",
  },
  {
    id: "publicite",
    label: "Publicité",
    sub: "Meta Ads, Instagram, UGC vidéo",
    icon: Video,
    base: 599,
    unit: "/ vidéo",
  },
  {
    id: "portrait",
    label: "Portrait / Corporate",
    sub: "Session pro, headshots, branding",
    icon: Camera,
    base: 450,
    unit: "/ session",
  },
] as const;

type ProjectId = typeof PROJECT_TYPES[number]["id"];

const DURATIONS: Record<ProjectId, { id: string; label: string; multiplier: number }[]> = {
  mensuel: [
    { id: "1", label: "1 mois", multiplier: 1 },
    { id: "3", label: "3 mois", multiplier: 2.75 },
    { id: "6", label: "6 mois", multiplier: 5.1 },
    { id: "12", label: "12 mois", multiplier: 9.6 },
  ],
  evenement: [
    { id: "4h", label: "Demi-journée (4h)", multiplier: 1 },
    { id: "8h", label: "Journée complète (8h)", multiplier: 1.7 },
    { id: "2j", label: "2 jours", multiplier: 2.9 },
    { id: "3j+", label: "3 jours et plus", multiplier: 4 },
  ],
  mariage: [
    { id: "ceremonie", label: "Cérémonie seulement", multiplier: 0.65 },
    { id: "journee", label: "Journée complète", multiplier: 1 },
    { id: "journee-soiree", label: "Journée + Soirée", multiplier: 1.4 },
    { id: "destination", label: "Mariage destination", multiplier: 2.2 },
  ],
  publicite: [
    { id: "1", label: "1 vidéo", multiplier: 1 },
    { id: "3", label: "Pack 3 vidéos", multiplier: 2.7 },
    { id: "5", label: "Pack 5 vidéos", multiplier: 4.2 },
    { id: "10", label: "Pack 10 vidéos", multiplier: 7.5 },
  ],
  portrait: [
    { id: "1h", label: "Session 1h", multiplier: 1 },
    { id: "2h", label: "Session 2h", multiplier: 1.7 },
    { id: "demi", label: "Demi-journée (4h)", multiplier: 2.8 },
  ],
};

const DELIVERABLES = [
  { id: "photo", label: "Photos retouchées", addPercent: 0 },
  { id: "video", label: "Vidéo / Reel monté", addPercent: 35 },
  { id: "rush", label: "Livraison express (48h)", addPercent: 20 },
  { id: "droits", label: "Droits commerciaux inclus", addPercent: 15 },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PriceCalculator() {
  const [step, setStep] = useState(1);
  const [projectId, setProjectId] = useState<ProjectId | null>(null);
  const [durationId, setDurationId] = useState<string | null>(null);
  const [deliverables, setDeliverables] = useState<string[]>(["photo"]);

  const project = PROJECT_TYPES.find(p => p.id === projectId);
  const durations = projectId ? DURATIONS[projectId] : [];
  const duration = durations.find(d => d.id === durationId);

  const calcPrice = () => {
    if (!project || !duration) return null;
    let base = project.base * duration.multiplier;
    let addPct = 0;
    for (const d of DELIVERABLES) {
      if (deliverables.includes(d.id) && d.id !== "photo") addPct += d.addPercent;
    }
    base = base * (1 + addPct / 100);
    const low = Math.round(base / 100) * 100;
    const high = Math.round(low * 1.35 / 100) * 100;
    return { low, high };
  };

  const price = step === 3 ? calcPrice() : null;

  const toggleDeliverable = (id: string) => {
    if (id === "photo") return;
    setDeliverables(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const goNext = () => setStep(s => Math.min(s + 1, 3));
  const goBack = () => setStep(s => Math.max(s - 1, 1));
  const reset = () => { setStep(1); setProjectId(null); setDurationId(null); setDeliverables(["photo"]); };

  return (
    <section style={{ padding: "80px 0 120px", background: "transparent" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="font-dm" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c4cdd6" }}>
            — Estimez votre budget
          </span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(40px, 6vw, 64px)", color: "#fff", letterSpacing: "0.03em", marginTop: 12, lineHeight: 0.95 }}>
            CALCULATEUR<br />DE PRIX
          </h2>
          <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 16, lineHeight: 1.7 }}>
            Obtenez une fourchette instantanée — sans engagement.
          </p>
        </div>

        {/* Steps indicator */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 48 }}>
          {[1, 2, 3].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: step >= s ? "#f2f0ec" : "rgba(255,255,255,0.06)",
                border: `1px solid ${step >= s ? "#f2f0ec" : "rgba(255,255,255,0.12)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.3s",
              }}>
                <span className="font-dm" style={{ fontSize: 12, fontWeight: 700, color: step >= s ? "#0a0a0a" : "rgba(255,255,255,0.3)" }}>
                  {s}
                </span>
              </div>
              {i < 2 && (
                <div style={{ width: 60, height: 1, background: step > s ? "rgba(242,240,236,0.4)" : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />
              )}
            </div>
          ))}
        </div>

        {/* Steps */}
        <div style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 24,
          overflow: "hidden",
        }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                style={{ padding: "36px 32px" }}
              >
                <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>
                  Étape 1 — Type de projet
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                  {PROJECT_TYPES.map(pt => {
                    const Icon = pt.icon;
                    const selected = projectId === pt.id;
                    return (
                      <button
                        key={pt.id}
                        onClick={() => { setProjectId(pt.id); setDurationId(null); }}
                        className="font-dm"
                        style={{
                          padding: "18px 20px",
                          background: selected ? "rgba(242,240,236,0.08)" : "rgba(255,255,255,0.03)",
                          border: `1px solid ${selected ? "rgba(242,240,236,0.35)" : "rgba(255,255,255,0.08)"}`,
                          borderRadius: 14,
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.2s",
                        }}
                      >
                        <Icon size={18} color={selected ? "#f2f0ec" : "rgba(255,255,255,0.3)"} style={{ marginBottom: 10 }} />
                        <div style={{ fontSize: 13, fontWeight: 600, color: selected ? "#fff" : "rgba(255,255,255,0.65)", marginBottom: 4 }}>
                          {pt.label}
                        </div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)" }}>
                          {pt.sub}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={goNext}
                    disabled={!projectId}
                    className="font-dm"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "12px 24px",
                      background: projectId ? "#f2f0ec" : "rgba(255,255,255,0.06)",
                      color: projectId ? "#0a0a0a" : "rgba(255,255,255,0.2)",
                      border: "none", borderRadius: 9999,
                      fontSize: 13, fontWeight: 700, cursor: projectId ? "pointer" : "not-allowed",
                      transition: "all 0.2s",
                    }}
                  >
                    Continuer <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                style={{ padding: "36px 32px" }}
              >
                <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>
                  Étape 2 — {project?.id === "mensuel" ? "Durée du contrat" : project?.id === "publicite" ? "Nombre de vidéos" : "Durée / formule"}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {durations.map(d => {
                    const selected = durationId === d.id;
                    const estPrice = Math.round(project!.base * d.multiplier / 100) * 100;
                    return (
                      <button
                        key={d.id}
                        onClick={() => setDurationId(d.id)}
                        className="font-dm"
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "16px 20px",
                          background: selected ? "rgba(242,240,236,0.08)" : "rgba(255,255,255,0.02)",
                          border: `1px solid ${selected ? "rgba(242,240,236,0.35)" : "rgba(255,255,255,0.07)"}`,
                          borderRadius: 12, cursor: "pointer",
                          transition: "all 0.2s", textAlign: "left",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{
                            width: 18, height: 18, borderRadius: "50%",
                            border: `2px solid ${selected ? "#f2f0ec" : "rgba(255,255,255,0.2)"}`,
                            background: selected ? "#f2f0ec" : "transparent",
                            flexShrink: 0, transition: "all 0.2s",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            {selected && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0a0a0a" }} />}
                          </div>
                          <span style={{ fontSize: 14, color: selected ? "#fff" : "rgba(255,255,255,0.6)" }}>
                            {d.label}
                          </span>
                        </div>
                        <span className="font-bebas" style={{ fontSize: 18, color: selected ? "#c4cdd6" : "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>
                          ~{estPrice.toLocaleString()} ${project?.unit}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div style={{ marginTop: 28, display: "flex", justifyContent: "space-between" }}>
                  <button onClick={goBack} className="font-dm" style={{ padding: "12px 20px", background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer" }}>
                    Retour
                  </button>
                  <button
                    onClick={goNext}
                    disabled={!durationId}
                    className="font-dm"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "12px 24px",
                      background: durationId ? "#f2f0ec" : "rgba(255,255,255,0.06)",
                      color: durationId ? "#0a0a0a" : "rgba(255,255,255,0.2)",
                      border: "none", borderRadius: 9999,
                      fontSize: 13, fontWeight: 700, cursor: durationId ? "pointer" : "not-allowed",
                      transition: "all 0.2s",
                    }}
                  >
                    Voir le prix <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                style={{ padding: "36px 32px" }}
              >
                <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>
                  Étape 3 — Livrables & options
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 36 }} className="deliverables-grid">
                  {DELIVERABLES.map(d => {
                    const selected = deliverables.includes(d.id);
                    const locked = d.id === "photo";
                    return (
                      <button
                        key={d.id}
                        onClick={() => toggleDeliverable(d.id)}
                        className="font-dm"
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "14px 16px",
                          background: selected ? "rgba(242,240,236,0.07)" : "rgba(255,255,255,0.02)",
                          border: `1px solid ${selected ? "rgba(242,240,236,0.3)" : "rgba(255,255,255,0.07)"}`,
                          borderRadius: 12, cursor: locked ? "default" : "pointer",
                          textAlign: "left", transition: "all 0.2s",
                        }}
                      >
                        <div style={{
                          width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                          border: `2px solid ${selected ? "#f2f0ec" : "rgba(255,255,255,0.2)"}`,
                          background: selected ? "#f2f0ec" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.2s",
                        }}>
                          {selected && <span style={{ fontSize: 10, color: "#0a0a0a", fontWeight: 900 }}>✓</span>}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, color: selected ? "#fff" : "rgba(255,255,255,0.5)" }}>
                            {d.label}
                          </div>
                          {d.addPercent > 0 && (
                            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>
                              +{d.addPercent}%
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Price result */}
                {price && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      padding: "28px 28px 24px",
                      background: "rgba(196,205,214,0.05)",
                      border: "1px solid rgba(196,205,214,0.15)",
                      borderRadius: 18,
                      marginBottom: 24,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ position: "absolute", top: 0, left: 20, right: 20, height: 1, background: "linear-gradient(90deg, transparent, rgba(196,205,214,0.3), transparent)" }} />
                    <p className="font-dm" style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 12 }}>
                      Estimation pour votre projet
                    </p>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
                      <span className="font-bebas" style={{ fontSize: "clamp(40px, 6vw, 56px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 1 }}>
                        {price.low.toLocaleString()} $
                      </span>
                      <span className="font-bebas" style={{ fontSize: 28, color: "rgba(255,255,255,0.3)", letterSpacing: "0.03em" }}>
                        — {price.high.toLocaleString()} $
                      </span>
                    </div>
                    <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>
                      Fourchette indicative · Prix final confirmé après consultation gratuite.<br />
                      {project?.id === "mariage" ? "Mariages sur devis — chaque projet est unique." : "Taxes non incluses."}
                    </p>
                  </motion.div>
                )}

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={goBack} className="font-dm" style={{ padding: "12px 20px", background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer" }}>
                    Retour
                  </button>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={reset} className="font-dm" style={{ padding: "12px 18px", background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer" }}>
                      Recommencer
                    </button>
                    <Link href="/contact" className="font-dm" style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "12px 24px",
                      background: "#f2f0ec", color: "#0a0a0a",
                      borderRadius: 9999, textDecoration: "none",
                      fontSize: 13, fontWeight: 700, letterSpacing: "0.05em",
                    }}>
                      Réserver ma consultation <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="font-dm" style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.18)", marginTop: 20 }}>
          * Les prix sont en dollars canadiens et à titre indicatif. Chaque projet est discuté lors d&apos;un appel gratuit.
        </p>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .deliverables-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Camera, Video, Zap, Heart, Users, ChevronRight, RotateCcw } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Answers = Record<string, string | string[]>;
type Question = {
  id: string;
  label: string;
  multi?: boolean;
  options: { id: string; label: string; sub?: string }[];
};

// ─── Project config ───────────────────────────────────────────────────────────

const PROJECTS = [
  { id: "evenement", label: "Événement", sub: "Soirée, gala, lancement, conférence", icon: Users },
  { id: "mensuel",   label: "Contenu Mensuel", sub: "Personal branding, Reels, face caméra", icon: Zap },
  { id: "pub",       label: "Publicité",  sub: "Meta Ads, Instagram, UGC vidéo", icon: Video },
  { id: "mariage",   label: "Mariage",    sub: "Cérémonie, préparatifs, réception", icon: Heart },
  { id: "portrait",  label: "Portrait / Corporate", sub: "Headshots, session pro, branding", icon: Camera },
] as const;

type ProjectId = typeof PROJECTS[number]["id"];

// ─── Questions per project ────────────────────────────────────────────────────

const QUESTIONS: Record<ProjectId, Question[]> = {
  evenement: [
    {
      id: "duree",
      label: "Quelle est la durée de l'événement ?",
      options: [
        { id: "4h",  label: "4 heures",        sub: "Cocktail, lancement" },
        { id: "6h",  label: "6 heures",        sub: "Soirée standard" },
        { id: "8h",  label: "8 heures",        sub: "Journée complète" },
        { id: "12h", label: "12 heures +",     sub: "Gala, événement multi-scènes" },
      ],
    },
    {
      id: "equipe",
      label: "Combien de personnes sur place ?",
      options: [
        { id: "1",  label: "Solo (1 personne)",  sub: "Moi seul" },
        { id: "2",  label: "Duo (2 personnes)",  sub: "Photographe + vidéaste" },
        { id: "3+", label: "Équipe (3+)",         sub: "Couverture maximale" },
      ],
    },
    {
      id: "livrable",
      label: "Qu'est-ce que vous voulez comme livrable ?",
      options: [
        { id: "photo",       label: "Photo seulement" },
        { id: "video",       label: "Vidéo seulement" },
        { id: "photo+video", label: "Photo + Vidéo",  sub: "Couverture complète" },
      ],
    },
    {
      id: "delai",
      label: "Délai de livraison souhaité ?",
      options: [
        { id: "standard", label: "Standard (2–3 semaines)" },
        { id: "express",  label: "Express (48–72h)", sub: "+20%" },
      ],
    },
  ],

  mensuel: [
    {
      id: "jours",
      label: "Nombre de jours de tournage par mois ?",
      options: [
        { id: "1j", label: "1 jour / mois",   sub: "Essentiel" },
        { id: "2j", label: "2 jours / mois",  sub: "Croissance" },
        { id: "4j", label: "4 jours / mois",  sub: "Présence maximale" },
      ],
    },
    {
      id: "reels",
      label: "Combien de vidéos / Reels par mois ?",
      options: [
        { id: "4",   label: "4 vidéos / mois" },
        { id: "8",   label: "8 vidéos / mois" },
        { id: "12+", label: "12+ vidéos / mois" },
      ],
    },
    {
      id: "contenu",
      label: "Type de contenu souhaité ?",
      options: [
        { id: "video",       label: "Vidéo seulement",     sub: "Reels, face caméra" },
        { id: "photo",       label: "Photo seulement",     sub: "Branding, catalogue" },
        { id: "photo+video", label: "Photo + Vidéo",       sub: "Package complet" },
      ],
    },
    {
      id: "client",
      label: "C'est pour qui ?",
      options: [
        { id: "personne", label: "Personne / Entrepreneur",   sub: "Personal branding, créateur de contenu" },
        { id: "entreprise", label: "Entreprise / Marque",     sub: "PME, startup, grande entreprise" },
      ],
    },
    {
      id: "duree",
      label: "Durée du contrat ?",
      options: [
        { id: "1",  label: "1 mois",   sub: "Essai" },
        { id: "3",  label: "3 mois",   sub: "Réduction 8%" },
        { id: "6",  label: "6 mois",   sub: "Réduction 13%" },
        { id: "12", label: "12 mois",  sub: "Réduction 18%" },
      ],
    },
  ],

  pub: [
    {
      id: "nombre",
      label: "Combien de vidéos publicitaires ?",
      options: [
        { id: "1",   label: "1 vidéo" },
        { id: "3",   label: "3 vidéos",   sub: "−11%" },
        { id: "5",   label: "5 vidéos",   sub: "−17%" },
        { id: "10+", label: "10 vidéos +",sub: "−25%" },
      ],
    },
    {
      id: "format",
      label: "Format de la vidéo ?",
      options: [
        { id: "ugc",   label: "UGC style brut",         sub: "Authentique, sans montage complexe" },
        { id: "reel",  label: "Reel monté",              sub: "Montage pro, sous-titres, effets" },
        { id: "long",  label: "Vidéo longue (30–60s)",   sub: "Brand film, ad cinématique" },
      ],
    },
    {
      id: "strategie",
      label: "Stratégie & script inclus ?",
      options: [
        { id: "non", label: "Non — juste le tournage / montage" },
        { id: "oui", label: "Oui — script, accroches, stratégie", sub: "+35%" },
      ],
    },
  ],

  mariage: [
    {
      id: "heures",
      label: "Nombre d'heures de couverture ?",
      options: [
        { id: "6h",  label: "6 heures",    sub: "Cérémonie + cocktail" },
        { id: "8h",  label: "8 heures",    sub: "Journée standard" },
        { id: "10h", label: "10 heures",   sub: "Journée + début soirée" },
        { id: "12h", label: "12 heures +", sub: "Journée complète" },
      ],
    },
    {
      id: "livrable",
      label: "Livrable souhaité ?",
      options: [
        { id: "photo", label: "Photo seulement" },
        { id: "film",  label: "Film seulement",         sub: "Court-métrage cinématique" },
        { id: "both",  label: "Photo + Film",           sub: "Couverture complète" },
      ],
    },
    {
      id: "lieu",
      label: "Où se déroule le mariage ?",
      options: [
        { id: "montreal",   label: "Montréal & région" },
        { id: "qc-on",      label: "Québec / Ontario",  sub: "+15%" },
        { id: "intl",       label: "International",     sub: "+40% + frais voyage" },
      ],
    },
    {
      id: "extras",
      label: "Options supplémentaires ?",
      multi: true,
      options: [
        { id: "none",   label: "Aucun extra" },
        { id: "album",  label: "Album photo premium",  sub: "+800 $" },
        { id: "drone",  label: "Drone",                sub: "+600 $" },
        { id: "2nd",    label: "2e photographe",       sub: "+900 $" },
      ],
    },
  ],

  portrait: [
    {
      id: "duree",
      label: "Durée de la session ?",
      options: [
        { id: "1h",   label: "1 heure" },
        { id: "2h",   label: "2 heures" },
        { id: "demi", label: "Demi-journée (4h)", sub: "Branding complet" },
      ],
    },
    {
      id: "looks",
      label: "Nombre de looks / tenues ?",
      options: [
        { id: "1", label: "1 look" },
        { id: "2", label: "2 looks" },
        { id: "3", label: "3 looks +" },
      ],
    },
    {
      id: "photos",
      label: "Nombre de photos retouchées livrées ?",
      options: [
        { id: "10",  label: "10 photos" },
        { id: "25",  label: "25 photos" },
        { id: "50",  label: "50 photos +" },
      ],
    },
  ],
};

// ─── Pricing engine ───────────────────────────────────────────────────────────

function computePrice(projectId: ProjectId, answers: Answers): { low: number; high: number } | null {
  const get = (id: string) => answers[id] as string;
  const has = (id: string, val: string) => {
    const a = answers[id];
    return Array.isArray(a) ? a.includes(val) : a === val;
  };

  let base = 0;

  // Événements — fourchette large, non committal
  if (projectId === "evenement") {
    const dureeBase: Record<string, number> = { "4h": 1500, "6h": 2100, "8h": 2900, "12h": 4200 };
    base = dureeBase[get("duree")] ?? 1500;
    const equipeM: Record<string, number> = { "1": 1, "2": 1.65, "3+": 2.2 };
    base *= equipeM[get("equipe")] ?? 1;
    const livrableM: Record<string, number> = { photo: 1, video: 1.25, "photo+video": 1.85 };
    base *= livrableM[get("livrable")] ?? 1;
    if (get("delai") === "express") base *= 1.2;
    const low = Math.round(base / 100) * 100;
    const high = Math.round(low * 1.5 / 100) * 100; // wider range for events
    return { low, high };
  }

  // Contenu mensuel — fourchette vague (total du contrat)
  if (projectId === "mensuel") {
    const joursBase: Record<string, number> = { "1j": 2500, "2j": 3800, "4j": 6000 };
    base = joursBase[get("jours")] ?? 2500;
    const reelsM: Record<string, number> = { "4": 1, "8": 1.3, "12+": 1.65 };
    base *= reelsM[get("reels")] ?? 1;
    const contenuM: Record<string, number> = { video: 1, photo: 0.85, "photo+video": 1.35 };
    base *= contenuM[get("contenu")] ?? 1;
    if (get("client") === "entreprise") base *= 1.3;
    const dureeDiscount: Record<string, number> = { "1": 1, "3": 0.92, "6": 0.87, "12": 0.82 };
    const months = parseInt(get("duree") || "1");
    base = base * months * (dureeDiscount[get("duree")] ?? 1);
    const low = Math.round(base / 100) * 100;
    const high = Math.round(low * 1.25 / 100) * 100;
    return { low, high };
  }

  // Publicité — prix actuels
  if (projectId === "pub") {
    const nombreBase: Record<string, number> = { "1": 599, "3": 1597, "5": 2495, "10+": 4499 };
    base = nombreBase[get("nombre")] ?? 599;
    const formatM: Record<string, number> = { ugc: 1, reel: 1.3, long: 1.6 };
    base *= formatM[get("format")] ?? 1;
    if (get("strategie") === "oui") base *= 1.35;
    const low = Math.round(base / 50) * 50;
    const high = Math.round(low * 1.25 / 50) * 50;
    return { low, high };
  }

  // Mariage — sur devis
  if (projectId === "mariage") {
    return null;
  }

  // Portrait / Corporate
  if (projectId === "portrait") {
    const dureeBase: Record<string, number> = { "1h": 280, "2h": 480, demi: 850 };
    base = dureeBase[get("duree")] ?? 280;
    const looksM: Record<string, number> = { "1": 1, "2": 1.15, "3": 1.3 };
    base *= looksM[get("looks")] ?? 1;
    const photosM: Record<string, number> = { "10": 1, "25": 1.2, "50": 1.4 };
    base *= photosM[get("photos")] ?? 1;
    const low = Math.round(base / 25) * 25;
    const high = Math.round(low * 1.2 / 25) * 25;
    return { low, high };
  }

  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PriceCalculator() {
  const [projectId, setProjectId] = useState<ProjectId | null>(null);
  const [questionStep, setQuestionStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const questions = projectId ? QUESTIONS[projectId] : [];
  const currentQ = questions[questionStep];
  const totalSteps = questions.length;
  const isLast = questionStep === totalSteps - 1;

  const answer = answers[currentQ?.id ?? ""];
  const hasAnswer = answer !== undefined && (Array.isArray(answer) ? answer.length > 0 : true);

  const price = done && projectId ? computePrice(projectId, answers) : null;

  const selectProject = (id: ProjectId) => {
    setProjectId(id);
    setQuestionStep(0);
    setAnswers({});
    setDone(false);
  };

  const setAnswer = (qId: string, value: string, multi?: boolean) => {
    if (multi) {
      setAnswers(prev => {
        const arr = (prev[qId] as string[] | undefined) ?? [];
        if (value === "none") return { ...prev, [qId]: ["none"] };
        const withoutNone = arr.filter(v => v !== "none");
        return {
          ...prev,
          [qId]: withoutNone.includes(value)
            ? withoutNone.filter(v => v !== value)
            : [...withoutNone, value],
        };
      });
    } else {
      setAnswers(prev => ({ ...prev, [qId]: value }));
    }
  };

  const goNext = () => {
    if (isLast) { setDone(true); }
    else setQuestionStep(s => s + 1);
  };

  const goBack = () => {
    if (done) { setDone(false); }
    else if (questionStep === 0) { setProjectId(null); }
    else setQuestionStep(s => s - 1);
  };

  const reset = () => { setProjectId(null); setQuestionStep(0); setAnswers({}); setDone(false); };

  const globalStep = !projectId ? 0 : done ? totalSteps + 1 : questionStep + 1;
  const totalGlobal = totalSteps + 2;

  return (
    <section style={{ padding: "80px 0 120px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="font-dm" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c4cdd6" }}>
            — Estimez votre budget
          </span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(40px, 6vw, 64px)", color: "#fff", letterSpacing: "0.03em", marginTop: 12, lineHeight: 0.95 }}>
            CALCULATEUR<br />DE PRIX
          </h2>
          <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 16 }}>
            Répondez à quelques questions — obtenez une fourchette instantanée, sans engagement.
          </p>
        </div>

        {/* Progress bar */}
        {projectId && (
          <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 9999, marginBottom: 32, overflow: "hidden" }}>
            <motion.div
              animate={{ width: `${(globalStep / totalGlobal) * 100}%` }}
              transition={{ duration: 0.4 }}
              style={{ height: "100%", background: "#c4cdd6", borderRadius: 9999 }}
            />
          </div>
        )}

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 24,
          overflow: "hidden",
          minHeight: 320,
        }}>
          <AnimatePresence mode="wait">

            {/* Step 0 — choose project */}
            {!projectId && (
              <motion.div key="project" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} style={{ padding: "36px 28px" }}>
                <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>
                  Quel type de projet ?
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                  {PROJECTS.map(p => {
                    const Icon = p.icon;
                    return (
                      <button key={p.id} onClick={() => selectProject(p.id)} className="font-dm"
                        style={{ padding: "18px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(196,205,214,0.3)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                      >
                        <Icon size={18} color="rgba(196,205,214,0.7)" style={{ marginBottom: 10 }} />
                        <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 4 }}>{p.label}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)" }}>{p.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Questions */}
            {projectId && !done && currentQ && (
              <motion.div key={`q-${questionStep}`} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }} style={{ padding: "36px 28px" }}>
                <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>
                  Question {questionStep + 1} / {totalSteps}
                </p>
                <p className="font-dm" style={{ fontSize: 16, color: "#fff", fontWeight: 600, marginBottom: 24, lineHeight: 1.4 }}>
                  {currentQ.label}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
                  {currentQ.options.map(opt => {
                    const sel = currentQ.multi
                      ? ((answers[currentQ.id] as string[]) ?? []).includes(opt.id)
                      : answers[currentQ.id] === opt.id;
                    return (
                      <button key={opt.id} onClick={() => setAnswer(currentQ.id, opt.id, currentQ.multi)} className="font-dm"
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: sel ? "rgba(242,240,236,0.07)" : "rgba(255,255,255,0.02)", border: `1px solid ${sel ? "rgba(242,240,236,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: 12, cursor: "pointer", textAlign: "left", transition: "all 0.18s" }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: currentQ.multi ? 16 : 16, height: currentQ.multi ? 16 : 16, borderRadius: currentQ.multi ? 4 : "50%", border: `2px solid ${sel ? "#f2f0ec" : "rgba(255,255,255,0.2)"}`, background: sel ? "#f2f0ec" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.18s" }}>
                            {sel && <span style={{ fontSize: 9, color: "#0a0a0a", fontWeight: 900 }}>✓</span>}
                          </div>
                          <div>
                            <span style={{ fontSize: 13, color: sel ? "#fff" : "rgba(255,255,255,0.65)" }}>{opt.label}</span>
                            {opt.sub && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", display: "block", marginTop: 2 }}>{opt.sub}</span>}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button onClick={goBack} className="font-dm" style={{ padding: "11px 18px", background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer" }}>
                    ← Retour
                  </button>
                  <button onClick={goNext} disabled={!hasAnswer} className="font-dm"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", background: hasAnswer ? "#f2f0ec" : "rgba(255,255,255,0.06)", color: hasAnswer ? "#0a0a0a" : "rgba(255,255,255,0.2)", border: "none", borderRadius: 9999, fontSize: 13, fontWeight: 700, cursor: hasAnswer ? "pointer" : "not-allowed", transition: "all 0.2s" }}
                  >
                    {isLast ? "Voir mon estimation" : "Suivant"} <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Result */}
            {done && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ padding: "36px 28px" }}>
                {price ? (
                  <>
                    <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>
                      Estimation pour votre projet
                    </p>
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      style={{ marginBottom: 28, padding: "28px 24px", background: "rgba(196,205,214,0.05)", border: "1px solid rgba(196,205,214,0.15)", borderRadius: 18, position: "relative", overflow: "hidden" }}
                    >
                      <div style={{ position: "absolute", top: 0, left: 20, right: 20, height: 1, background: "linear-gradient(90deg, transparent, rgba(196,205,214,0.3), transparent)" }} />
                      <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                        <span className="font-bebas" style={{ fontSize: "clamp(44px, 7vw, 64px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 1 }}>
                          {price.low.toLocaleString("fr-CA")} $
                        </span>
                        <span className="font-bebas" style={{ fontSize: 28, color: "rgba(255,255,255,0.3)", letterSpacing: "0.03em" }}>
                          — {price.high.toLocaleString("fr-CA")} $
                        </span>
                      </div>
                      <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 12, lineHeight: 1.7 }}>
                        Fourchette indicative en dollars canadiens, taxes en sus.<br />
                        Prix exact confirmé lors de votre consultation gratuite.
                      </p>
                    </motion.div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
                      <button onClick={goBack} className="font-dm" style={{ padding: "11px 18px", background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer" }}>
                        ← Modifier
                      </button>
                      <div style={{ display: "flex", gap: 10 }}>
                        <button onClick={reset} className="font-dm" style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 16px", background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer" }}>
                          <RotateCcw size={12} /> Recommencer
                        </button>
                        <Link href="/contact" className="font-dm" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", background: "#f2f0ec", color: "#0a0a0a", borderRadius: 9999, textDecoration: "none", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em" }}>
                          Réserver ma consultation <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <p className="font-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>
                      Ce projet nécessite un devis personnalisé.
                    </p>
                    <Link href="/contact" className="font-dm" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "#f2f0ec", color: "#0a0a0a", borderRadius: 9999, textDecoration: "none", fontSize: 13, fontWeight: 700 }}>
                      Obtenir un devis <ArrowRight size={13} />
                    </Link>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <p className="font-dm" style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.18)", marginTop: 16 }}>
          * Prix indicatifs en CAD. Consultation gratuite pour confirmer le devis exact.
        </p>
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
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

type ProjectId = "evenement" | "mensuel" | "pub" | "mariage" | "portrait";

// ─── Questions per project ────────────────────────────────────────────────────

// ─── Pricing engine ───────────────────────────────────────────────────────────

function computePrice(projectId: ProjectId, answers: Answers): { low: number; high: number } | null {
  const get = (id: string) => answers[id] as string;
  const has = (id: string, val: string) => {
    const a = answers[id];
    return Array.isArray(a) ? a.includes(val) : a === val;
  };

  let base = 0;

  // Événements
  if (projectId === "evenement") {
    const dureeBase: Record<string, number> = { "4h": 1500, "6h": 2200, "8h": 2900, "12h": 4000 };
    base = dureeBase[get("duree")] ?? 1500;
    const equipe = get("equipe");
    if (equipe === "3+") return null; // sur devis
    const equipeM: Record<string, number> = { "1": 1, "2": 1.25, "3": 1.5 };
    base *= equipeM[equipe] ?? 1;
    const livrableM: Record<string, number> = { photo: 1, video: 1.15, "photo+video": 1.25 };
    base *= livrableM[get("livrable")] ?? 1;
    if (get("delai") === "express") base *= 1.2;
    const low = Math.round(base / 100) * 100;
    const high = Math.round(low * 1.2 / 100) * 100;
    if (high > 9500) return null;
    return { low, high };
  }

  // Contenu mensuel
  if (projectId === "mensuel") {
    const joursBase: Record<string, number> = { "1j": 2500, "2j": 4200, "4j": 7100 };
    base = joursBase[get("jours")] ?? 2500;
    const reelsM: Record<string, number> = { "10": 1, "15": 1.3, "20+": 1.6 };
    base *= reelsM[get("reels")] ?? 1;
    const contenuM: Record<string, number> = { video: 1, photo: 0.5, "photo+video": 1.35 };
    base *= contenuM[get("contenu")] ?? 1;
    if (get("client") === "entreprise") base *= 1.3;
    const dureeDiscount: Record<string, number> = { "1": 1, "3": 0.92, "6": 0.87, "12": 0.82 };
    const months = parseInt(get("duree") || "1");
    base = base * months * (dureeDiscount[get("duree")] ?? 1);
    const low = Math.round(base / 100) * 100;
    const high = Math.round(low * 1.2 / 100) * 100;
    return { low, high };
  }

  // Publicité
  if (projectId === "pub") {
    const nombreBase: Record<string, number> = { "1": 300, "3": 800, "5": 1300, "10": 2400, "15": 3400, "20": 4200 };
    base = nombreBase[get("nombre")] ?? 300;
    const formatM: Record<string, number> = { ugc: 1, reel: 1.3, long: 1.6 };
    base *= formatM[get("format")] ?? 1;
    if (get("strategie") === "oui") base *= 1.25;
    const low = Math.round(base / 50) * 50;
    const high = Math.round(low * 1.2 / 50) * 50;
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
    const looksM: Record<string, number> = { "1": 1, "2": 1.1, "3": 1.2 };
    base *= looksM[get("looks")] ?? 1;
    const photosM: Record<string, number> = { "10": 1, "25": 1.2, "50": 1.4 };
    base *= photosM[get("photos")] ?? 1;
    const low = Math.round(base / 10) * 10;
    const high = Math.round(low * 1.15 / 10) * 10;
    return { low, high };
  }

  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PriceCalculator() {
  const t = useTranslations("calculator");
  const locale = useLocale();
  const isFr = locale === "fr";

  const PROJECTS = isFr ? [
    { id: "evenement" as const, label: "Événement",            sub: "Soirée, gala, lancement, conférence",     icon: Users },
    { id: "mensuel"   as const, label: "Contenu Mensuel",      sub: "Personal branding, Reels, face caméra",   icon: Zap   },
    { id: "pub"       as const, label: "Publicité",            sub: "Meta Ads, Instagram, UGC vidéo",          icon: Video },
    { id: "mariage"   as const, label: "Mariage",              sub: "Cérémonie, préparatifs, réception",       icon: Heart },
    { id: "portrait"  as const, label: "Portrait / Corporate", sub: "Headshots, session pro, branding",        icon: Camera},
  ] : [
    { id: "evenement" as const, label: "Event",                sub: "Party, gala, launch, conference",          icon: Users },
    { id: "mensuel"   as const, label: "Monthly Content",      sub: "Personal branding, Reels, talking head",  icon: Zap   },
    { id: "pub"       as const, label: "Advertising",          sub: "Meta Ads, Instagram, UGC video",          icon: Video },
    { id: "mariage"   as const, label: "Wedding",              sub: "Ceremony, preparations, reception",       icon: Heart },
    { id: "portrait"  as const, label: "Portrait / Corporate", sub: "Headshots, pro session, branding",        icon: Camera},
  ];

  const QUESTIONS: Record<ProjectId, Question[]> = isFr ? {
    evenement: [
      { id: "duree",    label: "Quelle est la durée de l'événement ?", options: [{ id: "4h", label: "4 heures", sub: "Cocktail, lancement" }, { id: "6h", label: "6 heures", sub: "Soirée standard" }, { id: "8h", label: "8 heures", sub: "Journée complète" }, { id: "12h", label: "12 heures +", sub: "Gala, événement multi-scènes" }] },
      { id: "equipe",   label: "Combien de personnes sur place ?", options: [{ id: "1", label: "Solo (1 personne)", sub: "Moi seul" }, { id: "2", label: "Duo (2 personnes)", sub: "Photographe + vidéaste" }, { id: "3", label: "Équipe (3 personnes)", sub: "Couverture maximale" }, { id: "3+", label: "4 personnes et plus", sub: "Sur devis" }] },
      { id: "livrable", label: "Qu'est-ce que vous voulez comme livrable ?", options: [{ id: "photo", label: "Photo seulement" }, { id: "video", label: "Vidéo seulement" }, { id: "photo+video", label: "Photo + Vidéo", sub: "Couverture complète" }] },
      { id: "delai",    label: "Délai de livraison souhaité ?", options: [{ id: "standard", label: "Standard (2–3 semaines)" }, { id: "express", label: "Express (48–72h)", sub: "+20%" }] },
    ],
    mensuel: [
      { id: "jours",   label: "Nombre de jours de tournage par mois ?", options: [{ id: "1j", label: "1 jour / mois", sub: "Essentiel" }, { id: "2j", label: "2 jours / mois", sub: "Croissance" }, { id: "4j", label: "4 jours / mois", sub: "Présence maximale" }] },
      { id: "reels",   label: "Combien de vidéos / Reels par mois ?", options: [{ id: "10", label: "10 vidéos / mois" }, { id: "15", label: "15 vidéos / mois", sub: "+30%" }, { id: "20+", label: "20+ vidéos / mois", sub: "+60%" }] },
      { id: "contenu", label: "Type de contenu souhaité ?", options: [{ id: "video", label: "Vidéo seulement", sub: "Reels, face caméra" }, { id: "photo", label: "Photo seulement", sub: "Branding, catalogue" }, { id: "photo+video", label: "Photo + Vidéo", sub: "Package complet" }] },
      { id: "client",  label: "C'est pour qui ?", options: [{ id: "personne", label: "Personne / Entrepreneur", sub: "Personal branding, créateur de contenu" }, { id: "entreprise", label: "Entreprise / Marque", sub: "PME, startup, grande entreprise" }] },
      { id: "duree",   label: "Durée du contrat ?", options: [{ id: "1", label: "1 mois", sub: "Essai" }, { id: "3", label: "3 mois", sub: "Réduction 8%" }, { id: "6", label: "6 mois", sub: "Réduction 13%" }, { id: "12", label: "12 mois", sub: "Réduction 18%" }] },
    ],
    pub: [
      { id: "nombre",    label: "Combien de vidéos publicitaires ?", options: [{ id: "1", label: "1 vidéo", sub: "300 $" }, { id: "3", label: "3 vidéos", sub: "800 $" }, { id: "5", label: "5 vidéos", sub: "1 300 $" }, { id: "10", label: "10 vidéos", sub: "2 400 $" }, { id: "15", label: "15 vidéos", sub: "3 400 $" }, { id: "20", label: "20 vidéos", sub: "4 200 $" }] },
      { id: "format",    label: "Format de la vidéo ?", options: [{ id: "ugc", label: "UGC style brut", sub: "Authentique, sans montage complexe" }, { id: "reel", label: "Reel monté", sub: "Montage pro, sous-titres, effets" }, { id: "long", label: "Vidéo longue (30–60s)", sub: "Brand film, ad cinématique" }] },
      { id: "strategie", label: "Stratégie & script inclus ?", options: [{ id: "non", label: "Non — juste le tournage / montage" }, { id: "oui", label: "Oui — script, accroches, stratégie", sub: "+35%" }] },
    ],
    mariage: [
      { id: "heures",   label: "Nombre d'heures de couverture ?", options: [{ id: "6h", label: "6 heures", sub: "Cérémonie + cocktail" }, { id: "8h", label: "8 heures", sub: "Journée standard" }, { id: "10h", label: "10 heures", sub: "Journée + début soirée" }, { id: "12h", label: "12 heures +", sub: "Journée complète" }] },
      { id: "livrable", label: "Livrable souhaité ?", options: [{ id: "photo", label: "Photo seulement" }, { id: "film", label: "Film seulement", sub: "Court-métrage cinématique" }, { id: "both", label: "Photo + Film", sub: "Couverture complète" }] },
      { id: "lieu",     label: "Où se déroule le mariage ?", options: [{ id: "montreal", label: "Montréal & région" }, { id: "qc-on", label: "Québec / Ontario", sub: "+15%" }, { id: "intl", label: "International", sub: "+40% + frais voyage" }] },
      { id: "extras",   label: "Options supplémentaires ?", multi: true, options: [{ id: "none", label: "Aucun extra" }, { id: "album", label: "Album photo premium", sub: "+800 $" }, { id: "drone", label: "Drone", sub: "+600 $" }, { id: "2nd", label: "2e photographe", sub: "+900 $" }] },
    ],
    portrait: [
      { id: "duree",  label: "Durée de la session ?", options: [{ id: "1h", label: "1 heure" }, { id: "2h", label: "2 heures" }, { id: "demi", label: "Demi-journée (4h)", sub: "Branding complet" }] },
      { id: "looks",  label: "Nombre de looks / tenues ?", options: [{ id: "1", label: "1 look" }, { id: "2", label: "2 looks" }, { id: "3", label: "3 looks +" }] },
      { id: "photos", label: "Nombre de photos retouchées livrées ?", options: [{ id: "10", label: "10 photos" }, { id: "25", label: "25 photos" }, { id: "50", label: "50 photos +" }] },
    ],
  } : {
    evenement: [
      { id: "duree",    label: "How long is the event?", options: [{ id: "4h", label: "4 hours", sub: "Cocktail, launch" }, { id: "6h", label: "6 hours", sub: "Standard evening" }, { id: "8h", label: "8 hours", sub: "Full day" }, { id: "12h", label: "12 hours +", sub: "Gala, multi-stage event" }] },
      { id: "equipe",   label: "How many people on site?", options: [{ id: "1", label: "Solo (1 person)", sub: "Just me" }, { id: "2", label: "Duo (2 people)", sub: "Photographer + videographer" }, { id: "3", label: "Team (3 people)", sub: "Maximum coverage" }, { id: "3+", label: "4 people and more", sub: "Custom quote" }] },
      { id: "livrable", label: "What deliverable do you want?", options: [{ id: "photo", label: "Photo only" }, { id: "video", label: "Video only" }, { id: "photo+video", label: "Photo + Video", sub: "Full coverage" }] },
      { id: "delai",    label: "Desired delivery timeline?", options: [{ id: "standard", label: "Standard (2–3 weeks)" }, { id: "express", label: "Express (48–72h)", sub: "+20%" }] },
    ],
    mensuel: [
      { id: "jours",   label: "Number of shoot days per month?", options: [{ id: "1j", label: "1 day / month", sub: "Essential" }, { id: "2j", label: "2 days / month", sub: "Growth" }, { id: "4j", label: "4 days / month", sub: "Maximum presence" }] },
      { id: "reels",   label: "How many videos / Reels per month?", options: [{ id: "10", label: "10 videos / month" }, { id: "15", label: "15 videos / month", sub: "+30%" }, { id: "20+", label: "20+ videos / month", sub: "+60%" }] },
      { id: "contenu", label: "Type of content?", options: [{ id: "video", label: "Video only", sub: "Reels, talking head" }, { id: "photo", label: "Photo only", sub: "Branding, catalog" }, { id: "photo+video", label: "Photo + Video", sub: "Full package" }] },
      { id: "client",  label: "Who is this for?", options: [{ id: "personne", label: "Person / Entrepreneur", sub: "Personal branding, content creator" }, { id: "entreprise", label: "Business / Brand", sub: "SME, startup, large company" }] },
      { id: "duree",   label: "Contract duration?", options: [{ id: "1", label: "1 month", sub: "Trial" }, { id: "3", label: "3 months", sub: "8% discount" }, { id: "6", label: "6 months", sub: "13% discount" }, { id: "12", label: "12 months", sub: "18% discount" }] },
    ],
    pub: [
      { id: "nombre",    label: "How many ad videos?", options: [{ id: "1", label: "1 video", sub: "$300" }, { id: "3", label: "3 videos", sub: "$800" }, { id: "5", label: "5 videos", sub: "$1,300" }, { id: "10", label: "10 videos", sub: "$2,400" }, { id: "15", label: "15 videos", sub: "$3,400" }, { id: "20", label: "20 videos", sub: "$4,200" }] },
      { id: "format",    label: "Video format?", options: [{ id: "ugc", label: "Raw UGC style", sub: "Authentic, no complex editing" }, { id: "reel", label: "Edited Reel", sub: "Pro edit, subtitles, effects" }, { id: "long", label: "Long video (30–60s)", sub: "Brand film, cinematic ad" }] },
      { id: "strategie", label: "Strategy & script included?", options: [{ id: "non", label: "No — just shoot / edit" }, { id: "oui", label: "Yes — script, hooks, strategy", sub: "+35%" }] },
    ],
    mariage: [
      { id: "heures",   label: "Hours of coverage?", options: [{ id: "6h", label: "6 hours", sub: "Ceremony + cocktail" }, { id: "8h", label: "8 hours", sub: "Standard day" }, { id: "10h", label: "10 hours", sub: "Full day + early evening" }, { id: "12h", label: "12 hours +", sub: "Full day" }] },
      { id: "livrable", label: "Desired deliverable?", options: [{ id: "photo", label: "Photo only" }, { id: "film", label: "Film only", sub: "Cinematic short film" }, { id: "both", label: "Photo + Film", sub: "Full coverage" }] },
      { id: "lieu",     label: "Where is the wedding?", options: [{ id: "montreal", label: "Montreal & area" }, { id: "qc-on", label: "Quebec / Ontario", sub: "+15%" }, { id: "intl", label: "International", sub: "+40% + travel costs" }] },
      { id: "extras",   label: "Additional options?", multi: true, options: [{ id: "none", label: "No extras" }, { id: "album", label: "Premium photo album", sub: "+$800" }, { id: "drone", label: "Drone", sub: "+$600" }, { id: "2nd", label: "2nd photographer", sub: "+$900" }] },
    ],
    portrait: [
      { id: "duree",  label: "Session duration?", options: [{ id: "1h", label: "1 hour" }, { id: "2h", label: "2 hours" }, { id: "demi", label: "Half-day (4h)", sub: "Full branding" }] },
      { id: "looks",  label: "Number of looks / outfits?", options: [{ id: "1", label: "1 look" }, { id: "2", label: "2 looks" }, { id: "3", label: "3 looks +" }] },
      { id: "photos", label: "Number of retouched photos delivered?", options: [{ id: "10", label: "10 photos" }, { id: "25", label: "25 photos" }, { id: "50", label: "50 photos +" }] },
    ],
  };

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

  // Build summary of answered questions
  const summary: { label: string; value: string }[] = [];
  if (projectId) {
    const project = PROJECTS.find(p => p.id === projectId);
    if (project) summary.push({ label: t("summaryProject"), value: project.label });
    const qs = QUESTIONS[projectId];
    for (const q of qs) {
      const ans = answers[q.id];
      if (!ans) break;
      const vals = Array.isArray(ans) ? ans : [ans];
      const labels = vals.map(v => q.options.find(o => o.id === v)?.label ?? v).join(" + ");
      summary.push({ label: q.label.replace(" ?", ""), value: labels });
    }
  }

  return (
    <section style={{ padding: "80px 0 120px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="font-dm section-label" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c4cdd6" }}>
            {t("label")}
          </span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(40px, 6vw, 64px)", color: "#fff", letterSpacing: "0.03em", marginTop: 12, lineHeight: 0.95 }}>
            {t("heading").split("\n").map((l: string, i: number) => <span key={i}>{l}{i===0 && <br/>}</span>)}
          </h2>
          <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 16 }}>
            {t("subtitle")}
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

        {/* Real-time summary */}
        <AnimatePresence>
          {summary.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              style={{
                marginBottom: 16,
                padding: "16px 20px",
                background: "rgba(196,205,214,0.04)",
                border: "1px solid rgba(196,205,214,0.1)",
                borderRadius: 14,
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                alignItems: "center",
              }}
            >
              <span className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", textTransform: "uppercase", flexShrink: 0 }}>
                {t("selectionLabel")}
              </span>
              {summary.map((s, i) => (
                <motion.span
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  className="font-dm"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    padding: "4px 12px",
                    background: "rgba(196,205,214,0.08)",
                    border: "1px solid rgba(196,205,214,0.15)",
                    borderRadius: 9999,
                    fontSize: 11,
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>{s.label} :</span>
                  <span style={{ fontWeight: 600 }}>{s.value}</span>
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

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
                  {t("projectQuestion")}
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
                  {t("questionOf").replace("{n}", String(questionStep + 1)).replace("{total}", String(totalSteps))}
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
                    {t("back")}
                  </button>
                  <button onClick={goNext} disabled={!hasAnswer} className="font-dm"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", background: hasAnswer ? "#f2f0ec" : "rgba(255,255,255,0.06)", color: hasAnswer ? "#0a0a0a" : "rgba(255,255,255,0.2)", border: "none", borderRadius: 9999, fontSize: 13, fontWeight: 700, cursor: hasAnswer ? "pointer" : "not-allowed", transition: "all 0.2s" }}
                  >
                    {isLast ? t("seeEstimate") : t("next")} <ChevronRight size={14} />
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
                      {t("estimateLabel")}
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
                        {t("estimateNote").split("\n")[0]}<br />{t("estimateNote").split("\n")[1]}
                      </p>
                    </motion.div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
                      <button onClick={goBack} className="font-dm" style={{ padding: "11px 18px", background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer" }}>
                        {t("modify")}
                      </button>
                      <div style={{ display: "flex", gap: 10 }}>
                        <button onClick={reset} className="font-dm" style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 16px", background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer" }}>
                          <RotateCcw size={12} /> {t("restart")}
                        </button>
                        <Link href="/contact" className="font-dm" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", background: "#f2f0ec", color: "#0a0a0a", borderRadius: 9999, textDecoration: "none", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em" }}>
                          {t("book")} <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <p className="font-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>
                      {t("quoteNeeded")}
                    </p>
                    <Link href="/contact" className="font-dm" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "#f2f0ec", color: "#0a0a0a", borderRadius: 9999, textDecoration: "none", fontSize: 13, fontWeight: 700 }}>
                      {t("getQuote")} <ArrowRight size={13} />
                    </Link>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <p className="font-dm" style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.18)", marginTop: 16 }}>
          {t("footnote")}
        </p>
      </div>
    </section>
  );
}

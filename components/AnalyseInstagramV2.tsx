"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Camera, TrendingUp, BarChart3, Users, ArrowRight, Sparkles, Clock, Award } from "lucide-react";

export default function AnalyseInstagramV2() {
  const t = useTranslations("analyseInstagram");

  // Type definition for form state
  interface FormState {
    username: string;
    email: string;
    secteur: string;
    autreSecteur: string;
    objectif: string;
    loading: boolean;
    submitted: boolean;
    currentStep: number;
    analysisResult: any;
    loadingStep: number;
    error: string;
  }

  // All state in one place to avoid hooks order issues
  const [formState, setFormState] = useState<FormState>({
    username: "",
    email: "",
    secteur: "",
    autreSecteur: "",
    objectif: "",
    loading: false,
    submitted: false,
    currentStep: 1,
    analysisResult: null,
    loadingStep: 0,
    error: ""
  });
  const [animatedScore, setAnimatedScore] = useState(0);
  const reportRef = useRef<HTMLDivElement>(null);
  const [loaderTextIdx, setLoaderTextIdx] = useState(0);

  const loaderTexts = (handle: string) => [
    `Analyse du profil @${handle}...`,
    "Évaluation du positionnement...",
    "Audit de la stratégie contenu...",
    "Identification des opportunités...",
    "Génération du rapport premium...",
  ];

  useEffect(() => {
    if (!formState.loading) return;
    setLoaderTextIdx(0);
    const id = setInterval(() => {
      setLoaderTextIdx(prev => (prev + 1) % 5);
    }, 1200);
    return () => clearInterval(id);
  }, [formState.loading]);

  const updateFormState = (updates: Partial<FormState>) => {
    setFormState((prev: FormState) => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formState.username.trim() || !formState.email.trim() || !formState.secteur || !formState.objectif) return;
    if (formState.secteur === "autre" && !formState.autreSecteur.trim()) return;

    updateFormState({ loading: true, loadingStep: 0, error: "" });

    // Animate loading steps
    const stepInterval = setInterval(() => {
      setFormState((prev: FormState) => ({ ...prev, loadingStep: (prev.loadingStep + 1) % 4 }));
    }, 2000);

    try {
      console.log("🚀 Envoi de la requête d'analyse...");

      const response = await fetch("/api/analyse-instagram-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formState.username.trim().replace("@", ""),
          email: formState.email.trim(),
          secteur: formState.secteur === "autre" ? formState.autreSecteur.trim() : formState.secteur,
          objectif: formState.objectif
        }),
      });

      console.log("📡 Réponse reçue:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Erreur API:", errorData);
        updateFormState({ error: `Erreur ${response.status}: ${errorData.error || 'Problème serveur'}` });
        return;
      }

      const result = await response.json();
      console.log("📊 Résultat:", result);

      if (result.analysis) {
        updateFormState({
          analysisResult: result.analysis,
          submitted: true,
          error: ""
        });
        console.log("✅ Analyse terminée avec succès!");
        setTimeout(() => {
          reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else {
        console.error("❌ Pas de données d'analyse reçues:", result);
        updateFormState({ error: "Aucun résultat d'analyse reçu. Veuillez réessayer." });
      }
    } catch (error) {
      console.error("💥 Erreur de connexion:", error);
      updateFormState({ error: "Erreur de connexion. Vérifiez votre internet et réessayez." });
    } finally {
      clearInterval(stepInterval);
      updateFormState({ loading: false });
    }
  };

  const features = [
    {
      icon: TrendingUp,
      title: t("feature1Title"),
      desc: t("feature1Desc"),
    },
    {
      icon: BarChart3,
      title: t("feature2Title"),
      desc: t("feature2Desc"),
    },
    {
      icon: Users,
      title: t("feature3Title"),
      desc: t("feature3Desc"),
    },
  ];

  if (formState.submitted && formState.analysisResult) {
    const analysis = formState.analysisResult as any;
    const score = analysis.score_global ?? analysis.score ?? 0;

    const scoreColor = score >= 81 ? "#2ECC71" : score >= 66 ? "#C9A84C" : score >= 41 ? "#E67E22" : "#E74C3C";

    const potentielColor = (p: string) => {
      if (p === "Explosif") return "#E74C3C";
      if (p === "Très fort") return "#C9A84C";
      return "#2ECC71";
    };

    const severiteBg = (s: string) => {
      if (s === "Critique") return { bg: "#2D1515", border: "rgba(231,76,60,0.35)", text: "#E74C3C" };
      if (s === "Modéré")   return { bg: "#2D1E0F", border: "rgba(230,126,34,0.35)", text: "#E67E22" };
      return { bg: "#1a1a1a", border: "rgba(255,255,255,0.1)", text: "rgba(255,255,255,0.45)" };
    };

    const CATEGORIES = [
      { key: "bio_positionnement", label: "Bio & Positionnement" },
      { key: "qualite_visuelle",   label: "Qualité Visuelle" },
      { key: "strategie_contenu",  label: "Stratégie Contenu" },
      { key: "engagement",         label: "Engagement" },
      { key: "monetisation",       label: "Monétisation" },
      { key: "consistance",        label: "Consistance" },
    ];

    const circumference = 2 * Math.PI * 58; // r=58

    return (
      <section ref={reportRef} style={{ background: "#000", padding: "100px 24px 100px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>

          {/* ─── S1 : EN-TÊTE ─────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "40px 36px 36px" }}>

            {/* Titre + sous-titre */}
            <p className="font-bebas" style={{ fontSize: "clamp(22px,4vw,30px)", color: "#fff", letterSpacing: "0.04em", marginBottom: 4 }}>
              Rapport d'analyse — <span style={{ color: scoreColor }}>@{formState.username.replace("@", "")}</span>
            </p>
            <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 32 }}>
              {formState.secteur} · Généré par IA Massishoots
            </p>

            {/* Score + badge niveau */}
            <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
              {/* Cercle SVG animé */}
              <div style={{ position: "relative", width: 140, height: 140, flexShrink: 0 }}>
                <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                  <motion.circle cx="70" cy="70" r="58" fill="none" stroke={scoreColor} strokeWidth="10"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    animate={{ strokeDasharray: `${(score / 100) * circumference} ${circumference}` }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }} />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 36, fontWeight: 700, color: "#fff", lineHeight: 1, fontFamily: "var(--font-bebas-neue)" }}>{score}</span>
                  <span className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Score Global</span>
                </div>
              </div>

              {/* Infos à droite */}
              <div style={{ flex: 1 }}>
                {analysis.niveau && (
                  <span className="font-dm" style={{ display: "inline-block", fontSize: 12, fontWeight: 700, padding: "6px 18px", borderRadius: 6, background: "#C9A84C", color: "#0a0a0a", letterSpacing: "0.06em", marginBottom: 16 }}>
                    Niveau : {analysis.niveau}
                  </span>
                )}
                {analysis.accroche && (
                  <p className="font-dm" style={{ fontSize: 15, fontStyle: "italic", color: "#C9A84C", lineHeight: 1.65, margin: 0 }}>
                    "{analysis.accroche}"
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* ─── S2 : BARRES DE PROGRESSION ───────────────────────── */}
          {analysis.scores_categories && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
              style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 36px" }}>
              <h2 className="font-dm" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Analyse par catégorie</h2>
              <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 28 }}>6 axes évalués par l'IA</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {CATEGORIES.map(({ key, label }, idx) => {
                  const val: number = analysis.scores_categories[key] ?? 0;
                  return (
                    <div key={key}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{label}</span>
                        <span className="font-dm" style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{val}<span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>/100</span></span>
                      </div>
                      <div style={{ height: 6, background: "#1a1a1a", borderRadius: 9999, overflow: "hidden" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${val}%` }}
                          transition={{ delay: 0.3 + idx * 0.08, duration: 1.5, ease: "easeOut" }}
                          style={{ height: "100%", background: "#C9A84C", borderRadius: 9999 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ─── S3 : ANALYSE BIO ──────────────────────────────────── */}
          {analysis.bio_analyse && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
              style={{ background: "#0d0d0d", borderLeft: "2px solid #C9A84C", borderRadius: 16, padding: "32px 36px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 8 }}>
                <h2 className="font-dm" style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>📝 Ta bio sous la loupe</h2>
                {analysis.bio_analyse.note && (
                  <span className="font-bebas" style={{ fontSize: 20, color: "#C9A84C" }}>{analysis.bio_analyse.note}/100</span>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {analysis.bio_analyse.bio_actuelle_probleme && (
                  <div style={{ padding: "16px 18px", borderRadius: 10, border: "1px solid rgba(231,76,60,0.2)" }}>
                    <p className="font-dm" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#E74C3C", marginBottom: 8 }}>Le problème</p>
                    <p className="font-dm" style={{ fontSize: 13, color: "rgba(231,76,60,0.85)", lineHeight: 1.65, margin: 0 }}>{analysis.bio_analyse.bio_actuelle_probleme}</p>
                  </div>
                )}
                {analysis.bio_analyse.ce_qui_manque && (
                  <div style={{ padding: "16px 18px", borderRadius: 10, border: "1px solid rgba(230,126,34,0.2)" }}>
                    <p className="font-dm" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#E67E22", marginBottom: 8 }}>Ce qui manque</p>
                    <p className="font-dm" style={{ fontSize: 13, color: "rgba(230,126,34,0.85)", lineHeight: 1.65, margin: 0 }}>{analysis.bio_analyse.ce_qui_manque}</p>
                  </div>
                )}
                {analysis.bio_analyse.bio_recommandee && (
                  <div style={{ padding: "18px 20px", background: "#0a0a0a", border: "1px solid rgba(201,168,76,0.35)", borderRadius: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <span className="font-dm" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C" }}>✦ Exemple Massishoots</span>
                    </div>
                    <p className="font-dm" style={{ fontSize: 14, fontStyle: "italic", color: "#fff", lineHeight: 1.7, margin: 0 }}>"{analysis.bio_analyse.bio_recommandee}"</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ─── S4 : POINTS FORTS ─────────────────────────────────── */}
          {analysis.points_forts?.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
              style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 36px" }}>
              <h2 className="font-dm" style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 22 }}>✓ Ce qui fonctionne déjà</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
                {analysis.points_forts.map((point: string, i: number) => (
                  <div key={i} style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "16px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: "#C9A84C", fontSize: 16, flexShrink: 0, lineHeight: 1.4 }}>✓</span>
                    <span className="font-dm" style={{ fontSize: 13, color: "#fff", lineHeight: 1.6 }}>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── S5 : PROBLÈMES CRITIQUES ──────────────────────────── */}
          {analysis.problemes_critiques?.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}
              style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 36px" }}>
              <h2 className="font-dm" style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 22 }}>⚠ Ce qui freine ta croissance</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {analysis.problemes_critiques.map((p: any, i: number) => {
                  const c = severiteBg(p.severite);
                  return (
                    <div key={i} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 12, padding: "20px 22px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                        <span className="font-dm" style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{p.titre}</span>
                        <span className="font-dm" style={{ fontSize: 10, padding: "3px 12px", borderRadius: 9999, background: c.bg, border: `1px solid ${c.border}`, color: c.text, letterSpacing: "0.08em", fontWeight: 700, flexShrink: 0 }}>
                          {p.severite}
                        </span>
                      </div>
                      <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: p.impact_revenu ? 10 : 0 }}>{p.explication}</p>
                      {p.impact_revenu && (
                        <p className="font-dm" style={{ fontSize: 12, fontStyle: "italic", color: c.text, margin: 0 }}>
                          Impact revenu : {p.impact_revenu}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ─── S6 : PLAN D'ACTION 4 SEMAINES ────────────────────── */}
          {analysis.plan_action?.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }}
              style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 36px" }}>
              <h2 className="font-dm" style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6 }}>→ Ton plan d'action sur 4 semaines</h2>
              <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 28 }}>Applique ces actions dans l'ordre exact</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {analysis.plan_action.map((s: any, i: number) => (
                  <div key={i} style={{ display: "flex", gap: 20, position: "relative" }}>
                    {/* Timeline gauche */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 40 }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#C9A84C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
                        <span className="font-bebas" style={{ fontSize: 16, color: "#0a0a0a" }}>S{s.semaine}</span>
                      </div>
                      {i < analysis.plan_action.length - 1 && (
                        <div style={{ width: 1, flex: 1, background: "rgba(201,168,76,0.2)", minHeight: 24, margin: "4px 0" }} />
                      )}
                    </div>
                    {/* Carte */}
                    <div style={{ flex: 1, background: "#111", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 12, padding: "18px 20px", marginBottom: i < analysis.plan_action.length - 1 ? 8 : 0 }}>
                      <span className="font-dm" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C", display: "block", marginBottom: 8 }}>
                        Semaine {s.semaine}
                      </span>
                      <p className="font-dm" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: s.comment ? 8 : 0 }}>{s.action}</p>
                      {s.comment && <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: s.resultat ? 10 : 0 }}>Comment : {s.comment}</p>}
                      {s.resultat && <p className="font-dm" style={{ fontSize: 12, fontStyle: "italic", color: "#C9A84C", margin: 0 }}>Résultat attendu : {s.resultat}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── S7 : INSIGHTS SUPPLÉMENTAIRES ────────────────────── */}
          {(analysis.type_contenu_manquant || analysis.frequence_ideale || analysis.meilleur_moment_poster) && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {analysis.type_contenu_manquant && (
                <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "22px 24px" }}>
                  <p style={{ fontSize: 22, marginBottom: 10 }}>📱</p>
                  <p className="font-dm" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>Contenu manquant</p>
                  <p className="font-dm" style={{ fontSize: 13, color: "#fff", lineHeight: 1.6, margin: 0 }}>{analysis.type_contenu_manquant}</p>
                </div>
              )}
              {analysis.frequence_ideale && (
                <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "22px 24px" }}>
                  <p style={{ fontSize: 22, marginBottom: 10 }}>📅</p>
                  <p className="font-dm" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>Fréquence idéale</p>
                  <p className="font-dm" style={{ fontSize: 13, color: "#fff", lineHeight: 1.6, margin: 0 }}>{analysis.frequence_ideale}</p>
                </div>
              )}
              {analysis.meilleur_moment_poster && (
                <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "22px 24px" }}>
                  <p style={{ fontSize: 22, marginBottom: 10 }}>⏰</p>
                  <p className="font-dm" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>Meilleur moment</p>
                  <p className="font-dm" style={{ fontSize: 13, color: "#fff", lineHeight: 1.6, margin: 0 }}>{analysis.meilleur_moment_poster}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* ─── S8 : CTA FINAL ────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }}
            style={{ position: "relative", background: "#000", borderRadius: 16, overflow: "hidden", padding: "52px 40px 44px", textAlign: "center", border: "1px solid rgba(201,168,76,0.2)" }}>
            {/* Ligne gold en haut */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, #C9A84C, transparent)" }} />

            {/* Badge */}
            <span className="font-dm" style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)", padding: "5px 16px", borderRadius: 9999, marginBottom: 24 }}>
              ✦ Recommandation Personnalisée
            </span>

            {/* Verdict */}
            {analysis.verdict_massishoots && (
              <p className="font-dm" style={{ fontSize: 18, fontStyle: "italic", color: "#C9A84C", lineHeight: 1.7, maxWidth: 580, margin: "0 auto 20px" }}>
                "{analysis.verdict_massishoots}"
              </p>
            )}

            {/* Potentiel */}
            {analysis.potentiel_croissance && (
              <p className="font-bebas" style={{ fontSize: 22, letterSpacing: "0.05em", color: potentielColor(analysis.potentiel_croissance), marginBottom: 32 }}>
                Potentiel : {analysis.potentiel_croissance}
              </p>
            )}

            <div style={{ width: 40, height: 1, background: "rgba(201,168,76,0.3)", margin: "0 auto 28px" }} />

            <h3 className="font-bebas" style={{ fontSize: "clamp(28px,5vw,44px)", color: "#fff", letterSpacing: "0.02em", marginBottom: 12 }}>
              On s'occupe de tout ça pour toi.
            </h3>
            <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: 440, margin: "0 auto 32px" }}>
              Massi va implémenter exactement ce plan — avec du contenu cinématique qui performe.
            </p>

            <a href="https://calendly.com/massishot-ca/30min" target="_blank" rel="noopener noreferrer" className="font-dm"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "17px 36px", background: "#C9A84C", color: "#0a0a0a", borderRadius: 8, fontSize: 14, fontWeight: 700, letterSpacing: "0.07em", textDecoration: "none", textTransform: "uppercase", boxShadow: "0 0 32px rgba(201,168,76,0.25)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Réserver mon appel stratégique gratuit →
            </a>
            <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 16, letterSpacing: "0.06em" }}>
              Appel 30 min · Sans engagement · Répond sous 24h
            </p>
          </motion.div>

        </div>
      </section>
    );
  }

  const handle = formState.username.replace("@", "") || "vous";

  return (
    <>
      {/* ─── LOADER OVERLAY ────────────────────────────────────── */}
      <AnimatePresence>
        {formState.loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(0,0,0,0.88)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ textAlign: "center", width: "min(360px, 88vw)" }}>

              {/* Logo gold */}
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-bebas"
                style={{ fontSize: 22, letterSpacing: "0.22em", color: "#C9A84C", marginBottom: 36 }}
              >
                MASSISHOOTS
              </motion.p>

              {/* Barre de progression */}
              <div style={{ height: 2, background: "rgba(201,168,76,0.12)", borderRadius: 9999, overflow: "hidden", marginBottom: 28 }}>
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                  style={{ height: "100%", background: "linear-gradient(to right, #C9A84C, #e8c96e)", borderRadius: 9999 }}
                />
              </div>

              {/* Texte animé */}
              <div style={{ height: 28, position: "relative", overflow: "hidden", marginBottom: 20 }}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={loaderTextIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="font-dm"
                    style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", position: "absolute", width: "100%", textAlign: "center" }}
                  >
                    {loaderTexts(handle)[loaderTextIdx]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Sous-texte */}
              <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Propulsé par Intelligence Artificielle · Massishoots
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, #000 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-dm" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A84C",
              background: "rgba(201,168,76,0.1)",
              border: "1px solid rgba(201,168,76,0.2)",
              padding: "8px 16px",
              borderRadius: 20,
              marginBottom: 32,
            }}>
              <Sparkles size={14} />
              {t("badge")}
            </span>

            <h1 className="font-bebas" style={{
              fontSize: "clamp(56px, 10vw, 96px)",
              lineHeight: 0.9,
              color: "#fff",
              marginBottom: 20,
              letterSpacing: "-0.02em",
            }}>
              {t("title1")}
            </h1>

            <p className="font-dm" style={{
              fontSize: 16,
              fontStyle: "italic",
              color: "#C9A84C",
              lineHeight: 1.5,
              maxWidth: 700,
              margin: "0 auto 32px",
            }}>
              {t("title2")}
            </p>

            <p className="font-dm" style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
              maxWidth: 600,
              margin: "0 auto 48px",
            }}>
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section style={{
        background: "linear-gradient(180deg, rgba(0,0,0,0.98) 0%, #000 100%)",
        padding: "60px 24px 80px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "40px 32px",
            }}>
              <h2 className="font-dm" style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#fff",
                marginBottom: 32,
                textAlign: "center",
              }}>
                {t("formStep1Title")}
              </h2>

              <form onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}>
                {/* Username Field */}
                <div>
                  <input
                    type="text"
                    placeholder={t("usernamePlaceholder")}
                    value={formState.username}
                    onChange={(e) => updateFormState({ username: e.target.value })}
                    className="font-dm"
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      background: "#1a1a1a",
                      border: "1px solid #333",
                      borderRadius: 6,
                      color: "#fff",
                      fontSize: 14,
                      outline: "none",
                      transition: "all 0.3s ease",
                    }}
                    required
                  />
                  <p className="font-dm" style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.4)",
                    marginTop: 6,
                  }}>
                    {t("usernameNote")}
                  </p>
                </div>

                {/* Secteur Field */}
                <div>
                  <select
                    value={formState.secteur}
                    onChange={(e) => updateFormState({ secteur: e.target.value })}
                    className="font-dm"
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      background: "#1a1a1a",
                      border: "1px solid #333",
                      borderRadius: 6,
                      color: formState.secteur ? "#fff" : "rgba(255,255,255,0.4)",
                      fontSize: 14,
                      outline: "none",
                      cursor: "pointer",
                      appearance: "none",
                      transition: "all 0.3s ease",
                    }}
                    required
                  >
                    <option value="" disabled>{t("secteurLabel")}</option>
                    <option value="restaurant">{t("secteurs.restaurant")}</option>
                    <option value="mode">{t("secteurs.mode")}</option>
                    <option value="tech">{t("secteurs.tech")}</option>
                    <option value="immobilier">{t("secteurs.immobilier")}</option>
                    <option value="sante">{t("secteurs.sante")}</option>
                    <option value="coach">{t("secteurs.coach")}</option>
                    <option value="evenementiel">{t("secteurs.evenementiel")}</option>
                    <option value="corporate">{t("secteurs.corporate")}</option>
                    <option value="autre">{t("secteurs.autre")}</option>
                  </select>
                </div>

                {/* Champ autre secteur */}
                {formState.secteur === "autre" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <input
                      type="text"
                      placeholder={t("autreSecteurPlaceholder")}
                      value={formState.autreSecteur}
                      onChange={(e) => updateFormState({ autreSecteur: e.target.value })}
                      className="font-dm"
                      style={{
                        width: "100%",
                        padding: "16px 20px",
                        background: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: 6,
                        color: "#fff",
                        fontSize: 14,
                        outline: "none",
                        transition: "all 0.3s ease",
                      }}
                      required
                    />
                    <p className="font-dm" style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.4)",
                      marginTop: 6,
                    }}>
                      {t("autreSecteurNote")}
                    </p>
                  </motion.div>
                )}

                {/* Objectif Field */}
                <div>
                  <select
                    value={formState.objectif}
                    onChange={(e) => updateFormState({ objectif: e.target.value })}
                    className="font-dm"
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      background: "#1a1a1a",
                      border: "1px solid #333",
                      borderRadius: 6,
                      color: formState.objectif ? "#fff" : "rgba(255,255,255,0.4)",
                      fontSize: 14,
                      outline: "none",
                      cursor: "pointer",
                      appearance: "none",
                      transition: "all 0.3s ease",
                    }}
                    required
                  >
                    <option value="" disabled>{t("objectifLabel")}</option>
                    <option value="clients">{t("objectifs.clients")}</option>
                    <option value="notoriete">{t("objectifs.notoriete")}</option>
                    <option value="ventes">{t("objectifs.ventes")}</option>
                    <option value="marque">{t("objectifs.marque")}</option>
                  </select>
                </div>

                {/* Email Field */}
                <div>
                  <label className="font-dm" style={{
                    display: "block",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: 8,
                    fontWeight: 500,
                  }}>
                    {t("emailLabel")}
                  </label>
                  <input
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={formState.email}
                    onChange={(e) => updateFormState({ email: e.target.value })}
                    className="font-dm"
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      background: "#1a1a1a",
                      border: "1px solid #333",
                      borderRadius: 6,
                      color: "#fff",
                      fontSize: 14,
                      outline: "none",
                      transition: "all 0.3s ease",
                    }}
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formState.loading}
                  whileHover={{ scale: formState.loading ? 1 : 1.02 }}
                  whileTap={{ scale: formState.loading ? 1 : 0.98 }}
                  className="font-dm"
                  style={{
                    width: "100%",
                    padding: "18px 32px",
                    background: formState.loading ? "rgba(201,168,76,0.5)" : "#C9A84C",
                    color: "#000",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: formState.loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    transition: "all 0.3s ease",
                    marginTop: 8,
                  }}
                >
                  {formState.loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{
                          width: 16,
                          height: 16,
                          border: "2px solid #000",
                          borderTop: "2px solid transparent",
                          borderRadius: "50%",
                        }}
                      />
                      <span>{t(`loadingSteps.${formState.loadingStep}`)}</span>
                    </>
                  ) : (
                    <>
                      <Camera size={16} />
                      {t("ctaButton")}
                    </>
                  )}
                </motion.button>

                {/* Error Display */}
                {formState.error && (
                  <div style={{
                    padding: "12px 16px",
                    background: "rgba(220, 38, 38, 0.1)",
                    border: "1px solid rgba(220, 38, 38, 0.3)",
                    borderRadius: 6,
                    marginTop: 16,
                  }}>
                    <p className="font-dm" style={{
                      fontSize: 13,
                      color: "#DC2626",
                      margin: 0,
                    }}>
                      ⚠️ {formState.error}
                    </p>
                  </div>
                )}

                <p className="font-dm" style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.4)",
                  textAlign: "center",
                  marginTop: 4,
                }}>
                  {t("disclaimer")}
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        background: "#000",
        padding: "80px 24px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <h2 className="font-bebas" style={{
              fontSize: "clamp(36px, 6vw, 48px)",
              color: "#fff",
              marginBottom: 16,
            }}>
              {t("featuresTitle")}
            </h2>
            <p className="font-dm" style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 500,
              margin: "0 auto",
            }}>
              {t("featuresSubtitle")}
            </p>
          </motion.div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 32,
          }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: 32,
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "rgba(201,168,76,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}>
                  <feature.icon size={24} color="#C9A84C" />
                </div>
                <h3 className="font-dm" style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#fff",
                  marginBottom: 12,
                }}>
                  {feature.title}
                </h3>
                <p className="font-dm" style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.6,
                }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
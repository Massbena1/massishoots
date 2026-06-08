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
    `Connexion à Instagram via Windsor.ai...`,
    `Récupération des données réelles @${handle}...`,
    "Analyse des 30 derniers jours...",
    "Calcul des métriques d'engagement...",
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

      const response = await fetch("/api/analyse-instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          handle: formState.username.trim().replace("@", ""),
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
    const a = formState.analysisResult as any;
    const score: number = a.score_global ?? 0;
    const scoreColor = score >= 81 ? "#2ECC71" : score >= 66 ? "#C9A84C" : score >= 41 ? "#E67E22" : "#E74C3C";
    const circumference = 2 * Math.PI * 58;

    const potentielColor = (p: string) =>
      p === "Explosif" ? "#E74C3C" : p === "Très fort" ? "#C9A84C" : "#2ECC71";

    const severityStyle = (s: string) =>
      s === "Critique"
        ? { bg: "#2D1515", border: "rgba(231,76,60,0.3)", text: "#E74C3C" }
        : s === "Modéré"
        ? { bg: "#2D1E0F", border: "rgba(230,126,34,0.3)", text: "#E67E22" }
        : { bg: "#141414", border: "rgba(255,255,255,0.08)", text: "rgba(255,255,255,0.4)" };

    const priorityStyle = (p: string) =>
      p === "Haute"
        ? { bg: "rgba(231,76,60,0.08)", border: "rgba(231,76,60,0.25)", text: "#E74C3C" }
        : p === "Moyenne"
        ? { bg: "rgba(230,126,34,0.08)", border: "rgba(230,126,34,0.25)", text: "#E67E22" }
        : { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.1)", text: "rgba(255,255,255,0.5)" };

    const CATEGORIES = [
      { key: "bio_positionnement", label: "Bio & Positionnement" },
      { key: "qualite_visuelle",   label: "Qualité Visuelle" },
      { key: "strategie_contenu",  label: "Stratégie Contenu" },
      { key: "engagement",        label: "Engagement" },
      { key: "consistance",       label: "Consistance" },
      { key: "audience",          label: "Audience" },
    ];

    const engagementInterp = (taux: number) =>
      taux > 3
        ? { label: "Excellent ✓", color: "#2ECC71" }
        : taux >= 1
        ? { label: "Dans la moyenne", color: "#C9A84C" }
        : { label: "À améliorer ⚠", color: "#E74C3C" };

    const vue = a.vue_ensemble ?? {};
    const perf = a.performance_formats ?? {};
    const formats = ["reels", "carousel", "image"] as const;
    const bestFormat = formats.reduce((best, fmt) =>
      (perf[fmt]?.reach_moyen ?? 0) > (perf[best]?.reach_moyen ?? 0) ? fmt : best, "reels" as typeof formats[number]);

    const DAYS = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];

    return (
      <section ref={reportRef} style={{ background: "#000", padding: "90px 24px 100px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* ── A : SCORE GLOBAL ──────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "40px 36px" }}>
            <p className="font-dm" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 28 }}>
              Rapport Analyse Instagram · @{formState.username.replace("@","")} · {formState.secteur}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 36, flexWrap: "wrap" }}>
              {/* Cercle */}
              <div style={{ position: "relative", width: 148, height: 148, flexShrink: 0 }}>
                <svg width="148" height="148" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="74" cy="74" r="58" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                  <motion.circle cx="74" cy="74" r="58" fill="none" stroke={scoreColor} strokeWidth="10" strokeLinecap="round"
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    animate={{ strokeDasharray: `${(score / 100) * circumference} ${circumference}` }}
                    transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }} />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <motion.span
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    style={{ fontSize: 42, fontWeight: 700, color: "#fff", lineHeight: 1, fontFamily: "var(--font-bebas-neue)" }}>
                    {score}
                  </motion.span>
                  <span className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>/ 100</span>
                </div>
              </div>
              {/* Droite */}
              <div style={{ flex: 1, minWidth: 200 }}>
                {a.niveau && (
                  <span className="font-dm" style={{ display: "inline-block", fontSize: 11, fontWeight: 700, padding: "5px 16px", borderRadius: 6, background: scoreColor, color: "#0a0a0a", letterSpacing: "0.07em", marginBottom: 16 }}>
                    {a.niveau}
                  </span>
                )}
                {a.accroche && (
                  <p className="font-dm" style={{ fontSize: 16, fontStyle: "italic", color: "#C9A84C", lineHeight: 1.65, margin: 0 }}>
                    "{a.accroche}"
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* ── B : VUE D'ENSEMBLE ────────────────────────────────── */}
          {Object.keys(vue).length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
              style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 32px" }}>
              <h2 className="font-dm" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Vue d'ensemble — 30 derniers jours</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
                {[
                  { label: "Abonnés", value: vue.abonnes?.toLocaleString("fr-CA") ?? "—" },
                  { label: "Croissance nette", value: vue.croissance_nette != null ? `${vue.croissance_nette > 0 ? "+" : ""}${vue.croissance_nette}` : "—" },
                  { label: "Reach total", value: vue.reach_total?.toLocaleString("fr-CA") ?? "—" },
                  { label: "Reach / jour", value: vue.reach_moyen_jour?.toLocaleString("fr-CA") ?? "—" },
                  { label: "Interactions", value: vue.interactions_totales?.toLocaleString("fr-CA") ?? "—" },
                  { label: "Taux engagement", value: vue.taux_engagement != null ? `${vue.taux_engagement}%` : "—", interp: engagementInterp(vue.taux_engagement ?? 0) },
                ].map(({ label, value, interp }) => (
                  <div key={label} style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "14px 16px" }}>
                    <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{label}</p>
                    <p className="font-bebas" style={{ fontSize: 22, color: "#fff", marginBottom: interp ? 4 : 0 }}>{value}</p>
                    {interp && <p className="font-dm" style={{ fontSize: 10, color: interp.color, fontWeight: 700 }}>{interp.label}</p>}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── C : SCORES PAR CATÉGORIE ──────────────────────────── */}
          {a.scores_categories && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
              style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 32px" }}>
              <h2 className="font-dm" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 24 }}>Scores par catégorie</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {CATEGORIES.map(({ key, label }, idx) => {
                  const val: number = a.scores_categories[key] ?? 0;
                  return (
                    <div key={key}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{label}</span>
                        <span className="font-dm" style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{val}<span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>/100</span></span>
                      </div>
                      <div style={{ height: 5, background: "#1a1a1a", borderRadius: 9999, overflow: "hidden" }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }}
                          transition={{ delay: 0.25 + idx * 0.07, duration: 1.4, ease: "easeOut" }}
                          style={{ height: "100%", background: "#C9A84C", borderRadius: 9999 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── D : TOP POSTS ─────────────────────────────────────── */}
          {a.top_posts?.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 32px" }}>
              <h2 className="font-dm" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 20 }}>🏆 Top Posts — les plus performants</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {a.top_posts.map((post: any, i: number) => (
                  <div key={i} style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "18px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span className="font-dm" style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 4, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", color: "#C9A84C", letterSpacing: "0.08em" }}>
                          {post.type}
                        </span>
                        {post.permalink && (
                          <a href={post.permalink} target="_blank" rel="noopener noreferrer"
                            className="font-dm"
                            style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                            Voir le post ↗
                          </a>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: 16 }}>
                        {post.reach && <span className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Reach <strong style={{ color: "#fff" }}>{post.reach.toLocaleString("fr-CA")}</strong></span>}
                        {post.engagement && <span className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Eng. <strong style={{ color: "#C9A84C" }}>{post.engagement}%</strong></span>}
                      </div>
                    </div>
                    {post.pourquoi_ca_marche && (
                      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px", background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 8 }}>
                        <span style={{ color: "#C9A84C", flexShrink: 0 }}>✦</span>
                        <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.55, margin: 0 }}>{post.pourquoi_ca_marche}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── E : PERFORMANCE PAR FORMAT ────────────────────────── */}
          {Object.keys(perf).length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
              style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 32px" }}>
              <h2 className="font-dm" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 20 }}>📊 Performance par format</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {formats.map((fmt) => {
                  const f = perf[fmt] ?? {};
                  const isBest = fmt === bestFormat;
                  return (
                    <div key={fmt} style={{ background: isBest ? "rgba(201,168,76,0.06)" : "#111", border: isBest ? "1px solid rgba(201,168,76,0.3)" : "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "18px 16px", position: "relative" }}>
                      {isBest && (
                        <span className="font-dm" style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", fontSize: 9, fontWeight: 700, padding: "2px 10px", borderRadius: 9999, background: "#C9A84C", color: "#0a0a0a", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                          ✦ Meilleur format
                        </span>
                      )}
                      <p className="font-bebas" style={{ fontSize: 16, letterSpacing: "0.1em", color: isBest ? "#C9A84C" : "rgba(255,255,255,0.5)", marginBottom: 12 }}>
                        {fmt.charAt(0).toUpperCase() + fmt.slice(1)}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <div><p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 2 }}>Reach moyen</p><p className="font-dm" style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{f.reach_moyen?.toLocaleString("fr-CA") ?? "—"}</p></div>
                        <div><p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 2 }}>Engagement</p><p className="font-dm" style={{ fontSize: 14, fontWeight: 700, color: "#C9A84C" }}>{f.engagement_moyen != null ? `${f.engagement_moyen}%` : "—"}</p></div>
                        <div><p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 2 }}>Posts</p><p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{f.nb_posts ?? "—"}</p></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── F : AUDIENCE ──────────────────────────────────────── */}
          {a.audience && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
              style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 32px" }}>
              <h2 className="font-dm" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 20 }}>👥 Ton audience</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
                {[
                  { icon: "🌍", label: "Pays principal", value: a.audience.top_pays },
                  { icon: "⚥", label: "Genre dominant", value: a.audience.genre_dominant },
                  { icon: "🎯", label: "Âge dominant", value: a.audience.age_dominant },
                  { icon: "✦", label: "Cohérence niche", value: a.audience.coherence_niche },
                ].map(({ icon, label, value }) => value ? (
                  <div key={label} style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "16px 18px" }}>
                    <p style={{ fontSize: 20, marginBottom: 8 }}>{icon}</p>
                    <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{label}</p>
                    <p className="font-dm" style={{ fontSize: 13, color: "#fff", fontWeight: 600, lineHeight: 1.4, margin: 0 }}>{value}</p>
                  </div>
                ) : null)}
              </div>
            </motion.div>
          )}

          {/* ── G : PROBLÈMES ─────────────────────────────────────── */}
          {a.problemes?.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
              style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 32px" }}>
              <h2 className="font-dm" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 20 }}>⚠ Ce qui freine ta croissance</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {a.problemes.map((p: any, i: number) => {
                  const c = severityStyle(p.severite);
                  return (
                    <div key={i} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 12, padding: "18px 20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
                        <span className="font-dm" style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{p.titre}</span>
                        <span className="font-dm" style={{ fontSize: 10, padding: "3px 10px", borderRadius: 9999, border: `1px solid ${c.border}`, color: c.text, letterSpacing: "0.08em", fontWeight: 700, flexShrink: 0 }}>
                          {p.severite}
                        </span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {p.constat && <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}><strong style={{ color: c.text }}>Constat :</strong> {p.constat}</p>}
                        {p.cause && <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.55, margin: 0 }}>Cause : {p.cause}</p>}
                        {p.impact && <p className="font-dm" style={{ fontSize: 12, fontStyle: "italic", color: c.text, margin: 0 }}>Impact : {p.impact}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── H : RECOMMANDATIONS ───────────────────────────────── */}
          {a.recommandations?.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
              style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 32px" }}>
              <h2 className="font-dm" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 20 }}>→ Recommandations prioritaires</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {a.recommandations.map((r: any, i: number) => {
                  const ps = priorityStyle(r.priorite);
                  return (
                    <div key={i} style={{ background: ps.bg, border: `1px solid ${ps.border}`, borderRadius: 12, padding: "18px 20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                        <span className="font-dm" style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{r.titre}</span>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                          <span className="font-dm" style={{ fontSize: 10, padding: "3px 10px", borderRadius: 9999, border: `1px solid ${ps.border}`, color: ps.text, fontWeight: 700, letterSpacing: "0.07em" }}>{r.priorite}</span>
                          {r.delai && <span className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{r.delai}</span>}
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {r.quoi && <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.55, margin: 0 }}><strong style={{ color: "#fff" }}>Quoi :</strong> {r.quoi}</p>}
                        {r.pourquoi && <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.5, margin: 0 }}>Pourquoi : {r.pourquoi}</p>}
                        {r.comment && <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.5, margin: 0 }}>Comment : {r.comment}</p>}
                        {r.impact_attendu && <p className="font-dm" style={{ fontSize: 12, fontStyle: "italic", color: "#C9A84C", margin: 0 }}>→ {r.impact_attendu}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── I : PLAN 7 JOURS ──────────────────────────────────── */}
          {a.plan_7_jours?.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}
              style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 32px" }}>
              <h2 className="font-dm" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 }}>📅 Plan d'action — 7 prochains jours</h2>
              <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginBottom: 24 }}>Une action par jour, applicable immédiatement</p>
              {/* Timeline horizontale scrollable */}
              <div style={{ display: "flex", gap: 0, overflowX: "auto", paddingBottom: 8 }}>
                {a.plan_7_jours.map((item: any, i: number) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "0 0 auto", minWidth: 110 }}>
                    {/* Dot + line */}
                    <div style={{ display: "flex", alignItems: "center", width: "100%", marginBottom: 12 }}>
                      {i > 0 && <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.2)" }} />}
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#C9A84C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span className="font-bebas" style={{ fontSize: 12, color: "#0a0a0a" }}>{i + 1}</span>
                      </div>
                      {i < a.plan_7_jours.length - 1 && <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.2)" }} />}
                    </div>
                    {/* Card */}
                    <div style={{ width: "90%", background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
                      <p className="font-bebas" style={{ fontSize: 13, color: "#C9A84C", letterSpacing: "0.08em", marginBottom: 6 }}>{item.jour ?? DAYS[i]}</p>
                      <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, marginBottom: 6 }}>{item.action}</p>
                      {item.duree && <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{item.duree}</p>}
                      {item.impact && <p className="font-dm" style={{ fontSize: 10, fontStyle: "italic", color: "#C9A84C", marginTop: 4 }}>{item.impact}</p>}
                    </div>
                  </div>
                ))}
              </div>
              {/* Conseils sous le plan */}
              {(a.meilleur_jour_poster || a.format_prioritaire || a.frequence_ideale) && (
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
                  {a.meilleur_jour_poster && <span className="font-dm" style={{ fontSize: 11, padding: "5px 12px", borderRadius: 6, background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.15)", color: "#C9A84C" }}>📅 {a.meilleur_jour_poster}</span>}
                  {a.format_prioritaire && <span className="font-dm" style={{ fontSize: 11, padding: "5px 12px", borderRadius: 6, background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.15)", color: "#C9A84C" }}>🎬 {a.format_prioritaire}</span>}
                  {a.frequence_ideale && <span className="font-dm" style={{ fontSize: 11, padding: "5px 12px", borderRadius: 6, background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.15)", color: "#C9A84C" }}>🔁 {a.frequence_ideale}</span>}
                </div>
              )}
            </motion.div>
          )}

          {/* ── J : CTA FINAL ─────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
            style={{ position: "relative", background: "#000", borderRadius: 16, overflow: "hidden", padding: "52px 40px 48px", textAlign: "center", border: "1px solid rgba(201,168,76,0.2)" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, #C9A84C, transparent)" }} />

            <span className="font-dm" style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)", padding: "5px 16px", borderRadius: 9999, marginBottom: 24 }}>
              ✦ Recommandation Personnalisée
            </span>

            {a.verdict_massishoots && (
              <p className="font-dm" style={{ fontSize: 18, fontStyle: "italic", color: "#C9A84C", lineHeight: 1.75, maxWidth: 580, margin: "0 auto 20px" }}>
                "{a.verdict_massishoots}"
              </p>
            )}

            {a.potentiel_croissance && (
              <p className="font-bebas" style={{ fontSize: 22, letterSpacing: "0.05em", color: potentielColor(a.potentiel_croissance), marginBottom: 32 }}>
                Potentiel : {a.potentiel_croissance}
              </p>
            )}

            <div style={{ width: 40, height: 1, background: "rgba(201,168,76,0.3)", margin: "0 auto 28px" }} />

            <h3 className="font-bebas" style={{ fontSize: "clamp(28px,5vw,44px)", color: "#fff", letterSpacing: "0.02em", marginBottom: 12 }}>
              On s'occupe de tout ça pour toi.
            </h3>
            <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: 420, margin: "0 auto 32px" }}>
              Massi implémente exactement ce plan — avec du contenu cinématique qui performe.
            </p>

            <a href="https://calendly.com/massishot-ca/30min" target="_blank" rel="noopener noreferrer" className="font-dm"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "17px 36px", background: "#C9A84C", color: "#0a0a0a", borderRadius: 8, fontSize: 14, fontWeight: 700, letterSpacing: "0.07em", textDecoration: "none", textTransform: "uppercase", boxShadow: "0 0 32px rgba(201,168,76,0.2)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Réserver mon appel stratégique gratuit →
            </a>
            <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 14, letterSpacing: "0.06em" }}>
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
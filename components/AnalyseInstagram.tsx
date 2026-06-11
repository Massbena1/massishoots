"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Camera, TrendingUp, BarChart3, Users, CheckCircle, ArrowRight, Sparkles, Clock, Award } from "lucide-react";

export default function AnalyseInstagram() {
  const t = useTranslations("analyseInstagram");
  const locale = useLocale();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [secteur, setSecteur] = useState("");
  const [autreSecteur, setAutreSecteur] = useState("");
  const [objectif, setObjectif] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !secteur || !objectif) return;
    if (secteur === "autre" && !autreSecteur.trim()) return;

    setLoading(true);
    setLoadingStep(0);
    setError(""); // Reset error state

    // Animate loading steps
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % 4);
    }, 2000);

    try {

      const response = await fetch("/api/analyse-instagram-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim().replace("@", ""),
          email: email.trim(),
          secteur: secteur === "autre" ? autreSecteur.trim() : secteur,
          objectif
        }),
      });


      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Erreur API:", errorData);
        setError(`Erreur ${response.status}: ${errorData.error || 'Problème serveur'}`);
        return;
      }

      const result = await response.json();

      if (result.analysis) {
        setAnalysisResult(result.analysis);
        setSubmitted(true);
        setError("");
      } else {
        console.error("❌ Pas de données d'analyse reçues:", result);
        setError("Aucun résultat d'analyse reçu. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("💥 Erreur de connexion:", error);
      setError("Erreur de connexion. Vérifiez votre internet et réessayez.");
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
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

  if (submitted && analysisResult) {
    const [animatedScore, setAnimatedScore] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        let current = 0;
        const target = analysisResult.score;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // ~60fps

        const animate = () => {
          current += increment;
          if (current >= target) {
            setAnimatedScore(target);
          } else {
            setAnimatedScore(Math.floor(current));
            requestAnimationFrame(animate);
          }
        };
        animate();
      }, 500);

      return () => clearTimeout(timer);
    }, [analysisResult.score]);

    return (
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, #000 100%)",
        padding: "120px 24px 80px",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {/* EN-TÊTE DU RAPPORT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <h1 className="font-bebas" style={{
              fontSize: "clamp(36px, 6vw, 48px)",
              color: "#fff",
              marginBottom: 32,
            }}>
              {t("reportTitle")} @{username.replace("@", "")}
            </h1>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                marginBottom: 32,
              }}
            >
              <div style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: `conic-gradient(#C9A84C ${animatedScore * 3.6}deg, rgba(201,168,76,0.1) 0deg)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}>
                <div style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}>
                  <span className="font-bebas" style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: "#C9A84C",
                  }}>
                    {animatedScore}
                  </span>
                  <span className="font-dm" style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.5)",
                  }}>
                    /100
                  </span>
                </div>
              </div>

              <p className="font-dm" style={{
                fontSize: 16,
                fontStyle: "italic",
                color: "rgba(255,255,255,0.7)",
                margin: 0,
              }}>
                {analysisResult.mention}
              </p>
            </motion.div>
          </motion.div>

          {/* SECTION 1 — Points forts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              background: "#151515",
              borderRadius: 12,
              padding: 32,
              marginBottom: 24,
            }}
          >
            <h2 className="font-dm" style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#fff",
              marginBottom: 20,
            }}>
              {t("pointsFortsTitle")}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {analysisResult.points_forts.map((point: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{
                    fontSize: 16,
                    color: "#C9A84C",
                    flexShrink: 0,
                  }}>
                    ✓
                  </span>
                  <span className="font-dm" style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 1.5,
                  }}>
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* SECTION 2 — Problèmes identifiés */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: 32,
              marginBottom: 24,
            }}
          >
            <h2 className="font-dm" style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#fff",
              marginBottom: 20,
            }}>
              {t("problemesTitle")}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {analysisResult.problemes.map((probleme: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 10,
                    padding: 20,
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <h3 className="font-dm" style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#fff",
                      margin: 0,
                    }}>
                      {probleme.titre}
                    </h3>
                    <span className="font-dm" style={{
                      fontSize: 11,
                      padding: "6px 12px",
                      borderRadius: 20,
                      fontWeight: 600,
                      background: probleme.impact === 'Élevé' ? '#DC2626' : probleme.impact === 'Moyen' ? '#D97706' : '#6B7280',
                      color: "#fff",
                    }}>
                      {probleme.impact}
                    </span>
                  </div>
                  <p className="font-dm" style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.6)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}>
                    {probleme.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* SECTION 3 — Plan d'action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: 32,
              marginBottom: 32,
            }}
          >
            <h2 className="font-dm" style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#fff",
              marginBottom: 20,
            }}>
              {t("planActionTitle")}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {analysisResult.recommandations.slice(0, 3).map((reco: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  style={{
                    background: "rgba(201,168,76,0.04)",
                    border: "1px solid rgba(201,168,76,0.15)",
                    borderRadius: 10,
                    padding: 24,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <h3 className="font-dm" style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#fff",
                      margin: 0,
                      flex: 1,
                    }}>
                      {reco.action}
                    </h3>
                    <span className="font-dm" style={{
                      fontSize: 11,
                      padding: "6px 12px",
                      borderRadius: 20,
                      fontWeight: 600,
                      marginLeft: 16,
                      background: reco.priorite === 'Immédiat' ? '#C9A84C' : reco.priorite === 'Cette semaine' ? '#6B7280' : '#374151',
                      color: reco.priorite === 'Immédiat' ? "#000" : "#fff",
                    }}>
                      {reco.priorite}
                    </span>
                  </div>
                  <p className="font-dm" style={{
                    fontSize: 14,
                    fontStyle: "italic",
                    color: "rgba(255,255,255,0.6)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}>
                    {reco.resultat_attendu}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CONCLUSION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            style={{
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            <p className="font-dm" style={{
              fontSize: 18,
              fontStyle: "italic",
              color: "#C9A84C",
              lineHeight: 1.6,
              maxWidth: 600,
              margin: "0 auto",
            }}>
              "{analysisResult.conclusion}"
            </p>
          </motion.div>

          {/* CTA FINAL */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            style={{
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: 16,
              padding: "48px 32px",
              textAlign: "center",
            }}
          >
            <h3 className="font-bebas" style={{
              fontSize: "clamp(28px, 5vw, 36px)",
              color: "#fff",
              marginBottom: 16,
              lineHeight: 1.1,
            }}>
              {t("ctaFinalTitle")}
            </h3>

            <p className="font-dm" style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
              maxWidth: 400,
              margin: "0 auto 32px",
            }}>
              {t("ctaFinalSubtitle")}
            </p>

            <motion.a
              href="https://calendly.com/massishot-ca/30min"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="font-dm"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "18px 36px",
                background: "#C9A84C",
                color: "#000",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 600,
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(201,168,76,0.3)",
              }}
            >
              {t("ctaFinalButton")}
              <ArrowRight size={18} />
            </motion.a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
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
        {/* Animated background elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: 200,
            height: 200,
            background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

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
            {/* Step 1 */}
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    onFocus={(e) => {
                      e.target.style.borderColor = "#C9A84C";
                      e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#333";
                      e.target.style.boxShadow = "none";
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
                    value={secteur}
                    onChange={(e) => setSecteur(e.target.value)}
                    className="font-dm"
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      background: "#1a1a1a",
                      border: "1px solid #333",
                      borderRadius: 6,
                      color: secteur ? "#fff" : "rgba(255,255,255,0.4)",
                      fontSize: 14,
                      outline: "none",
                      cursor: "pointer",
                      appearance: "none",
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#C9A84C";
                      e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#333";
                      e.target.style.boxShadow = "none";
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

                {/* Champ autre secteur - affiché seulement si "autre" est sélectionné */}
                {secteur === "autre" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <input
                      type="text"
                      placeholder="Précisez votre secteur d'activité"
                      value={autreSecteur}
                      onChange={(e) => setAutreSecteur(e.target.value)}
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
                      onFocus={(e) => {
                        e.target.style.borderColor = "#C9A84C";
                        e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#333";
                        e.target.style.boxShadow = "none";
                      }}
                      required
                    />
                    <p className="font-dm" style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.4)",
                      marginTop: 6,
                    }}>
                      Exemple: Photographie, E-commerce, Consulting, etc.
                    </p>
                  </motion.div>
                )}

                {/* Objectif Field */}
                <div>
                  <select
                    value={objectif}
                    onChange={(e) => setObjectif(e.target.value)}
                    className="font-dm"
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      background: "#1a1a1a",
                      border: "1px solid #333",
                      borderRadius: 6,
                      color: objectif ? "#fff" : "rgba(255,255,255,0.4)",
                      fontSize: 14,
                      outline: "none",
                      cursor: "pointer",
                      appearance: "none",
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#C9A84C";
                      e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#333";
                      e.target.style.boxShadow = "none";
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
                    Adresse email pour recevoir le rapport
                  </label>
                  <input
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    onFocus={(e) => {
                      e.target.style.borderColor = "#C9A84C";
                      e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#333";
                      e.target.style.boxShadow = "none";
                    }}
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="font-dm"
                  style={{
                    width: "100%",
                    padding: "18px 32px",
                    background: loading ? "rgba(201,168,76,0.5)" : "#C9A84C",
                    color: "#000",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    transition: "all 0.3s ease",
                    marginTop: 8,
                  }}
                >
                  {loading ? (
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
                      <motion.span
                        key={loadingStep}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {t(`loadingSteps.${loadingStep}`)}
                      </motion.span>
                    </>
                  ) : (
                    <>
                      <Camera size={16} />
                      {t("ctaButton")}
                    </>
                  )}
                </motion.button>

                {error && (
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
                      ⚠️ {error}
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(201,168,76,0.05)";
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
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

      {/* Timeline Section */}
      <section style={{
        background: "linear-gradient(180deg, #000 0%, rgba(0,0,0,0.95) 100%)",
        padding: "80px 24px",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-bebas" style={{
              fontSize: "clamp(36px, 6vw, 48px)",
              color: "#fff",
              marginBottom: 48,
            }}>
              {t("timelineTitle")}
            </h2>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
              flexDirection: "window.innerWidth <= 768 ? 'column' : 'row'" as any,
            }}>
              {[
                { icon: Camera, title: t("step1"), time: t("step1Time") },
                { icon: Clock, title: t("step2"), time: t("step2Time") },
                { icon: Award, title: t("step3"), time: t("step3Time") },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${index === 1 ? '#C9A84C' : 'rgba(201,168,76,0.2)'} 0%, ${index === 1 ? '#F4D03F' : 'rgba(201,168,76,0.1)'} 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: index === 1 ? "2px solid #C9A84C" : "2px solid rgba(201,168,76,0.3)",
                  }}>
                    <step.icon size={28} color={index === 1 ? "#000" : "#C9A84C"} />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <h3 className="font-dm" style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#fff",
                      marginBottom: 4,
                    }}>
                      {step.title}
                    </h3>
                    <p className="font-dm" style={{
                      fontSize: 12,
                      color: "#C9A84C",
                      fontWeight: 500,
                    }}>
                      {step.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
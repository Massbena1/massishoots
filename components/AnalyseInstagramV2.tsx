"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

    return (
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, #000 100%)",
        padding: "120px 24px 80px",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
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
              {t("reportTitle")} @{formState.username.replace("@", "")}
            </h1>

            <div style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              marginBottom: 32,
            }}>
              <div style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: `conic-gradient(#C9A84C ${analysis.score * 3.6}deg, rgba(201,168,76,0.1) 0deg)`,
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
                    {analysis.score}
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
                {analysis.mention}
              </p>
            </div>
          </motion.div>

          {/* Points forts */}
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
              {analysis.points_forts.map((point: string, index: number) => (
                <div key={index} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 16, color: "#C9A84C", flexShrink: 0 }}>✓</span>
                  <span className="font-dm" style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 1.5,
                  }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Conclusion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <p className="font-dm" style={{
              fontSize: 18,
              fontStyle: "italic",
              color: "#C9A84C",
              lineHeight: 1.6,
              maxWidth: 600,
              margin: "0 auto",
            }}>
              "{analysis.conclusion}"
            </p>
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
                      placeholder="Précisez votre secteur d'activité"
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
                      Exemple: Photographie, E-commerce, Consulting, etc.
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
                    Adresse email pour recevoir le rapport
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
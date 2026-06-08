"use client";

import { useState } from "react";

export default function AnalyseInstagramSimple() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    secteur: "",
    objectif: "",
    loading: false,
    result: null,
    error: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.secteur || !formData.objectif) {
      setFormData(prev => ({ ...prev, error: "Tous les champs sont requis" }));
      return;
    }

    setFormData(prev => ({ ...prev, loading: true, error: "" }));

    try {
      const response = await fetch("/api/analyse-instagram-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username.trim().replace("@", ""),
          email: formData.email.trim(),
          secteur: formData.secteur,
          objectif: formData.objectif
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setFormData(prev => ({ ...prev, error: `Erreur ${response.status}: ${errorData.error || 'Problème serveur'}` }));
        return;
      }

      const result = await response.json();

      if (result.analysis) {
        setFormData(prev => ({ ...prev, result: result.analysis }));
      } else {
        setFormData(prev => ({ ...prev, error: "Aucun résultat d'analyse reçu" }));
      }
    } catch (error) {
      setFormData(prev => ({ ...prev, error: "Erreur de connexion" }));
    } finally {
      setFormData(prev => ({ ...prev, loading: false }));
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Affichage du résultat
  if (formData.result) {
    const analysis = formData.result as any;
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, #000 100%)",
        padding: "120px 24px 80px",
        color: "#fff"
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h1 style={{
            fontSize: "clamp(36px, 6vw, 48px)",
            color: "#fff",
            marginBottom: 32,
            textAlign: "center"
          }}>
            Rapport Instagram @{formData.username.replace("@", "")}
          </h1>

          <div style={{
            display: "flex",
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
                <span style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#C9A84C",
                }}>
                  {analysis.score}
                </span>
                <span style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.5)",
                }}>
                  /100
                </span>
              </div>
            </div>
            <p style={{
              fontSize: 16,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.7)",
              margin: 0,
            }}>
              {analysis.mention}
            </p>
          </div>

          <div style={{
            background: "#151515",
            borderRadius: 12,
            padding: 32,
            marginBottom: 24,
          }}>
            <h2 style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#fff",
              marginBottom: 20,
            }}>
              Points forts
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {analysis.points_forts?.map((point: string, index: number) => (
                <div key={index} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 16, color: "#C9A84C", flexShrink: 0 }}>✓</span>
                  <span style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 1.5,
                  }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{
              fontSize: 18,
              fontStyle: "italic",
              color: "#C9A84C",
              lineHeight: 1.6,
              maxWidth: 600,
              margin: "0 auto",
            }}>
              "{analysis.conclusion}"
            </p>
          </div>

          <button
            onClick={() => setFormData(prev => ({ ...prev, result: null }))}
            style={{
              padding: "12px 24px",
              background: "#C9A84C",
              color: "#000",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              display: "block",
              margin: "0 auto"
            }}
          >
            Nouvelle analyse
          </button>
        </div>
      </div>
    );
  }

  // Formulaire
  return (
    <>
      {/* Hero */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, #000 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 24px 80px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{
            fontSize: "clamp(56px, 10vw, 96px)",
            lineHeight: 0.9,
            color: "#fff",
            marginBottom: 20,
            letterSpacing: "-0.02em",
          }}>
            Analyse Instagram Gratuite
          </h1>
          <p style={{
            fontSize: 16,
            fontStyle: "italic",
            color: "#C9A84C",
            lineHeight: 1.5,
            maxWidth: 700,
            margin: "0 auto 32px",
          }}>
            Notre IA analyse ton profil en 30 secondes
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <section style={{
        background: "linear-gradient(180deg, rgba(0,0,0,0.98) 0%, #000 100%)",
        padding: "60px 24px 80px",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: "40px 32px",
          }}>
            <h2 style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#fff",
              marginBottom: 32,
              textAlign: "center",
            }}>
              Analysons votre profil
            </h2>

            <form onSubmit={handleSubmit} style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}>
              <input
                type="text"
                placeholder="@votrecompte"
                value={formData.username}
                onChange={(e) => updateField('username', e.target.value)}
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  background: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: 6,
                  color: "#fff",
                  fontSize: 14,
                  outline: "none",
                }}
                required
              />

              <select
                value={formData.secteur}
                onChange={(e) => updateField('secteur', e.target.value)}
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  background: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: 6,
                  color: formData.secteur ? "#fff" : "rgba(255,255,255,0.4)",
                  fontSize: 14,
                  outline: "none",
                  cursor: "pointer",
                  appearance: "none",
                }}
                required
              >
                <option value="" disabled>Votre secteur d'activité</option>
                <option value="restaurant">Restaurant</option>
                <option value="mode">Mode/Lifestyle</option>
                <option value="tech">Tech/SaaS</option>
                <option value="immobilier">Immobilier</option>
                <option value="sante">Santé/Bien-être</option>
                <option value="coach">Coach/Consultant</option>
                <option value="evenementiel">Événementiel</option>
                <option value="corporate">Corporate</option>
                <option value="autre">Autre</option>
              </select>

              <select
                value={formData.objectif}
                onChange={(e) => updateField('objectif', e.target.value)}
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  background: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: 6,
                  color: formData.objectif ? "#fff" : "rgba(255,255,255,0.4)",
                  fontSize: 14,
                  outline: "none",
                  cursor: "pointer",
                  appearance: "none",
                }}
                required
              >
                <option value="" disabled>Que voulez-vous accomplir avec Instagram ?</option>
                <option value="clients">Attirer plus de clients</option>
                <option value="notoriete">Augmenter ma notoriété</option>
                <option value="ventes">Vendre mes produits/services</option>
                <option value="marque">Construire ma marque personnelle</option>
              </select>

              <div>
                <label style={{
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
                  placeholder="votre.email@exemple.com"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    background: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: 6,
                    color: "#fff",
                    fontSize: 14,
                    outline: "none",
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={formData.loading}
                style={{
                  width: "100%",
                  padding: "18px 32px",
                  background: formData.loading ? "rgba(201,168,76,0.5)" : "#C9A84C",
                  color: "#000",
                  border: "none",
                  borderRadius: 6,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: formData.loading ? "not-allowed" : "pointer",
                  marginTop: 8,
                }}
              >
                {formData.loading ? "Analyse en cours..." : "Analyser mon profil gratuitement →"}
              </button>

              {formData.error && (
                <div style={{
                  padding: "12px 16px",
                  background: "rgba(220, 38, 38, 0.1)",
                  border: "1px solid rgba(220, 38, 38, 0.3)",
                  borderRadius: 6,
                }}>
                  <p style={{
                    fontSize: 13,
                    color: "#DC2626",
                    margin: 0,
                  }}>
                    ⚠️ {formData.error}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
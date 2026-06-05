"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Download, CheckCircle, Clock, Camera, Scissors, Package, MessageSquare } from "lucide-react";
import type { ClientPortal } from "@/app/api/client/auth/route";

const STATUS_CONFIG = {
  preparation: { label: "Préparation", icon: Clock, color: "#f59e0b", progress: 10 },
  tournage:    { label: "Tournage en cours", icon: Camera, color: "#3b82f6", progress: 35 },
  montage:     { label: "Montage & retouche", icon: Scissors, color: "#8b5cf6", progress: 65 },
  retouche:    { label: "Retouches finales", icon: Scissors, color: "#ec4899", progress: 85 },
  livre:       { label: "Livré ✓", icon: CheckCircle, color: "#4ade80", progress: 100 },
};

export default function ClientPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [portal, setPortal] = useState<Omit<ClientPortal, "password"> | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/client/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) setPortal(data);
      else setError("Code d'accès incorrect");
    } catch {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  if (!portal) {
    return (
      <main style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ width: "100%", maxWidth: 400 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(196,205,214,0.08)", border: "1px solid rgba(196,205,214,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <Lock size={24} color="#c4cdd6" />
            </div>
            <h1 className="font-bebas" style={{ fontSize: 32, color: "#fff", letterSpacing: "0.06em", marginBottom: 8 }}>ESPACE CLIENT</h1>
            <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
              Accédez à vos livrables, l&apos;avancement de votre projet et vos fichiers.
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "32px 28px" }}>
            <label className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
              Code d&apos;accès
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Entrez votre code client"
              autoFocus
              style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.05)", border: `1px solid ${error ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)"}`, borderRadius: 12, color: "#fff", fontSize: 14, outline: "none", fontFamily: "var(--font-dm-sans), sans-serif", boxSizing: "border-box", marginBottom: 12 }}
            />
            <AnimatePresence>
              {error && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="font-dm"
                  style={{ fontSize: 12, color: "rgba(239,68,68,0.8)", marginBottom: 12 }}>{error}</motion.p>
              )}
            </AnimatePresence>
            <button type="submit" disabled={loading || !password} className="font-dm"
              style={{ width: "100%", padding: "14px", background: password ? "#f2f0ec" : "rgba(255,255,255,0.06)", color: password ? "#0a0a0a" : "rgba(255,255,255,0.2)", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: password ? "pointer" : "not-allowed", letterSpacing: "0.06em", transition: "all 0.2s" }}>
              {loading ? "Vérification..." : "Accéder à mon espace"}
            </button>
            <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
              Vous avez perdu votre code ? Contactez{" "}
              <a href="mailto:massi@massishoots.com" style={{ color: "rgba(196,205,214,0.5)", textDecoration: "none" }}>massi@massishoots.com</a>
            </p>
          </form>
        </motion.div>
      </main>
    );
  }

  const statusCfg = STATUS_CONFIG[portal.status];
  const StatusIcon = statusCfg.icon;

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", padding: "80px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: 40 }}>
          <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>Espace client</p>
          <h1 className="font-bebas" style={{ fontSize: "clamp(32px, 5vw, 48px)", color: "#fff", letterSpacing: "0.04em", lineHeight: 1 }}>
            Bonjour, {portal.name} 👋
          </h1>
          <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>{portal.project}</p>
        </motion.div>

        {/* Status card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          style={{ padding: "28px 28px 24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
            <div>
              <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>Statut du projet</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <StatusIcon size={16} color={statusCfg.color} />
                <span className="font-bebas" style={{ fontSize: 20, color: statusCfg.color, letterSpacing: "0.06em" }}>{statusCfg.label}</span>
              </div>
            </div>
            {portal.deliveryDate && (
              <div style={{ textAlign: "right" }}>
                <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>Livraison prévue</p>
                <p className="font-dm" style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{portal.deliveryDate}</p>
              </div>
            )}
          </div>
          {/* Progress bar */}
          <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 9999, overflow: "hidden" }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${statusCfg.progress}%` }} transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              style={{ height: "100%", background: statusCfg.color, borderRadius: 9999 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
            {Object.values(STATUS_CONFIG).map((s, i) => (
              <span key={i} className="font-dm" style={{ fontSize: 9, color: statusCfg.progress >= s.progress ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {s.label.replace(" ✓", "")}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Message */}
        {portal.message && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ padding: "24px 28px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, marginBottom: 20, display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(196,205,214,0.08)", border: "1px solid rgba(196,205,214,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <MessageSquare size={16} color="#c4cdd6" />
            </div>
            <div>
              <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>Message de Massi</p>
              <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>{portal.message}</p>
            </div>
          </motion.div>
        )}

        {/* Download */}
        {portal.downloadUrl && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <a href={portal.downloadUrl} target="_blank" rel="noopener noreferrer" className="font-dm"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 16, textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(74,222,128,0.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(74,222,128,0.06)")}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Package size={20} color="#4ade80" />
                </div>
                <div>
                  <p className="font-dm" style={{ fontSize: 14, color: "#fff", fontWeight: 600, marginBottom: 2 }}>Télécharger mes livrables</p>
                  <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Fichiers haute résolution · Lien sécurisé</p>
                </div>
              </div>
              <Download size={18} color="#4ade80" />
            </a>
          </motion.div>
        )}

        {!portal.downloadUrl && portal.status !== "livre" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ padding: "20px 24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, textAlign: "center" }}>
            <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
              Vos livrables seront disponibles ici dès la livraison finale.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}

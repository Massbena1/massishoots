"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Download, CheckCircle, Clock, Camera, Scissors, Package, MessageSquare, Receipt, Send, Check, Film, Image, Folder } from "lucide-react";
import type { ClientPortal } from "@/lib/clientPortal";

type SafePortal = Omit<ClientPortal, "password" | "internalNote">;

// Parse "Photos · Juin 2025" → { type: "Photos", month: "Juin 2025" }
// Fallback: folder as-is with no type split
function parseFolderName(folder: string): { month: string; type: string } {
  if (folder.includes("·")) {
    const [type, month] = folder.split("·").map(s => s.trim());
    return { type, month };
  }
  if (folder.includes("/")) {
    const [type, month] = folder.split("/").map(s => s.trim());
    return { type, month };
  }
  return { month: folder, type: "Autre" };
}

function typeConfig(type: string): { icon: React.ReactNode; color: string; accent: string } {
  const t = type.toLowerCase();
  if (t.includes("vid") || t.includes("reel") || t.includes("film"))
    return { icon: <Film size={14} />, color: "#818cf8", accent: "rgba(129,140,248,0.12)" };
  if (t.includes("photo") || t.includes("image"))
    return { icon: <Image size={14} />, color: "#38bdf8", accent: "rgba(56,189,248,0.12)" };
  return { icon: <Download size={14} />, color: "#c4cdd6", accent: "rgba(196,205,214,0.08)" };
}

function FolderView({ deliverables }: { deliverables: ClientPortal["deliverables"] }) {
  const [openMonths, setOpenMonths] = useState<string[]>([]);

  const toggleMonth = (m: string) =>
    setOpenMonths(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);

  // Build structure: month → type → items
  type D = typeof deliverables[0];
  const byMonth: Record<string, Record<string, D[]>> = {};
  const noFolder: D[] = [];

  for (const d of deliverables) {
    if (!d.folder) { noFolder.push(d); continue; }
    const { month, type } = parseFolderName(d.folder);
    if (!byMonth[month]) byMonth[month] = {};
    if (!byMonth[month][type]) byMonth[month][type] = [];
    byMonth[month][type].push(d);
  }

  const allDone = (items: D[]) => items.every(d => d.status === "delivered");
  const countStatus = (items: D[]) => {
    const delivered = items.filter(d => d.status === "delivered").length;
    return `${delivered}/${items.length} livré${delivered > 1 ? "s" : ""}`;
  };

  const DeliverableRow = ({ d }: { d: D }) => {
    const cfg = DELIVERABLE_STATUS[d.status];
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", background: "rgba(255,255,255,0.02)", borderRadius: 10, flexWrap: "wrap", gap: 8, borderLeft: `2px solid ${cfg.color}30` }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2, flexWrap: "wrap" }}>
            <span className="font-dm" style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{d.label}</span>
            <span className="font-dm" style={{ fontSize: 10, color: cfg.color, background: `${cfg.color}18`, padding: "2px 8px", borderRadius: 9999 }}>{cfg.label}</span>
          </div>
          {d.deliveredDate && <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Livré le {d.deliveredDate}</p>}
          {d.note && <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{d.note}</p>}
        </div>
        {d.downloadUrl && (
          <a href={d.downloadUrl} target="_blank" rel="noopener noreferrer" className="font-dm"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 9999, color: "#4ade80", textDecoration: "none", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>
            <Download size={11} /> Télécharger
          </a>
        )}
      </div>
    );
  };

  const TypeSection = ({ type, items }: { type: string; items: D[] }) => {
    const cfg = typeConfig(type);
    const done = allDone(items);
    return (
      <div style={{ marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: 8, background: cfg.accent, color: cfg.color }}>
            {cfg.icon}
          </div>
          <span className="font-dm" style={{ fontSize: 12, fontWeight: 700, color: cfg.color, letterSpacing: "0.08em", textTransform: "uppercase" }}>{type}</span>
          <span className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{items.length} fichier{items.length > 1 ? "s" : ""}</span>
          {done && <span className="font-dm" style={{ fontSize: 10, color: "#4ade80", background: "rgba(74,222,128,0.1)", padding: "1px 8px", borderRadius: 9999 }}>✓ Tout livré</span>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, paddingLeft: 8 }}>
          {items.map(d => <DeliverableRow key={d.id} d={d} />)}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {Object.entries(byMonth).map(([month, types]) => {
        const isOpen = openMonths.includes(month);
        const allItems = Object.values(types).flat();
        const done = allDone(allItems);
        const totalCount = allItems.length;
        const photoCount = Object.entries(types).filter(([t]) => t.toLowerCase().includes("photo")).reduce((s, [,v]) => s + v.length, 0);
        const videoCount = Object.entries(types).filter(([t]) => typeConfig(t).color === "#818cf8").reduce((s, [,v]) => s + v.length, 0);

        return (
          <div key={month} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${done ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.08)"}`, borderRadius: 18, overflow: "hidden" }}>
            {/* Month header */}
            <button onClick={() => toggleMonth(month)} className="font-dm"
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: done ? "rgba(74,222,128,0.1)" : "rgba(196,205,214,0.07)", border: `1px solid ${done ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 16 }}>{done ? "✅" : "📁"}</span>
                </div>
                <div>
                  <span className="font-bebas" style={{ fontSize: 19, color: "#fff", letterSpacing: "0.06em", display: "block", lineHeight: 1 }}>{month}</span>
                  <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                    {photoCount > 0 && <span className="font-dm" style={{ fontSize: 10, color: "#38bdf8" }}>📸 {photoCount} photos</span>}
                    {videoCount > 0 && <span className="font-dm" style={{ fontSize: 10, color: "#818cf8" }}>🎬 {videoCount} vidéos</span>}
                    {photoCount === 0 && videoCount === 0 && <span className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{totalCount} fichier{totalCount > 1 ? "s" : ""}</span>}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="font-dm" style={{ fontSize: 10, color: done ? "#4ade80" : "rgba(255,255,255,0.3)" }}>
                  {done ? "✓ Livré" : countStatus(allItems)}
                </span>
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 14 }}>{isOpen ? "▲" : "▼"}</span>
              </div>
            </button>

            {/* Month content */}
            {isOpen && (
              <div style={{ padding: "0 18px 18px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ marginTop: 16 }}>
                  {Object.entries(types).map(([type, items]) => (
                    <TypeSection key={type} type={type} items={items} />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Livrables sans dossier */}
      {noFolder.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {noFolder.map(d => {
            const cfg = DELIVERABLE_STATUS[d.status];
            return (
              <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 12, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span className="font-dm" style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{d.label}</span>
                    <span className="font-dm" style={{ fontSize: 10, color: cfg.color, background: `${cfg.color}15`, padding: "2px 8px", borderRadius: 9999 }}>{cfg.label}</span>
                  </div>
                  {d.note && <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{d.note}</p>}
                </div>
                {d.downloadUrl && (
                  <a href={d.downloadUrl} target="_blank" rel="noopener noreferrer" className="font-dm"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 9999, color: "#4ade80", textDecoration: "none", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>
                    <Download size={11} /> Télécharger
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const PHASES = [
  { id: "preparation", label: "Préparation", icon: Clock, color: "#f59e0b" },
  { id: "tournage",    label: "Tournage",    icon: Camera,   color: "#3b82f6" },
  { id: "montage",     label: "Montage",     icon: Scissors, color: "#8b5cf6" },
  { id: "retouche",    label: "Retouches",   icon: Scissors, color: "#ec4899" },
  { id: "livre",       label: "Livré ✓",     icon: CheckCircle, color: "#4ade80" },
] as const;

const DELIVERABLE_STATUS = {
  pending:     { label: "À venir",    color: "rgba(255,255,255,0.2)" },
  in_progress: { label: "En cours",   color: "#f59e0b" },
  delivered:   { label: "Livré ✓",    color: "#4ade80" },
};

export default function ClientPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [portal, setPortal] = useState<SafePortal | null>(null);
  const [activeTab, setActiveTab] = useState<"services" | "contenu" | "factures">("services");
  const [serviceExpanded, setServiceExpanded] = useState(true);
  const [note, setNote] = useState("");
  const [noteSent, setNoteSent] = useState(false);
  const [sendingNote, setSendingNote] = useState(false);

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
      if (res.ok) {
        setPortal(data);
        setNote(data.clientNote ?? "");
      } else setError("Code d'accès incorrect");
    } catch { setError("Erreur de connexion"); }
    finally { setLoading(false); }
  };

  const handleSendNote = async () => {
    setSendingNote(true);
    await fetch("/api/client/note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, note }),
    });
    setNoteSent(true);
    setSendingNote(false);
    setTimeout(() => setNoteSent(false), 3000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 16px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12, color: "#fff", fontSize: 13,
    outline: "none", fontFamily: "var(--font-dm-sans), sans-serif",
    boxSizing: "border-box",
  };

  if (!portal) {
    return (
      <main style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ width: "100%", maxWidth: 400 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(196,205,214,0.08)", border: "1px solid rgba(196,205,214,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <Lock size={24} color="#c4cdd6" />
            </div>
            <h1 className="font-bebas" style={{ fontSize: 32, color: "#fff", letterSpacing: "0.06em", marginBottom: 8 }}>ESPACE CLIENT</h1>
            <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
              Accédez à votre projet, vos livrables et vos factures.
            </p>
          </div>
          <form onSubmit={handleLogin} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "32px 28px" }}>
            <label className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Code d&apos;accès</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Votre code client" autoFocus style={{ ...inputStyle, marginBottom: 12 }} />
            <AnimatePresence>
              {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-dm" style={{ fontSize: 12, color: "rgba(239,68,68,0.8)", marginBottom: 12 }}>{error}</motion.p>}
            </AnimatePresence>
            <button type="submit" disabled={loading || !password} className="font-dm"
              style={{ width: "100%", padding: "14px", background: password ? "#f2f0ec" : "rgba(255,255,255,0.06)", color: password ? "#0a0a0a" : "rgba(255,255,255,0.2)", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: password ? "pointer" : "not-allowed", letterSpacing: "0.06em", transition: "all 0.2s" }}>
              {loading ? "Vérification..." : "Accéder à mon espace"}
            </button>
            <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: 16 }}>
              Code perdu ? <a href="mailto:massi@massishoots.com" style={{ color: "rgba(196,205,214,0.4)", textDecoration: "none" }}>massi@massishoots.com</a>
            </p>
          </form>
        </motion.div>
      </main>
    );
  }

  const currentPhase = PHASES.find(p => p.id === portal.currentPhase) ?? PHASES[0];
  const phaseIdx = PHASES.findIndex(p => p.id === portal.currentPhase);
  const progress = Math.round(((phaseIdx + 1) / PHASES.length) * 100);
  const PhaseIcon = currentPhase.icon;

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", padding: "60px 24px 100px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
          <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Espace client</p>
          <h1 className="font-bebas" style={{ fontSize: "clamp(28px, 5vw, 42px)", color: "#fff", letterSpacing: "0.04em", lineHeight: 1 }}>
            Bonjour, {portal.name} 👋
          </h1>
          {portal.company && <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{portal.company}</p>}
        </motion.div>

        {/* STATUS CARD */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ padding: "24px 28px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <PhaseIcon size={18} color={currentPhase.color} />
              <span className="font-bebas" style={{ fontSize: 20, color: currentPhase.color, letterSpacing: "0.06em" }}>{currentPhase.label}</span>
            </div>
            {portal.nextDate && (
              <div style={{ textAlign: "right" }}>
                <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Prochaine étape</p>
                <p className="font-dm" style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{portal.nextStep} — {portal.nextDate}</p>
              </div>
            )}
          </div>
          <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 9999, overflow: "hidden" }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              style={{ height: "100%", background: currentPhase.color, borderRadius: 9999 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            {PHASES.map((p, i) => (
              <span key={p.id} className="font-dm" style={{ fontSize: 9, color: i <= phaseIdx ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.15)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {p.label.replace(" ✓", "")}
              </span>
            ))}
          </div>
        </motion.div>

        {/* TABS */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          style={{ display: "flex", gap: 4, marginBottom: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 4 }}>
          {([
            { id: "services", label: "Mes services", icon: Package },
            { id: "contenu",  label: "Mon contenu",  icon: Folder },
            { id: "factures", label: "Factures",      icon: Receipt },
          ] as const).map(tab => {
            const TabIcon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="font-dm"
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 12px", borderRadius: 10, background: activeTab === tab.id ? "#f2f0ec" : "transparent", color: activeTab === tab.id ? "#0a0a0a" : "rgba(255,255,255,0.35)", border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                <TabIcon size={13} /> {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* TAB CONTENT */}
        <AnimatePresence mode="wait">

          {/* SERVICES */}
          {activeTab === "services" && (
            <motion.div key="services" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {/* Service card clicable */}
              <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(196,205,214,0.2)", marginBottom: 12 }}>
                <button onClick={() => setServiceExpanded(!serviceExpanded)} className="font-dm"
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", background: "rgba(196,205,214,0.05)", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(196,205,214,0.1)", border: "1px solid rgba(196,205,214,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Package size={20} color="#c4cdd6" />
                    </div>
                    <div>
                      <span className="font-bebas" style={{ fontSize: 22, color: "#fff", letterSpacing: "0.05em", display: "block", lineHeight: 1 }}>{portal.packageName}</span>
                      {(portal.contractStart || portal.contractEnd) && (
                        <span className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                          {portal.contractStart}{portal.contractEnd ? ` → ${portal.contractEnd}` : ""}
                        </span>
                      )}
                    {(portal.photosPerMonth || portal.videosPerMonth) && (
                      <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                        {portal.photosPerMonth && (
                          <span className="font-dm" style={{ fontSize: 11, color: "#38bdf8", background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.2)", padding: "2px 10px", borderRadius: 9999 }}>
                            📸 {portal.photosPerMonth} photos/mois
                          </span>
                        )}
                        {portal.videosPerMonth && (
                          <span className="font-dm" style={{ fontSize: 11, color: "#818cf8", background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.2)", padding: "2px 10px", borderRadius: 9999 }}>
                            🎬 {portal.videosPerMonth} vidéos/mois
                          </span>
                        )}
                      </div>
                    )}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span className="font-dm" style={{ fontSize: 10, color: "#4ade80", background: "rgba(74,222,128,0.1)", padding: "3px 10px", borderRadius: 9999, letterSpacing: "0.08em" }}>ACTIF</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 16 }}>{serviceExpanded ? "▲" : "▼"}</span>
                  </div>
                </button>

                {serviceExpanded && portal.serviceIncludes?.length > 0 && (
                  <div style={{ padding: "0 24px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", textTransform: "uppercase", margin: "16px 0 12px" }}>CE QUI EST INCLUS</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {portal.serviceIncludes.map(item => (
                        <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Check size={10} color="#4ade80" />
                          </div>
                          <span className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setActiveTab("contenu")} className="font-dm"
                      style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 18px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                      <Folder size={12} /> Voir mon contenu →
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* CONTENU — groupés par dossier/mois */}
          {activeTab === "contenu" && (
            <motion.div key="livrables" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {portal.deliverables?.length > 0 ? (
                <FolderView deliverables={portal.deliverables} />
              ) : (
                <div style={{ padding: "48px 24px", textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20 }}>
                  <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>Vos livrables apparaîtront ici dès la première livraison.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* FACTURES */}
          {activeTab === "factures" && (
            <motion.div key="factures" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {portal.invoices?.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {portal.invoices.map(inv => (
                    <div key={inv.id} style={{ padding: "18px 22px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                          <span className="font-dm" style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{inv.label}</span>
                          <span className="font-dm" style={{ fontSize: 10, color: inv.status === "payee" ? "#4ade80" : "#f59e0b", background: inv.status === "payee" ? "rgba(74,222,128,0.1)" : "rgba(245,158,11,0.1)", padding: "2px 8px", borderRadius: 9999 }}>
                            {inv.status === "payee" ? "Payée ✓" : "En attente"}
                          </span>
                        </div>
                        <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{inv.date} · {inv.amount.toLocaleString("fr-CA")} $</p>
                      </div>
                      {inv.url && (
                        <a href={inv.url} target="_blank" rel="noopener noreferrer" className="font-dm"
                          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 12, whiteSpace: "nowrap" }}>
                          <Receipt size={12} /> Voir la facture
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: "48px 24px", textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20 }}>
                  <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>Aucune facture pour l&apos;instant.</p>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>

        {/* MESSAGE DE MASSI */}
        {portal.message && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ padding: "22px 24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, marginTop: 16, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(196,205,214,0.08)", border: "1px solid rgba(196,205,214,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <MessageSquare size={15} color="#c4cdd6" />
            </div>
            <div>
              <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 5 }}>Message de Massi</p>
              <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{portal.message}</p>
            </div>
          </motion.div>
        )}

        {/* NOTE DU CLIENT */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ padding: "22px 24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, marginTop: 16 }}>
          <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
            Ma note / commentaire
          </p>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Écrivez une note pour Massi — question, retour, demande spéciale..."
            rows={3}
            style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, color: "#fff", fontSize: 13, outline: "none", fontFamily: "var(--font-dm-sans), sans-serif", boxSizing: "border-box", resize: "vertical", marginBottom: 10 }}
          />
          <button onClick={handleSendNote} disabled={sendingNote || !note.trim()} className="font-dm"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", background: noteSent ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.07)", border: `1px solid ${noteSent ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.1)"}`, borderRadius: 9999, color: noteSent ? "#4ade80" : "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
            {noteSent ? <><Check size={12} /> Envoyé !</> : <><Send size={12} /> Envoyer à Massi</>}
          </button>
        </motion.div>

      </div>
    </main>
  );
}

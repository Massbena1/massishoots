"use client";
import React, { useState } from "react";
import { Trash2, Plus, Lock, Users, Pencil, X, Check, ChevronDown, ChevronUp } from "lucide-react";
import type { ClientPortal, Deliverable, Invoice, ProjectPhase } from "@/lib/clientPortal";

const MOIS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1];
const CONTENT_TYPES = ["Photos","Vidéos","Stories","Autre"];

// ─── Constants ────────────────────────────────────────────────────────────────

const PHASES: { id: ProjectPhase; label: string }[] = [
  { id: "preparation", label: "Préparation" },
  { id: "tournage",    label: "Tournage" },
  { id: "montage",     label: "Montage" },
  { id: "retouche",    label: "Retouches finales" },
  { id: "livre",       label: "Livré ✓" },
];

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 12px",
  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8, color: "#fff", fontSize: 12,
  outline: "none", fontFamily: "var(--font-dm-sans), sans-serif", boxSizing: "border-box",
};

const emptyPortal = (): Omit<ClientPortal, "id" | "createdAt"> => ({
  password: "", name: "", company: "", email: "", phone: "",
  packageName: "", serviceIncludes: [], contractStart: "", contractEnd: "",
  currentPhase: "preparation", nextStep: "", nextDate: "",
  deliverables: [], invoices: [],
  message: "", internalNote: "", clientNote: "",
});

// ─── Module-level helpers ─────────────────────────────────────────────────────

function addDeliverable(data: any, setData: (v: any) => void) {
  const d: Deliverable = { id: Date.now().toString(), folder: "", label: "", status: "pending", deliveredDate: "", downloadUrl: "", note: "" };
  setData({ ...data, deliverables: [...(data.deliverables ?? []), d] });
}

function updateDeliverable(data: any, setData: (v: any) => void, idx: number, key: string, val: string) {
  const deliverables = [...(data.deliverables ?? [])];
  deliverables[idx] = { ...deliverables[idx], [key]: val };
  setData({ ...data, deliverables });
}

function removeDeliverable(data: any, setData: (v: any) => void, idx: number) {
  setData({ ...data, deliverables: (data.deliverables ?? []).filter((_: unknown, i: number) => i !== idx) });
}

function addInvoice(data: any, setData: (v: any) => void) {
  const inv: Invoice = { id: Date.now().toString(), label: "", amount: 0, status: "en_attente", date: "", url: "" };
  setData({ ...data, invoices: [...(data.invoices ?? []), inv] });
}

function updateInvoice(data: any, setData: (v: any) => void, idx: number, key: string, val: string | number) {
  const invoices = [...(data.invoices ?? [])];
  invoices[idx] = { ...invoices[idx], [key]: val };
  setData({ ...data, invoices });
}

function removeInvoice(data: any, setData: (v: any) => void, idx: number) {
  setData({ ...data, invoices: (data.invoices ?? []).filter((_: unknown, i: number) => i !== idx) });
}

// ─── DeliverableEditor — own state so selects don't reset ────────────────────
function DeliverableEditor({ d, data, setData, i, inputStyle }: {
  d: Deliverable; data: any; setData: (v: any) => void; i: number; inputStyle: React.CSSProperties;
}) {
  const parseFolderParts = (folder: string) => {
    if (folder.includes("·")) {
      const [type, rest] = folder.split("·").map(s => s.trim());
      const parts = rest?.split(" ") ?? [];
      return { type, mois: parts[0] ?? "", year: parts[1] ?? String(CURRENT_YEAR) };
    }
    return { type: "", mois: "", year: String(CURRENT_YEAR) };
  };

  const init = parseFolderParts(d.folder ?? "");
  const [type, setType] = useState(init.type);
  const [mois, setMois] = useState(init.mois);
  const [year, setYear] = useState(init.year || String(CURRENT_YEAR));

  const applyFolder = (t: string, m: string, y: string) => {
    const folder = t && m ? `${t} · ${m} ${y}` : t ? t : "";
    updateDeliverable(data, setData, i, "folder", folder);
  };

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", gap: 6, marginBottom: 6, alignItems: "center" }}>
        <select value={type} onChange={e => { setType(e.target.value); applyFolder(e.target.value, mois, year); }} style={{ ...inputStyle, appearance: "none" }}>
          <option value="">Type…</option>
          {CONTENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={mois} onChange={e => { setMois(e.target.value); applyFolder(type, e.target.value, year); }} style={{ ...inputStyle, appearance: "none" }}>
          <option value="">Mois…</option>
          {MOIS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select value={year} onChange={e => { setYear(e.target.value); applyFolder(type, mois, e.target.value); }} style={{ ...inputStyle, appearance: "none" }}>
          {YEARS.map(y => <option key={y} value={String(y)}>{y}</option>)}
        </select>
        <select value={d.status} onChange={e => updateDeliverable(data, setData, i, "status", e.target.value)} style={{ ...inputStyle, appearance: "none" }}>
          <option value="pending">À venir</option>
          <option value="in_progress">En cours</option>
          <option value="delivered">Livré ✓</option>
        </select>
        <button type="button" onClick={() => removeDeliverable(data, setData, i)}
          style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 6, padding: "6px 8px", cursor: "pointer", color: "#f87171", flexShrink: 0 }}>
          <X size={12} />
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 2fr", gap: 6 }}>
        <input placeholder="Ex: 5 photos portrait" value={d.label} onChange={e => updateDeliverable(data, setData, i, "label", e.target.value)} style={inputStyle} />
        <input placeholder="Date livraison" value={d.deliveredDate ?? ""} onChange={e => updateDeliverable(data, setData, i, "deliveredDate", e.target.value)} style={inputStyle} />
        <input placeholder="Lien téléchargement" value={d.downloadUrl ?? ""} onChange={e => updateDeliverable(data, setData, i, "downloadUrl", e.target.value)} style={inputStyle} />
      </div>
      {d.folder && <p className="font-dm" style={{ fontSize: 10, color: "rgba(196,205,214,0.35)", marginTop: 5 }}>📁 {d.folder}</p>}
    </div>
  );
}

// ─── ClientForm — outside parent to avoid remount on every keystroke ──────────

function ClientForm({ data, setData, onSubmit, onCancel, submitLabel, loading }: {
  data: any;
  setData: (v: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  submitLabel: string;
  loading: boolean;
}) {
  return (
    <form onSubmit={onSubmit}>
      <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>— Client</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
        {(["name", "company", "email", "phone", "password"] as const).map(k => (
          <input key={k} required={["name", "email", "password"].includes(k)}
            placeholder={k === "name" ? "Nom *" : k === "company" ? "Entreprise" : k === "email" ? "Email *" : k === "phone" ? "Téléphone" : "Code d'accès *"}
            value={data[k] ?? ""} onChange={e => setData({ ...data, [k]: e.target.value })} style={inputStyle} />
        ))}
      </div>

      <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", margin: "14px 0 10px" }}>— Service</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <select
            value={["Contenu Express", "Essentiel", "Autorité", "Full Brand", "Événement", "Corporate", "Mariage", "Portrait", "Publicité"].includes(data.packageName ?? "") ? data.packageName : data.packageName ? "autre" : ""}
            onChange={e => {
              if (e.target.value === "autre") setData({ ...data, packageName: "" });
              else setData({ ...data, packageName: e.target.value });
            }}
            style={{ ...inputStyle, appearance: "none" }}
          >
            <option value="">Choisir un service...</option>
            <option value="Contenu Express">Contenu Express</option>
            <option value="Essentiel">Essentiel</option>
            <option value="Autorité">Autorité</option>
            <option value="Full Brand">Full Brand</option>
            <option disabled>──────────</option>
            <option value="Événement">Événement</option>
            <option value="Corporate">Corporate</option>
            <option value="Mariage">Mariage</option>
            <option value="Portrait">Portrait / Corporate</option>
            <option value="Publicité">Publicité (Ads)</option>
            <option disabled>──────────</option>
            <option value="autre">Autre (saisir manuellement)</option>
          </select>
          {(data.packageName === "" || !["Contenu Express", "Essentiel", "Autorité", "Full Brand", "Événement", "Corporate", "Mariage", "Portrait", "Publicité", ""].includes(data.packageName ?? "")) && (
            <input placeholder="Nom du service personnalisé" value={data.packageName ?? ""} onChange={e => setData({ ...data, packageName: e.target.value })} style={inputStyle} />
          )}
        </div>
        <select value={data.currentPhase ?? "preparation"} onChange={e => setData({ ...data, currentPhase: e.target.value })} style={{ ...inputStyle, appearance: "none" }}>
          {PHASES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
        </select>
        <input placeholder="Début contrat (ex: 1 juin 2026)" value={data.contractStart ?? ""} onChange={e => setData({ ...data, contractStart: e.target.value })} style={inputStyle} />
        <input placeholder="Fin contrat (optionnel)" value={data.contractEnd ?? ""} onChange={e => setData({ ...data, contractEnd: e.target.value })} style={inputStyle} />
        <input placeholder="Prochaine étape" value={data.nextStep ?? ""} onChange={e => setData({ ...data, nextStep: e.target.value })} style={inputStyle} />
        <input placeholder="Date prochaine étape" value={data.nextDate ?? ""} onChange={e => setData({ ...data, nextDate: e.target.value })} style={inputStyle} />
      </div>
      <textarea placeholder="Livrables inclus (une ligne par livrable)" rows={3}
        value={(data.serviceIncludes ?? []).join("\n")}
        onChange={e => setData({ ...data, serviceIncludes: e.target.value.split("\n").filter(Boolean) })}
        style={{ ...inputStyle, resize: "vertical", marginBottom: 8 }} />

      <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", margin: "14px 0 10px" }}>— Livrables</p>
      {(data.deliverables ?? []).map((d: Deliverable, i: number) => (
        <DeliverableEditor key={d.id} d={d} data={data} setData={setData} i={i} inputStyle={inputStyle} />
      ))}
      <button type="button" onClick={() => addDeliverable(data, setData)} className="font-dm"
        style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 7, padding: "5px 12px", cursor: "pointer", marginBottom: 4 }}>
        + Ajouter un livrable
      </button>

      <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", margin: "14px 0 10px" }}>— Factures</p>
      {(data.invoices ?? []).map((inv: Invoice, i: number) => (
        <div key={inv.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 2fr auto", gap: 6, marginBottom: 6, alignItems: "center" }}>
          <input placeholder="Label (ex: Acompte 50%)" value={inv.label} onChange={e => updateInvoice(data, setData, i, "label", e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Montant $" value={inv.amount || ""} onChange={e => updateInvoice(data, setData, i, "amount", Number(e.target.value))} style={inputStyle} />
          <select value={inv.status} onChange={e => updateInvoice(data, setData, i, "status", e.target.value)} style={{ ...inputStyle, appearance: "none" }}>
            <option value="en_attente">En attente</option>
            <option value="payee">Payée ✓</option>
          </select>
          <input placeholder="Date" value={inv.date} onChange={e => updateInvoice(data, setData, i, "date", e.target.value)} style={inputStyle} />
          <input placeholder="Lien PDF / paiement" value={inv.url ?? ""} onChange={e => updateInvoice(data, setData, i, "url", e.target.value)} style={inputStyle} />
          <button type="button" onClick={() => removeInvoice(data, setData, i)}
            style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 6, padding: "6px 8px", cursor: "pointer", color: "#f87171", flexShrink: 0 }}>
            <X size={12} />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addInvoice(data, setData)} className="font-dm"
        style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 7, padding: "5px 12px", cursor: "pointer", marginBottom: 4 }}>
        + Ajouter une facture
      </button>

      <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", margin: "14px 0 10px" }}>— Communication</p>
      <textarea placeholder="Message pour le client (visible)" rows={2} value={data.message ?? ""} onChange={e => setData({ ...data, message: e.target.value })} style={{ ...inputStyle, resize: "vertical", marginBottom: 8 }} />
      <textarea placeholder="Notes internes (admin seulement)" rows={2} value={data.internalNote ?? ""} onChange={e => setData({ ...data, internalNote: e.target.value })} style={{ ...inputStyle, resize: "vertical", marginBottom: 8 }} />
      {data.clientNote && (
        <div style={{ padding: "10px 14px", background: "rgba(196,205,214,0.05)", border: "1px solid rgba(196,205,214,0.12)", borderRadius: 8, marginBottom: 8 }}>
          <p className="font-dm" style={{ fontSize: 10, color: "rgba(196,205,214,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Note du client</p>
          <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{data.clientNote}</p>
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button type="submit" disabled={loading} className="font-dm"
          style={{ display: "flex", alignItems: "center", gap: 5, padding: "10px 20px", background: "#4ade80", color: "#0a0a0a", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          <Check size={12} /> {loading ? "..." : submitLabel}
        </button>
        <button type="button" onClick={onCancel} className="font-dm"
          style={{ padding: "10px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "rgba(255,255,255,0.4)", fontSize: 12, cursor: "pointer" }}>
          Annuler
        </button>
      </div>
    </form>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminClientsPage() {
  const [pwd, setPwd] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [clients, setClients] = useState<ClientPortal[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editClient, setEditClient] = useState<ClientPortal | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(emptyPortal());
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const fetch_ = async () => {
    const res = await fetch("/api/admin/clients");
    setClients(await res.json());
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/clients", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd, portal: null }),
    });
    if (res.status === 401) setAuthError("Mot de passe incorrect");
    else { setAuthed(true); fetch_(); }
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const portal: ClientPortal = { ...form, id: Date.now().toString(), createdAt: new Date().toISOString() };
    await fetch("/api/admin/clients", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd, portal }),
    });
    setSuccess("Client ajouté ✓"); setForm(emptyPortal()); setShowAdd(false); fetch_();
    setTimeout(() => setSuccess(""), 3000);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editClient) return;
    await fetch("/api/admin/clients", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd, portal: editClient }),
    });
    setEditClient(null); fetch_();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce client ?")) return;
    await fetch("/api/admin/clients", {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd, id }),
    });
    fetch_();
  };

  if (!authed) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a" }}>
        <form onSubmit={handleAuth} style={{ width: 360, padding: "40px 32px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20 }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <Users size={28} color="rgba(255,255,255,0.3)" style={{ marginBottom: 12 }} />
            <h1 className="font-bebas" style={{ fontSize: 28, color: "#fff", letterSpacing: "0.06em" }}>ADMIN CLIENTS</h1>
          </div>
          <input type="password" placeholder="Mot de passe admin" value={pwd} onChange={e => setPwd(e.target.value)} style={{ ...inputStyle, marginBottom: 12 }} />
          {authError && <p className="font-dm" style={{ fontSize: 12, color: "#f87171", marginBottom: 10 }}>{authError}</p>}
          <button type="submit" disabled={loading} className="font-dm"
            style={{ width: "100%", padding: "13px", background: "#f2f0ec", color: "#0a0a0a", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            {loading ? "..." : "Accéder"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <h1 className="font-bebas" style={{ fontSize: 32, color: "#fff", letterSpacing: "0.06em" }}>CLIENTS</h1>
            <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{clients.length} client{clients.length !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={() => { setShowAdd(true); setEditClient(null); }} className="font-dm"
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: "#f2f0ec", color: "#0a0a0a", border: "none", borderRadius: 9999, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            <Plus size={13} /> Nouveau client
          </button>
        </div>

        {success && <p className="font-dm" style={{ fontSize: 12, color: "#4ade80", marginBottom: 16 }}>{success}</p>}

        {showAdd && (
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "24px", marginBottom: 24 }}>
            <h2 className="font-bebas" style={{ fontSize: 18, color: "#c4cdd6", letterSpacing: "0.1em", marginBottom: 16 }}>NOUVEAU CLIENT</h2>
            <ClientForm data={form} setData={setForm} onSubmit={handleAdd} onCancel={() => setShowAdd(false)} submitLabel="Créer l'espace" loading={loading} />
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {clients.map(c => (
            <div key={c.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" }}>
              {editClient?.id === c.id ? (
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <h3 className="font-bebas" style={{ fontSize: 16, color: "#c4cdd6", letterSpacing: "0.08em" }}>MODIFIER — {c.name}</h3>
                    <button onClick={() => setEditClient(null)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer" }}><X size={16} /></button>
                  </div>
                  <ClientForm data={editClient} setData={setEditClient} onSubmit={handleSave} onCancel={() => setEditClient(null)} submitLabel="Enregistrer" loading={loading} />
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", cursor: "pointer" }}
                    onClick={() => setExpanded(expanded === c.id ? null : c.id)}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                        <p className="font-bebas" style={{ fontSize: 16, color: "#fff", letterSpacing: "0.04em" }}>{c.name}</p>
                        {c.company && <span className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{c.company}</span>}
                        <span className="font-dm" style={{ fontSize: 10, color: "#c4cdd6", background: "rgba(196,205,214,0.1)", padding: "2px 8px", borderRadius: 9999 }}>{c.packageName}</span>
                        {c.clientNote && <span className="font-dm" style={{ fontSize: 10, color: "#f59e0b", background: "rgba(245,158,11,0.1)", padding: "2px 8px", borderRadius: 9999 }}>Note client !</span>}
                      </div>
                      <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>
                        Code: {c.password} · {PHASES.find(p => p.id === c.currentPhase)?.label} · {c.deliverables?.length ?? 0} livrable(s) · {c.invoices?.length ?? 0} facture(s)
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <button onClick={e => { e.stopPropagation(); setEditClient({ ...c }); setShowAdd(false); }}
                        style={{ background: "rgba(196,205,214,0.08)", border: "1px solid rgba(196,205,214,0.15)", borderRadius: 8, padding: "5px 7px", cursor: "pointer", color: "#c4cdd6", display: "flex" }}>
                        <Pencil size={13} />
                      </button>
                      <button onClick={e => { e.stopPropagation(); handleDelete(c.id); }}
                        style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 8, padding: "5px 7px", cursor: "pointer", color: "#f87171", display: "flex" }}>
                        <Trash2 size={13} />
                      </button>
                      {expanded === c.id ? <ChevronUp size={14} color="rgba(255,255,255,0.3)" /> : <ChevronDown size={14} color="rgba(255,255,255,0.3)" />}
                    </div>
                  </div>

                  {expanded === c.id && (
                    <div style={{ padding: "0 18px 16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      {c.clientNote && (
                        <div style={{ padding: "10px 14px", background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 10, margin: "12px 0" }}>
                          <p className="font-dm" style={{ fontSize: 10, color: "rgba(245,158,11,0.6)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Note du client</p>
                          <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>{c.clientNote}</p>
                        </div>
                      )}
                      {c.internalNote && (
                        <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, margin: "12px 0" }}>
                          <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Note interne</p>
                          <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{c.internalNote}</p>
                        </div>
                      )}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                        <div>
                          <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Livrables</p>
                          {(c.deliverables ?? []).map(d => (
                            <p key={d.id} className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 3 }}>
                              {d.folder ? `${d.folder} / ` : ""}{d.label} — <span style={{ color: d.status === "delivered" ? "#4ade80" : d.status === "in_progress" ? "#f59e0b" : "rgba(255,255,255,0.3)" }}>
                                {d.status === "delivered" ? "Livré" : d.status === "in_progress" ? "En cours" : "À venir"}
                              </span>
                            </p>
                          ))}
                        </div>
                        <div>
                          <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Factures</p>
                          {(c.invoices ?? []).map(inv => (
                            <p key={inv.id} className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 3 }}>
                              {inv.label} — {inv.amount.toLocaleString("fr-CA")} $ — <span style={{ color: inv.status === "payee" ? "#4ade80" : "#f59e0b" }}>{inv.status === "payee" ? "Payée" : "En attente"}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {clients.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px", color: "rgba(255,255,255,0.2)" }}>
              <Lock size={28} style={{ marginBottom: 10 }} />
              <p className="font-dm" style={{ fontSize: 13 }}>Aucun client pour l&apos;instant</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

"use client";
import { useState } from "react";
import { Trash2, Plus, Lock, Users, ExternalLink, Pencil, X, Check } from "lucide-react";
import type { ClientPortal } from "@/app/api/client/auth/route";

const STATUS_OPTIONS: ClientPortal["status"][] = ["preparation", "tournage", "montage", "retouche", "livre"];
const STATUS_LABELS: Record<ClientPortal["status"], string> = {
  preparation: "Préparation",
  tournage: "Tournage",
  montage: "Montage",
  retouche: "Retouches finales",
  livre: "Livré ✓",
};

const emptyPortal = (): Omit<ClientPortal, "id" | "createdAt"> => ({
  name: "", project: "", password: "", status: "preparation",
  deliveryDate: "", message: "", downloadUrl: "",
});

export default function AdminClientsPage() {
  const [pwd, setPwd] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [clients, setClients] = useState<ClientPortal[]>([]);
  const [form, setForm] = useState(emptyPortal());
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ClientPortal | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 14px",
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8, color: "#fff", fontSize: 12,
    outline: "none", fontFamily: "var(--font-dm-sans), sans-serif", boxSizing: "border-box",
  };

  const fetchClients = async () => {
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
    else { setAuthed(true); fetchClients(); }
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
    setSuccess("Client ajouté ✓");
    setForm(emptyPortal());
    fetchClients();
    setTimeout(() => setSuccess(""), 3000);
    setLoading(false);
  };

  const handleSaveEdit = async () => {
    if (!editForm) return;
    await fetch("/api/admin/clients", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd, portal: editForm }),
    });
    setEditId(null); setEditForm(null); fetchClients();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce client ?")) return;
    await fetch("/api/admin/clients", {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd, id }),
    });
    fetchClients();
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const setEdit = (key: keyof ClientPortal) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setEditForm(f => f ? { ...f, [key]: e.target.value } : f);

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
          <button type="submit" disabled={loading} className="font-dm" style={{ width: "100%", padding: "13px", background: "#f2f0ec", color: "#0a0a0a", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            {loading ? "..." : "Accéder"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", padding: "40px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36 }}>
          <div>
            <h1 className="font-bebas" style={{ fontSize: 32, color: "#fff", letterSpacing: "0.06em" }}>ESPACES CLIENTS</h1>
            <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{clients.length} client{clients.length !== 1 ? "s" : ""}</p>
          </div>
          <a href="/client" target="_blank" className="font-dm" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
            Voir la page client <ExternalLink size={12} />
          </a>
        </div>

        {/* Add form */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "24px", marginBottom: 28 }}>
          <h2 className="font-bebas" style={{ fontSize: 18, color: "#c4cdd6", letterSpacing: "0.1em", marginBottom: 16 }}>
            <Plus size={14} style={{ display: "inline", marginRight: 6 }} />NOUVEAU CLIENT
          </h2>
          <form onSubmit={handleAdd}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <input required placeholder="Nom du client *" value={form.name} onChange={set("name")} style={inputStyle} />
              <input required placeholder="Nom du projet *" value={form.project} onChange={set("project")} style={inputStyle} />
              <input required placeholder="Code d'accès *" value={form.password} onChange={set("password")} style={inputStyle} />
              <select value={form.status} onChange={set("status")} style={{ ...inputStyle, appearance: "none" }}>
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
              <input placeholder="Date de livraison (ex: 15 juin 2026)" value={form.deliveryDate} onChange={set("deliveryDate")} style={inputStyle} />
              <input placeholder="Lien de téléchargement (optionnel)" value={form.downloadUrl} onChange={set("downloadUrl")} style={inputStyle} />
            </div>
            <textarea placeholder="Message personnalisé pour le client" value={form.message} onChange={set("message")} rows={2}
              style={{ ...inputStyle, resize: "vertical", marginBottom: 12 }} />
            {success && <p className="font-dm" style={{ fontSize: 12, color: "#4ade80", marginBottom: 10 }}>{success}</p>}
            <button type="submit" disabled={loading} className="font-dm" style={{ padding: "11px 24px", background: "#f2f0ec", color: "#0a0a0a", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              {loading ? "..." : "Créer l'espace client"}
            </button>
          </form>
        </div>

        {/* Client list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {clients.map(c => (
            <div key={c.id} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${editId === c.id ? "rgba(196,205,214,0.2)" : "rgba(255,255,255,0.07)"}`, borderRadius: 14, overflow: "hidden" }}>
              {editId === c.id && editForm ? (
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                    <input value={editForm.name} onChange={setEdit("name")} placeholder="Nom" style={inputStyle} />
                    <input value={editForm.project} onChange={setEdit("project")} placeholder="Projet" style={inputStyle} />
                    <input value={editForm.password} onChange={setEdit("password")} placeholder="Code" style={inputStyle} />
                    <select value={editForm.status} onChange={setEdit("status")} style={{ ...inputStyle, appearance: "none" }}>
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                    </select>
                    <input value={editForm.deliveryDate} onChange={setEdit("deliveryDate")} placeholder="Date livraison" style={inputStyle} />
                    <input value={editForm.downloadUrl ?? ""} onChange={setEdit("downloadUrl")} placeholder="Lien téléchargement" style={inputStyle} />
                  </div>
                  <textarea value={editForm.message} onChange={setEdit("message")} placeholder="Message" rows={2} style={{ ...inputStyle, resize: "vertical", marginBottom: 10 }} />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={handleSaveEdit} className="font-dm" style={{ display: "flex", alignItems: "center", gap: 5, padding: "8px 16px", background: "#4ade80", color: "#0a0a0a", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                      <Check size={12} /> Enregistrer
                    </button>
                    <button onClick={() => { setEditId(null); setEditForm(null); }} className="font-dm" style={{ display: "flex", alignItems: "center", gap: 5, padding: "8px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "rgba(255,255,255,0.4)", fontSize: 12, cursor: "pointer" }}>
                      <X size={12} /> Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
                  <div>
                    <p className="font-bebas" style={{ fontSize: 16, color: "#fff", letterSpacing: "0.04em" }}>{c.name}</p>
                    <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                      {c.project} · <span style={{ color: "#c4cdd6" }}>{STATUS_LABELS[c.status]}</span> · Code: {c.password}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => { setEditId(c.id); setEditForm({ ...c }); }} style={{ background: "rgba(196,205,214,0.08)", border: "1px solid rgba(196,205,214,0.15)", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "#c4cdd6", display: "flex" }}>
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => handleDelete(c.id)} style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "#f87171", display: "flex" }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {clients.length === 0 && (
            <div style={{ textAlign: "center", padding: "32px", color: "rgba(255,255,255,0.2)" }}>
              <Lock size={28} style={{ marginBottom: 10 }} />
              <p className="font-dm" style={{ fontSize: 13 }}>Aucun client pour l&apos;instant</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

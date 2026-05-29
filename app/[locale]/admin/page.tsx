"use client";
import { useState, useEffect } from "react";
import { Trash2, Plus, Lock, Images, ExternalLink } from "lucide-react";
import type { Gallery, GalleryType } from "@/lib/galleries";

const TYPES: GalleryType[] = ["Événement", "Mariage", "Corporate", "Portrait", "Wedding", "Event"];

const empty = (): Omit<Gallery, "id"> => ({
  name: "", date: "", type: "Événement", photos: 0,
  cover: "", pixiesetUrl: "", password: true, pin: "", featured: false,
});

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [form, setForm] = useState(empty());
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fetchGalleries = async (pwd: string) => {
    const res = await fetch("/api/admin/galleries");
    const data = await res.json();
    setGalleries(data);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/galleries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, gallery: null }),
    });
    if (res.status === 401) {
      setAuthError("Mot de passe incorrect");
    } else {
      setAuthed(true);
      fetchGalleries(password);
    }
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const gallery: Gallery = {
      ...form,
      id: form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now(),
    };
    const res = await fetch("/api/admin/galleries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, gallery }),
    });
    const data = await res.json();
    if (data.ok) {
      setSuccess("Galerie ajoutée ✓");
      setForm(empty());
      fetchGalleries(password);
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setError("Erreur lors de l'ajout");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette galerie ?")) return;
    await fetch("/api/admin/galleries", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, id }),
    });
    fetchGalleries(password);
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: key === "photos" ? Number(e.target.value) : key === "password" || key === "featured" ? (e.target as HTMLInputElement).checked : e.target.value }));

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10, color: "#fff", fontSize: 13,
    outline: "none", fontFamily: "var(--font-dm-sans), sans-serif",
    boxSizing: "border-box",
  };

  if (!authed) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a" }}>
        <form onSubmit={handleAuth} style={{ width: 360, padding: "40px 32px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20 }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <Lock size={28} color="rgba(255,255,255,0.3)" style={{ marginBottom: 12 }} />
            <h1 className="font-bebas" style={{ fontSize: 28, color: "#fff", letterSpacing: "0.06em" }}>ADMIN</h1>
            <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>Galeries Massishoots</p>
          </div>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ ...inputStyle, marginBottom: 12 }}
          />
          {authError && <p className="font-dm" style={{ fontSize: 12, color: "#f87171", marginBottom: 10 }}>{authError}</p>}
          <button type="submit" disabled={loading} className="font-dm" style={{ width: "100%", padding: "13px", background: "#f2f0ec", color: "#0a0a0a", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em" }}>
            {loading ? "..." : "Accéder"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", padding: "40px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
          <div>
            <h1 className="font-bebas" style={{ fontSize: 36, color: "#fff", letterSpacing: "0.06em" }}>ADMIN — GALERIES</h1>
            <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{galleries.length} galerie{galleries.length !== 1 ? "s" : ""} publiée{galleries.length !== 1 ? "s" : ""}</p>
          </div>
          <a href="/galleries" target="_blank" className="font-dm" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
            Voir la page <ExternalLink size={12} />
          </a>
        </div>

        {/* Add form */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "28px 24px", marginBottom: 32 }}>
          <h2 className="font-bebas" style={{ fontSize: 20, color: "#c4cdd6", letterSpacing: "0.1em", marginBottom: 20 }}>
            <Plus size={16} style={{ display: "inline", marginRight: 8 }} />
            AJOUTER UNE GALERIE
          </h2>
          <form onSubmit={handleAdd}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <input required placeholder="Nom de l'événement *" value={form.name} onChange={set("name")} style={inputStyle} />
              <input required type="date" value={form.date} onChange={set("date")} style={inputStyle} />
              <select required value={form.type} onChange={set("type")} style={{ ...inputStyle, appearance: "none" }}>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <input required type="number" placeholder="Nombre de photos *" value={form.photos || ""} onChange={set("photos")} style={inputStyle} />
              <input required placeholder="URL Pixieset * (ex: https://massishoots.pixieset.com/nom/)" value={form.pixiesetUrl} onChange={set("pixiesetUrl")} style={inputStyle} />
              <input placeholder="URL image couverture (optionnel)" value={form.cover} onChange={set("cover")} style={inputStyle} />
              <input placeholder="Code PIN (4 chiffres)" value={form.pin ?? ""} onChange={set("pin")} maxLength={4} inputMode="numeric" style={inputStyle} />
            </div>
            <div style={{ display: "flex", gap: 24, marginBottom: 20, alignItems: "center" }}>
              <label className="font-dm" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>
                <input type="checkbox" checked={form.password} onChange={set("password")} style={{ accentColor: "#c4cdd6" }} />
                Accès par mot de passe
              </label>
              <label className="font-dm" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>
                <input type="checkbox" checked={form.featured} onChange={set("featured")} style={{ accentColor: "#c4cdd6" }} />
                Galerie vedette ⭐
              </label>
            </div>
            {error && <p className="font-dm" style={{ fontSize: 12, color: "#f87171", marginBottom: 10 }}>{error}</p>}
            {success && <p className="font-dm" style={{ fontSize: 12, color: "#4ade80", marginBottom: 10 }}>{success}</p>}
            <button type="submit" disabled={loading} className="font-dm" style={{ padding: "13px 32px", background: "#f2f0ec", color: "#0a0a0a", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em" }}>
              {loading ? "Ajout en cours..." : "Publier la galerie"}
            </button>
          </form>
        </div>

        {/* Gallery list */}
        {galleries.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "rgba(255,255,255,0.2)" }}>
            <Images size={32} style={{ marginBottom: 12 }} />
            <p className="font-dm" style={{ fontSize: 13 }}>Aucune galerie pour l&apos;instant</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {galleries.map(g => (
              <div key={g.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                <div>
                  <p className="font-bebas" style={{ fontSize: 16, color: "#fff", letterSpacing: "0.04em" }}>{g.name}</p>
                  <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{g.type} · {g.date} · {g.photos} photos {g.password ? "🔒" : ""} {g.featured ? "⭐" : ""}</p>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <a href={g.pixiesetUrl} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", display: "flex" }}><ExternalLink size={14} /></a>
                  <button onClick={() => handleDelete(g.id)} style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "#f87171", display: "flex" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

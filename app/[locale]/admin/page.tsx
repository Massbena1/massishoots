"use client";
import { useState, useRef } from "react";
import { Trash2, Plus, Lock, Images, ExternalLink, Upload, Pencil, X, Check } from "lucide-react";
import type { Gallery, GalleryType } from "@/lib/galleries";

const TYPES: GalleryType[] = ["Événement", "Mariage", "Corporate", "Portrait", "Wedding", "Event"];

const empty = (): Omit<Gallery, "id"> => ({
  name: "", date: "", type: "Événement", photos: 0,
  cover: "", pixiesetUrl: "", password: true, pin: "", location: "", featured: false,
});

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [form, setForm] = useState(empty());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Gallery | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);

  const fetchGalleries = async () => {
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
      fetchGalleries();
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
      fetchGalleries();
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setError("Erreur lors de l'ajout");
    }
    setLoading(false);
  };

  const handleEdit = (g: Gallery) => {
    setEditingId(g.id);
    setEditForm({ ...g });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleSaveEdit = async () => {
    if (!editForm) return;
    setLoading(true);
    const res = await fetch("/api/admin/galleries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, gallery: editForm }),
    });
    const data = await res.json();
    if (data.ok) {
      setEditingId(null);
      setEditForm(null);
      fetchGalleries();
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
    fetchGalleries();
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: key === "photos" ? Number(e.target.value) : key === "password" || key === "featured" ? (e.target as HTMLInputElement).checked : e.target.value }));

  const setEdit = (key: keyof Gallery) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setEditForm(f => f ? ({ ...f, [key]: key === "photos" ? Number(e.target.value) : key === "password" || key === "featured" ? (e.target as HTMLInputElement).checked : e.target.value }) : f);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { "x-admin-password": password },
      body: formData,
    });
    const data = await res.json();
    if (data.url) {
      if (isEdit) setEditForm(f => f ? { ...f, cover: data.url } : f);
      else setForm(f => ({ ...f, cover: data.url }));
    }
    setUploading(false);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 14px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8, color: "#fff", fontSize: 12,
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
          <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} style={{ ...inputStyle, marginBottom: 12 }} />
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
              <input required placeholder="URL Pixieset *" value={form.pixiesetUrl} onChange={set("pixiesetUrl")} style={inputStyle} />
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input placeholder="URL image couverture" value={form.cover} onChange={set("cover")} style={{ ...inputStyle, flex: 1 }} />
                <input ref={fileRef} type="file" accept="image/*" onChange={e => handleUpload(e)} style={{ display: "none" }} />
                <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} style={{ ...inputStyle, width: "auto", padding: "10px 12px", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                  <Upload size={12} /> {uploading ? "..." : "Choisir"}
                </button>
                {form.cover && <img src={form.cover} alt="" style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }} />}
              </div>
              <input placeholder="Code PIN (4 chiffres)" value={form.pin ?? ""} onChange={set("pin")} maxLength={4} inputMode="numeric" style={inputStyle} />
              <input placeholder="Lieu / endroit (optionnel)" value={form.location ?? ""} onChange={set("location")} style={inputStyle} />
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
              <div key={g.id} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${editingId === g.id ? "rgba(196,205,214,0.25)" : "rgba(255,255,255,0.07)"}`, borderRadius: 14, overflow: "hidden" }}>
                {editingId === g.id && editForm ? (
                  /* Edit mode */
                  <div style={{ padding: "20px" }}>
                    <p className="font-bebas" style={{ fontSize: 14, color: "#c4cdd6", letterSpacing: "0.1em", marginBottom: 14 }}>MODIFIER — {g.name}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                      <input placeholder="Nom *" value={editForm.name} onChange={setEdit("name")} style={inputStyle} />
                      <input type="date" value={editForm.date} onChange={setEdit("date")} style={inputStyle} />
                      <select value={editForm.type} onChange={setEdit("type")} style={{ ...inputStyle, appearance: "none" }}>
                        {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <input type="number" placeholder="Nb photos" value={editForm.photos || ""} onChange={setEdit("photos")} style={inputStyle} />
                      <input placeholder="URL Pixieset" value={editForm.pixiesetUrl} onChange={setEdit("pixiesetUrl")} style={inputStyle} />
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input placeholder="URL couverture" value={editForm.cover} onChange={setEdit("cover")} style={{ ...inputStyle, flex: 1 }} />
                        <input ref={editFileRef} type="file" accept="image/*" onChange={e => handleUpload(e, true)} style={{ display: "none" }} />
                        <button type="button" onClick={() => editFileRef.current?.click()} disabled={uploading} style={{ ...inputStyle, width: "auto", padding: "10px 12px", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}>
                          <Upload size={12} /> {uploading ? "..." : "Choisir"}
                        </button>
                        {editForm.cover && <img src={editForm.cover} alt="" style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }} />}
                      </div>
                      <input placeholder="Code PIN" value={editForm.pin ?? ""} onChange={setEdit("pin")} maxLength={4} inputMode="numeric" style={inputStyle} />
                      <input placeholder="Lieu (optionnel)" value={editForm.location ?? ""} onChange={setEdit("location")} style={inputStyle} />
                    </div>
                    <div style={{ display: "flex", gap: 20, marginBottom: 16, alignItems: "center" }}>
                      <label className="font-dm" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>
                        <input type="checkbox" checked={editForm.password} onChange={setEdit("password")} style={{ accentColor: "#c4cdd6" }} />
                        Accès par mot de passe
                      </label>
                      <label className="font-dm" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>
                        <input type="checkbox" checked={editForm.featured ?? false} onChange={setEdit("featured")} style={{ accentColor: "#c4cdd6" }} />
                        Vedette ⭐
                      </label>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button onClick={handleSaveEdit} disabled={loading} className="font-dm" style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", background: "#4ade80", color: "#0a0a0a", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                        <Check size={13} /> {loading ? "..." : "Enregistrer"}
                      </button>
                      <button onClick={handleCancelEdit} className="font-dm" style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>
                        <X size={13} /> Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View mode */
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      {g.cover && <img src={g.cover} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover", border: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }} />}
                      <div>
                        <p className="font-bebas" style={{ fontSize: 16, color: "#fff", letterSpacing: "0.04em" }}>{g.name}</p>
                        <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                          {g.type} · {g.date} · {g.photos} photos {g.location ? `· ${g.location}` : ""} {g.password ? "🔒" : ""} {g.featured ? "⭐" : ""}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <a href={g.pixiesetUrl} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", display: "flex" }}><ExternalLink size={14} /></a>
                      <button onClick={() => handleEdit(g)} style={{ background: "rgba(196,205,214,0.08)", border: "1px solid rgba(196,205,214,0.15)", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "#c4cdd6", display: "flex" }}>
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(g.id)} style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "#f87171", display: "flex" }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

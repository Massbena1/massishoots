"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

/* ── TYPES ──────────────────────────────────────────────── */
interface ImageItem { src: string; client?: string; }
interface Config {
  covers: Record<string, string>;
  crops: Record<string, string>;
  thumbnails: Record<string, string>;
}
interface Toast { id: number; msg: string; ok: boolean; }

const ADMIN_KEY = "massiAdmin2026";

const CATEGORIES = [
  { key: "brand",       label: "Personal Branding" },
  { key: "eventt",      label: "Événements" },
  { key: "corpo",       label: "Corporate" },
  { key: "lyfestyle",   label: "Lifestyle" },
  { key: "mariage",     label: "Mariage" },
  { key: "professionel",label: "Portraits" },
];

const RATIOS = [
  { label: "Libre",      value: undefined },
  { label: "1:1",        value: 1 },
  { label: "4:3",        value: 4 / 3 },
  { label: "3:4",        value: 3 / 4 },
  { label: "16:9",       value: 16 / 9 },
];

/* ── HELPERS ────────────────────────────────────────────── */
function authHeaders() {
  return { "x-admin-key": ADMIN_KEY, "Content-Type": "application/json" };
}

/* ── TOAST ──────────────────────────────────────────────── */
function Toasts({ toasts }: { toasts: Toast[] }) {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
      {toasts.map(t => (
        <div key={t.id} style={{ background: t.ok ? "#1a2a1a" : "#2a1a1a", border: `1px solid ${t.ok ? "#4caf50" : "#f44336"}`, borderLeft: `3px solid ${t.ok ? "#4caf50" : "#f44336"}`, color: "#fff", padding: "12px 18px", borderRadius: 8, fontFamily: "sans-serif", fontSize: 13, minWidth: 220, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

/* ── CROP MODAL ─────────────────────────────────────────── */
function CropModal({ src, onClose, onDone }: { src: string; onClose: () => void; onDone: (url: string) => void }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [ratio, setRatio] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const onLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const c = centerCrop(makeAspectCrop({ unit: "%", width: 80 }, ratio ?? width / height, width, height), width, height);
    setCrop(c);
  }, [ratio]);

  const applyRatio = (r: number | undefined) => {
    setRatio(r);
    if (!imgRef.current) return;
    const { width, height } = imgRef.current;
    const c = centerCrop(makeAspectCrop({ unit: "%", width: 80 }, r ?? width / height, width, height), width, height);
    setCrop(c);
  };

  const apply = async () => {
    if (!crop || !imgRef.current) return;
    setLoading(true);
    const img = imgRef.current;
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    const canvas = document.createElement("canvas");
    const pixelCrop = {
      x: (crop.x / 100) * img.width * scaleX,
      y: (crop.y / 100) * img.height * scaleY,
      width: (crop.width / 100) * img.width * scaleX,
      height: (crop.height / 100) * img.height * scaleY,
    };
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    const res = await fetch("/api/admin/crop", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ imagePath: src, croppedDataUrl: dataUrl }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.url) onDone(data.url);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9000, background: "rgba(0,0,0,0.95)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 24px", borderBottom: "1px solid #222", flexShrink: 0 }}>
        <span style={{ color: "#C9A84C", fontWeight: 700, fontSize: 14 }}>✂ Recadrer</span>
        <span style={{ color: "#555", fontSize: 12, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{src}</span>
        {/* Ratio buttons */}
        <div style={{ display: "flex", gap: 6 }}>
          {RATIOS.map(r => (
            <button key={r.label} onClick={() => applyRatio(r.value)}
              style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid", fontSize: 11, cursor: "pointer", background: ratio === r.value ? "#C9A84C" : "transparent", borderColor: ratio === r.value ? "#C9A84C" : "#444", color: ratio === r.value ? "#000" : "#aaa" }}>
              {r.label}
            </button>
          ))}
        </div>
        <button onClick={() => apply()} disabled={loading}
          style={{ padding: "8px 20px", background: "#C9A84C", color: "#000", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: loading ? "default" : "pointer", opacity: loading ? 0.6 : 1 }}>
          {loading ? "…" : "✓ Appliquer"}
        </button>
        <button onClick={onClose}
          style={{ padding: "8px 16px", background: "transparent", color: "#aaa", border: "1px solid #333", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>
          Annuler
        </button>
      </div>

      {/* Crop area */}
      <div style={{ flex: 1, overflow: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <ReactCrop crop={crop} onChange={c => setCrop(c)} aspect={ratio} keepSelection>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={imgRef} src={src} alt="crop" onLoad={onLoad} style={{ maxWidth: "80vw", maxHeight: "75vh", display: "block" }} crossOrigin="anonymous" />
        </ReactCrop>
      </div>
    </div>
  );
}

/* ── IMAGE CARD ─────────────────────────────────────────── */
function ImgCard({ img, isCover, onSetCover, onCrop }: {
  img: ImageItem;
  isCover: boolean;
  onSetCover: () => void;
  onCrop: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: "relative", aspectRatio: "4/3", borderRadius: 8, overflow: "hidden", background: "#111", border: isCover ? "2px solid #C9A84C" : "2px solid transparent", transition: "border-color 0.2s" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "transform 0.3s", transform: hov ? "scale(1.04)" : "scale(1)" }} />

      {isCover && (
        <div style={{ position: "absolute", top: 8, left: 8, background: "#C9A84C", color: "#000", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 9999, letterSpacing: "0.08em" }}>
          ✓ COUVERTURE
        </div>
      )}

      {img.client && (
        <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 9, padding: "2px 8px", borderRadius: 9999 }}>
          {img.client}
        </div>
      )}

      {hov && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <button onClick={onSetCover}
            style={{ padding: "8px 18px", background: "#C9A84C", color: "#000", border: "none", borderRadius: 20, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
            ⭐ Couverture
          </button>
          <button onClick={onCrop}
            style={{ padding: "8px 18px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 20, fontSize: 12, cursor: "pointer" }}>
            ✂ Recadrer
          </button>
        </div>
      )}
    </div>
  );
}

/* ── PAGE PRINCIPALE ────────────────────────────────────── */
export default function AdminMediaPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [category, setCategory] = useState("brand");
  const [images, setImages] = useState<ImageItem[]>([]);
  const [config, setConfig] = useState<Config>({ covers: {}, crops: {}, thumbnails: {} });
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [loading, setLoading] = useState(false);
  const toastId = useRef(0);

  // Check session
  useEffect(() => {
    if (sessionStorage.getItem("admin-auth") === "1") setAuthed(true);
  }, []);

  const toast = (msg: string, ok = true) => {
    const id = ++toastId.current;
    setToasts(t => [...t, { id, msg, ok }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  };

  const login = () => {
    if (pw === ADMIN_KEY) {
      sessionStorage.setItem("admin-auth", "1");
      setAuthed(true);
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 1500);
    }
  };

  // Load config
  const loadConfig = useCallback(async () => {
    const res = await fetch("/api/admin/config", { headers: { "x-admin-key": ADMIN_KEY } });
    if (res.ok) setConfig(await res.json());
  }, []);

  // Load images for category
  const loadImages = useCallback(async (cat: string) => {
    setLoading(true);
    setImages([]);
    const res = await fetch(`/api/admin/images?category=${cat}`, { headers: { "x-admin-key": ADMIN_KEY } });
    if (res.ok) {
      const data = await res.json();
      setImages(data.images ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!authed) return;
    loadConfig();
    loadImages(category);
  }, [authed, category, loadConfig, loadImages]);

  const setCover = async (src: string) => {
    const covers = { ...config.covers, [category]: src };
    const res = await fetch("/api/admin/config", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ covers }),
    });
    if (res.ok) {
      setConfig(c => ({ ...c, covers }));
      toast("✓ Couverture mise à jour");
    } else {
      toast("✗ Erreur", false);
    }
  };

  const onCropDone = (url: string) => {
    setCropSrc(null);
    setConfig(c => ({ ...c, crops: { ...c.crops, [url]: url } }));
    toast("✓ Image recadrée et sauvegardée");
    loadImages(category);
  };

  /* ── LOGIN ── */
  if (!authed) return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 32 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "serif", fontSize: 28, fontWeight: 700, color: "#C9A84C", letterSpacing: "0.15em", marginBottom: 4 }}>MASSISHOOTS</div>
        <div style={{ color: "#555", fontSize: 12, letterSpacing: "0.2em" }}>ADMIN MEDIA</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 280 }}>
        <input
          type="password"
          placeholder="Mot de passe"
          value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()}
          style={{ padding: "12px 16px", background: "#111", border: `1px solid ${pwError ? "#f44" : "#333"}`, borderRadius: 8, color: "#fff", fontSize: 14, outline: "none", transition: "border-color 0.2s" }}
        />
        <button onClick={login}
          style={{ padding: "12px", background: "#C9A84C", color: "#000", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", letterSpacing: "0.08em" }}>
          Accéder →
        </button>
        {pwError && <p style={{ color: "#f44", fontSize: 12, textAlign: "center", margin: 0 }}>Mot de passe incorrect</p>}
      </div>
    </div>
  );

  /* ── INTERFACE ADMIN ── */
  return (
    <>
      <meta name="robots" content="noindex" />
      <div style={{ display: "flex", height: "100vh", background: "#0a0a0a", color: "#fff", overflow: "hidden" }}>

        {/* Sidebar */}
        <div style={{ width: 200, background: "#111", borderRight: "1px solid #1a1a1a", display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto" }}>
          <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid #1a1a1a" }}>
            <div style={{ fontFamily: "serif", fontSize: 14, color: "#C9A84C", letterSpacing: "0.1em", fontWeight: 700 }}>MASSISHOOTS</div>
            <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.15em", marginTop: 2 }}>ADMIN MEDIA</div>
          </div>
          <nav style={{ flex: 1, padding: "12px 0" }}>
            {CATEGORIES.map(c => (
              <button key={c.key} onClick={() => setCategory(c.key)}
                style={{ width: "100%", textAlign: "left", padding: "10px 16px", background: category === c.key ? "rgba(201,168,76,0.1)" : "transparent", borderLeft: category === c.key ? "3px solid #C9A84C" : "3px solid transparent", border: "none", color: category === c.key ? "#C9A84C" : "#777", fontSize: 13, cursor: "pointer", transition: "all 0.15s" }}>
                {c.label}
              </button>
            ))}
          </nav>
          <div style={{ padding: 16, borderTop: "1px solid #1a1a1a" }}>
            <button onClick={() => { sessionStorage.removeItem("admin-auth"); setAuthed(false); }}
              style={{ width: "100%", padding: "8px", background: "transparent", border: "1px solid #333", borderRadius: 6, color: "#555", fontSize: 11, cursor: "pointer" }}>
              Déconnexion
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: 28, overflowY: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <h1 style={{ fontFamily: "serif", fontSize: 20, color: "#fff", margin: 0 }}>
              {CATEGORIES.find(c => c.key === category)?.label}
            </h1>
            {config.covers[category] && (
              <span style={{ fontSize: 11, color: "#C9A84C", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", padding: "3px 12px", borderRadius: 9999 }}>
                Couverture : {config.covers[category].split("/").pop()}
              </span>
            )}
            <span style={{ marginLeft: "auto", fontSize: 11, color: "#555" }}>{images.length} image{images.length > 1 ? "s" : ""}</span>
          </div>

          {loading && (
            <div style={{ display: "flex", justifyContent: "center", padding: 60, color: "#555" }}>Chargement…</div>
          )}

          {!loading && images.length === 0 && (
            <div style={{ textAlign: "center", padding: 60, color: "#444", fontSize: 14 }}>Aucune image dans cette catégorie.</div>
          )}

          {!loading && images.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {images.map(img => {
                const displaySrc = config.crops[img.src] ?? img.src;
                return (
                  <ImgCard key={img.src}
                    img={{ ...img, src: displaySrc }}
                    isCover={config.covers[category] === img.src}
                    onSetCover={() => setCover(img.src)}
                    onCrop={() => setCropSrc(img.src)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {cropSrc && (
        <CropModal src={cropSrc} onClose={() => setCropSrc(null)} onDone={onCropDone} />
      )}

      <Toasts toasts={toasts} />
    </>
  );
}

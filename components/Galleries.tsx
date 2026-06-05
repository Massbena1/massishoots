"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Lock, Images, Calendar, ArrowRight, Search, ExternalLink, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Gallery } from "@/lib/galleries";

// ─── PIN Modal ────────────────────────────────────────────────────────────────

function PinModal({ gallery, onClose }: { gallery: Gallery; onClose: () => void }) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  useEffect(() => { setTimeout(() => inputRefs[0].current?.focus(), 80); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = useCallback(async (pin: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/gallery/unlock", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: gallery.id, pin }) });
      const data = await res.json();
      if (res.ok && data.url) { window.open(data.url, "_blank", "noopener,noreferrer"); onClose(); }
      else { setError(data.error ?? "PIN incorrect"); setShake(true); setDigits(["", "", "", ""]); setTimeout(() => { setShake(false); inputRefs[0].current?.focus(); }, 500); }
    } catch { setError("Erreur de connexion"); }
    finally { setLoading(false); }
  }, [gallery.id, onClose]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...digits]; next[i] = d; setDigits(next); setError("");
    if (d && i < 3) inputRefs[i + 1].current?.focus();
    if (d && i === 3 && next.join("").length === 4) submit(next.join(""));
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) inputRefs[i - 1].current?.focus();
    if (e.key === "Enter" && digits.join("").length === 4) submit(digits.join(""));
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const p = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (p.length === 4) { setDigits(p.split("")); inputRefs[3].current?.focus(); submit(p); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <motion.div initial={{ scale: 0.96, opacity: 0, y: 12 }} animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 12 }} transition={shake ? { duration: 0.4 } : { duration: 0.2, ease: "easeOut" }}
        onClick={e => e.stopPropagation()}
        style={{ background: "rgba(10,10,12,0.97)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 28, padding: "44px 40px 36px", width: "100%", maxWidth: 360, textAlign: "center" }}>
        {gallery.cover && (
          <div style={{ width: 56, height: 56, borderRadius: 16, overflow: "hidden", margin: "0 auto 20px", border: "1px solid rgba(255,255,255,0.1)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gallery.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        <h3 className="font-bebas" style={{ fontSize: 26, color: "#fff", letterSpacing: "0.06em", marginBottom: 4, lineHeight: 1 }}>{gallery.name}</h3>
        <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 32 }}>Entrez le code PIN pour accéder</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 28 }}>
          {digits.map((d, i) => (
            <input key={i} ref={inputRefs[i]} type="password" inputMode="numeric" maxLength={1} value={d}
              onChange={e => handleDigit(i, e.target.value)} onKeyDown={e => handleKeyDown(i, e)} onPaste={handlePaste} disabled={loading}
              style={{ width: 56, height: 64, textAlign: "center", fontSize: 24, fontWeight: 600, background: d ? "rgba(196,205,214,0.08)" : "rgba(255,255,255,0.04)", border: `1.5px solid ${error ? "rgba(239,68,68,0.45)" : d ? "rgba(196,205,214,0.3)" : "rgba(255,255,255,0.1)"}`, borderRadius: 14, color: "#fff", outline: "none", caretColor: "transparent", fontFamily: "var(--font-dm-sans), sans-serif", transition: "border-color 0.15s, background 0.15s" }}
              onFocus={e => { if (!error) e.currentTarget.style.borderColor = "rgba(196,205,214,0.5)"; }}
              onBlur={e => { e.currentTarget.style.borderColor = error ? "rgba(239,68,68,0.45)" : d ? "rgba(196,205,214,0.3)" : "rgba(255,255,255,0.1)"; }}
            />
          ))}
        </div>
        <AnimatePresence>
          {error && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="font-dm" style={{ fontSize: 12, color: "rgba(239,68,68,0.75)", marginBottom: 16 }}>{error}</motion.p>}
        </AnimatePresence>
        {loading && <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>Vérification...</p>}
        <button onClick={onClose} className="font-dm" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.2)", fontSize: 12, cursor: "pointer", letterSpacing: "0.04em" }}>Annuler</button>
      </motion.div>
    </motion.div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ gallery, galleries, onClose, onAccess, onNav }: {
  gallery: Gallery;
  galleries: Gallery[];
  onClose: () => void;
  onAccess: (g: Gallery) => void;
  onNav: (g: Gallery) => void;
}) {
  const idx = galleries.indexOf(gallery);
  const prev = idx > 0 ? galleries[idx - 1] : null;
  const next = idx < galleries.length - 1 ? galleries[idx + 1] : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && prev) onNav(prev);
      if (e.key === "ArrowRight" && next) onNav(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, onClose, onNav]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Blurred background */}
      {gallery.cover && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={gallery.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(32px) brightness(0.25) saturate(0.6)", transform: "scale(1.1)" }} />
        </div>
      )}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} onClick={onClose} />

      {/* Close */}
      <button onClick={onClose} style={{ position: "absolute", top: 24, right: 24, zIndex: 10, width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(8px)" }}>
        <X size={18} color="#fff" />
      </button>

      {/* Nav arrows */}
      {prev && (
        <button onClick={() => onNav(prev)} style={{ position: "absolute", left: 24, zIndex: 10, width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(8px)" }}>
          <ChevronLeft size={20} color="#fff" />
        </button>
      )}
      {next && (
        <button onClick={() => onNav(next)} style={{ position: "absolute", right: 24, zIndex: 10, width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(8px)" }}>
          <ChevronRight size={20} color="#fff" />
        </button>
      )}

      {/* Content */}
      <motion.div key={gallery.id} initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.25 }}
        onClick={e => e.stopPropagation()}
        style={{ position: "relative", zIndex: 10, width: "90%", maxWidth: 560, display: "flex", flexDirection: "column", gap: 0, borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
        {/* Cover full */}
        {gallery.cover ? (
          <div style={{ aspectRatio: "16/9", overflow: "hidden", position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gallery.cover} alt={gallery.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,12,0.9) 0%, transparent 50%)" }} />
            <div style={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 6 }}>
              <span className="font-dm" style={{ fontSize: 10, color: "#0a0a0a", fontWeight: 700, padding: "3px 10px", background: "#c4cdd6", borderRadius: 9999, letterSpacing: "0.08em", textTransform: "uppercase" }}>{gallery.type}</span>
              {gallery.featured && <span className="font-dm" style={{ fontSize: 10, color: "#fff", fontWeight: 700, padding: "3px 10px", background: "rgba(74,222,128,0.2)", border: "1px solid rgba(74,222,128,0.4)", borderRadius: 9999 }}>⭐ Vedette</span>}
            </div>
          </div>
        ) : (
          <div style={{ aspectRatio: "16/9", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Images size={48} color="rgba(255,255,255,0.1)" />
          </div>
        )}

        {/* Info panel */}
        <div style={{ background: "rgba(10,10,12,0.97)", padding: "24px 28px 28px" }}>
          <h2 className="font-bebas" style={{ fontSize: 32, color: "#fff", letterSpacing: "0.04em", lineHeight: 1, marginBottom: 10 }}>{gallery.name}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
            <span className="font-dm" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
              <Calendar size={11} /> {new Date(gallery.date).toLocaleDateString("fr-CA", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="font-dm" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
              <Images size={11} /> {gallery.photos} photos
            </span>
            {gallery.location && (
              <span className="font-dm" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                <MapPin size={11} /> {gallery.location}
              </span>
            )}
          </div>
          <button onClick={() => onAccess(gallery)} className="font-dm"
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 20px", background: "#f2f0ec", color: "#0a0a0a", borderRadius: 12, border: "none", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", cursor: "pointer" }}>
            {gallery.password ? <><Lock size={13} /> Accéder avec PIN</> : <>Accéder aux photos <ArrowRight size={13} /></>}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Galleries({ initialGalleries = [] }: { initialGalleries?: Gallery[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("Tous");
  const [lightbox, setLightbox] = useState<Gallery | null>(null);
  const [pinGallery, setPinGallery] = useState<Gallery | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const filtered = initialGalleries.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "Tous" || (filter === "Vedette ⭐" ? g.featured : g.type === filter);
    return matchSearch && matchFilter;
  });

  const isEmpty = initialGalleries.length === 0;

  const handleAccess = (gallery: Gallery) => {
    setLightbox(null);
    if (gallery.password) {
      setPinGallery(gallery);
    } else {
      window.open(gallery.pixiesetUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleCardClick = (gallery: Gallery) => setLightbox(gallery);
  const handleNav = (gallery: Gallery) => setLightbox(gallery);

  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 120px" }} ref={ref}>

      {/* Search + Filters */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
        style={{ marginBottom: 48, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ position: "relative", maxWidth: 480 }}>
          <Search size={14} color="rgba(255,255,255,0.3)" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
          <input type="text" placeholder="Rechercher un événement..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: "100%", padding: "14px 16px 14px 42px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, color: "#fff", fontSize: 14, outline: "none", fontFamily: "var(--font-dm-sans), sans-serif", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Tous", "Événement", "Corporate", "Vedette ⭐"].map(f => (
            <button key={f} onClick={() => setFilter(f)} className="font-dm"
              style={{ padding: "6px 16px", borderRadius: 9999, border: `1px solid ${filter === f ? "rgba(196,205,214,0.4)" : "rgba(255,255,255,0.1)"}`, background: filter === f ? "rgba(196,205,214,0.1)" : "transparent", color: filter === f ? "#c4cdd6" : "rgba(255,255,255,0.4)", fontSize: 12, cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.04em" }}>
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Empty state */}
      {isEmpty && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ textAlign: "center", padding: "80px 24px", borderRadius: 24, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
          <Images size={36} color="rgba(255,255,255,0.15)" style={{ marginBottom: 20 }} />
          <h3 className="font-bebas" style={{ fontSize: 32, color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em", marginBottom: 12 }}>GALERIES BIENTÔT DISPONIBLES</h3>
          <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", marginBottom: 28, lineHeight: 1.7 }}>
            Tu as assisté à un événement MassiShoots ?<br />Les photos seront disponibles ici après l&apos;événement.
          </p>
          <a href="https://massishoots.pixieset.com/" target="_blank" rel="noopener noreferrer" className="font-dm"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13 }}>
            Voir le site Pixieset <ExternalLink size={12} />
          </a>
        </motion.div>
      )}

      {/* No results */}
      {!isEmpty && filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 24px" }}>
          <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>Aucune galerie trouvée pour &ldquo;{search}&rdquo;</p>
        </div>
      )}

      {/* Masonry grid */}
      <AnimatePresence mode="wait">
        {!isEmpty && filtered.length > 0 && (
          <motion.div key={filter + search} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="masonry-galleries">
            {filtered.map((gallery, i) => (
              <motion.div key={gallery.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="masonry-item"
                onClick={() => handleCardClick(gallery)}
                style={{ cursor: "pointer", marginBottom: "clamp(12px, 1.5vw, 20px)", position: "relative" }}>
                <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s" }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "rgba(196,205,214,0.25)"; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 20px 60px rgba(0,0,0,0.4)"; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}>
                  {/* Cover */}
                  <div style={{ overflow: "hidden", position: "relative", background: "rgba(255,255,255,0.04)", aspectRatio: i % 3 === 1 ? "3/4" : "4/3" }}>
                    {gallery.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={gallery.cover} alt={gallery.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                    ) : (
                      <div style={{ width: "100%", height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Images size={32} color="rgba(255,255,255,0.1)" />
                      </div>
                    )}
                    <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
                      <span className="font-dm" style={{ fontSize: 9, color: "#0a0a0a", fontWeight: 700, padding: "3px 10px", background: "#c4cdd6", borderRadius: 9999, letterSpacing: "0.08em", textTransform: "uppercase" }}>{gallery.type}</span>
                      {gallery.featured && <span className="font-dm" style={{ fontSize: 9, color: "#fff", fontWeight: 700, padding: "3px 10px", background: "rgba(74,222,128,0.2)", border: "1px solid rgba(74,222,128,0.4)", borderRadius: 9999 }}>⭐</span>}
                    </div>
                    {gallery.password && (
                      <div style={{ position: "absolute", top: 12, right: 12, width: 28, height: 28, borderRadius: 8, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Lock size={12} color="rgba(255,255,255,0.6)" />
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="gallery-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.3s" }}>
                      <span className="font-dm" style={{ fontSize: 12, color: "#fff", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.4)", padding: "8px 20px", borderRadius: 9999 }}>
                        Voir la galerie
                      </span>
                    </div>
                  </div>
                  {/* Info */}
                  <div style={{ padding: "16px 18px 18px" }}>
                    <h3 className="font-bebas" style={{ fontSize: 20, color: "#fff", letterSpacing: "0.04em", marginBottom: 4, lineHeight: 1 }}>{gallery.name}</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      <span className="font-dm" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
                        <Calendar size={9} /> {new Date(gallery.date).toLocaleDateString("fr-CA", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                      {gallery.location && (
                        <span className="font-dm" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
                          <MapPin size={9} /> {gallery.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && <Lightbox gallery={lightbox} galleries={filtered} onClose={() => setLightbox(null)} onAccess={handleAccess} onNav={handleNav} />}
      </AnimatePresence>

      {/* PIN Modal */}
      <AnimatePresence>
        {pinGallery && <PinModal gallery={pinGallery} onClose={() => setPinGallery(null)} />}
      </AnimatePresence>

      {/* Bottom CTA */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }}
        style={{ marginTop: 80, padding: "40px", borderRadius: 24, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", textAlign: "center" }}>
        <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Vous avez aimé les photos ?</p>
        <h3 className="font-bebas" style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#fff", letterSpacing: "0.03em", marginBottom: 8 }}>Réservez MassiShoots pour votre prochain événement</h3>
        <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 28, lineHeight: 1.7 }}>Photo · Vidéo · Événements · Mariages · Corporate</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <Link href="/contact" className="font-dm" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "#f2f0ec", color: "#0a0a0a", borderRadius: 9999, textDecoration: "none", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em" }}>
            Réserver une consultation <ArrowRight size={13} />
          </Link>
          <Link href="/services" className="font-dm" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 24px", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: 13 }}>
            Voir les services
          </Link>
        </div>
      </motion.div>

      <style>{`
        .masonry-galleries { columns: 3; column-gap: clamp(12px, 1.5vw, 20px); }
        .masonry-item { break-inside: avoid; display: block; }
        .masonry-item:hover .gallery-overlay { opacity: 1 !important; }
        @media (max-width: 900px) { .masonry-galleries { columns: 2; } }
        @media (max-width: 560px) { .masonry-galleries { columns: 1; } }
      `}</style>
    </section>
  );
}

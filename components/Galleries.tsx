"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Lock, Images, Calendar, ArrowRight, Search, ExternalLink, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Gallery } from "@/lib/galleries";

function PinModal({ gallery, onClose }: { gallery: Gallery; onClose: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/gallery/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: gallery.id, pin }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.open(data.url, "_blank", "noopener,noreferrer");
        onClose();
      } else {
        setError(data.error ?? "PIN incorrect");
      }
    } catch {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ duration: 0.22 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "#0d0f12",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24,
          padding: "40px 36px",
          width: "100%",
          maxWidth: 380,
          textAlign: "center",
        }}
      >
        <div style={{
          width: 52, height: 52, borderRadius: "50%",
          background: "rgba(196,205,214,0.08)",
          border: "1px solid rgba(196,205,214,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
        }}>
          <Lock size={20} color="#c4cdd6" />
        </div>

        <h3 className="font-bebas" style={{ fontSize: 28, color: "#fff", letterSpacing: "0.06em", marginBottom: 6 }}>
          {gallery.name}
        </h3>
        <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 28 }}>
          Entrez le PIN pour accéder aux photos
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="password"
            inputMode="numeric"
            placeholder="• • • •"
            value={pin}
            onChange={e => { setPin(e.target.value); setError(""); }}
            autoFocus
            style={{
              padding: "14px 18px",
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 12,
              color: "#fff",
              fontSize: 20,
              textAlign: "center",
              letterSpacing: "0.3em",
              outline: "none",
              fontFamily: "var(--font-dm-sans), sans-serif",
              transition: "border-color 0.2s",
            }}
          />
          {error && (
            <p className="font-dm" style={{ fontSize: 12, color: "rgba(239,68,68,0.8)", margin: 0 }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || pin.length === 0}
            className="font-dm"
            style={{
              padding: "13px",
              background: pin.length > 0 ? "#f2f0ec" : "rgba(255,255,255,0.08)",
              color: pin.length > 0 ? "#0a0a0a" : "rgba(255,255,255,0.3)",
              borderRadius: 12,
              border: "none",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.06em",
              cursor: pin.length > 0 ? "pointer" : "default",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Vérification..." : "Accéder aux photos"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="font-dm"
          style={{
            marginTop: 16,
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.25)",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Annuler
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Galleries({ initialGalleries = [] }: { initialGalleries?: Gallery[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("Tous");
  const [pinGallery, setPinGallery] = useState<Gallery | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const filtered = initialGalleries.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "Tous" || g.type === filter;
    return matchSearch && matchFilter;
  });

  const isEmpty = initialGalleries.length === 0;

  const handleAccess = (gallery: Gallery) => {
    if (gallery.password) {
      setPinGallery(gallery);
    } else {
      window.open(gallery.pixiesetUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 120px" }} ref={ref}>

      {/* Search + Filters */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ marginBottom: 48, display: "flex", flexDirection: "column", gap: 16 }}
      >
        <div style={{ position: "relative", maxWidth: 480 }}>
          <Search size={14} color="rgba(255,255,255,0.3)" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
          <input
            type="text"
            placeholder="Rechercher un événement..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px 14px 42px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 14,
              color: "#fff",
              fontSize: 14,
              outline: "none",
              fontFamily: "var(--font-dm-sans), sans-serif",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Tous", "Événement", "Corporate", "Portrait", "Mariage"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="font-dm"
              style={{
                padding: "6px 16px",
                borderRadius: 9999,
                border: `1px solid ${filter === f ? "rgba(196,205,214,0.4)" : "rgba(255,255,255,0.1)"}`,
                background: filter === f ? "rgba(196,205,214,0.1)" : "transparent",
                color: filter === f ? "#c4cdd6" : "rgba(255,255,255,0.4)",
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.2s",
                letterSpacing: "0.04em",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Empty state */}
      {isEmpty && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            textAlign: "center",
            padding: "80px 24px",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <Images size={36} color="rgba(255,255,255,0.15)" style={{ marginBottom: 20 }} />
          <h3 className="font-bebas" style={{ fontSize: 32, color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em", marginBottom: 12 }}>
            GALERIES BIENTÔT DISPONIBLES
          </h3>
          <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", marginBottom: 28, lineHeight: 1.7 }}>
            Tu as assisté à un événement MassiShoots ?<br />
            Les photos seront disponibles ici après l&apos;événement.
          </p>
          <a
            href="https://massishoots.pixieset.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-dm"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 24px", borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none", fontSize: 13,
              transition: "all 0.2s",
            }}
          >
            Voir le site Pixieset <ExternalLink size={12} />
          </a>
        </motion.div>
      )}

      {/* No results */}
      {!isEmpty && filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 24px" }}>
          <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>
            Aucune galerie trouvée pour &ldquo;{search}&rdquo;
          </p>
        </div>
      )}

      {/* Gallery grid */}
      <AnimatePresence mode="wait">
        {!isEmpty && filtered.length > 0 && (
          <motion.div
            key={filter + search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "clamp(12px, 1.5vw, 20px)",
            }}
            className="galleries-grid"
          >
            {filtered.map((gallery, i) => (
              <motion.div
                key={gallery.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.02)",
                  position: "relative",
                  transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(196,205,214,0.25)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Cover */}
                <div style={{ aspectRatio: "4/3", overflow: "hidden", position: "relative", background: "rgba(255,255,255,0.04)" }}>
                  {gallery.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={gallery.cover} alt={gallery.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Images size={32} color="rgba(255,255,255,0.1)" />
                    </div>
                  )}
                  <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
                    <span className="font-dm" style={{ fontSize: 9, color: "#0a0a0a", fontWeight: 700, padding: "3px 10px", background: "#c4cdd6", borderRadius: 9999, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      {gallery.type}
                    </span>
                    {gallery.featured && (
                      <span className="font-dm" style={{ fontSize: 9, color: "#fff", fontWeight: 700, padding: "3px 10px", background: "rgba(74,222,128,0.2)", border: "1px solid rgba(74,222,128,0.4)", borderRadius: 9999, letterSpacing: "0.08em" }}>
                        ⭐ Vedette
                      </span>
                    )}
                  </div>
                  {gallery.password && (
                    <div style={{ position: "absolute", top: 12, right: 12, width: 28, height: 28, borderRadius: 8, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Lock size={12} color="rgba(255,255,255,0.6)" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: "18px 20px 20px" }}>
                  <h3 className="font-bebas" style={{ fontSize: 22, color: "#fff", letterSpacing: "0.04em", marginBottom: 6, lineHeight: 1 }}>
                    {gallery.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                    <span className="font-dm" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                      <Calendar size={10} /> {new Date(gallery.date).toLocaleDateString("fr-CA", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                    <span className="font-dm" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                      <Images size={10} /> {gallery.photos} photos
                    </span>
                    {gallery.location && (
                      <span className="font-dm" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                        <MapPin size={10} /> {gallery.location}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAccess(gallery)}
                    className="font-dm"
                    style={{
                      width: "100%",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "11px 16px",
                      background: "#f2f0ec", color: "#0a0a0a",
                      borderRadius: 12, border: "none",
                      fontSize: 12, fontWeight: 700, letterSpacing: "0.06em",
                      cursor: "pointer",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    {gallery.password ? <><Lock size={11} /> Accéder avec PIN</> : "Accéder aux photos"}
                    <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* PIN Modal */}
      <AnimatePresence>
        {pinGallery && <PinModal gallery={pinGallery} onClose={() => setPinGallery(null)} />}
      </AnimatePresence>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          marginTop: 80, padding: "40px", borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.02)",
          textAlign: "center",
        }}
      >
        <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
          Vous avez aimé les photos ?
        </p>
        <h3 className="font-bebas" style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#fff", letterSpacing: "0.03em", marginBottom: 8 }}>
          Réservez MassiShoots pour votre prochain événement
        </h3>
        <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 28, lineHeight: 1.7 }}>
          Photo · Vidéo · Événements · Mariages · Corporate
        </p>
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
        @media (max-width: 768px) { .galleries-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px) { .galleries-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

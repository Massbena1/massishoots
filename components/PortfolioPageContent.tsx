"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

/* ─── DONNÉES ────────────────────────────────────────────── */

const FEATURED = [
  {
    num: "01",
    category: "Événement Corporatif",
    title: "Couverture Événement Premium",
    desc: "Photo + vidéo cinématique. Livraison dans les 48h. Chaque moment capturé avec précision.",
    tag: "Photo · Vidéo · Reel",
    image: "/portfolio/eventt/1.jpg",
    gridFilter: "Événements" as const,
  },
  {
    num: "02",
    category: "Personal Branding",
    title: "Contenu Mensuel — Entrepreneur",
    desc: "Présence Instagram transformée en 30 jours. Photos, Reels, face caméra — livrés clés en main.",
    tag: "Photo · Reels · Face Caméra",
    image: "/portfolio/professionel/1.JPG",
    gridFilter: "Branding" as const,
  },
  {
    num: "03",
    category: "Mariage",
    title: "Film Cinématique — Mariage",
    desc: "Chaque émotion capturée avec une précision rare. Du premier regard à la dernière danse.",
    tag: "Photo · Film · Highlights",
    image: "/portfolio/mariage/1.jpg",
    gridFilter: "Mariage" as const,
  },
];

type Filter = "Tout" | "Événements" | "Branding" | "Mariage" | "Vidéo";

interface GridItem {
  src: string;
  thumb?: string;
  type: "photo" | "video";
  filter: Filter;
  title: string;
  tall?: boolean;
}

const GRID_ITEMS: GridItem[] = [
  // Événements
  { src: "/portfolio/eventt/1.jpg",  type: "photo", filter: "Événements", title: "Couverture événement" },
  { src: "/portfolio/eventt/2.jpg",  type: "photo", filter: "Événements", title: "Corporate event",    tall: true },
  { src: "/portfolio/eventt/3.jpg",  type: "photo", filter: "Événements", title: "Gala photo" },
  { src: "/portfolio/eventt/4.jpg",  type: "photo", filter: "Événements", title: "Conférence" },
  { src: "/portfolio/eventt/5.jpg",  type: "photo", filter: "Événements", title: "Lancement produit",  tall: true },
  { src: "/portfolio/eventt/6.jpg",  type: "photo", filter: "Événements", title: "Networking event" },
  { src: "/portfolio/videos/event-1.mp4", thumb: "/portfolio/videos/event-1.jpg", type: "video", filter: "Événements", title: "Event recap reel" },
  { src: "/portfolio/videos/event-2.mp4", thumb: "/portfolio/videos/event-2.jpg", type: "video", filter: "Événements", title: "Gala highlight", tall: true },
  // Branding
  { src: "/portfolio/professionel/1.JPG", type: "photo", filter: "Branding", title: "Personal branding", tall: true },
  { src: "/portfolio/professionel/2.jpg", type: "photo", filter: "Branding", title: "Portrait entrepreneur" },
  { src: "/portfolio/professionel/3.jpg", type: "photo", filter: "Branding", title: "Studio shooting" },
  { src: "/portfolio/professionel/4.jpg", type: "photo", filter: "Branding", title: "Corporate portrait",  tall: true },
  { src: "/portfolio/brand/1.jpg",        type: "photo", filter: "Branding", title: "Brand identity" },
  { src: "/portfolio/brand/3.jpg",        type: "photo", filter: "Branding", title: "Lifestyle brand" },
  { src: "/portfolio/brand/5.jpg",        type: "photo", filter: "Branding", title: "Entrepreneur content" },
  { src: "/portfolio/videos/brand-1.mp4", thumb: "/portfolio/videos/brand-1.jpg", type: "video", filter: "Branding", title: "Brand reel", tall: true },
  { src: "/portfolio/videos/facecam-1.mp4", thumb: "/portfolio/videos/facecam-1.jpg", type: "video", filter: "Branding", title: "Face caméra — coach" },
  { src: "/portfolio/videos/facecam-2.mp4", thumb: "/portfolio/videos/facecam-2.jpg", type: "video", filter: "Branding", title: "Face caméra — entrepreneur" },
  // Mariage
  { src: "/portfolio/mariage/1.jpg",                       type: "photo", filter: "Mariage", title: "Cérémonie",         tall: true },
  { src: "/portfolio/mariage/2.jpg",                       type: "photo", filter: "Mariage", title: "Premier regard" },
  { src: "/portfolio/mariage/3.jpg",                       type: "photo", filter: "Mariage", title: "Portrait couple" },
  { src: "/portfolio/mariage/4.jpg",                       type: "photo", filter: "Mariage", title: "Préparatifs",       tall: true },
  { src: "/portfolio/mariage/5.jpg",                       type: "photo", filter: "Mariage", title: "Réception" },
  { src: "/portfolio/mariage/DSC03852-Enhanced-NR.jpg",    type: "photo", filter: "Mariage", title: "Détails mariage" },
  { src: "/portfolio/mariage/DSC09165.jpg",                type: "photo", filter: "Mariage", title: "Couple au naturel",  tall: true },
  // Vidéo
  { src: "/portfolio/videos/corpo-1.mp4",   thumb: "/portfolio/videos/corpo-1.jpg",   type: "video", filter: "Vidéo", title: "Corporatif — reel",     tall: true },
  { src: "/portfolio/videos/corpo-2.mp4",   thumb: "/portfolio/videos/corpo-2.jpg",   type: "video", filter: "Vidéo", title: "Brand video" },
  { src: "/portfolio/videos/brand-2.mp4",   thumb: "/portfolio/videos/brand-2.jpg",   type: "video", filter: "Vidéo", title: "Reels entrepreneur" },
  { src: "/portfolio/videos/brand-3.mp4",   thumb: "/portfolio/videos/brand-3.jpg",   type: "video", filter: "Vidéo", title: "Contenu mensuel",        tall: true },
  { src: "/portfolio/videos/facecam-3.mp4", thumb: "/portfolio/videos/facecam-3.jpg", type: "video", filter: "Vidéo", title: "Face caméra — coach" },
  { src: "/portfolio/videos/facecam-4.mp4", thumb: "/portfolio/videos/facecam-4.jpg", type: "video", filter: "Vidéo", title: "Face caméra — consultant" },
  { src: "/portfolio/videos/event-1.1.mp4", thumb: "/portfolio/videos/event-1.1.jpg", type: "video", filter: "Vidéo", title: "Event recap",            tall: true },
  { src: "/portfolio/videos/facecam-5.mp4", thumb: "/portfolio/videos/facecam-5.jpg", type: "video", filter: "Vidéo", title: "Face caméra — marque" },
];

const FILTERS: Filter[] = ["Tout", "Événements", "Branding", "Mariage", "Vidéo"];

/* ─── LIGHTBOX ───────────────────────────────────────────── */
function Lightbox({
  items,
  startIndex,
  onClose,
}: {
  items: GridItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  const item = items[idx];

  const prev = useCallback(() => setIdx(i => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % items.length), [items.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClose}
    >
      {/* Close */}
      <button onClick={onClose} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 28, cursor: "pointer", lineHeight: 1, zIndex: 1 }}>✕</button>

      {/* Counter */}
      <span className="font-dm" style={{ position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em" }}>
        {idx + 1} / {items.length}
      </span>

      {/* Prev */}
      <button onClick={e => { e.stopPropagation(); prev(); }}
        style={{ position: "absolute", left: 16, background: "none", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "50%", width: 44, height: 44, color: "#C9A84C", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
        ←
      </button>

      {/* Content */}
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: "88vw", maxHeight: "88vh", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {item.type === "video" ? (
          <video
            src={item.src}
            controls
            autoPlay
            style={{ maxWidth: "88vw", maxHeight: "88vh", borderRadius: 8, background: "#000" }}
          />
        ) : (
          <img src={item.src} alt={item.title}
            style={{ maxWidth: "88vw", maxHeight: "88vh", objectFit: "contain", objectPosition: "center", borderRadius: 8, display: "block" }} />
        )}
      </motion.div>

      {/* Next */}
      <button onClick={e => { e.stopPropagation(); next(); }}
        style={{ position: "absolute", right: 16, background: "none", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "50%", width: 44, height: 44, color: "#C9A84C", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
        →
      </button>

      {/* Title */}
      <p className="font-dm" style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
        {item.title}
      </p>
    </motion.div>
  );
}

/* ─── GRID ITEM ──────────────────────────────────────────── */
function GridCard({ item, onClick }: { item: GridItem; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const thumb = item.type === "video" ? item.thumb : item.src;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 10,
        cursor: "pointer",
        gridRow: item.tall ? "span 2" : "span 1",
        background: "#111",
      }}
    >
      <Image
        src={thumb!}
        alt={item.title}
        fill
        sizes="(max-width: 520px) 100vw, (max-width: 860px) 50vw, 33vw"
        style={{
          objectFit: "cover",
          transition: "transform 0.4s ease",
          transform: hovered ? "scale(1.04)" : "scale(1)",
        }}
      />
      {/* Hover overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: hovered ? "rgba(0,0,0,0.6)" : "transparent",
        transition: "background 0.3s",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 10,
      }}>
        {hovered && (
          <>
            <span style={{ position: "absolute", top: 14, left: 14, fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.4)", padding: "3px 10px", borderRadius: 9999, background: "rgba(0,0,0,0.5)" }}>
              {item.filter}
            </span>
            <span style={{ fontSize: item.type === "video" ? 32 : 22, color: "#fff", opacity: 0.9 }}>
              {item.type === "video" ? "▶" : "⊕"}
            </span>
            <span className="font-dm" style={{ fontSize: 12, color: "#fff", letterSpacing: "0.05em", textAlign: "center", padding: "0 16px" }}>
              {item.title}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── COMPOSANT PRINCIPAL ─────────────────────────────────── */
export default function PortfolioPageContent() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Tout");
  const [lightbox, setLightbox] = useState<{ items: GridItem[]; idx: number } | null>(null);

  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const gridRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-40px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-40px" });

  const filtered = activeFilter === "Tout"
    ? GRID_ITEMS
    : GRID_ITEMS.filter(i => i.filter === activeFilter);

  const openLightbox = (item: GridItem) => {
    const idx = filtered.indexOf(item);
    setLightbox({ items: filtered, idx });
  };

  const openFeaturedLightbox = (gridFilter: Filter) => {
    const items = GRID_ITEMS.filter(i => i.filter === gridFilter);
    setLightbox({ items, idx: 0 });
  };

  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>

      {/* ── SECTION 1 : HERO ─────────────────────────────────── */}
      <section className="hero-padding" style={{ padding: "160px 24px 100px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="font-dm" style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.25)", padding: "5px 18px", borderRadius: 9999, background: "rgba(201,168,76,0.05)", marginBottom: 36 }}>
            Studio Premium · Montréal
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="font-playfair" style={{ fontSize: "clamp(44px, 8vw, 88px)", color: "#fff", fontWeight: 400, lineHeight: 1.05, marginBottom: 24 }}>
          Notre travail parle pour nous.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", marginBottom: 20 }}>
          Photo · Vidéo · Branding · Événements · Mariage
        </motion.p>

        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
          style={{ width: 60, height: 1, background: "#C9A84C", margin: "0 auto" }} />
      </section>

      {/* ── SECTION 2 : FEATURED ─────────────────────────────── */}
      <section style={{ padding: "60px 24px 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <span className="font-dm section-label" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
              — En vedette
            </span>
            <h2 className="font-bebas" style={{ fontSize: "clamp(40px, 6vw, 64px)", color: "#fff", letterSpacing: "0.03em", marginTop: 12, lineHeight: 0.95 }}>
              PROJETS SÉLECTIONNÉS
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {FEATURED.map((p, i) => {
              const reversed = i % 2 === 1;
              return (
                <motion.div key={p.num}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "grid", gridTemplateColumns: reversed ? "40% 60%" : "60% 40%", minHeight: 420, borderRadius: 16, overflow: "hidden", border: "0.5px solid rgba(201,168,76,0.15)", direction: reversed ? "rtl" : "ltr" }}
                  className="featured-block"
                >
                  {/* Image (conditionally first or second) */}
                  {!reversed && <FeaturedImage p={p} onClick={() => openFeaturedLightbox(p.gridFilter)} />}

                  {/* Texte */}
                  <div className="featured-text" style={{ background: "#0f0f0f", padding: "52px 44px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", direction: "ltr", order: reversed ? -1 : 0 }}>
                    {/* Numéro en arrière-plan */}
                    <span style={{ position: "absolute", top: "50%", right: reversed ? "auto" : -20, left: reversed ? -20 : "auto", transform: "translateY(-50%)", fontFamily: "var(--font-bebas-neue)", fontSize: 160, color: "rgba(201,168,76,0.06)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
                      {p.num}
                    </span>

                    <span className="font-dm" style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)", padding: "4px 14px", borderRadius: 9999, marginBottom: 20, alignSelf: "flex-start", background: "rgba(201,168,76,0.05)" }}>
                      {p.category}
                    </span>

                    <h3 className="font-bebas" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, marginBottom: 18 }}>
                      {p.title}
                    </h3>

                    <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 28 }}>
                      {p.desc}
                    </p>

                    <span className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em" }}>
                      {p.tag}
                    </span>
                  </div>

                  {reversed && <FeaturedImage p={p} onClick={() => openFeaturedLightbox(p.gridFilter)} />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 : GRID FILTRÉE ─────────────────────────── */}
      <section ref={gridRef} style={{ padding: "80px 24px 100px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <span className="font-dm section-label" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
              — Tous les projets
            </span>
            <h2 className="font-bebas" style={{ fontSize: "clamp(40px, 6vw, 64px)", color: "#fff", letterSpacing: "0.03em", marginTop: 12, lineHeight: 0.95 }}>
              PORTFOLIO COMPLET
            </h2>
          </div>

          {/* Filtres */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className="font-dm"
                style={{
                  padding: "8px 20px", borderRadius: 9999, fontSize: 12, fontWeight: 600,
                  cursor: "pointer", border: "1px solid",
                  letterSpacing: "0.06em", transition: "all 0.2s",
                  background: activeFilter === f ? "#C9A84C" : "transparent",
                  borderColor: activeFilter === f ? "#C9A84C" : "#333",
                  color: activeFilter === f ? "#0a0a0a" : "rgba(255,255,255,0.45)",
                }}>
                {f}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridAutoRows: "220px",
                gap: 8,
              }}
              className="masonry-grid"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={`${item.src}-${i}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
                  style={{ gridRow: item.tall ? "span 2" : "span 1" }}
                >
                  <GridCard item={item} onClick={() => openLightbox(item)} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── SECTION 4 : STATS ────────────────────────────────── */}
      <section ref={statsRef} style={{ padding: "80px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, textAlign: "center" }} className="stats-grid">
          {[
            { val: "50+", label: "Clients" },
            { val: "2M+", label: "Vues générées" },
            { val: "4 ans", label: "Expérience" },
            { val: "48h", label: "Livraison" },
          ].map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <p className="font-bebas" style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 1, marginBottom: 6 }}>
                {s.val}
              </p>
              <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5 : CTA ──────────────────────────────────── */}
      <section ref={ctaRef} style={{ padding: "100px 24px", position: "relative", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, #C9A84C 40%, transparent)" }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}
        >
          <h2 className="font-bebas" style={{ fontSize: "clamp(40px, 7vw, 72px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, marginBottom: 18 }}>
            Votre projet sera le prochain.
          </h2>
          <p className="font-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: 40 }}>
            Chaque mois, on accepte un nombre limité de nouveaux clients.
          </p>
          <a href="https://calendly.com/massishot-ca/30min" target="_blank" rel="noopener noreferrer"
            className="font-dm"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "18px 44px", background: "#C9A84C", color: "#0a0a0a", borderRadius: 9999, fontSize: 15, fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase", boxShadow: "0 0 40px rgba(201,168,76,0.2)", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(201,168,76,0.4)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(201,168,76,0.2)"; }}
          >
            Réserver mon appel gratuit →
          </a>
          <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 16, letterSpacing: "0.08em" }}>
            Sans engagement · Réponse sous 24h
          </p>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox items={lightbox.items} startIndex={lightbox.idx} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>

      <style>{`
        .featured-block { grid-template-columns: 60% 40% !important; }
        @media (max-width: 860px) {
          .featured-block { grid-template-columns: 1fr !important; }
          .featured-block > * { order: unset !important; }
          .masonry-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 520px) {
          .masonry-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        .masonry-grid > * > div { height: 100%; }
      `}</style>
    </main>
  );
}

function FeaturedImage({ p, onClick }: { p: typeof FEATURED[0]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image src={p.image} alt={p.title} fill
        sizes="(max-width: 860px) 100vw, 60vw"
        priority
        style={{ objectFit: "cover", transition: "transform 0.5s ease", transform: hovered ? "scale(1.04)" : "scale(1)" }} />
      <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(201,168,76,0.1)" : "transparent", transition: "background 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {hovered && (
          <span className="font-dm" style={{ fontSize: 12, color: "#fff", letterSpacing: "0.18em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.5)", padding: "8px 20px", borderRadius: 9999, background: "rgba(0,0,0,0.5)" }}>
            Voir le projet
          </span>
        )}
      </div>
    </div>
  );
}

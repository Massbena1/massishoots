"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

/* ─── DONNÉES FEATURED ───────────────────────────────────── */

const FEATURED = [
  {
    num: "01",
    category: "Événement Corporatif",
    title: "Couverture Événement Premium",
    desc: "Photo + vidéo cinématique. Livraison dans les 24h. Chaque moment capturé avec précision.",
    tag: "Photo · Vidéo · Highlight",
    image: "/portfolio/eventt/1.jpg",
    gridFilter: "Événements" as const,
    caseStudy: {
      defi: "Gala de 1 000 personnes — 350 photos retouchées à livrer en moins de 24h.",
      livre: "Couverture complète photo + vidéo highlight 60 sec, livrée le lendemain matin.",
      resultat: "1 million de vues sur Instagram, partagé par plus de 300 personnes en 48h.",
    },
    testimonial: {
      quote: "\"On avait 1 000 personnes à gérer ce soir-là. Massi était partout, discret, et le résultat était prêt le lendemain matin. Impressionnant.\"",
      name: "Directeur Événements",
      role: "Événementiel Corporate, Montréal",
    },
  },
  {
    num: "02",
    category: "Personal Branding",
    title: "Contenu Mensuel — Entrepreneur",
    desc: "Présence Instagram transformée en 3 mois. Photos pro, face caméra — livrés clés en main.",
    tag: "Photo · Face Caméra · Contenu",
    image: "/portfolio/professionel/1.JPG",
    gridFilter: "Branding" as const,
    caseStudy: {
      defi: "Image non professionnelle, profil Instagram qui ne convertissait pas.",
      livre: "10 photos pro + 8 vidéos face caméra, contenu prêt à publier.",
      resultat: "+900 abonnés et 10 nouveaux contrats signés en 3 mois.",
    },
    testimonial: {
      quote: "\"Massi m'a donné une image qui me ressemble vraiment. Depuis, mes clients me reconnaissent partout. +900 abonnés et 10 contrats en 3 mois.\"",
      name: "Christine Girouard",
      role: "Entrepreneure & Coach immobilier",
    },
  },
  {
    num: "03",
    category: "Immobilier",
    title: "Mise en Valeur — Propriété Premium",
    desc: "Des visuels qui vendent. Photo cinématique + vidéo drone pour des propriétés qui se démarquent.",
    tag: "Photo · Vidéo · Drone",
    image: "/portfolio/brand/1.jpg",
    gridFilter: "Branding" as const,
    caseStudy: {
      defi: "Propriété sur le marché depuis 45 jours sans offre — photos amateurs, bien sous-représenté.",
      livre: "Shooting complet photo + vidéo cinématique 90 sec + drone, livré en une journée.",
      resultat: "Vendue en 6 jours après publication, au prix demandé.",
    },
    testimonial: {
      quote: "\"Mes clients voient la différence immédiatement. Depuis que je travaille avec Massi, mes propriétés se vendent plus vite et mieux.\"",
      name: "Courtier RE/MAX",
      role: "Courtier immobilier, Montréal",
    },
  },
];

/* ─── DONNÉES GRILLE ─────────────────────────────────────── */

type Filter = "Tout" | "Événements" | "Branding" | "Mariage" | "Vidéo";
type Sector = "Tous" | "Événementiel" | "Personal Branding" | "Restauration" | "Immobilier";

interface GridItem {
  src: string;
  thumb?: string;
  type: "photo" | "video";
  filter: Filter;
  sector: Sector[];
  title: string;
  tall?: boolean;
}

const GRID_ITEMS: GridItem[] = [
  // Événements
  { src: "/portfolio/eventt/1.jpg",  type: "photo", filter: "Événements", sector: ["Événementiel"], title: "Couverture événement" },
  { src: "/portfolio/eventt/2.jpg",  type: "photo", filter: "Événements", sector: ["Événementiel"], title: "Corporate event", tall: true },
  { src: "/portfolio/eventt/3.jpg",  type: "photo", filter: "Événements", sector: ["Événementiel"], title: "Gala photo" },
  { src: "/portfolio/eventt/4.jpg",  type: "photo", filter: "Événements", sector: ["Événementiel"], title: "Conférence" },
  { src: "/portfolio/eventt/5.jpg",  type: "photo", filter: "Événements", sector: ["Événementiel"], title: "Lancement produit", tall: true },
  { src: "/portfolio/eventt/6.jpg",  type: "photo", filter: "Événements", sector: ["Événementiel"], title: "Networking event" },
  { src: "/portfolio/videos/event-1.mp4", thumb: "/portfolio/videos/event-1.jpg", type: "video", filter: "Événements", sector: ["Événementiel"], title: "Event recap reel" },
  { src: "/portfolio/videos/event-2.mp4", thumb: "/portfolio/videos/event-2.jpg", type: "video", filter: "Événements", sector: ["Événementiel"], title: "Gala highlight", tall: true },
  // Branding
  { src: "/portfolio/professionel/1.JPG", type: "photo", filter: "Branding", sector: ["Personal Branding"], title: "Personal branding", tall: true },
  { src: "/portfolio/professionel/2.jpg", type: "photo", filter: "Branding", sector: ["Personal Branding"], title: "Portrait entrepreneur" },
  { src: "/portfolio/professionel/3.jpg", type: "photo", filter: "Branding", sector: ["Personal Branding"], title: "Studio shooting" },
  { src: "/portfolio/professionel/4.jpg", type: "photo", filter: "Branding", sector: ["Personal Branding"], title: "Corporate portrait", tall: true },
  { src: "/portfolio/brand/1.jpg",        type: "photo", filter: "Branding", sector: ["Personal Branding"], title: "Brand identity" },
  { src: "/portfolio/brand/3.jpg",        type: "photo", filter: "Branding", sector: ["Restauration"],      title: "Lifestyle brand" },
  { src: "/portfolio/brand/5.jpg",        type: "photo", filter: "Branding", sector: ["Personal Branding"], title: "Entrepreneur content" },
  { src: "/portfolio/videos/brand-1.mp4", thumb: "/portfolio/videos/brand-1.jpg", type: "video", filter: "Branding", sector: ["Personal Branding"], title: "Brand reel", tall: true },
  { src: "/portfolio/videos/facecam-1.mp4", thumb: "/portfolio/videos/facecam-1.jpg", type: "video", filter: "Branding", sector: ["Personal Branding"], title: "Face caméra — coach" },
  { src: "/portfolio/videos/facecam-2.mp4", thumb: "/portfolio/videos/facecam-2.jpg", type: "video", filter: "Branding", sector: ["Personal Branding"], title: "Face caméra — entrepreneur" },
  // Mariage
  { src: "/portfolio/mariage/1.jpg",                    type: "photo", filter: "Mariage", sector: ["Événementiel"], title: "Cérémonie", tall: true },
  { src: "/portfolio/mariage/2.jpg",                    type: "photo", filter: "Mariage", sector: ["Événementiel"], title: "Premier regard" },
  { src: "/portfolio/mariage/3.jpg",                    type: "photo", filter: "Mariage", sector: ["Événementiel"], title: "Portrait couple" },
  { src: "/portfolio/mariage/4.jpg",                    type: "photo", filter: "Mariage", sector: ["Événementiel"], title: "Préparatifs", tall: true },
  { src: "/portfolio/mariage/5.jpg",                    type: "photo", filter: "Mariage", sector: ["Événementiel"], title: "Réception" },
  { src: "/portfolio/mariage/DSC03852-Enhanced-NR.jpg", type: "photo", filter: "Mariage", sector: ["Événementiel"], title: "Détails mariage" },
  { src: "/portfolio/mariage/DSC09165.jpg",             type: "photo", filter: "Mariage", sector: ["Événementiel"], title: "Couple au naturel", tall: true },
  // Vidéo
  { src: "/portfolio/videos/corpo-1.mp4",   thumb: "/portfolio/videos/corpo-1.jpg",   type: "video", filter: "Vidéo", sector: ["Événementiel"],   title: "Corporatif — reel", tall: true },
  { src: "/portfolio/videos/corpo-2.mp4",   thumb: "/portfolio/videos/corpo-2.jpg",   type: "video", filter: "Vidéo", sector: ["Événementiel"],   title: "Brand video" },
  { src: "/portfolio/videos/brand-2.mp4",   thumb: "/portfolio/videos/brand-2.jpg",   type: "video", filter: "Vidéo", sector: ["Personal Branding"], title: "Reels entrepreneur" },
  { src: "/portfolio/videos/brand-3.mp4",   thumb: "/portfolio/videos/brand-3.jpg",   type: "video", filter: "Vidéo", sector: ["Personal Branding"], title: "Contenu mensuel", tall: true },
  { src: "/portfolio/videos/facecam-3.mp4", thumb: "/portfolio/videos/facecam-3.jpg", type: "video", filter: "Vidéo", sector: ["Personal Branding"], title: "Face caméra — coach" },
  { src: "/portfolio/videos/facecam-4.mp4", thumb: "/portfolio/videos/facecam-4.jpg", type: "video", filter: "Vidéo", sector: ["Personal Branding"], title: "Face caméra — consultant" },
  { src: "/portfolio/videos/event-1.1.mp4", thumb: "/portfolio/videos/event-1.1.jpg", type: "video", filter: "Vidéo", sector: ["Événementiel"],   title: "Event recap", tall: true },
  { src: "/portfolio/videos/facecam-5.mp4", thumb: "/portfolio/videos/facecam-5.jpg", type: "video", filter: "Vidéo", sector: ["Personal Branding"], title: "Face caméra — marque" },
];

const FILTERS: Filter[] = ["Tout", "Événements", "Branding", "Mariage", "Vidéo"];
const SECTORS: Sector[] = ["Tous", "Événementiel", "Personal Branding", "Restauration", "Immobilier"];

/* ─── CLIENTS PROOF ──────────────────────────────────────── */
const CLIENTS = [
  { name: "Groupe Mackay", logo: null },
  { name: "ESTA", logo: null },
  { name: "JPM", logo: null },
  { name: "TECHGAYS", logo: null },
  { name: "Black Swan", logo: "/clients/blackswan.svg" },
  { name: "Omnigo", logo: "/clients/omnigo.png" },
];

/* ─── LIGHTBOX ───────────────────────────────────────────── */
function Lightbox({ items, startIndex, onClose }: { items: GridItem[]; startIndex: number; onClose: () => void }) {
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
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose, prev, next]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClose}>
      <button onClick={onClose} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 28, cursor: "pointer", lineHeight: 1, zIndex: 1 }}>✕</button>
      <span className="font-dm" style={{ position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em" }}>{idx + 1} / {items.length}</span>
      <button onClick={e => { e.stopPropagation(); prev(); }} style={{ position: "absolute", left: 16, background: "none", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "50%", width: 44, height: 44, color: "#C9A84C", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>←</button>
      <motion.div key={idx} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()} style={{ maxWidth: "88vw", maxHeight: "88vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {item.type === "video" ? (
          <video src={item.src} controls autoPlay style={{ maxWidth: "88vw", maxHeight: "88vh", borderRadius: 8, background: "#000" }} />
        ) : (
          <img src={item.src} alt={item.title} style={{ maxWidth: "88vw", maxHeight: "88vh", objectFit: "contain", borderRadius: 8, display: "block" }} />
        )}
      </motion.div>
      <button onClick={e => { e.stopPropagation(); next(); }} style={{ position: "absolute", right: 16, background: "none", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "50%", width: 44, height: 44, color: "#C9A84C", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>→</button>
      <p className="font-dm" style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>{item.title}</p>
    </motion.div>
  );
}

/* ─── GRID CARD avec preview vidéo au survol ─────────────── */
function GridCard({ item, onClick }: { item: GridItem; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = item.type === "video";
  const thumb = isVideo ? item.thumb : item.src;

  useEffect(() => {
    if (!videoRef.current) return;
    if (hovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [hovered]);

  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", overflow: "hidden", borderRadius: 10, cursor: "pointer", gridRow: item.tall ? "span 2" : "span 1", background: "#111" }}>

      {/* Image de base */}
      {thumb && (
        <Image src={thumb} alt={item.title} fill
          sizes="(max-width: 520px) 100vw, (max-width: 860px) 50vw, 33vw"
          style={{ objectFit: "cover", transition: "transform 0.4s ease", transform: hovered ? "scale(1.04)" : "scale(1)" }} />
      )}

      {/* Preview vidéo au survol (desktop) ou autoplay (mobile) */}
      {isVideo && (
        <video ref={videoRef} src={item.src} muted loop playsInline
          autoPlay={typeof window !== "undefined" && window.innerWidth <= 767}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", opacity: hovered ? 1 : 0,
            transition: "opacity 0.35s ease",
          }} />
      )}

      {/* Overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: hovered ? "rgba(0,0,0,0.5)" : "transparent",
        transition: "background 0.3s",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
      }}>
        {hovered && (
          <>
            <span style={{ position: "absolute", top: 14, left: 14, fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.4)", padding: "3px 10px", borderRadius: 9999, background: "rgba(0,0,0,0.5)" }}>
              {item.filter}
            </span>
            <span style={{ fontSize: isVideo ? 32 : 22, color: "#fff", opacity: 0.9 }}>
              {isVideo ? "▶" : "⊕"}
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

/* ─── MINI CTA INLINE ────────────────────────────────────── */
function InlineCta({ category }: { category: string }) {
  return (
    <div style={{ gridColumn: "1 / -1", padding: "8px 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
      <span className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
        Ce résultat pour votre marque ?
      </span>
      <a href="https://calendly.com/massishot-ca/30min" target="_blank" rel="noopener noreferrer"
        className="font-dm"
        style={{ fontSize: 11, color: "#C9A84C", letterSpacing: "0.08em", textDecoration: "none", display: "flex", alignItems: "center", gap: 4, transition: "opacity 0.2s" }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.7"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}>
        Réserver mon appel →
      </a>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
      <span className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.12)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{category}</span>
    </div>
  );
}

/* ─── COMPOSANT PRINCIPAL ─────────────────────────────────── */
export default function PortfolioPageContent() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Tout");
  const [activeSector, setActiveSector] = useState<Sector>("Tous");
  const [lightbox, setLightbox] = useState<{ items: GridItem[]; idx: number } | null>(null);

  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const gridRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-40px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-40px" });

  const filtered = GRID_ITEMS.filter(i => {
    const matchFilter = activeFilter === "Tout" || i.filter === activeFilter;
    const matchSector = activeSector === "Tous" || i.sector.includes(activeSector);
    return matchFilter && matchSector;
  });

  const openLightbox = (item: GridItem) => {
    const idx = filtered.indexOf(item);
    setLightbox({ items: filtered, idx });
  };

  const openFeaturedLightbox = (gridFilter: Filter) => {
    const items = GRID_ITEMS.filter(i => i.filter === gridFilter);
    setLightbox({ items, idx: 0 });
  };

  // Groupe les items filtrés par catégorie pour insérer des micro-CTA
  const groupedByFilter = FILTERS.filter(f => f !== "Tout").map(f => ({
    filter: f,
    items: filtered.filter(i => i.filter === f),
  })).filter(g => g.items.length > 0);

  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>

      {/* ── SECTION 1 : HERO ─────────────────────────────────── */}
      <section className="hero-padding" style={{ padding: "160px 24px 80px", textAlign: "center" }}>
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

      {/* ── SECTION 1.5 : BARRE PREUVE SOCIALE ───────────────── */}
      <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.6 }} style={{ padding: "40px 24px 60px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p className="font-dm" style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 28 }}>
            Ils nous ont fait confiance
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center", alignItems: "center" }}>
            {CLIENTS.map((c) => (
              <div key={c.name}
                style={{ opacity: 0.35, transition: "opacity 0.25s", cursor: "default" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.75"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "0.35"}>
                {c.logo ? (
                  <img src={c.logo} alt={c.name} style={{ height: 22, filter: "brightness(0) invert(1)", objectFit: "contain" }} />
                ) : (
                  <span className="font-bebas" style={{ fontSize: 13, letterSpacing: "0.2em", color: "#fff", whiteSpace: "nowrap" }}>
                    {c.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 2 : FEATURED + ÉTUDES DE CAS ─────────────── */}
      <section style={{ padding: "20px 24px 100px" }}>
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
                  className="featured-block">
                  {!reversed && <FeaturedImage p={p} onClick={() => openFeaturedLightbox(p.gridFilter)} />}

                  {/* Texte + étude de cas + témoignage */}
                  <div className="featured-text" style={{ background: "#0f0f0f", padding: "52px 44px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", direction: "ltr", order: reversed ? -1 : 0 }}>
                    <span style={{ position: "absolute", top: "50%", right: reversed ? "auto" : -20, left: reversed ? -20 : "auto", transform: "translateY(-50%)", fontFamily: "var(--font-bebas-neue)", fontSize: 160, color: "rgba(201,168,76,0.06)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
                      {p.num}
                    </span>

                    <span className="font-dm" style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)", padding: "4px 14px", borderRadius: 9999, marginBottom: 20, alignSelf: "flex-start", background: "rgba(201,168,76,0.05)" }}>
                      {p.category}
                    </span>

                    <h3 className="font-bebas" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, marginBottom: 14 }}>
                      {p.title}
                    </h3>

                    <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 20 }}>
                      {p.desc}
                    </p>

                    {/* Étude de cas */}
                    <div style={{ borderLeft: "1px solid rgba(201,168,76,0.2)", paddingLeft: 16, marginBottom: 24, display: "flex", flexDirection: "column", gap: 6 }}>
                      {[
                        { label: "Défi", value: p.caseStudy.defi },
                        { label: "Livré", value: p.caseStudy.livre },
                        { label: "Résultat", value: p.caseStudy.resultat },
                      ].map(row => (
                        <p key={row.label} className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", lineHeight: 1.6, margin: 0 }}>
                          <span style={{ color: "#C9A84C", fontWeight: 700, marginRight: 6 }}>{row.label} :</span>
                          <span style={{ fontStyle: "italic", color: "rgba(201,168,76,0.4)" }}>{row.value}</span>
                        </p>
                      ))}
                    </div>

                    {/* Témoignage */}
                    <div style={{ background: "rgba(201,168,76,0.04)", border: "0.5px solid rgba(201,168,76,0.12)", borderRadius: 10, padding: "16px 20px", marginBottom: 20 }}>
                      <p style={{ fontFamily: "var(--font-cormorant-garamond, Georgia, serif)", fontSize: 14, fontStyle: "italic", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 10 }}>
                        {p.testimonial.quote}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 24, height: 1, background: "rgba(201,168,76,0.3)" }} />
                        <span className="font-bebas" style={{ fontSize: 11, color: "#C9A84C", letterSpacing: "0.12em" }}>
                          {p.testimonial.name}
                        </span>
                        <span className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em" }}>
                          {p.testimonial.role}
                        </span>
                      </div>
                    </div>

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

      {/* ── SECTION 3 : GRILLE FILTRÉE ───────────────────────── */}
      <section ref={gridRef} style={{ padding: "80px 24px 100px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <span className="font-dm section-label" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
              — Tous les projets
            </span>
            <h2 className="font-bebas" style={{ fontSize: "clamp(40px, 6vw, 64px)", color: "#fff", letterSpacing: "0.03em", marginTop: 12, lineHeight: 0.95 }}>
              PORTFOLIO COMPLET
            </h2>
          </div>

          {/* Filtre type */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className="font-dm"
                style={{ padding: "8px 20px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1px solid", letterSpacing: "0.06em", transition: "all 0.2s", background: activeFilter === f ? "#C9A84C" : "transparent", borderColor: activeFilter === f ? "#C9A84C" : "#333", color: activeFilter === f ? "#0a0a0a" : "rgba(255,255,255,0.45)" }}>
                {f}
              </button>
            ))}
          </div>

          {/* Filtre secteur */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 36 }}>
            {SECTORS.map(s => (
              <button key={s} onClick={() => setActiveSector(s)} className="font-dm"
                style={{ padding: "5px 14px", borderRadius: 9999, fontSize: 10, fontWeight: 600, cursor: "pointer", border: "1px solid", letterSpacing: "0.08em", transition: "all 0.2s", textTransform: "uppercase", background: activeSector === s ? "rgba(255,255,255,0.08)" : "transparent", borderColor: activeSector === s ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)", color: activeSector === s ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.28)" }}>
                {s}
              </button>
            ))}
          </div>

          {/* Grille avec micro-CTA par catégorie */}
          <AnimatePresence mode="wait">
            <motion.div key={`${activeFilter}-${activeSector}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {activeFilter === "Tout" ? (
                // Mode "Tout" : affiche par groupes de catégories avec CTA entre
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                  {groupedByFilter.map(group => (
                    <div key={group.filter}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "220px", gap: 8 }} className="masonry-grid">
                        {group.items.map((item, i) => (
                          <motion.div key={`${item.src}-${i}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }} style={{ gridRow: item.tall ? "span 2" : "span 1" }}>
                            <GridCard item={item} onClick={() => openLightbox(item)} />
                          </motion.div>
                        ))}
                      </div>
                      <InlineCta category={group.filter} />
                    </div>
                  ))}
                </div>
              ) : (
                // Mode filtre unique
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "220px", gap: 8 }} className="masonry-grid">
                    {filtered.map((item, i) => (
                      <motion.div key={`${item.src}-${i}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }} style={{ gridRow: item.tall ? "span 2" : "span 1" }}>
                        <GridCard item={item} onClick={() => openLightbox(item)} />
                      </motion.div>
                    ))}
                  </div>
                  <InlineCta category={activeFilter} />
                </div>
              )}
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
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <p className="font-bebas" style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 1, marginBottom: 6 }}>{s.val}</p>
              <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5 : CTA FINAL ────────────────────────────── */}
      <section ref={ctaRef} style={{ padding: "100px 24px", position: "relative", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, #C9A84C 40%, transparent)" }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <h2 className="font-bebas" style={{ fontSize: "clamp(40px, 7vw, 72px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, marginBottom: 18 }}>
            Votre projet sera le prochain.
          </h2>
          <p className="font-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: 40 }}>
            Chaque mois, on accepte un nombre limité de nouveaux clients.
          </p>
          <a href="https://calendly.com/massishot-ca/30min" target="_blank" rel="noopener noreferrer" className="font-dm"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "18px 44px", background: "#C9A84C", color: "#0a0a0a", borderRadius: 9999, fontSize: 15, fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase", boxShadow: "0 0 40px rgba(201,168,76,0.2)", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(201,168,76,0.4)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(201,168,76,0.2)"; }}>
            Réserver mon appel gratuit →
          </a>
          <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 16, letterSpacing: "0.08em" }}>
            Sans engagement · Réponse sous 24h
          </p>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && <Lightbox items={lightbox.items} startIndex={lightbox.idx} onClose={() => setLightbox(null)} />}
      </AnimatePresence>

      <style>{`
        .featured-block { grid-template-columns: 60% 40% !important; }
        @media (max-width: 860px) {
          .featured-block { grid-template-columns: 1fr !important; }
          .featured-block > * { order: unset !important; }
          .masonry-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 767px) {
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
    <div onClick={onClick} style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Image src={p.image} alt={p.title} fill
        sizes="(max-width: 860px) 100vw, 60vw" priority
        style={{ objectFit: "cover", transition: "transform 0.5s ease", transform: hovered ? "scale(1.04)" : "scale(1)" }} />
      <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(201,168,76,0.1)" : "transparent", transition: "background 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {hovered && (
          <span style={{ fontSize: 32, color: "#fff", opacity: 0.8 }}>⊕</span>
        )}
      </div>
    </div>
  );
}

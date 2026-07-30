"use client";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { eventProjects, testimonials } from "@/data/portfolio";
import type { BrandingClient } from "@/data/portfolio";

/* ─── TYPES ─────────────────────────────────────────────────── */
interface VideoItem { src: string; thumb: string; label: string; isStream?: boolean; }
interface ClientData extends BrandingClient {
  instagram: string;
  media: { cover: string; videos: VideoItem[]; photos: string[] };
}
interface MediaFile { src: string; type: "photo" | "video"; thumb?: string; isStream?: boolean; }
interface PortfolioData {
  clients: ClientData[];
  eventt: string[];
  videos: VideoItem[];
  corpo: string[];
  lyfestyle: string[];
  mariage: string[];
  professionel: string[];
}

/* ─── LIGHTBOX ───────────────────────────────────────────────── */
function Lightbox({ items, startIndex, onClose }: { items: MediaFile[]; startIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIndex);
  const item = items[idx];
  const prev = useCallback(() => setIdx(i => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % items.length), [items.length]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.96)", display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClose}>
      <button onClick={onClose} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 28, cursor: "pointer", zIndex: 1 }}>✕</button>
      <button onClick={e => { e.stopPropagation(); prev(); }} style={{ position: "absolute", left: 16, background: "none", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "50%", width: 44, height: 44, color: "#C9A84C", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>←</button>
      <motion.div key={idx} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()} style={{ maxWidth: "88vw", maxHeight: "88vh" }}>
        {item.type === "video"
          ? item.isStream
            ? <iframe src={item.src} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture" allowFullScreen style={{ width: "min(56vw, 360px)", height: "min(88vh, 640px)", borderRadius: 8, border: "none" }} />
            : <video src={item.src} controls autoPlay style={{ maxWidth: "88vw", maxHeight: "88vh", borderRadius: 8 }} />
          : <img src={item.src} alt="" style={{ maxWidth: "88vw", maxHeight: "88vh", objectFit: "contain", borderRadius: 8, display: "block" }} />}
      </motion.div>
      <button onClick={e => { e.stopPropagation(); next(); }} style={{ position: "absolute", right: 16, background: "none", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "50%", width: 44, height: 44, color: "#C9A84C", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>→</button>
    </motion.div>
  );
}

/* ─── VIDEO CARD ─────────────────────────────────────────────── */
function VideoCard({ video, onClick }: { video: VideoItem; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", aspectRatio: "9/16", overflow: "hidden", borderRadius: 10, cursor: "pointer", background: "#111" }}>
      {video.thumb && <img src={video.thumb} alt={video.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", transform: hovered ? "scale(1.04)" : "scale(1)" }} />}
      <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.2)", transition: "background 0.3s", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <span style={{ fontSize: 36, color: "#C9A84C" }}>▶</span>
        <span style={{ fontSize: 9, color: "#fff", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans)", background: "rgba(0,0,0,0.5)", padding: "3px 10px", borderRadius: 9999 }}>{video.label}</span>
      </div>
    </div>
  );
}

/* ─── CTA BLOCK ──────────────────────────────────────────────── */
function CtaBlock({ title, btn }: { title: string; btn: string }) {
  return (
    <section style={{ padding: "80px 24px", background: "#111", borderTop: "0.5px solid rgba(201,168,76,0.2)", borderBottom: "0.5px solid rgba(201,168,76,0.2)" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <h3 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(28px, 5vw, 48px)", color: "#fff", letterSpacing: "0.03em", marginBottom: 28, whiteSpace: "pre-line" }}>{title}</h3>
        <a href="https://calendly.com/massishot-ca/30min" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-block", padding: "16px 44px", background: "#C9A84C", color: "#0a0a0a", borderRadius: 9999, fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", transition: "transform 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
          {btn}
        </a>
      </div>
    </section>
  );
}

/* ─── BLOC CLIENT ────────────────────────────────────────────── */
function ClientBlock({ client, onVideoClick, onPhotoClick }: {
  client: ClientData;
  idx: number;
  onVideoClick: (videos: VideoItem[], i: number) => void;
  onPhotoClick: (photos: string[], i: number) => void;
}) {
  const hasVideos = client.media.videos.length > 0;
  const hasPhotos = client.media.photos.length > 0;

  return (
    <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(201,168,76,0.12)", background: "#0d0d0d" }}>

      {/* ── HERO COVER PLEIN LARGEUR ── */}
      <div style={{ position: "relative", width: "100%", height: "clamp(320px, 50vw, 520px)", overflow: "hidden" }}>
        {client.media.cover
          ? <Image src={client.media.cover} alt={client.client} fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "top" }} priority />
          : <div style={{ width: "100%", height: "100%", background: "#111" }} />}

        {/* Gradient bas */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(13,13,13,0.5) 35%, transparent 65%)" }} />
        {/* Gradient droite (pour les infos) */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.5) 40%, transparent 65%)" }} className="cover-right-gradient" />

        {/* Badge */}
        <div style={{ position: "absolute", top: 20, left: 24 }}>
          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.4)", padding: "4px 14px", borderRadius: 9999, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
            Personal Branding
          </span>
        </div>

        {/* Infos en overlay bas-droite */}
        <div style={{ position: "absolute", bottom: 28, right: 32, maxWidth: 340, textAlign: "right" }} className="cover-info-overlay">
          <h3 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(36px, 4.5vw, 60px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.9, marginBottom: 8 }}>{client.client}</h3>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "#C9A84C", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>{client.role}</p>
          {client.instagram && (
            <a href={`https://instagram.com/${client.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#C9A84C")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              {client.instagram}
            </a>
          )}
        </div>

        {/* Description bas-gauche */}
        {client.description && (
          <div style={{ position: "absolute", bottom: 28, left: 28, maxWidth: "45%" }} className="cover-desc-overlay">
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{client.description}</p>
          </div>
        )}
      </div>

      {/* ── SERVICES + TÉMOIGNAGE ── */}
      <div style={{ display: "grid", gridTemplateColumns: client.testimonial ? "1fr 1fr" : "1fr", gap: 0, borderTop: "1px solid rgba(255,255,255,0.04)" }} className="client-meta-grid">
        <div style={{ padding: "20px 28px", borderRight: client.testimonial ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>Services</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {client.services.map(s => (
              <span key={s} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, color: "#C9A84C", border: "1px solid rgba(201,168,76,0.25)", padding: "4px 14px", borderRadius: 9999, background: "rgba(201,168,76,0.04)" }}>{s}</span>
            ))}
          </div>
        </div>
        {client.testimonial && (
          <div style={{ padding: "20px 28px" }}>
            <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
              {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#C9A84C", fontSize: 10 }}>★</span>)}
            </div>
            <p style={{ fontFamily: "var(--font-playfair-display)", fontSize: 13, fontStyle: "italic", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 10 }}>"{client.testimonial.quote}"</p>
            <p style={{ fontFamily: "var(--font-bebas-neue)", fontSize: 12, color: "#C9A84C", letterSpacing: "0.1em", margin: 0 }}>{client.testimonial.name}</p>
          </div>
        )}
      </div>

      {/* ── VIDÉOS FACE CAMÉRA ── */}
      {hasVideos && (
        <div style={{ padding: "24px 28px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>Face Caméra</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }} className="client-videos-grid">
            {client.media.videos.map((v, vi) => (
              <VideoCard key={v.src} video={v} onClick={() => onVideoClick(client.media.videos, vi)} />
            ))}
          </div>
        </div>
      )}

      {/* ── PHOTOS ── */}
      {hasPhotos && (
        <div style={{ padding: "24px 28px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>Photos</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }} className="client-photos-grid">
            {client.media.photos.map((src, pi) => (
              <div key={src} onClick={() => onPhotoClick(client.media.photos, pi)}
                style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", borderRadius: 8, cursor: "pointer", background: "#111" }}>
                <Image src={src} alt="" fill sizes="20vw" loading="lazy" style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.4s" }}
                  onMouseOver={e => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── COMPOSANT PRINCIPAL ────────────────────────────────────── */
export default function PortfolioPageContent({ data }: { data: PortfolioData }) {
  const [activeFilter, setActiveFilter] = useState("Tout");
  const [lightbox, setLightbox] = useState<{ items: MediaFile[]; idx: number } | null>(null);
  const [activeClient, setActiveClient] = useState(0);
  const brandingRef = useRef<HTMLElement>(null);
  const eventsRef = useRef<HTMLElement>(null);

  const otherPhotos: { src: string; cat: string }[] = [
    ...data.mariage.map(src => ({ src, cat: "Mariage" })),
    ...data.professionel.map(src => ({ src, cat: "Portraits" })),
    ...data.corpo.map(src => ({ src, cat: "Corporate" })),
    ...data.lyfestyle.map(src => ({ src, cat: "Lifestyle" })),
  ];
  const filters = ["Tout", "Mariage", "Portraits", "Corporate", "Lifestyle"];
  const filtered = activeFilter === "Tout" ? otherPhotos : otherPhotos.filter(p => p.cat === activeFilter);

  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ padding: "160px 24px 100px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span style={{ display: "inline-block", fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.25)", padding: "5px 18px", borderRadius: 9999, background: "rgba(201,168,76,0.05)", marginBottom: 32 }}>
            Studio Premium · Montréal
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontFamily: "var(--font-playfair-display)", fontSize: "clamp(48px, 9vw, 100px)", color: "#fff", fontWeight: 400, fontStyle: "italic", lineHeight: 1.05, marginBottom: 20 }}>
          Nos Réalisations
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(14px, 1.8vw, 17px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: 540, margin: "0 auto 32px" }}>
          Des images pensées pour construire une marque, capturer une énergie et créer de l'impact.
        </motion.p>
        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.5, delay: 0.35 }}
          style={{ width: 60, height: 1, background: "#C9A84C", margin: "0 auto 40px" }} />
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => brandingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            style={{ fontFamily: "var(--font-dm-sans)", padding: "12px 28px", border: "1px solid #C9A84C", borderRadius: 9999, background: "transparent", color: "#C9A84C", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.2s, color 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#C9A84C"; (e.currentTarget as HTMLElement).style.color = "#000"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#C9A84C"; }}>
            Personal Branding
          </button>
          <button onClick={() => eventsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            style={{ fontFamily: "var(--font-dm-sans)", padding: "12px 28px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 9999, background: "transparent", color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", transition: "border-color 0.2s, color 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C9A84C"; (e.currentTarget as HTMLElement).style.color = "#C9A84C"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}>
            Événements
          </button>
        </motion.div>
      </section>

      {/* ── PERSONAL BRANDING ────────────────────────────────── */}
      <section ref={brandingRef} style={{ padding: "80px 0 40px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 64 }}>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>— Spécialité #1</span>
            <h2 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(44px, 7vw, 80px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, margin: "10px 0 12px" }}>PERSONAL BRANDING</h2>
            <p style={{ fontFamily: "var(--font-playfair-display)", fontSize: "clamp(16px, 2vw, 20px)", fontStyle: "italic", color: "#C9A84C" }}>
              Nous ne faisons pas que des photos. Nous construisons un univers visuel complet.
            </p>
          </motion.div>

          {/* Cartes clients */}
          {data.clients.length > 0 && (
            <>
              {/* Rangée de cartes */}
              <div style={{ display: "flex", gap: 12, marginBottom: 36, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }} className="client-cards-row">
                {data.clients.map((cl, i) => (
                  <button key={i} onClick={() => setActiveClient(i)}
                    style={{ flexShrink: 0, position: "relative", width: 160, height: 200, borderRadius: 14, overflow: "hidden", cursor: "pointer", border: activeClient === i ? "2px solid #C9A84C" : "2px solid transparent", transition: "border-color 0.25s", padding: 0, background: "#111" }}>
                    {cl.media.cover && (
                      <img src={cl.media.cover} alt={cl.client} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "transform 0.4s", transform: activeClient === i ? "scale(1.05)" : "scale(1)" }} />
                    )}
                    <div style={{ position: "absolute", inset: 0, background: activeClient === i ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 60%, transparent 100%)", transition: "background 0.3s" }} />
                    <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, textAlign: "left" }}>
                      <p style={{ fontFamily: "var(--font-bebas-neue)", fontSize: 18, color: "#fff", letterSpacing: "0.04em", margin: 0, lineHeight: 1.1 }}>{cl.client}</p>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 9, color: activeClient === i ? "#C9A84C" : "rgba(255,255,255,0.4)", letterSpacing: "0.08em", margin: "4px 0 0", textTransform: "uppercase" }}>{cl.role}</p>
                    </div>
                    {activeClient === i && (
                      <div style={{ position: "absolute", top: 10, right: 10, width: 8, height: 8, borderRadius: "50%", background: "#C9A84C" }} />
                    )}
                  </button>
                ))}
              </div>

              {/* Contenu client actif */}
              <AnimatePresence mode="wait">
                <motion.div key={activeClient} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  <ClientBlock client={data.clients[activeClient]} idx={0}
                    onVideoClick={(videos, vi) => setLightbox({ items: videos.map(v => ({ src: v.src, type: "video" as const, thumb: v.thumb, isStream: v.isStream })), idx: vi })}
                    onPhotoClick={(photos, pi) => setLightbox({ items: photos.map(s => ({ src: s, type: "photo" as const })), idx: pi })}
                  />
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </section>

      <CtaBlock title="Construisons votre image." btn="DÉMARRER UN PROJET →" />

      {/* ── ÉVÉNEMENTS ───────────────────────────────────────── */}
      <section ref={eventsRef} style={{ padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 64 }}>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>— Spécialité #2</span>
            <h2 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(44px, 7vw, 80px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, margin: "10px 0 12px" }}>COUVERTURE D'ÉVÉNEMENTS</h2>
            <p style={{ fontFamily: "var(--font-playfair-display)", fontSize: "clamp(16px, 2vw, 20px)", fontStyle: "italic", color: "#C9A84C" }}>
              De A à Z — photographie, vidéo, aftermovie, Reels et contenu réseaux sociaux.
            </p>
          </motion.div>

          {eventProjects.filter(e => e.event).map(ev => (
            <motion.div key={ev.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8 }}
              style={{ marginBottom: 80 }}>
              <div style={{ position: "relative", aspectRatio: "21/9", borderRadius: "16px 16px 0 0", overflow: "hidden" }}>
                <Image src={ev.cover} alt={ev.event} fill sizes="100vw" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
                <div style={{ position: "absolute", bottom: 28, left: 32, right: 32 }}>
                  <span style={{ display: "inline-block", fontFamily: "var(--font-dm-sans)", fontSize: 10, color: "#C9A84C", border: "1px solid rgba(201,168,76,0.5)", padding: "3px 12px", borderRadius: 9999, marginBottom: 10, background: "rgba(0,0,0,0.4)" }}>Photo + Vidéo</span>
                  <h3 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(28px, 5vw, 56px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95 }}>{ev.event}</h3>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#0f0f0f", borderRadius: "0 0 16px 16px", border: "0.5px solid rgba(201,168,76,0.1)", borderTop: "none" }} className="event-grid">
                <div style={{ padding: 20, borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                    {data.eventt.slice(0, 6).map((src, i) => (
                      <div key={src} onClick={() => setLightbox({ items: data.eventt.map(s => ({ src: s, type: "photo" as const })), idx: i })}
                        style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", borderRadius: 6, cursor: "pointer", background: "#111" }}>
                        <Image src={src} alt="" fill sizes="20vw" style={{ objectFit: "cover" }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ padding: "32px" }}>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 24 }}>{ev.description}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                    {ev.deliverables.map(d => (
                      <div key={d} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ color: "#C9A84C" }}>✓</span>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{d}</span>
                      </div>
                    ))}
                  </div>
                  {ev.aftermovie && (
                    <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: 10, overflow: "hidden", cursor: "pointer" }}
                      onClick={() => setLightbox({ items: [{ src: ev.aftermovie!, type: "video" }], idx: 0 })}>
                      <video src={ev.aftermovie} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 40, color: "#C9A84C" }}>▶</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <CtaBlock title={"Votre prochain événement mérite\nplus que de simples souvenirs."} btn="COUVRIR MON ÉVÉNEMENT →" />

      {/* ── AUTRES RÉALISATIONS ──────────────────────────────── */}
      {otherPhotos.length > 0 && (
        <section style={{ padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 36 }}>
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>— Et aussi</span>
              <h2 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(44px, 7vw, 80px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, marginTop: 10 }}>AUTRES RÉALISATIONS</h2>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "rgba(255,255,255,0.3)", marginTop: 8 }}>Mariages · Portraits · Corporate · Lifestyle</p>
            </motion.div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 32, paddingBottom: 4, scrollbarWidth: "none" }}>
              {filters.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} style={{ fontFamily: "var(--font-dm-sans)", padding: "8px 20px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1px solid", whiteSpace: "nowrap", flexShrink: 0, transition: "all 0.2s", background: activeFilter === f ? "#C9A84C" : "transparent", borderColor: activeFilter === f ? "#C9A84C" : "#333", color: activeFilter === f ? "#0a0a0a" : "rgba(255,255,255,0.4)" }}>{f}</button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }} className="others-grid">
                {filtered.map((p, i) => (
                  <div key={p.src} onClick={() => setLightbox({ items: filtered.map(x => ({ src: x.src, type: "photo" as const })), idx: i })}
                    style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", borderRadius: 8, cursor: "pointer", background: "#111" }}>
                    <Image src={p.src} alt="" fill sizes="33vw" loading="lazy" style={{ objectFit: "cover", transition: "transform 0.4s" }}
                      onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* ── TÉMOIGNAGES ──────────────────────────────────────── */}
      <section style={{ padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.05)", background: "#080808" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(40px, 6vw, 72px)", color: "#fff", letterSpacing: "0.03em" }}>ILS TÉMOIGNENT</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="testimonials-grid">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ background: "#111", border: "0.5px solid rgba(201,168,76,0.15)", borderLeft: "2px solid #C9A84C", borderRadius: 12, padding: "36px 32px" }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                  {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#C9A84C", fontSize: 14 }}>★</span>)}
                </div>
                <p style={{ fontFamily: "var(--font-playfair-display)", fontSize: "clamp(16px, 2vw, 20px)", fontStyle: "italic", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 24 }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(201,168,76,0.15)", border: "1px solid #C9A84C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--font-bebas-neue)", fontSize: 16, color: "#C9A84C" }}>{t.name[0]}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-bebas-neue)", fontSize: 14, color: "#fff", letterSpacing: "0.08em", margin: 0 }}>{t.name}</p>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "rgba(255,255,255,0.3)", margin: "2px 0 0" }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section style={{ padding: "120px 24px", position: "relative", borderTop: "1px solid rgba(201,168,76,0.2)" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, #C9A84C 40%, transparent)" }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(44px, 7vw, 80px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, marginBottom: 16 }}>VOUS AVEZ UN PROJET ?</h2>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: 40 }}>Photo, vidéo, personal branding ou événementiel.<br />Parlons de votre vision.</p>
          <a href="https://calendly.com/massishot-ca/30min" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", padding: "18px 48px", background: "#C9A84C", color: "#0a0a0a", borderRadius: 9999, fontFamily: "var(--font-dm-sans)", fontSize: 15, fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase", boxShadow: "0 0 40px rgba(201,168,76,0.2)", transition: "transform 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
            DÉMARRER UN PROJET →
          </a>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 16, letterSpacing: "0.08em" }}>Sans engagement · Réponse sous 24h</p>
        </motion.div>
      </section>

      <AnimatePresence>
        {lightbox && <Lightbox items={lightbox.items} startIndex={lightbox.idx} onClose={() => setLightbox(null)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .cover-right-gradient { display: none; }
          .cover-info-overlay { right: 20px !important; bottom: 16px !important; max-width: 60% !important; }
          .cover-desc-overlay { display: none; }
          .client-meta-grid { grid-template-columns: 1fr !important; }
          .client-videos-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .client-photos-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .event-grid { grid-template-columns: 1fr !important; }
          .others-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 520px) {
          .cover-info-overlay { left: 16px !important; right: 16px !important; max-width: 100% !important; text-align: left !important; }
          .client-videos-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .client-photos-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .others-grid { grid-template-columns: 1fr !important; }
          .client-cards-row button { width: 130px !important; height: 170px !important; }
        }
      `}</style>
    </main>
  );
}

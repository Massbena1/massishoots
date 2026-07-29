"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { brandingProjects, eventProjects, testimonials } from "@/data/portfolio";

/* ─── TYPES ─────────────────────────────────────────────────── */
interface MediaFile { src: string; type: "photo" | "video"; thumb?: string; }
interface PortfolioData {
  brand: string[];
  eventt: string[];
  videos: { src: string; thumb: string; label: string }[];
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.96)", display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClose}>
      <button onClick={onClose} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 28, cursor: "pointer", zIndex: 1 }}>✕</button>
      <span style={{ position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", fontFamily: "var(--font-dm-sans)" }}>{idx + 1} / {items.length}</span>
      <button onClick={e => { e.stopPropagation(); prev(); }} style={{ position: "absolute", left: 16, background: "none", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "50%", width: 44, height: 44, color: "#C9A84C", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>←</button>
      <motion.div key={idx} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()} style={{ maxWidth: "88vw", maxHeight: "88vh" }}>
        {item.type === "video"
          ? <video src={item.src} controls autoPlay style={{ maxWidth: "88vw", maxHeight: "88vh", borderRadius: 8 }} />
          : <img src={item.src} alt="" style={{ maxWidth: "88vw", maxHeight: "88vh", objectFit: "contain", borderRadius: 8, display: "block" }} />
        }
      </motion.div>
      <button onClick={e => { e.stopPropagation(); next(); }} style={{ position: "absolute", right: 16, background: "none", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "50%", width: 44, height: 44, color: "#C9A84C", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>→</button>
    </motion.div>
  );
}

/* ─── PHOTO GRID SIMPLE ──────────────────────────────────────── */
function PhotoGrid({ photos, columns = 3 }: { photos: string[]; columns?: number }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const items: MediaFile[] = photos.map(src => ({ src, type: "photo" }));
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 6 }}>
        {photos.map((src, i) => (
          <div key={src} onClick={() => setLightbox(i)} style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", borderRadius: 8, cursor: "pointer", background: "#111" }}>
            <Image src={src} alt="" fill sizes="(max-width: 768px) 50vw, 33vw" style={{ objectFit: "cover", transition: "transform 0.4s" }}
              onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")} />
          </div>
        ))}
      </div>
      <AnimatePresence>
        {lightbox !== null && <Lightbox items={items} startIndex={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </>
  );
}

/* ─── VIDEO CARD ─────────────────────────────────────────────── */
function VideoCard({ video, onClick }: { video: { src: string; thumb: string; label: string }; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const isReel = video.src.includes("facecam") || video.src.includes("brand");
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", aspectRatio: isReel ? "9/16" : "16/9", overflow: "hidden", borderRadius: 10, cursor: "pointer", background: "#111" }}>
      {video.thumb && <Image src={video.thumb} alt={video.label} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover", transition: "transform 0.4s", transform: hovered ? "scale(1.04)" : "scale(1)" }} />}
      <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.25)", transition: "background 0.3s", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <span style={{ fontSize: 36, color: "#C9A84C", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))" }}>▶</span>
        <span style={{ fontSize: 10, color: "#fff", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans)", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", padding: "3px 10px", borderRadius: 9999 }}>{video.label}</span>
      </div>
    </div>
  );
}

/* ─── CTA BLOCK ──────────────────────────────────────────────── */
function CtaBlock({ title, btn }: { title: string; btn: string }) {
  return (
    <section style={{ padding: "80px 24px", background: "#111", borderTop: "0.5px solid rgba(201,168,76,0.2)", borderBottom: "0.5px solid rgba(201,168,76,0.2)" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <h3 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(28px, 5vw, 48px)", color: "#fff", letterSpacing: "0.03em", marginBottom: 28 }}>{title}</h3>
        <a href="https://calendly.com/massishot-ca/30min" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-block", padding: "16px 44px", background: "#C9A84C", color: "#0a0a0a", borderRadius: 9999, fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 0 40px rgba(201,168,76,0.2)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
          {btn}
        </a>
      </div>
    </section>
  );
}

/* ─── COMPOSANT PRINCIPAL ────────────────────────────────────── */
export default function PortfolioPageContent({ data }: { data: PortfolioData }) {
  const [activeFilter, setActiveFilter] = useState<string>("Tout");
  const [lightbox, setLightbox] = useState<{ items: MediaFile[]; idx: number } | null>(null);

  const brandingRef = useRef<HTMLElement>(null);
  const eventsRef = useRef<HTMLElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Photos "autres" filtrées
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

      {/* ── SECTION 1 : HERO ─────────────────────────────────── */}
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
          <button onClick={() => scrollTo(brandingRef)}
            style={{ fontFamily: "var(--font-dm-sans)", padding: "12px 28px", border: "1px solid #C9A84C", borderRadius: 9999, background: "transparent", color: "#C9A84C", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.2s, color 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#C9A84C"; (e.currentTarget as HTMLElement).style.color = "#000"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#C9A84C"; }}>
            Personal Branding
          </button>
          <button onClick={() => scrollTo(eventsRef)}
            style={{ fontFamily: "var(--font-dm-sans)", padding: "12px 28px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 9999, background: "transparent", color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", transition: "border-color 0.2s, color 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C9A84C"; (e.currentTarget as HTMLElement).style.color = "#C9A84C"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}>
            Événements
          </button>
        </motion.div>
      </section>

      {/* ── SECTION 2 : PERSONAL BRANDING ────────────────────── */}
      <section ref={brandingRef} style={{ padding: "80px 0 100px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 64 }}>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>— Spécialité #1</span>
            <h2 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(44px, 7vw, 80px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, margin: "10px 0 12px" }}>PERSONAL BRANDING</h2>
            <p style={{ fontFamily: "var(--font-playfair-display)", fontSize: "clamp(16px, 2vw, 20px)", fontStyle: "italic", color: "#C9A84C" }}>
              Nous ne faisons pas que des photos. Nous construisons un univers visuel complet.
            </p>
          </motion.div>

          {brandingProjects.filter(p => p.client).map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: 80 }}>
              <div className={`branding-block ${i % 2 === 1 ? "reversed" : ""}`}
                style={{ display: "grid", gridTemplateColumns: "60% 40%", minHeight: 500, borderRadius: 16, overflow: "hidden", border: "0.5px solid rgba(201,168,76,0.12)" }}>

                {/* Image */}
                <div style={{ position: "relative", overflow: "hidden", order: i % 2 === 1 ? 2 : 1 }}>
                  <Image src={p.cover} alt={p.client} fill sizes="60vw" style={{ objectFit: "cover", transition: "transform 0.5s" }}
                    onMouseOver={e => (e.currentTarget.style.transform = "scale(1.04)")}
                    onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")} />
                </div>

                {/* Texte */}
                <div style={{ background: "#0f0f0f", padding: "clamp(32px, 5vw, 56px)", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", order: i % 2 === 1 ? 1 : 2 }}>
                  <span style={{ position: "absolute", top: "50%", right: -16, transform: "translateY(-50%)", fontFamily: "var(--font-bebas-neue)", fontSize: 180, color: "rgba(201,168,76,0.05)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>{p.id}</span>
                  <span style={{ display: "inline-block", fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)", padding: "4px 14px", borderRadius: 9999, marginBottom: 20, alignSelf: "flex-start" }}>
                    Personal Branding
                  </span>
                  <h3 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(30px, 4vw, 48px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, marginBottom: 16 }}>{p.client}</h3>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 24 }}>{p.description}</p>

                  {(p.objectif || p.production || p.utilisation) && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                      {[{ label: "Objectif", val: p.objectif }, { label: "Production", val: p.production }, { label: "Utilisation", val: p.utilisation }]
                        .filter(r => r.val)
                        .map(row => (
                          <p key={row.label} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "rgba(255,255,255,0.38)", lineHeight: 1.6, margin: 0, borderLeft: "1px solid rgba(201,168,76,0.2)", paddingLeft: 12 }}>
                            <span style={{ color: "#C9A84C", fontWeight: 700, marginRight: 6 }}>{row.label} :</span>{row.val}
                          </p>
                        ))}
                    </div>
                  )}

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
                    {p.services.map(s => (
                      <span key={s} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)", padding: "3px 12px", borderRadius: 9999 }}>{s}</span>
                    ))}
                  </div>

                  {p.testimonial && (
                    <div style={{ background: "rgba(201,168,76,0.04)", border: "0.5px solid rgba(201,168,76,0.12)", borderRadius: 10, padding: "16px 20px" }}>
                      <p style={{ fontFamily: "var(--font-playfair-display)", fontSize: 13, fontStyle: "italic", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 8 }}>{p.testimonial.quote}</p>
                      <span style={{ fontFamily: "var(--font-bebas-neue)", fontSize: 11, color: "#C9A84C", letterSpacing: "0.1em" }}>{p.testimonial.name}</span>
                      <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, color: "rgba(255,255,255,0.25)", marginLeft: 8 }}>{p.testimonial.role}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Vidéos branding en premier */}
              {data.videos.filter(v => v.src.includes("facecam") || v.src.includes("brand")).length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }} className="reels-grid">
                    {data.videos.filter(v => v.src.includes("facecam") || v.src.includes("brand")).map((v, vi) => (
                      <motion.div key={v.src} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: vi * 0.05 }}>
                        <VideoCard video={v} onClick={() => setLightbox({ items: data.videos.map(x => ({ src: x.src, type: "video" as const, thumb: x.thumb })), idx: data.videos.findIndex(x => x.src === v.src) })} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Photos dessous */}
              {data.brand.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <PhotoGrid photos={data.brand.slice(0, 8)} columns={4} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA BRANDING ─────────────────────────────────────── */}
      <CtaBlock title="Construisons votre image." btn="DÉMARRER UN PROJET →" />

      {/* ── SECTION 3 : ÉVÉNEMENTS ───────────────────────────── */}
      <section ref={eventsRef} style={{ padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 64 }}>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>— Spécialité #2</span>
            <h2 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(44px, 7vw, 80px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, margin: "10px 0 12px" }}>COUVERTURE D'ÉVÉNEMENTS</h2>
            <p style={{ fontFamily: "var(--font-playfair-display)", fontSize: "clamp(16px, 2vw, 20px)", fontStyle: "italic", color: "#C9A84C" }}>
              De A à Z — photographie, vidéo, aftermovie, Reels et contenu réseaux sociaux.
            </p>
          </motion.div>

          {eventProjects.filter(e => e.event).map((ev, i) => (
            <motion.div key={ev.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8 }}
              style={{ marginBottom: 80 }}>
              {/* Cover pleine largeur */}
              <div style={{ position: "relative", aspectRatio: "21/9", borderRadius: "16px 16px 0 0", overflow: "hidden" }}>
                <Image src={ev.cover} alt={ev.event} fill sizes="100vw" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
                <div style={{ position: "absolute", bottom: 28, left: 32, right: 32 }}>
                  <span style={{ display: "inline-block", fontFamily: "var(--font-dm-sans)", fontSize: 10, color: "#C9A84C", border: "1px solid rgba(201,168,76,0.5)", padding: "3px 12px", borderRadius: 9999, marginBottom: 10, background: "rgba(0,0,0,0.4)" }}>Photo + Vidéo</span>
                  <h3 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(28px, 5vw, 56px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95 }}>{ev.event}</h3>
                </div>
              </div>

              {/* Contenu dessous */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#0f0f0f", borderRadius: "0 0 16px 16px", border: "0.5px solid rgba(201,168,76,0.1)", borderTop: "none", overflow: "hidden" }} className="event-grid">
                {/* Galerie photos */}
                <div style={{ padding: 20, borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                  <PhotoGrid photos={data.eventt.slice(0, 6)} columns={3} />
                </div>
                {/* Infos */}
                <div style={{ padding: "32px 32px" }}>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 24 }}>{ev.description}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                    {ev.deliverables.map(d => (
                      <div key={d} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ color: "#C9A84C", fontSize: 14 }}>✓</span>
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

      {/* ── CTA ÉVÉNEMENTS ───────────────────────────────────── */}
      <CtaBlock title={"Votre prochain événement mérite\nplus que de simples souvenirs."} btn="COUVRIR MON ÉVÉNEMENT →" />

      {/* ── SECTION 4 : VIDÉOS ───────────────────────────────── */}
      {data.videos.length > 0 && (
        <section style={{ padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 48 }}>
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>— Motion</span>
              <h2 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(44px, 7vw, 80px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, marginTop: 10 }}>NOS RÉALISATIONS VIDÉO</h2>
            </motion.div>

            {/* Reels 9:16 */}
            {data.videos.filter(v => v.src.includes("facecam") || v.src.includes("brand")).length > 0 && (
              <div style={{ marginBottom: 48 }}>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Reels · Face Caméra</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="reels-grid">
                  {data.videos.filter(v => v.src.includes("facecam") || v.src.includes("brand")).map((v, i) => (
                    <motion.div key={v.src} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                      <VideoCard video={v} onClick={() => setLightbox({ items: data.videos.map(x => ({ src: x.src, type: "video" as const, thumb: x.thumb })), idx: data.videos.indexOf(v) })} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Vidéos 16:9 */}
            {data.videos.filter(v => !v.src.includes("facecam") && !v.src.includes("brand")).length > 0 && (
              <div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Aftermovies · Événements · Corporate</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }} className="videos-grid">
                  {data.videos.filter(v => !v.src.includes("facecam") && !v.src.includes("brand")).map((v, i) => (
                    <motion.div key={v.src} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                      <VideoCard video={v} onClick={() => setLightbox({ items: data.videos.map(x => ({ src: x.src, type: "video" as const, thumb: x.thumb })), idx: data.videos.indexOf(v) })} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── SECTION 5 : AUTRES RÉALISATIONS ──────────────────── */}
      {otherPhotos.length > 0 && (
        <section style={{ padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 36 }}>
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>— Et aussi</span>
              <h2 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(44px, 7vw, 80px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, marginTop: 10 }}>AUTRES RÉALISATIONS</h2>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "rgba(255,255,255,0.3)", marginTop: 8 }}>Mariages · Portraits · Corporate · Lifestyle</p>
            </motion.div>

            {/* Filtres scrollables */}
            <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 32, paddingBottom: 4, scrollbarWidth: "none" }}>
              {filters.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} style={{ fontFamily: "var(--font-dm-sans)", padding: "8px 20px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1px solid", whiteSpace: "nowrap", flexShrink: 0, transition: "all 0.2s", background: activeFilter === f ? "#C9A84C" : "transparent", borderColor: activeFilter === f ? "#C9A84C" : "#333", color: activeFilter === f ? "#0a0a0a" : "rgba(255,255,255,0.4)" }}>
                  {f}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }} className="others-grid">
                {filtered.map((p, i) => (
                  <motion.div key={p.src} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.2) }}
                    onClick={() => setLightbox({ items: filtered.map(x => ({ src: x.src, type: "photo" as const })), idx: i })}
                    style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", borderRadius: 8, cursor: "pointer", background: "#111" }}>
                    <Image src={p.src} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" style={{ objectFit: "cover", transition: "transform 0.4s" }}
                      onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* ── SECTION 6 : TÉMOIGNAGES ──────────────────────────── */}
      <section style={{ padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.05)", background: "#080808" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: 60 }}>
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
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0, marginTop: 2 }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7 : CTA FINAL ────────────────────────────── */}
      <section style={{ padding: "120px 24px", position: "relative", borderTop: "1px solid rgba(201,168,76,0.2)" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, #C9A84C 40%, transparent)" }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(44px, 7vw, 80px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, marginBottom: 16 }}>VOUS AVEZ UN PROJET ?</h2>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: 40 }}>
            Photo, vidéo, personal branding ou événementiel.<br />Parlons de votre vision.
          </p>
          <a href="https://calendly.com/massishot-ca/30min" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", padding: "18px 48px", background: "#C9A84C", color: "#0a0a0a", borderRadius: 9999, fontFamily: "var(--font-dm-sans)", fontSize: 15, fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase", boxShadow: "0 0 40px rgba(201,168,76,0.2)", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(201,168,76,0.4)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(201,168,76,0.2)"; }}>
            DÉMARRER UN PROJET →
          </a>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 16, letterSpacing: "0.08em" }}>Sans engagement · Réponse sous 24h</p>
        </motion.div>
      </section>

      {/* Lightbox global */}
      <AnimatePresence>
        {lightbox && <Lightbox items={lightbox.items} startIndex={lightbox.idx} onClose={() => setLightbox(null)} />}
      </AnimatePresence>

      <style>{`
        .branding-block { direction: ltr; }
        .branding-block.reversed { grid-template-columns: 40% 60% !important; }
        @media (max-width: 860px) {
          .branding-block, .branding-block.reversed { grid-template-columns: 1fr !important; }
          .branding-block > *, .branding-block.reversed > * { order: unset !important; }
          .event-grid { grid-template-columns: 1fr !important; }
          .reels-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .videos-grid { grid-template-columns: 1fr !important; }
          .others-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 520px) {
          .reels-grid { grid-template-columns: 1fr !important; }
          .others-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PublicGallery {
  nom: string;
  url?: string;
  accessible: boolean;
  date: string;
  cover?: string;
  photos?: number;
}

type Status = "idle" | "loading" | "error_empty" | "error_notfound" | "success";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-CA", { year: "numeric", month: "long", day: "numeric" });
}

/* ─── CARTE GALERIE ──────────────────────────────────────── */
function GalleryCard({ g, idx }: { g: PublicGallery; idx: number }) {
  const [hovered, setHovered] = useState(false);

  const cardInner = (
    <>
      {/* Cover image */}
      <div style={{ position: "relative", height: 260, overflow: "hidden" }}>
        {g.cover ? (
          <Image
            src={g.cover}
            alt={g.nom}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: "cover", transition: "transform 0.5s ease", transform: hovered ? "scale(1.06)" : "scale(1)", filter: g.accessible ? "brightness(0.75) saturate(0.85)" : "brightness(0.4) saturate(0.3)" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 40, opacity: 0.2 }}>📷</span>
          </div>
        )}
        {/* Hover overlay */}
        <div style={{ position: "absolute", inset: 0, background: hovered && g.accessible ? "rgba(201,168,76,0.15)" : "transparent", transition: "background 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {g.accessible && hovered && (
            <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
              className="font-dm" style={{ fontSize: 12, color: "#fff", letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.6)", padding: "8px 22px", borderRadius: 9999, background: "rgba(0,0,0,0.5)" }}>
              Voir la galerie →
            </motion.span>
          )}
          {!g.accessible && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Bientôt disponible</span>
            </div>
          )}
        </div>
        {/* Badge photos */}
        {g.photos && g.accessible && (
          <span className="font-dm" style={{ position: "absolute", top: 14, right: 14, fontSize: 10, fontWeight: 700, color: "#0a0a0a", background: "#C9A84C", padding: "3px 10px", borderRadius: 9999, letterSpacing: "0.06em" }}>
            {g.photos} photos
          </span>
        )}
        {!g.accessible && (
          <span className="font-dm" style={{ position: "absolute", top: 14, right: 14, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", padding: "3px 10px", borderRadius: 9999, letterSpacing: "0.06em" }}>
            Privée
          </span>
        )}
      </div>

      {/* Infos */}
      <div style={{ padding: "20px 22px" }}>
        <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
          {formatDate(g.date)}
        </p>
        <h3 className="font-bebas" style={{ fontSize: 22, color: g.accessible ? "#fff" : "rgba(255,255,255,0.45)", letterSpacing: "0.04em", lineHeight: 1.1 }}>
          {g.nom}
        </h3>
      </div>
    </>
  );

  const sharedStyle: React.CSSProperties = {
    display: "block", textDecoration: "none", borderRadius: 12, overflow: "hidden",
    border: `0.5px solid ${g.accessible ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.06)"}`,
    position: "relative", background: "#111",
    cursor: g.accessible ? "pointer" : "default",
  };

  if (g.accessible && g.url) {
    return (
      <motion.a href={g.url} target="_blank" rel="noopener noreferrer"
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay: idx * 0.1 }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={sharedStyle}>
        {cardInner}
      </motion.a>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay: idx * 0.1 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={sharedStyle}>
      {cardInner}
    </motion.div>
  );
}

/* ─── COMPOSANT PRINCIPAL ─────────────────────────────────── */
export default function GalleriesPageContent({ galleries }: { galleries: PublicGallery[] }) {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySent, setNotifySent] = useState(false);
  const [notifyLoading, setNotifyLoading] = useState(false);
  const codeRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedCode = code.trim();
    if (!trimmedCode) { setStatus("error_empty"); return; }
    setStatus("loading");
    try {
      const res = await fetch("/api/gallery/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmedCode, email }),
      });
      if (res.ok) {
        const data = await res.json();
        setStatus("success");
        setTimeout(() => { window.location.href = data.url; }, 700);
      } else {
        setStatus("error_notfound");
      }
    } catch {
      setStatus("error_notfound");
    }
  }

  async function handleNotify(e: React.FormEvent) {
    e.preventDefault();
    if (!notifyEmail || !notifyEmail.includes("@")) return;
    setNotifyLoading(true);
    await fetch("/api/gallery/access", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: notifyEmail }),
    });
    setNotifyLoading(false);
    setNotifySent(true);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 18px", background: "#0a0a0a",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6,
    color: "#fff", fontSize: 15, fontFamily: "var(--font-dm-sans)",
    outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
  };

  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ padding: "160px 24px 80px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="font-dm" style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.25)", padding: "5px 18px", borderRadius: 9999, background: "rgba(201,168,76,0.05)", marginBottom: 36 }}>
            ✦ Vos souvenirs vous attendent
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="font-playfair" style={{ fontSize: "clamp(40px, 7vw, 80px)", color: "#fff", fontWeight: 400, lineHeight: 1.1, marginBottom: 18 }}>
          Galeries d'événements.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="font-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: 460, margin: "0 auto" }}>
          Retrouvez les photos de votre événement. Cliquez sur votre galerie ou entrez votre code privé.
        </motion.p>
      </section>

      {/* ── GALERIES PUBLIQUES ───────────────────────────────── */}
      {galleries.length > 0 && (
        <section style={{ padding: "0 24px 80px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ marginBottom: 40 }}>
              <span className="font-dm" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                — Événements récents
              </span>
              <h2 className="font-bebas" style={{ fontSize: "clamp(36px, 5vw, 56px)", color: "#fff", letterSpacing: "0.03em", marginTop: 10, lineHeight: 0.95 }}>
                GALERIES DISPONIBLES
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="galleries-grid">
              {galleries.map((g, i) => <GalleryCard key={g.url} g={g} idx={i} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── ACCÈS CODE PRIVÉ ─────────────────────────────────── */}
      <section style={{ padding: "20px 24px 100px", borderTop: galleries.length > 0 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
        <div style={{ maxWidth: 460, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32, paddingTop: 60 }}>
            <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>
              Vous avez un code d'accès privé ?
            </p>
          </div>

          <div style={{ background: "#111", border: "0.5px solid rgba(201,168,76,0.3)", borderRadius: 4, padding: "36px 36px 28px" }}>
            <h2 className="font-bebas" style={{ fontSize: 24, color: "#fff", letterSpacing: "0.08em", marginBottom: 24 }}>
              Accéder à ma galerie privée
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label className="font-dm" style={{ display: "block", fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 7 }}>
                  Code d'accès
                </label>
                <input ref={codeRef} type="text" value={code}
                  onChange={e => { setCode(e.target.value.toUpperCase()); setStatus("idle"); }}
                  placeholder="Ex: MACKAY2026"
                  style={{ ...inputStyle, textTransform: "uppercase", letterSpacing: "0.08em", borderColor: status === "error_empty" || status === "error_notfound" ? "rgba(231,76,60,0.5)" : "rgba(255,255,255,0.1)" }}
                  onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.5)")}
                  onBlur={e => (e.target.style.borderColor = (status === "error_notfound" || status === "error_empty") ? "rgba(231,76,60,0.5)" : "rgba(255,255,255,0.1)")}
                  autoComplete="off" spellCheck={false}
                />
              </div>

              <div>
                <label className="font-dm" style={{ display: "block", fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 7 }}>
                  Email <span style={{ color: "rgba(255,255,255,0.2)" }}>(optionnel)</span>
                </label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Pour confirmer votre identité"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.5)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>

              <AnimatePresence mode="wait">
                {status === "error_empty" && (
                  <motion.p key="empty" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="font-dm" style={{ fontSize: 12, color: "#E74C3C", margin: 0 }}>
                    Veuillez entrer votre code d'accès.
                  </motion.p>
                )}
                {status === "error_notfound" && (
                  <motion.p key="notfound" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="font-dm" style={{ fontSize: 12, color: "#E74C3C", margin: 0 }}>
                    Code non reconnu. Vérifiez votre invitation ou contactez l'organisateur.
                  </motion.p>
                )}
                {status === "success" && (
                  <motion.p key="success" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="font-dm" style={{ fontSize: 12, color: "#2ECC71", margin: 0 }}>
                    ✓ Galerie trouvée — redirection…
                  </motion.p>
                )}
              </AnimatePresence>

              <button type="submit" disabled={status === "loading" || status === "success"} className="font-dm"
                style={{ width: "100%", padding: "15px 24px", marginTop: 4, background: status === "success" ? "#2ECC71" : "#C9A84C", color: "#0a0a0a", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: status === "loading" ? "wait" : "pointer", opacity: status === "loading" ? 0.7 : 1, transition: "opacity 0.2s, background 0.3s" }}>
                {status === "loading" ? "Vérification…" : status === "success" ? "✓ Accès confirmé" : "Accéder →"}
              </button>
            </form>

            <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: 16 }}>
              Code reçu de votre organisateur · Accès gratuit
            </p>
          </div>

          {/* Capture email si code non trouvé */}
          <AnimatePresence>
            {status === "error_notfound" && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                style={{ marginTop: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, padding: "24px 28px" }}>
                {!notifySent ? (
                  <>
                    <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 16 }}>
                      Galerie pas encore disponible ?<br />
                      <span style={{ color: "rgba(255,255,255,0.35)" }}>Laissez votre email — on vous avertit dès qu'elle est en ligne.</span>
                    </p>
                    <form onSubmit={handleNotify} style={{ display: "flex", gap: 8 }}>
                      <input type="email" value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)}
                        placeholder="votre@email.com" required
                        style={{ ...inputStyle, flex: 1 }}
                        onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.5)")}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                      <button type="submit" disabled={notifyLoading} className="font-dm"
                        style={{ padding: "14px 18px", background: "#C9A84C", color: "#0a0a0a", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", opacity: notifyLoading ? 0.7 : 1 }}>
                        {notifyLoading ? "…" : "M'avertir →"}
                      </button>
                    </form>
                  </>
                ) : (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-dm"
                    style={{ fontSize: 13, color: "#2ECC71", textAlign: "center" }}>
                    ✓ On vous contacte dès que votre galerie est disponible.
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ORGANISATEURS ────────────────────────────────── */}
      <section style={{ background: "#0f0f0f", borderTop: "1px solid rgba(201,168,76,0.2)", padding: "80px 24px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.7 }}
          style={{ maxWidth: 580, margin: "0 auto", textAlign: "center" }}>
          <span className="font-dm" style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.25)", padding: "5px 18px", borderRadius: 9999, background: "rgba(201,168,76,0.05)", marginBottom: 28 }}>
            Pour les organisateurs
          </span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(34px, 5vw, 52px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, marginBottom: 16 }}>
            Vous organisez un événement ?
          </h2>
          <p className="font-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: 36 }}>
            Offrez à vos participants une galerie photo professionnelle clés en main.<br />Livraison dans les 48h après l'événement.
          </p>
          <a href="https://calendly.com/massishot-ca/30min" target="_blank" rel="noopener noreferrer" className="font-dm"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "17px 40px", background: "#C9A84C", color: "#0a0a0a", borderRadius: 9999, fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase", boxShadow: "0 0 32px rgba(201,168,76,0.2)", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 52px rgba(201,168,76,0.35)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(201,168,76,0.2)"; }}>
            Parlons de votre événement →
          </a>
        </motion.div>
      </section>

      <style>{`
        @media (max-width: 860px) { .galleries-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 540px) { .galleries-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}

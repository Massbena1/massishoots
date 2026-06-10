"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "loading" | "error_empty" | "error_notfound" | "success";

export default function GalleriesPageContent() {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySent, setNotifySent] = useState(false);
  const [notifyLoading, setNotifyLoading] = useState(false);
  const codeRef = useRef<HTMLInputElement>(null);

  useEffect(() => { codeRef.current?.focus(); }, []);

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
        setTimeout(() => { window.location.href = data.url; }, 800);
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
    width: "100%",
    padding: "14px 18px",
    background: "#0a0a0a",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 6,
    color: "#fff",
    fontSize: 15,
    fontFamily: "var(--font-dm-sans)",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>

      {/* ── SECTION 1 : HERO ─────────────────────────────────── */}
      <section style={{ padding: "160px 24px 60px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="font-dm" style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.25)", padding: "5px 18px", borderRadius: 9999, background: "rgba(201,168,76,0.05)", marginBottom: 36 }}>
            ✦ Vos souvenirs vous attendent
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="font-playfair" style={{ fontSize: "clamp(40px, 7vw, 80px)", color: "#fff", fontWeight: 400, lineHeight: 1.1, marginBottom: 20 }}>
          Retrouvez vos photos.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="font-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>
          Entrez le code reçu par votre organisateur pour accéder à votre galerie privée.
        </motion.p>
      </section>

      {/* ── SECTION 2 : FORMULAIRE ───────────────────────────── */}
      <section style={{ padding: "0 24px 100px" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          style={{ maxWidth: 480, margin: "0 auto", background: "#111", border: "0.5px solid rgba(201,168,76,0.35)", borderRadius: 4, padding: "40px 40px 36px" }}>

          <h2 className="font-bebas" style={{ fontSize: 26, color: "#fff", letterSpacing: "0.08em", marginBottom: 28 }}>
            Accéder à ma galerie
          </h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Code */}
            <div>
              <label className="font-dm" style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
                Votre code d'accès
              </label>
              <input
                ref={codeRef}
                type="text"
                value={code}
                onChange={e => { setCode(e.target.value.toUpperCase()); setStatus("idle"); }}
                placeholder="Ex: MACKAY2026"
                style={{ ...inputStyle, textTransform: "uppercase", letterSpacing: "0.08em", borderColor: status === "error_empty" || status === "error_notfound" ? "rgba(231,76,60,0.5)" : "rgba(255,255,255,0.1)" }}
                onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.5)")}
                onBlur={e => (e.target.style.borderColor = status === "error_notfound" || status === "error_empty" ? "rgba(231,76,60,0.5)" : "rgba(255,255,255,0.1)")}
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-dm" style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
                Votre email <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 400 }}>(optionnel)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Pour confirmer votre identité"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.5)")}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            {/* Messages d'erreur */}
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
                  ✓ Galerie trouvée — redirection en cours…
                </motion.p>
              )}
            </AnimatePresence>

            {/* Bouton */}
            <button type="submit" disabled={status === "loading" || status === "success"}
              className="font-dm"
              style={{
                width: "100%", padding: "16px 24px", marginTop: 4,
                background: status === "success" ? "#2ECC71" : "#C9A84C",
                color: "#0a0a0a", border: "none", borderRadius: 6,
                fontSize: 13, fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", cursor: status === "loading" ? "wait" : "pointer",
                opacity: status === "loading" ? 0.7 : 1,
                transition: "opacity 0.2s, background 0.3s",
              }}>
              {status === "loading" ? "Vérification…" : status === "success" ? "✓ Accès confirmé" : "Accéder à ma galerie →"}
            </button>
          </form>

          <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: 18, letterSpacing: "0.04em" }}>
            Vous avez reçu ce code de votre organisateur · Accès gratuit
          </p>
        </motion.div>

        {/* ── Capture email si code non trouvé ──────────────── */}
        <AnimatePresence>
          {status === "error_notfound" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              style={{ maxWidth: 480, margin: "16px auto 0", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, padding: "28px 32px" }}
            >
              {!notifySent ? (
                <>
                  <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: 20 }}>
                    Votre galerie n'est pas encore disponible ?<br />
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>Laissez votre email — on vous avertit dès qu'elle est en ligne.</span>
                  </p>
                  <form onSubmit={handleNotify} style={{ display: "flex", gap: 10 }}>
                    <input
                      type="email"
                      value={notifyEmail}
                      onChange={e => setNotifyEmail(e.target.value)}
                      placeholder="votre@email.com"
                      required
                      style={{ ...inputStyle, flex: 1 }}
                      onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.5)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    <button type="submit" disabled={notifyLoading} className="font-dm"
                      style={{ padding: "14px 20px", background: "#C9A84C", color: "#0a0a0a", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", cursor: "pointer", whiteSpace: "nowrap", opacity: notifyLoading ? 0.7 : 1 }}>
                      {notifyLoading ? "…" : "M'avertir →"}
                    </button>
                  </form>
                </>
              ) : (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-dm"
                  style={{ fontSize: 14, color: "#2ECC71", textAlign: "center" }}>
                  ✓ Reçu ! On vous contacte dès que votre galerie est disponible.
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── SECTION 4 : CTA ORGANISATEURS ────────────────────── */}
      <section style={{ background: "#0f0f0f", borderTop: "1px solid rgba(201,168,76,0.2)", padding: "80px 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.7 }}
          style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}
        >
          <span className="font-dm" style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.25)", padding: "5px 18px", borderRadius: 9999, background: "rgba(201,168,76,0.05)", marginBottom: 28 }}>
            Pour les organisateurs
          </span>

          <h2 className="font-bebas" style={{ fontSize: "clamp(36px, 5vw, 56px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, marginBottom: 18 }}>
            Vous organisez un événement ?
          </h2>

          <p className="font-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: 36 }}>
            Offrez à vos participants une galerie photo professionnelle clés en main.<br />
            Livraison dans les 48h après l'événement.
          </p>

          <a href="https://calendly.com/massishot-ca/30min" target="_blank" rel="noopener noreferrer"
            className="font-dm"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "17px 40px", background: "#C9A84C", color: "#0a0a0a", borderRadius: 9999, fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase", boxShadow: "0 0 32px rgba(201,168,76,0.2)", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 52px rgba(201,168,76,0.35)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(201,168,76,0.2)"; }}
          >
            Parlons de votre événement →
          </a>
        </motion.div>
      </section>

    </main>
  );
}

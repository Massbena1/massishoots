"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const SESSION_KEY = "exit_intent_shown";
const CTA_INTERACTION_KEY = "cta_interaction";
const MOBILE_IDLE_MS = 40_000;

const SECTEURS_FR = [
  "Restaurant", "Mode/Lifestyle", "Tech", "Immobilier",
  "Santé/Bien-être", "Coach/Consultant", "Événementiel", "Autre",
];
const SECTEURS_EN = [
  "Restaurant", "Fashion/Lifestyle", "Tech", "Real Estate",
  "Health/Wellness", "Coach/Consultant", "Events", "Other",
];

export default function ExitIntentPopup() {
  const t = useTranslations("exitIntent");
  const locale = useLocale();
  const secteurs = locale === "fr" ? SECTEURS_FR : SECTEURS_EN;

  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [secteur, setSecteur] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoCloseRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shownRef = useRef(false);

  const show = useCallback(() => {
    if (shownRef.current) return;
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(SESSION_KEY)) return;
    shownRef.current = true;
    setVisible(true);
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem(SESSION_KEY, "1");
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    if (autoCloseRef.current) clearTimeout(autoCloseRef.current);
  }, []);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(SESSION_KEY)) return;

    const checkIsMobile = () => window.innerWidth <= 768;
    setIsMobile(checkIsMobile());

    const handleResize = () => setIsMobile(checkIsMobile());
    window.addEventListener("resize", handleResize);

    if (checkIsMobile()) {
      // Mobile logic
      let idleTimer: ReturnType<typeof setTimeout> | null = null;
      let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

      const resetIdleTimer = () => {
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(show, MOBILE_IDLE_MS);
      };

      const checkScrollBottom = () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const scrollPosition = window.scrollY + window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;

          // If scrolled to bottom (within 100px threshold)
          if (scrollPosition >= documentHeight - 100) {
            // Check if user has interacted with any CTA
            const hasCtaInteraction = sessionStorage.getItem(CTA_INTERACTION_KEY);
            if (!hasCtaInteraction) {
              show();
            }
          }
        }, 150);
      };

      // Track CTA interactions
      const trackCtaInteraction = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.matches('a[href*="portfolio"], a[href*="contact"], a[href*="tarifs"], button[type="submit"], .cta-button, .book-button')) {
          sessionStorage.setItem(CTA_INTERACTION_KEY, "1");
        }
      };

      const events = ["touchstart", "touchmove", "click"] as const;
      events.forEach(e => window.addEventListener(e, resetIdleTimer, { passive: true }));
      events.forEach(e => window.addEventListener(e, trackCtaInteraction, { passive: true }));
      window.addEventListener("scroll", checkScrollBottom, { passive: true });

      resetIdleTimer();

      return () => {
        if (idleTimer) clearTimeout(idleTimer);
        if (scrollTimeout) clearTimeout(scrollTimeout);
        events.forEach(e => window.removeEventListener(e, resetIdleTimer));
        events.forEach(e => window.removeEventListener(e, trackCtaInteraction));
        window.removeEventListener("scroll", checkScrollBottom);
        window.removeEventListener("resize", handleResize);
      };
    } else {
      // Desktop logic
      const onMouseLeave = (e: MouseEvent) => { if (e.clientY <= 10) show(); };
      document.addEventListener("mouseleave", onMouseLeave);
      return () => {
        document.removeEventListener("mouseleave", onMouseLeave);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [show]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, close]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prenom.trim() || !email.trim()) {
      setError(t("errorRequired"));
      return;
    }
    setLoading(true);
    setError("");
    try {
      await fetch("/api/exit-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom: prenom.trim(), email: email.trim(), secteur }),
      });
      setStep("success");
      autoCloseRef.current = setTimeout(close, 8000);
    } catch {
      setError(t("errorServer"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: isMobile ? "flex-end" : "center",
            justifyContent: "center",
            padding: isMobile ? 0 : 24,
          }}
        >
          <motion.div
            initial={isMobile ? { opacity: 0, y: "100%" } : { opacity: 0, scale: 0.95 }}
            animate={isMobile ? { opacity: 1, y: "0%" } : { opacity: 1, scale: 1 }}
            exit={isMobile ? { opacity: 0, y: "100%" } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: isMobile ? 0.3 : 0.3, ease: "easeOut" }}
            onClick={e => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: isMobile ? "100%" : 520,
              maxHeight: isMobile ? "85vh" : "auto",
              background: "#0f0f0f",
              border: "0.5px solid #C9A84C",
              borderRadius: isMobile ? "16px 16px 0 0" : 4,
              overflow: isMobile ? "auto" : "hidden",
            }}
          >
            {/* Gold top line */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 1,
              background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
            }} />

            {/* Close button */}
            <button
              onClick={close}
              style={{
                position: "absolute", top: 18, right: 20,
                background: "none", border: "none",
                fontSize: 20, lineHeight: 1,
                color: "#555", cursor: "pointer",
                padding: "4px 6px",
                transition: "color 0.2s",
                zIndex: 2,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#C9A84C")}
              onMouseLeave={e => (e.currentTarget.style.color = "#555")}
              aria-label="Fermer"
            >
              ✕
            </button>

            <AnimatePresence mode="wait">
              {step === "form" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    padding: isMobile ? "40px 24px 32px" : "52px 40px 40px",
                    textAlign: "center"
                  }}
                >
                  {/* Badge */}
                  <span className="font-dm" style={{
                    display: "inline-block",
                    fontSize: 10, letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "#C9A84C",
                    border: "1px solid rgba(201,168,76,0.3)",
                    padding: "5px 16px", borderRadius: 9999,
                    marginBottom: 24,
                  }}>
                    {t("badge")}
                  </span>

                  <h2 className="font-bebas" style={{
                    fontSize: isMobile ? "clamp(36px, 8vw, 48px)" : "clamp(44px, 7vw, 64px)",
                    lineHeight: 0.9, letterSpacing: "0.02em",
                    color: "#fff", marginBottom: 8,
                  }}>
                    {t("heading1")}
                  </h2>

                  <p className="font-dm" style={{
                    fontSize: isMobile ? 13 : 14,
                    fontStyle: "italic", color: "#C9A84C",
                    lineHeight: 1.4, marginBottom: isMobile ? 16 : 20,
                  }}>
                    {t("heading2")}
                  </p>

                  <div style={{ width: 36, height: 1, background: "rgba(201,168,76,0.35)", margin: "0 auto 20px" }} />

                  <p className="font-dm" style={{
                    fontSize: isMobile ? 12 : 13,
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.75,
                    maxWidth: isMobile ? "100%" : 340,
                    margin: isMobile ? "0 auto 20px" : "0 auto 28px",
                  }}>
                    {t("subtext")}
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: isMobile ? 8 : 10, textAlign: "left" }}>
                    <div style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      gap: isMobile ? 8 : 10
                    }}>
                      <input
                        type="text"
                        placeholder={t("fieldPrenom")}
                        value={prenom}
                        onChange={e => setPrenom(e.target.value)}
                        className="font-dm"
                        style={{
                          flex: 1, padding: "13px 16px",
                          background: "#1a1a1a",
                          border: "1px solid #333",
                          borderRadius: 3, color: "#fff", fontSize: 13,
                          outline: "none", fontFamily: "var(--font-dm-sans), sans-serif",
                        }}
                        onFocus={e => (e.currentTarget.style.borderColor = "#C9A84C")}
                        onBlur={e => (e.currentTarget.style.borderColor = "#333")}
                      />
                      <input
                        type="email"
                        placeholder={t("fieldEmail")}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="font-dm"
                        style={{
                          flex: 1.4, padding: "13px 16px",
                          background: "#1a1a1a",
                          border: "1px solid #333",
                          borderRadius: 3, color: "#fff", fontSize: 13,
                          outline: "none", fontFamily: "var(--font-dm-sans), sans-serif",
                        }}
                        onFocus={e => (e.currentTarget.style.borderColor = "#C9A84C")}
                        onBlur={e => (e.currentTarget.style.borderColor = "#333")}
                      />
                    </div>

                    <select
                      value={secteur}
                      onChange={e => setSecteur(e.target.value)}
                      className="font-dm"
                      style={{
                        width: "100%", padding: "13px 16px",
                        background: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: 3, color: secteur ? "#fff" : "rgba(255,255,255,0.35)",
                        fontSize: 13, outline: "none",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        cursor: "pointer",
                        appearance: "none",
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = "#C9A84C")}
                      onBlur={e => (e.currentTarget.style.borderColor = "#333")}
                    >
                      <option value="" disabled>{t("fieldSecteur")}</option>
                      {secteurs.map(s => <option key={s} value={s} style={{ background: "#1a1a1a", color: "#fff" }}>{s}</option>)}
                    </select>

                    {error && (
                      <p className="font-dm" style={{ fontSize: 12, color: "rgba(239,68,68,0.8)", margin: "2px 0 0" }}>{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="font-dm"
                      style={{
                        marginTop: 4,
                        width: "100%", padding: "15px 24px",
                        background: loading ? "rgba(201,168,76,0.5)" : "#C9A84C",
                        color: "#0a0a0a", borderRadius: 3, border: "none",
                        fontSize: 13, fontWeight: 700, letterSpacing: "0.08em",
                        textTransform: "uppercase", cursor: loading ? "default" : "pointer",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.88"; }}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                    >
                      {loading ? t("sending") : t("cta")}
                    </button>
                  </form>

                  <button
                    onClick={close}
                    className="font-dm"
                    style={{
                      marginTop: 16, background: "none", border: "none",
                      fontSize: 12, color: "rgba(255,255,255,0.2)",
                      cursor: "pointer", letterSpacing: "0.04em",
                      transition: "color 0.2s", display: "block", width: "100%",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
                  >
                    {t("secondary")}
                  </button>

                  <p className="font-dm" style={{
                    fontSize: 10, color: "rgba(255,255,255,0.15)",
                    letterSpacing: "0.08em", marginTop: 18,
                  }}>
                    {t("footnote")}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{
                    padding: isMobile ? "48px 24px 40px" : "60px 40px 52px",
                    textAlign: "center"
                  }}
                >
                  {/* ✦ gold animé */}
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ fontSize: 40, color: "#C9A84C", marginBottom: 24, lineHeight: 1 }}
                  >
                    ✦
                  </motion.div>

                  <h2 className="font-bebas" style={{
                    fontSize: "clamp(36px, 6vw, 54px)",
                    lineHeight: 1, letterSpacing: "0.03em",
                    color: "#fff", marginBottom: 16,
                  }}>
                    {t("successTitle")}
                  </h2>

                  <div style={{ width: 36, height: 1, background: "rgba(201,168,76,0.35)", margin: "0 auto 20px" }} />

                  <p className="font-dm" style={{
                    fontSize: 14, color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.8, maxWidth: 340, margin: "0 auto 32px",
                  }}>
                    {t("successText")}
                  </p>

                  <Link
                    href={`/${locale}/portfolio`}
                    onClick={close}
                    className="font-dm"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "13px 28px",
                      background: "rgba(201,168,76,0.1)",
                      border: "1px solid rgba(201,168,76,0.4)",
                      color: "#C9A84C", borderRadius: 3,
                      fontSize: 13, fontWeight: 600, letterSpacing: "0.06em",
                      textDecoration: "none", transition: "background 0.2s",
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.18)")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.1)")}
                  >
                    {t("successCta")}
                  </Link>

                  {/* Auto-close progress bar */}
                  <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 8, ease: "linear" }}
                    style={{
                      position: "absolute", bottom: 0, left: 0,
                      height: 2,
                      background: "linear-gradient(to right, #C9A84C, transparent)",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

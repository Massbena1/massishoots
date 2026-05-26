"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CalendarWithTime } from "@/components/ui/calendar-with-time-pressets";
import {
  Mail, MapPin, Clock, AtSign,
  CheckCircle2, ArrowRight, Phone, BadgeCheck,
  Video, Calendar,
} from "lucide-react";
import { useTranslations } from "next-intl";

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "16px 20px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: 14,
  color: "#fff",
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.25s, background 0.25s",
  fontFamily: "var(--font-dm-sans), sans-serif",
  boxSizing: "border-box",
};

const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "rgba(196,205,214,0.5)";
  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
};
const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
};

export default function Contact() {
  const t = useTranslations("contact");
  const processSteps = t.raw("processSteps") as Array<{ n: string; title: string; desc: string }>;
  const projectTypes = t.raw("projectTypes") as Array<{ value: string; label: string }>;
  const budgets = t.raw("budgets") as Array<{ value: string; label: string }>;

  const [form, setForm] = useState({ nom: "", email: "", telephone: "", type: "", budget: "", message: "" });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const heroRef = useRef(null);
  const mainRef = useRef(null);
  const processRef = useRef(null);
  const bottomRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const mainInView = useInView(mainRef, { once: true, margin: "-60px" });
  const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const bottomInView = useInView(bottomRef, { once: true, margin: "-60px" });


  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom.trim() || !form.email.trim()) {
      setError("Veuillez remplir votre nom et email.");
      return;
    }
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date: formattedDate ?? null,
          time: selectedTime,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
      } else {
        setError("Erreur lors de l'envoi. Contacte-moi directement sur Instagram ou par email.");
      }
    } catch {
      setError("Erreur reseau. Contacte-moi directement sur Instagram ou par email.");
    }
  };

  const formattedDate = selectedDate?.toLocaleDateString("fr-CA", {
    weekday: "long", day: "numeric", month: "long",
  });

  return (
    <section id="contact" style={{ paddingTop: 0 }}>

      {/* ── HERO ── */}
      <div
        ref={heroRef}
        style={{
          minHeight: "55vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "140px 24px 64px",
          position: "relative",
        }}
      >
        <div style={{
          position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)",
          width: 600, height: 300,
          background: "radial-gradient(ellipse, rgba(196,205,214,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 18px", borderRadius: 9999,
            background: "rgba(74,222,128,0.08)",
            border: "1px solid rgba(74,222,128,0.22)",
            marginBottom: 28,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
          <span className="font-dm" style={{ fontSize: 11, color: "#4ade80", letterSpacing: "0.22em", textTransform: "uppercase" }}>
            Consultation gratuite · 30 min
          </span>
        </motion.div>

        <motion.h1
          className="font-bebas"
          initial={{ opacity: 0, y: 24 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: "clamp(56px, 10vw, 120px)", lineHeight: 0.9, letterSpacing: "0.02em", color: "#fff", marginBottom: 24 }}
        >
          {t("heading1")}<br />
          <span style={{ color: "#c4cdd6" }}>{t("heading2")}</span>
        </motion.h1>

        <motion.p
          className="font-dm"
          initial={{ opacity: 0, y: 16 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22 }}
          style={{ fontSize: "clamp(14px, 1.8vw, 17px)", color: "rgba(255,255,255,0.4)", maxWidth: 480, lineHeight: 1.8, marginBottom: 32 }}
        >
          Remplis le formulaire et choisis un créneau.{" "}
          <em style={{ color: "rgba(255,255,255,0.6)" }}>On se parle dans les 24h.</em>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", justifyContent: "center" }}
        >
          {[
            { icon: Video,    text: "Appel vidéo ou téléphone" },
            { icon: Clock,    text: "30 minutes" },
            { icon: Calendar, text: "Ton créneau, ta dispo" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon size={13} color="rgba(196,205,214,0.5)" />
              <span className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── FORMULAIRE + CALENDRIER ── */}
      <div
        id="contact-form"
        ref={mainRef}
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 100px" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="contact-main-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>

            {/* LEFT — Infos */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={mainInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 24,
                padding: "36px 32px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />

              <div style={{ marginBottom: 28 }}>
                <span className="font-bebas" style={{ fontSize: 11, color: "rgba(196,205,214,0.5)", letterSpacing: "0.25em", display: "block", marginBottom: 8 }}>
                  01 — TES INFORMATIONS
                </span>
                <h2 className="font-bebas" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", color: "#fff", letterSpacing: "0.02em", lineHeight: 1 }}>
                  {t("formHeading")}
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="form-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input
                    required
                    placeholder="Nom complet *"
                    value={form.nom}
                    onChange={set("nom")}
                    onFocus={onFocus} onBlur={onBlur}
                    style={inputBase}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email *"
                    value={form.email}
                    onChange={set("email")}
                    onFocus={onFocus} onBlur={onBlur}
                    style={inputBase}
                  />
                </div>

                <div className="form-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input
                    type="tel"
                    placeholder={t("telPlaceholder")}
                    value={form.telephone}
                    onChange={set("telephone")}
                    onFocus={onFocus} onBlur={onBlur}
                    style={inputBase}
                  />
                  <select
                    required
                    value={form.type}
                    onChange={set("type")}
                    onFocus={onFocus} onBlur={onBlur}
                    style={{ ...inputBase, color: form.type ? "#fff" : "rgba(255,255,255,0.35)", appearance: "none" }}
                  >
                    <option value="" disabled>{t("typeLabel")}</option>
                    {projectTypes.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>

                <select
                  value={form.budget}
                  onChange={set("budget")}
                  onFocus={onFocus} onBlur={onBlur}
                  style={{ ...inputBase, color: form.budget ? "#fff" : "rgba(255,255,255,0.35)", appearance: "none" }}
                >
                  <option value="" disabled>{t("budgetLabel")}</option>
                  {budgets.map(b => (
                    <option key={b.value} value={b.value}>{b.label}</option>
                  ))}
                </select>

                <div style={{ position: "relative" }}>
                  <textarea
                    rows={5}
                    placeholder="Décris ton projet en quelques mots (optionnel)"
                    value={form.message}
                    onChange={set("message")}
                    onFocus={onFocus as React.FocusEventHandler}
                    onBlur={onBlur as React.FocusEventHandler}
                    style={{ ...inputBase, resize: "none", lineHeight: 1.7 }}
                  />
                  <span className="font-dm" style={{ position: "absolute", bottom: 12, right: 16, fontSize: 10, color: "rgba(255,255,255,0.18)" }}>
                    {form.message.length} car.
                  </span>
                </div>

                {/* Error */}
                {error && (
                  <p className="font-dm" style={{ fontSize: 12, color: "#f87171", letterSpacing: "0.02em" }}>{error}</p>
                )}

                {/* Info garantees */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "16px 0 4px" }}>
                  {["Aucun engagement", "Réponse sous 24h", "100% gratuit"].map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <CheckCircle2 size={13} color="#c4cdd6" style={{ opacity: 0.7, flexShrink: 0 }} />
                      <span className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT — Calendrier */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={mainInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ marginBottom: 16 }}>
                <span className="font-bebas" style={{ fontSize: 11, color: "rgba(196,205,214,0.5)", letterSpacing: "0.25em", display: "block", marginBottom: 4 }}>
                  02 — CHOISIS UN CRÉNEAU
                </span>
                <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
                  Sélectionne ta date et heure préférée. La disponibilité réelle sera confirmée dans l&apos;étape suivante.
                </p>
              </div>

              <CalendarWithTime
                hideButton
                onSelect={(date, time) => {
                  setSelectedDate(date);
                  setSelectedTime(time);
                }}
              />

              {/* Selected summary */}
              <AnimatePresence>
                {selectedDate && selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      marginTop: 14,
                      padding: "14px 18px",
                      borderRadius: 14,
                      background: "rgba(196,205,214,0.07)",
                      border: "1px solid rgba(196,205,214,0.2)",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Calendar size={14} color="#c4cdd6" style={{ flexShrink: 0 }} />
                    <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                      Préférence :{" "}
                      <span style={{ color: "#fff", fontWeight: 600 }}>{formattedDate}</span>
                      {" "}à{" "}
                      <span style={{ color: "#c4cdd6", fontWeight: 600 }}>{selectedTime}</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ── SUBMIT BUTTON (full width) ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={mainInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ marginTop: 24 }}
          >
            <motion.button
              type="submit"
              whileHover={{ scale: 1.015, boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2 }}
              className="font-dm"
              style={{
                width: "100%",
                padding: "22px",
                background: submitted ? "rgba(74,222,128,0.1)" : "#f2f0ec",
                color: submitted ? "#4ade80" : "#0a0a0a",
                borderRadius: 18,
                border: submitted ? "1px solid rgba(74,222,128,0.3)" : "none",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "background 0.3s, color 0.3s",
                cursor: submitted ? "default" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.span key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckCircle2 size={16} /> Demande envoyee — on te repond sous 24h !
                  </motion.span>
                ) : (
                  <motion.span key="submit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    Envoyer ma demande <ArrowRight size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", textAlign: "center", letterSpacing: "0.04em", marginTop: 12 }}>
              {t("privacy")}
            </p>
          </motion.div>
        </form>
      </div>

      {/* ── PROCESS ── */}
      <div ref={processRef} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 120px" }}>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)", marginBottom: 80 }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={processInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span className="font-dm" style={{ fontSize: 10, letterSpacing: "0.28em", color: "#c4cdd6", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
            {t("processLabel")}
          </span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "#fff", letterSpacing: "0.02em", lineHeight: 0.95 }}>
            {t("processHeading")}
          </h2>
        </motion.div>

        <div className="process-steps" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {processSteps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 28 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: "28px 24px", borderRadius: 20,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                position: "relative", overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 16, right: 16, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />
              <span className="font-bebas" style={{ fontSize: 11, color: "rgba(196,205,214,0.4)", letterSpacing: "0.2em", display: "block", marginBottom: 16 }}>
                {step.n}
              </span>
              <h3 className="font-bebas" style={{ fontSize: 22, color: "#fff", letterSpacing: "0.04em", lineHeight: 1.1, marginBottom: 10 }}>
                {step.title}
              </h3>
              <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", lineHeight: 1.75 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── QUICK CONTACT + CTA ── */}
      <div ref={bottomRef} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 140px" }}>
        <div className="bottom-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

          {/* Quick contact */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={bottomInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ padding: "36px", borderRadius: 24, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", gap: 14 }}
          >
            <div style={{ marginBottom: 8 }}>
              <p className="font-dm" style={{ fontSize: 10, letterSpacing: "0.22em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 8 }}>{t("quickLabel")}</p>
              <h3 className="font-bebas" style={{ fontSize: "clamp(22px, 2.5vw, 32px)", color: "#fff", letterSpacing: "0.02em", lineHeight: 1 }}>{t("quickHeading")}</h3>
            </div>
            {[
              { icon: AtSign, label: "Instagram", sub: "@massishoots",          href: "https://instagram.com/massishoots" },
              { icon: Mail,   label: "Email",     sub: "massi@massishoots.com", href: "mailto:massi@massishoots.com" },
              { icon: Phone,  label: "WhatsApp",  sub: t("whatsappSub"),        href: "https://wa.me/14384640607" },
            ].map(({ icon: Icon, label, sub, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="quick-link"
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none", transition: "all 0.25s" }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(196,205,214,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={15} color="#c4cdd6" />
                </div>
                <div>
                  <p className="font-dm" style={{ fontSize: 13, color: "#fff", fontWeight: 600, marginBottom: 1 }}>{label}</p>
                  <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.38)" }}>{sub}</p>
                </div>
                <ArrowRight size={13} color="rgba(255,255,255,0.25)" style={{ marginLeft: "auto" }} />
              </a>
            ))}
          </motion.div>

          {/* CTA Final */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={bottomInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ padding: "48px 40px", borderRadius: 24, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}
          >
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: 1, background: "linear-gradient(90deg, transparent, rgba(196,205,214,0.25), transparent)" }} />
            <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 300, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,205,214,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

            <h2 className="font-bebas" style={{ fontSize: "clamp(36px, 4vw, 56px)", color: "#fff", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: 14 }}>
              {t("ctaHeading1")}<br />
              <span style={{ color: "#c4cdd6" }}>{t("ctaHeading2")}</span>
            </h2>
            <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", maxWidth: 320, margin: "0 auto 28px", lineHeight: 1.8 }}>
              {t("ctaDesc")}
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
              <a
                href="#contact-form"
                className="font-dm"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 9999, background: "#f2f0ec", color: "#0a0a0a", textDecoration: "none", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                {t("ctaSendBtn")} <ArrowRight size={13} />
              </a>
              <a
                href="https://instagram.com/massishoots"
                target="_blank"
                rel="noopener noreferrer"
                className="font-dm"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 12, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(196,205,214,0.35)"; e.currentTarget.style.color = "#c4cdd6"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
              >
                <BadgeCheck size={13} /> {t("ctaInstagramBtn")}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MOBILE STICKY BAR ── */}
      <div className="mobile-contact-bar">
        {[
          { icon: Phone,  href: "https://wa.me/14384640607",         label: "WhatsApp", color: "#25D366" },
          { icon: Mail,   href: "mailto:massishot.ca@gmail.com",      label: "Email",    color: "#c4cdd6" },
          { icon: AtSign, href: "https://instagram.com/massishoots",  label: "Instagram", color: "#E1306C" },
        ].map(({ icon: Icon, href, label, color }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="mobile-bar-btn"
          >
            <div className="mobile-bar-icon" style={{ background: `${color}18`, border: `1px solid ${color}33` }}>
              <Icon size={20} color={color} />
            </div>
            <span className="font-dm mobile-bar-label">{label}</span>
          </a>
        ))}
      </div>

      <style>{`
        .contact-main-grid { display: grid; }
        .quick-link:hover { background: rgba(255,255,255,0.06) !important; border-color: rgba(196,205,214,0.2) !important; }
        select option { background: #111; color: #fff; }

        .mobile-contact-bar {
          display: none;
        }

        @media (max-width: 1024px) {
          .contact-main-grid { grid-template-columns: 1fr !important; }
          .bottom-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .process-steps { grid-template-columns: 1fr 1fr !important; }
          .form-row-2 { grid-template-columns: 1fr !important; }

          .mobile-contact-bar {
            display: flex;
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 100;
            gap: 12px;
            background: rgba(10,10,10,0.85);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 9999px;
            padding: 10px 20px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          }

          .mobile-bar-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            text-decoration: none;
            padding: 4px 8px;
          }

          .mobile-bar-icon {
            width: 44px;
            height: 44px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .mobile-bar-label {
            font-size: 9px;
            color: rgba(255,255,255,0.45);
            letter-spacing: 0.06em;
            text-transform: uppercase;
          }
        }
        @media (max-width: 480px) {
          .process-steps { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { CalendarWithTime } from "@/components/ui/calendar-with-time-pressets";
import { Mail, MapPin, Clock, Camera, AtSign } from "lucide-react";

const inputStyle = {
  width: "100%", padding: "16px 20px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12, color: "#fff",
  fontSize: 14, outline: "none",
  transition: "border-color 0.25s",
  fontFamily: "inherit",
  boxSizing: "border-box" as const,
};

export default function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", type: "", message: "" });
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);
  const inView = useInView(formRef, { once: true, margin: "-80px" });

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ nom: "", email: "", type: "", message: "" });
  };

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.currentTarget.style.borderColor = "#c4cdd6");
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)");

  return (
    <section id="contact">
      {/* Lamp header */}
      <LampContainer>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: "easeInOut" }}
          style={{ textAlign: "center" }}
        >
          <span className="font-dm" style={{ fontSize: 11, letterSpacing: "0.3em", color: "#c4cdd6", textTransform: "uppercase", display: "block", marginBottom: 20 }}>
            — Travaillons ensemble
          </span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(56px, 9vw, 110px)", lineHeight: 0.88, letterSpacing: "0.02em", color: "#fff", marginBottom: 24 }}>
            PRÊT À CRÉER<br />
            <span style={{ color: "#c4cdd6" }}>QUELQUE CHOSE ?</span>
          </h2>
          <p className="font-dm" style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", maxWidth: 420, margin: "0 auto 40px", lineHeight: 1.75 }}>
            Décrivez votre projet. Je vous réponds sous 24h avec une proposition personnalisée.
          </p>
          <a href="#contact-form" className="font-dm"
            style={{ display: "inline-block", padding: "14px 32px", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", borderRadius: 9999, fontSize: 13, textDecoration: "none", transition: "all 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#c4cdd6"; e.currentTarget.style.color = "#c4cdd6"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}>
            Remplir le formulaire ↓
          </a>
        </motion.div>
      </LampContainer>

      {/* Form section */}
      <div id="contact-form" ref={formRef} style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px 120px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="contact-grid">

        {/* Left — contact card */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>

          {/* Profile card */}
          <div style={{
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: 16,
          }}>
            {/* Top highlight */}
            <div style={{ position: "absolute", top: 0, left: 20, right: 20, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }} />

            {/* Cover photo */}
            <div style={{ position: "relative", height: 140, overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80"
                alt="Massishoots"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.4) saturate(0.6)" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(7,9,13,0.8) 100%)" }} />
            </div>

            {/* Avatar + name */}
            <div style={{ padding: "0 24px 24px", marginTop: -44, position: "relative" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 20 }}>
                <img
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=80"
                  alt="Massi Bena"
                  style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(196,205,214,0.4)", flexShrink: 0 }}
                />
                <div style={{ paddingBottom: 4 }}>
                  <p className="font-bebas" style={{ fontSize: 22, letterSpacing: "0.08em", color: "#fff", lineHeight: 1 }}>MASSI BENA</p>
                  <p className="font-dm" style={{ fontSize: 12, color: "#c4cdd6", marginTop: 3, letterSpacing: "0.06em" }}>Photographe & Vidéaste · Montréal</p>
                </div>
              </div>

              {/* Info rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: Mail,      label: "hello@massishoots.com", href: "mailto:hello@massishoots.com" },
                  { icon: AtSign,    label: "@massishoots",           href: "https://instagram.com/massishoots" },
                  { icon: MapPin,    label: "Montréal, QC",           href: null },
                  { icon: Clock,     label: "Réponse sous 24h",       href: null },
                ].map(({ icon: Icon, label, href }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                      background: "rgba(196,205,214,0.07)",
                      border: "1px solid rgba(196,205,214,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={14} color="#c4cdd6" />
                    </div>
                    {href ? (
                      <a href={href} className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>
                        {label}
                      </a>
                    ) : (
                      <span className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{label}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gear + stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[
              { val: "50+",  label: "Clients" },
              { val: "200+", label: "Projets" },
            ].map(({ val, label }) => (
              <div key={label} style={{
                padding: "18px 20px", borderRadius: 18, textAlign: "center",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.07)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 0, left: 8, right: 8, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />
                <p className="font-bebas" style={{ fontSize: 32, color: "#c4cdd6", lineHeight: 1 }}>{val}</p>
                <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Gear tag */}
          <div style={{
            padding: "14px 18px", borderRadius: 16,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <Camera size={16} color="rgba(196,205,214,0.5)" style={{ flexShrink: 0 }} />
            <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
              Sony A7 III · DJI Mini 5 Pro · DJI RS 4 Mini · Aputure MC Pro
            </p>
          </div>

          {/* Calendar */}
          <div style={{ marginTop: 16 }}>
            <p className="font-dm" style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 10 }}>
              Choisir une date de tournage
            </p>
            <CalendarWithTime />
          </div>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.15 }}>
          <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="form-row">
              <input required placeholder="Votre nom" value={form.nom}
                onChange={e => setForm({ ...form, nom: e.target.value })}
                onFocus={focus} onBlur={blur} style={inputStyle} />
              <input required type="email" placeholder="Votre email" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                onFocus={focus} onBlur={blur} style={inputStyle} />
            </div>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
              onFocus={focus} onBlur={blur}
              style={{ ...inputStyle, color: form.type ? "#fff" : "rgba(255,255,255,0.35)" }}>
              <option value="" disabled>Type de projet</option>
              <option value="branding">Personal Branding</option>
              <option value="corporate">Corporate B2B</option>
              <option value="events">Events &amp; Weddings</option>
              <option value="autre">Autre</option>
            </select>
            <textarea required rows={6} placeholder="Décrivez votre projet..." value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              onFocus={focus as React.FocusEventHandler} onBlur={blur as React.FocusEventHandler}
              style={{ ...inputStyle, resize: "none" }} />
            <button type="submit" className="font-dm"
              style={{ padding: "18px", background: sent ? "rgba(196,205,214,0.12)" : "#c4cdd6", color: sent ? "#c4cdd6" : "#0a0a0a", borderRadius: 12, border: sent ? "1px solid #c4cdd6" : "none", fontSize: 14, fontWeight: 700, letterSpacing: "0.06em", transition: "all 0.3s", marginTop: 4, textTransform: "uppercase" }}>
              {sent ? "✓ Message envoyé" : "Envoyer le message"}
            </button>
          </form>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
        select option { background: #111; color: #fff; }
      `}</style>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Head from "next/head";

const GOLD = "#C9A84C";

const ACTIONS = [
  {
    num: "01",
    title: "Réservez votre créneau",
    text: "Ne perdez pas de temps — réservez directement votre appel de 30 minutes pour qu'on puisse démarrer dès cette semaine.",
    cta: "Réserver maintenant →",
    href: "https://calendly.com/massishot-ca/30min",
    primary: true,
    external: true,
  },
  {
    num: "02",
    title: "Analysez votre Instagram",
    text: "Pendant qu'on prépare votre proposition, obtenez un rapport gratuit sur votre profil Instagram en 30 secondes.",
    cta: "Analyser mon profil →",
    href: "/fr/analyse-instagram",
    primary: false,
    external: false,
  },
  {
    num: "03",
    title: "Inspirez-vous du portfolio",
    text: "Découvrez nos réalisations récentes et notez ce qui vous inspire — ça nous aidera à construire votre offre sur mesure.",
    cta: "Voir le portfolio →",
    href: "/fr/portfolio",
    primary: false,
    external: false,
  },
];

const SOCIAL = [
  {
    label: "Instagram @massishoots",
    href: "https://instagram.com/massishoots",
    external: true,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Voir le portfolio",
    href: "/fr/portfolio",
    external: false,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    label: "Analyser mon Instagram",
    href: "/fr/analyse-instagram",
    external: false,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
];

export default function MerciPage() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <main style={{ background: "#000", minHeight: "100vh" }}>

        {/* ── SECTION 1 — CONFIRMATION ──────────────────────── */}
        <section className="hero-padding" style={{ padding: "160px 24px 100px", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

            {/* Icône ✦ pulse */}
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 0.9, times: [0, 0.5, 1], repeat: 0, ease: "easeInOut" }}
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 72, height: 72, borderRadius: "50%", border: `1px solid rgba(201,168,76,0.35)`, background: "rgba(201,168,76,0.07)", marginBottom: 40 }}
            >
              <span style={{ fontSize: 26, color: GOLD, lineHeight: 1 }}>✦</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
              <h1 className="font-bebas" style={{ fontSize: "clamp(52px, 8vw, 96px)", color: "#fff", letterSpacing: "0.04em", lineHeight: 0.95, marginBottom: 20 }}>
                Message reçu.
              </h1>
              <p className="font-bebas" style={{ fontSize: "clamp(20px, 3vw, 30px)", color: GOLD, letterSpacing: "0.06em", marginBottom: 24, lineHeight: 1.2 }}>
                Massi va analyser votre demande<br />et vous recontacter sous 24h.
              </p>
              <p className="font-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.38)", lineHeight: 1.8, maxWidth: 460, margin: "0 auto" }}>
                En attendant, voici ce qu'on vous recommande de faire pour maximiser votre projet.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ── SECTION 2 — 3 ACTIONS ─────────────────────────── */}
        <section style={{ padding: "0 24px 100px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              style={{ marginBottom: 48 }}>
              <span className="font-dm" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
                — 3 choses à faire maintenant
              </span>
              <h2 className="font-bebas" style={{ fontSize: "clamp(36px, 5vw, 56px)", color: "#fff", letterSpacing: "0.04em", lineHeight: 0.95, marginTop: 10 }}>
                EN ATTENDANT NOTRE RÉPONSE
              </h2>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="merci-cards">
              {ACTIONS.map((a, i) => (
                <motion.div key={a.num}
                  initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.6, delay: i * 0.12 }}
                  style={{ background: "#111", border: `0.5px solid rgba(201,168,76,0.2)`, borderRadius: 12, padding: "36px 32px", display: "flex", flexDirection: "column", gap: 0 }}>
                  <span className="font-bebas" style={{ fontSize: 64, color: "rgba(201,168,76,0.1)", lineHeight: 1, marginBottom: 8, display: "block" }}>{a.num}</span>
                  <h3 className="font-bebas" style={{ fontSize: 26, color: "#fff", letterSpacing: "0.04em", lineHeight: 1.05, marginBottom: 14 }}>{a.title}</h3>
                  <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, flex: 1, marginBottom: 28 }}>{a.text}</p>
                  <a href={a.href} {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="font-dm merci-btn"
                    data-primary={a.primary ? "true" : "false"}
                    style={{
                      display: "inline-block", padding: "13px 22px", borderRadius: 9999,
                      fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                      textDecoration: "none", textAlign: "center", transition: "all 0.2s",
                      background: a.primary ? GOLD : "transparent",
                      color: a.primary ? "#0a0a0a" : GOLD,
                      border: a.primary ? "none" : `1px solid rgba(201,168,76,0.4)`,
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      if (a.primary) { el.style.opacity = "0.85"; }
                      else { el.style.background = "rgba(201,168,76,0.08)"; el.style.borderColor = GOLD; }
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      if (a.primary) { el.style.opacity = "1"; }
                      else { el.style.background = "transparent"; el.style.borderColor = "rgba(201,168,76,0.4)"; }
                    }}
                  >
                    {a.cta}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3 — URGENCE ───────────────────────────── */}
        <section style={{ borderTop: `0.5px solid rgba(201,168,76,0.2)`, borderBottom: `0.5px solid rgba(201,168,76,0.2)`, background: "#0f0f0f", padding: "72px 24px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>

            {/* Point vert animé */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
              <span style={{ position: "relative", display: "inline-flex", width: 10, height: 10 }}>
                <motion.span animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#2ECC71", opacity: 0.5 }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#2ECC71", display: "block" }} />
              </span>
              <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", margin: 0, fontWeight: 500 }}>
                Massi est disponible cette semaine pour <strong style={{ color: "#fff" }}>2 nouveaux projets.</strong>
              </p>
            </div>

            <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", lineHeight: 1.7, marginBottom: 36 }}>
              Les créneaux se remplissent vite —<br />confirmez le vôtre dès maintenant.
            </p>

            <a href="https://calendly.com/massishot-ca/30min" target="_blank" rel="noopener noreferrer" className="font-dm"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "17px 44px", background: GOLD, color: "#0a0a0a", borderRadius: 9999, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", boxShadow: "0 0 36px rgba(201,168,76,0.22)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 54px rgba(201,168,76,0.38)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(201,168,76,0.22)"; }}
            >
              Confirmer mon créneau →
            </a>
          </motion.div>
        </section>

        {/* ── SECTION 4 — RÉSEAUX SOCIAUX ──────────────────── */}
        <section style={{ padding: "72px 24px 100px", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 28 }}>
              En attendant, suivez notre travail
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href} {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="font-dm"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", border: "1px solid #333", borderRadius: 9999, color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: 13, transition: "all 0.2s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = GOLD; el.style.color = GOLD; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#333"; el.style.color = "rgba(255,255,255,0.45)"; }}
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </section>

        <Footer />

        <style>{`
          @media (max-width: 860px) { .merci-cards { grid-template-columns: 1fr !important; } }
          @media (max-width: 560px) { .merci-cards { gap: 14px !important; } }
        `}</style>
      </main>
    </>
  );
}

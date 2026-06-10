"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SERVICES = [
  {
    num: "01",
    title: "Contenu Mensuel",
    desc: "Votre image de marque produite chaque mois sans effort de votre côté. Photos, Reels, face caméra — livrés clés en main. Les entrepreneurs qui travaillent avec nous ne cherchent plus de créateur de contenu.",
    inclus: [
      "Shootings mensuels",
      "Montage vidéo cinématique",
      "Photos éditées haute résolution",
      "Reels optimisés pour Instagram",
      "Révisions incluses",
      "Livraison via espace client privé",
    ],
    pourQui: "Entrepreneurs, coachs, consultants, marques en croissance",
    image: "/portfolio/professionel/1.JPG",
    imagePosition: "center top",
  },
  {
    num: "02",
    title: "Couverture d'Événements",
    desc: "Votre événement immortalisé avec la même précision qu'il a été organisé. Photo + vidéo complète, livraison express 48h.",
    inclus: [
      "Équipe photo + vidéo sur place",
      "Livraison express 48h",
      "Photos éditées en haute résolution",
      "Vidéo recap cinématique",
      "Format Reel Instagram inclus",
      "Droits de diffusion complets",
    ],
    pourQui: "Agences, corporatif, galas, lancements de produits",
    image: "/portfolio/eventt/1.jpg",
    imagePosition: "center center",
  },
  {
    num: "03",
    title: "Publicité & Ads",
    desc: "Des visuels conçus pour arrêter le scroll et déclencher l'action. Formats Meta & Instagram optimisés pour les campagnes qui convertissent réellement.",
    inclus: [
      "Vidéos courtes formats publicitaires",
      "Accroches visuelles testées",
      "Formats adaptés Meta & Instagram",
      "Plusieurs versions pour A/B testing",
      "Motion design inclus",
    ],
    pourQui: "Marques qui veulent scaler leurs campagnes payantes",
    image: "/portfolio/corpo/1.1.jpg",
    imagePosition: "center center",
  },
  {
    num: "04",
    title: "Mariage & Célébrations",
    desc: "Le jour le plus important de votre vie, filmé comme un long-métrage. De la préparation au dernier slow — chaque émotion capturée avec une précision rare.",
    inclus: [
      "Couverture complète de la journée",
      "Photo + film cinématique",
      "Galerie privée en ligne",
      "Highlights Reel 60-90 secondes",
      "Film complet de la cérémonie",
      "Révisions incluses",
    ],
    pourQui: "Couples qui veulent garder chaque moment pour toujours",
    image: "/portfolio/mariage/1.jpg",
    imagePosition: "center center",
  },
];

const STEPS = [
  { num: "01", icon: "📞", title: "L'Appel Stratégique",    desc: "30 minutes pour comprendre votre univers, vos objectifs et votre clientèle cible. On repart avec un concept créatif précis." },
  { num: "02", icon: "✏",  title: "Le Brief Créatif",       desc: "On vous envoie un brief détaillé 48h avant le tournage. Aucune surprise le jour J — tout est planifié et validé ensemble." },
  { num: "03", icon: "🎬", title: "Le Tournage",             desc: "Direction artistique complète sur place. Matériel Sony cinéma + drone DJI. Chaque détail pensé pour votre marque." },
  { num: "04", icon: "✦",  title: "La Livraison",            desc: "Fichiers HD livrés dans votre espace client privé en 3 à 5 jours. Révisions incluses jusqu'à votre satisfaction totale." },
];

const DIFF = [
  { title: "Matériel cinéma",     text: "Sony FX6, FX3, objectifs GM II, drone DJI certifié. La même qualité que les grandes productions." },
  { title: "Livraison express",   text: "Photos éditées en 24h sur demande. Vidéos livrées en 3 à 5 jours. Toujours dans les délais." },
  { title: "Sur mesure à 100%",   text: "Pas de package fixe. Chaque offre est construite autour de vos objectifs spécifiques." },
];

function ServiceBlock({ s, idx }: { s: typeof SERVICES[0]; idx: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reversed = idx % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0,
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.07)",
        direction: reversed ? "rtl" : "ltr",
      }}
      className="service-block"
    >
      {/* Image */}
      <div style={{ position: "relative", minHeight: 420, direction: "ltr" }}>
        <img
          src={s.image}
          alt={s.title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: s.imagePosition, filter: "brightness(0.7) saturate(0.85)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: reversed ? "linear-gradient(to left, rgba(0,0,0,0.4), transparent)" : "linear-gradient(to right, rgba(0,0,0,0.4), transparent)" }} />
        <div style={{ position: "absolute", top: 24, left: 24 }}>
          <span style={{ fontFamily: "var(--font-bebas-neue)", fontSize: 80, color: "rgba(201,168,76,0.15)", lineHeight: 1 }}>{s.num}</span>
        </div>
      </div>

      {/* Texte */}
      <div style={{ background: "#0d0d0d", padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "center", direction: "ltr" }}>
        <span style={{ fontFamily: "var(--font-bebas-neue)", fontSize: 13, letterSpacing: "0.2em", color: "#C9A84C", marginBottom: 12 }}>
          {s.num} —
        </span>
        <h3 className="font-bebas" style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, marginBottom: 16 }}>
          {s.title}
        </h3>
        <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: 28 }}>
          {s.desc}
        </p>

        {/* Inclus */}
        <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "20px 22px", marginBottom: 20 }}>
          <p className="font-dm" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 14 }}>Ce qui est inclus</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {s.inclus.map(item => (
              <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#C9A84C", flexShrink: 0, fontWeight: 700, fontSize: 13 }}>✓</span>
                <span className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pour qui */}
        <div style={{ display: "inline-flex", alignSelf: "flex-start", gap: 8, alignItems: "center", padding: "7px 14px", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 9999, background: "rgba(201,168,76,0.04)" }}>
          <span style={{ color: "#C9A84C", fontSize: 11 }}>◆</span>
          <span className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em" }}>{s.pourQui}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesPageContent() {
  const heroRef = useRef(null);
  const processRef = useRef(null);
  const diffRef = useRef(null);
  const ctaRef = useRef(null);
  const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const diffInView = useInView(diffRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-40px" });

  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>

      {/* ── SECTION 1 : HERO ─────────────────────────────────── */}
      <section ref={heroRef} style={{ padding: "160px 24px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 500, background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-dm" style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.25)", padding: "5px 18px", borderRadius: 9999, background: "rgba(201,168,76,0.05)", marginBottom: 32 }}>
              Studio Premium · Montréal
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-bebas" style={{ fontSize: "clamp(56px, 10vw, 110px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.9, marginBottom: 28 }}>
            Travaillons ensemble.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="font-dm" style={{ fontSize: "clamp(16px, 2vw, 20px)", fontStyle: "italic", color: "#C9A84C", marginBottom: 20 }}>
            "Chaque projet commence par une conversation."
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="font-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>
            Nous ne vendons pas des packages. Nous construisons des offres sur mesure autour de vos objectifs, votre marque et vos ambitions.
          </motion.p>
        </div>
      </section>

      {/* ── SECTION 2 : LES 4 SERVICES ───────────────────────── */}
      <section style={{ padding: "60px 24px 120px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="font-dm section-label" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
              — Ce qu'on crée
            </span>
            <h2 className="font-bebas" style={{ fontSize: "clamp(40px, 6vw, 68px)", color: "#fff", letterSpacing: "0.03em", marginTop: 12, lineHeight: 0.95 }}>
              NOS DOMAINES<br />D'EXPERTISE
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {SERVICES.map((s, i) => <ServiceBlock key={s.num} s={s} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 : PROCESSUS ─────────────────────────────── */}
      <section ref={processRef} style={{ padding: "100px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span className="font-dm section-label" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
              — Comment ça se passe
            </span>
            <h2 className="font-bebas" style={{ fontSize: "clamp(36px, 5vw, 60px)", color: "#fff", letterSpacing: "0.03em", marginTop: 12, lineHeight: 0.95 }}>
              UN PROCESSUS SIMPLE.<br />UN RÉSULTAT PREMIUM.
            </h2>
          </div>

          {/* Timeline */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, position: "relative" }} className="process-grid">
            {/* Ligne horizontale */}
            <div style={{ position: "absolute", top: 28, left: "12.5%", right: "12.5%", height: 1, background: "rgba(201,168,76,0.2)", zIndex: 0 }} />

            {STEPS.map((step, i) => (
              <motion.div key={step.num}
                initial={{ opacity: 0, y: 20 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 16px", position: "relative", zIndex: 1 }}
              >
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#000", border: "1px solid rgba(201,168,76,0.5)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, flexShrink: 0 }}>
                  <span style={{ fontSize: 22 }}>{step.icon}</span>
                </div>
                <span className="font-bebas" style={{ fontSize: 13, letterSpacing: "0.15em", color: "#C9A84C", marginBottom: 8 }}>{step.num}</span>
                <h4 className="font-bebas" style={{ fontSize: 20, color: "#fff", letterSpacing: "0.05em", marginBottom: 12, lineHeight: 1.1 }}>{step.title}</h4>
                <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 : DIFFÉRENCE ────────────────────────────── */}
      <section ref={diffRef} style={{ padding: "100px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="font-dm section-label" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
              — Notre différence
            </span>
            <h2 className="font-bebas" style={{ fontSize: "clamp(36px, 5vw, 60px)", color: "#fff", letterSpacing: "0.03em", marginTop: 12, lineHeight: 0.95 }}>
              CE QUI NOUS SÉPARE DU RESTE.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="diff-grid">
            {DIFF.map((d, i) => (
              <motion.div key={d.title}
                initial={{ opacity: 0, y: 20 }}
                animate={diffInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 28px" }}
              >
                <div style={{ width: 32, height: 1, background: "#C9A84C", marginBottom: 20 }} />
                <h4 className="font-bebas" style={{ fontSize: 24, color: "#fff", letterSpacing: "0.05em", marginBottom: 14 }}>{d.title}</h4>
                <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>{d.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 : CTA FINAL ────────────────────────────── */}
      <section ref={ctaRef} style={{ padding: "120px 24px 100px", position: "relative", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, #C9A84C 40%, transparent)" }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}
        >
          <h2 className="font-bebas" style={{ fontSize: "clamp(40px, 7vw, 72px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, marginBottom: 20 }}>
            Votre projet mérite une conversation.
          </h2>
          <p className="font-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: 40, maxWidth: 480, margin: "0 auto 40px" }}>
            Les disponibilités sont limitées chaque mois. Réservez votre appel avant que les prochains spots soient pris.
          </p>

          <a href="https://calendly.com/massishot-ca/30min" target="_blank" rel="noopener noreferrer"
            className="font-dm"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "18px 44px", background: "#C9A84C", color: "#0a0a0a", borderRadius: 9999, fontSize: 15, fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase", boxShadow: "0 0 40px rgba(201,168,76,0.25)", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(201,168,76,0.4)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(201,168,76,0.25)"; }}
          >
            Réserver mon appel gratuit →
          </a>

          <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 16, letterSpacing: "0.08em" }}>
            Appel 30 min · Sans engagement · Réponse sous 24h
          </p>
        </motion.div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .service-block { grid-template-columns: 1fr !important; direction: ltr !important; }
          .service-block > div:first-child { min-height: 260px !important; }
          .process-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
          .diff-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

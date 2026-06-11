"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";

const GOLD = "#C9A84C";

export interface ServiceCard {
  icon: string;
  title: string;
  desc: string;
}

export interface Argument {
  icon: string;
  title: string;
  desc: string;
}

export interface OtherNeighborhood {
  label: string;
  href: string;
}

export interface SeoLocalLayoutProps {
  badge: string;
  h1: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  servicesSectionTitle: string;
  services: ServiceCard[];
  whyTitle: string;
  whyLabel: string;
  arguments: Argument[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaText: string;
  otherNeighborhoods: OtherNeighborhood[];
  schemaAreaServed: string;
  slug: string;
}

const TESTIMONIALS = [
  {
    name: "Carle Lucier",
    role: "Fondateur de TechGuys Consulting",
    text: "MassiShoots a complètement élevé notre image de marque. Le contenu était moderne, stratégique et parfaitement adapté à nos réseaux sociaux. Une expérience professionnelle du début à la fin.",
    avatar: "/testimonials/carle.jpg",
  },
  {
    name: "Christine Girouard",
    role: "Fondatrice",
    text: "Massi a su capturer l'énergie et l'émotion exactement comme je l'imaginais. Le rendu était cinématique, premium et très impactant pour notre visibilité.",
    avatar: "/testimonials/christine.jpg",
  },
  {
    name: "Stéphanie",
    role: "Founder @ Quantum Lead RE",
    text: "Travailler avec MassiShoots, c'est avoir plus qu'un vidéaste. Il comprend réellement le branding personnel et sait créer du contenu qui attire l'attention et inspire confiance.",
    avatar: "/testimonials/stephanie.jpg",
  },
  {
    name: "Emmanuel Hébert",
    role: "Fondateur de Manoir Blackswan",
    text: "MassiShoots a parfaitement compris l'image haut de gamme que nous voulions transmettre. Le contenu créé reflétait exactement l'expérience et l'ambiance premium de Manoir Blackswan.",
    avatar: "/testimonials/emmanuel.jpg",
  },
];

export default function SeoLocalLayout(p: SeoLocalLayoutProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Massishoots",
    "image": "https://massishoots.ca/og-image.jpg",
    "url": `https://massishoots.ca/fr/${p.slug}`,
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Montréal",
      "addressRegion": "QC",
      "addressCountry": "CA",
    },
    "areaServed": p.schemaAreaServed,
    "priceRange": "$$",
    "description": p.heroDescription,
    "sameAs": ["https://instagram.com/massishoots"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main style={{ background: "#000", minHeight: "100vh" }}>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section style={{ position: "relative", padding: "160px 24px 110px", overflow: "hidden" }}>
          {/* Background image subtle */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Image src={p.heroImage} alt="" fill sizes="100vw" style={{ objectFit: "cover", opacity: 0.08, filter: "saturate(0.6)" }} priority fetchPriority="high" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, #000 100%)" }} />
          </div>

          <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="font-dm" style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD, border: `1px solid rgba(201,168,76,0.3)`, padding: "5px 18px", borderRadius: 9999, background: "rgba(201,168,76,0.06)", marginBottom: 36 }}>
                ✦ {p.badge}
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.1 }}
              className="font-bebas" style={{ fontSize: "clamp(48px, 8vw, 92px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.93, marginBottom: 22 }}>
              {p.h1}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="font-playfair" style={{ fontSize: "clamp(17px, 2.5vw, 22px)", color: GOLD, fontStyle: "italic", fontWeight: 400, lineHeight: 1.5, marginBottom: 22 }}>
              {p.heroSubtitle}
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="font-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.42)", lineHeight: 1.85, maxWidth: 560, margin: "0 auto 40px" }}>
              {p.heroDescription}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.42 }}>
              <a href="https://calendly.com/massishot-ca/30min" target="_blank" rel="noopener noreferrer" className="font-dm"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "17px 40px", background: GOLD, color: "#0a0a0a", borderRadius: 9999, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", boxShadow: "0 0 36px rgba(201,168,76,0.22)", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 56px rgba(201,168,76,0.38)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(201,168,76,0.22)"; }}>
                Réserver mon appel gratuit →
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── SERVICES ──────────────────────────────────────────────── */}
        <section style={{ padding: "80px 24px 100px", background: "#000" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 52 }}>
              <span className="font-dm" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>— Ce qu'on fait pour vous</span>
              <h2 className="font-bebas" style={{ fontSize: "clamp(36px, 5vw, 58px)", color: "#fff", letterSpacing: "0.04em", lineHeight: 0.95, marginTop: 10 }}>
                {p.servicesSectionTitle}
              </h2>
            </motion.div>

            <div className="seo-services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
              {p.services.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{ background: "#0f0f0f", border: `0.5px solid rgba(201,168,76,0.18)`, borderRadius: 12, padding: "30px 28px" }}>
                  <span style={{ fontSize: 28, display: "block", marginBottom: 14 }}>{s.icon}</span>
                  <h3 className="font-bebas" style={{ fontSize: 22, color: "#fff", letterSpacing: "0.04em", marginBottom: 10 }}>{s.title}</h3>
                  <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", lineHeight: 1.75 }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── POURQUOI MASSISHOOTS ──────────────────────────────────── */}
        <section style={{ padding: "80px 24px 100px", background: "#0a0a0a", borderTop: `0.5px solid rgba(201,168,76,0.15)`, borderBottom: `0.5px solid rgba(201,168,76,0.15)` }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 52 }}>
              <span className="font-dm" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>{p.whyLabel}</span>
              <h2 className="font-bebas" style={{ fontSize: "clamp(36px, 5vw, 58px)", color: "#fff", letterSpacing: "0.04em", lineHeight: 0.95, marginTop: 10 }}>
                {p.whyTitle}
              </h2>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="seo-args-grid">
              {p.arguments.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.6, delay: i * 0.13 }}
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(201,168,76,0.08)", border: `1px solid rgba(201,168,76,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                    {a.icon}
                  </div>
                  <h3 className="font-bebas" style={{ fontSize: 20, color: "#fff", letterSpacing: "0.04em", lineHeight: 1.1 }}>{a.title}</h3>
                  <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", lineHeight: 1.75 }}>{a.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TÉMOIGNAGES ───────────────────────────────────────────── */}
        <section style={{ padding: "100px 24px", background: "#000" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 52 }}>
              <span className="font-dm" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD }}>— Ce qu'ils disent</span>
              <h2 className="font-bebas" style={{ fontSize: "clamp(38px, 5vw, 62px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.9, marginTop: 14 }}>
                ILS NOUS FONT CONFIANCE
              </h2>
              <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 10 }}>50+ entrepreneurs et marques accompagnés à Montréal</p>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }} className="seo-testimonials-grid">
              {TESTIMONIALS.map((t, i) => (
                <motion.div key={t.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{ position: "relative", background: "#0f0f0f", borderLeft: `2px solid ${GOLD}`, borderTop: "1px solid rgba(255,255,255,0.05)", borderRight: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", borderRadius: "0 12px 12px 0", padding: 28, overflow: "hidden" }}>
                  <span style={{ position: "absolute", top: 10, left: 18, fontSize: 68, lineHeight: 1, color: GOLD, opacity: 0.12, fontFamily: "Georgia, serif", userSelect: "none", pointerEvents: "none" }}>"</span>
                  <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                    {[...Array(5)].map((_, s) => <span key={s} style={{ color: GOLD, fontSize: 11 }}>★</span>)}
                  </div>
                  <p className="font-dm" style={{ fontSize: 14, fontStyle: "italic", color: "#f0ebe0", lineHeight: 1.75, marginBottom: 22, position: "relative", zIndex: 1 }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", flexShrink: 0, padding: 1.5, background: `linear-gradient(135deg, ${GOLD}, rgba(201,168,76,0.3))`, position: "relative" }}>
                      <Image src={t.avatar} alt={t.name} width={42} height={42} loading="lazy" style={{ borderRadius: "50%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                    </div>
                    <div>
                      <p className="font-dm" style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>{t.name}</p>
                      <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.32)" }}>{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ─────────────────────────────────────────────── */}
        <section style={{ padding: "100px 24px", background: "#0a0a0a", borderTop: `0.5px solid rgba(201,168,76,0.2)` }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
            <span className="font-dm" style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD, border: `1px solid rgba(201,168,76,0.25)`, padding: "5px 18px", borderRadius: 9999, background: "rgba(201,168,76,0.05)", marginBottom: 28 }}>
              ✦ Démarrons ensemble
            </span>
            <h2 className="font-bebas" style={{ fontSize: "clamp(38px, 6vw, 66px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, marginBottom: 14 }}>
              {p.ctaTitle}
            </h2>
            <p className="font-playfair" style={{ fontSize: "clamp(16px, 2vw, 19px)", color: GOLD, fontStyle: "italic", marginBottom: 18, lineHeight: 1.5 }}>
              {p.ctaSubtitle}
            </p>
            <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", lineHeight: 1.85, marginBottom: 40 }}>
              {p.ctaText}
            </p>
            <a href="https://calendly.com/massishot-ca/30min" target="_blank" rel="noopener noreferrer" className="font-dm"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "17px 44px", background: GOLD, color: "#0a0a0a", borderRadius: 9999, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", boxShadow: "0 0 36px rgba(201,168,76,0.2)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 56px rgba(201,168,76,0.38)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(201,168,76,0.2)"; }}>
              Réserver mon appel gratuit →
            </a>
          </motion.div>
        </section>

        {/* ── LIENS INTERNES — AUTRES QUARTIERS ─────────────────────── */}
        <section style={{ padding: "56px 24px 80px", background: "#000", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <p className="font-dm" style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: 20 }}>
              Nous couvrons aussi
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {p.otherNeighborhoods.map(n => (
                <Link key={n.href} href={n.href} className="font-dm"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 20px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, color: "rgba(255,255,255,0.42)", textDecoration: "none", fontSize: 12, transition: "all 0.2s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = GOLD; el.style.color = GOLD; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.color = "rgba(255,255,255,0.42)"; }}>
                  {n.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />

        <style>{`
          @media (max-width: 860px) {
            .seo-services-grid { grid-template-columns: 1fr !important; }
            .seo-args-grid { grid-template-columns: 1fr !important; }
            .seo-testimonials-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </main>
    </>
  );
}

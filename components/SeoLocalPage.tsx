"use client";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight, MapPin, Check } from "lucide-react";
import Footer from "@/components/Footer";

interface SeoLocalPageProps {
  quartier: string;
  ville?: string;
  services: string[];
  description: string;
  heroImage?: string;
}

export default function SeoLocalPage({ quartier, ville = "Montréal", services, description, heroImage }: SeoLocalPageProps) {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ padding: "160px 24px 100px", maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="font-dm" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>
            <MapPin size={11} /> {quartier}, {ville}
          </span>
          <h1 className="font-bebas" style={{ fontSize: "clamp(48px, 8vw, 88px)", color: "#fff", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: 24 }}>
            PHOTOGRAPHE &amp;<br />VIDÉASTE {quartier.toUpperCase()}
          </h1>
          <p className="font-dm" style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 40px" }}>
            {description}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="font-dm" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#f2f0ec", color: "#0a0a0a", borderRadius: 9999, textDecoration: "none", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em" }}>
              Réserver une consultation <ArrowRight size={13} />
            </Link>
            <Link href="/portfolio" className="font-dm" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: 13 }}>
              Voir le portfolio
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Services */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 80px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h2 className="font-bebas" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#fff", letterSpacing: "0.04em", marginBottom: 32, textAlign: "center" }}>
            NOS SERVICES À {quartier.toUpperCase()}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {services.map((s, i) => (
              <motion.div key={s} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <Check size={11} color="#4ade80" />
                </div>
                <span className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{s}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA bottom */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 120px" }}>
        <div style={{ padding: "48px 40px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, textAlign: "center" }}>
          <h3 className="font-bebas" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#fff", letterSpacing: "0.03em", marginBottom: 12 }}>
            PRÊT À COLLABORER ?
          </h3>
          <p className="font-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 28, lineHeight: 1.7 }}>
            Consultation gratuite · Devis en 24h · Basé à {ville}
          </p>
          <Link href="/contact" className="font-dm" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#f2f0ec", color: "#0a0a0a", borderRadius: 9999, textDecoration: "none", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em" }}>
            Démarrer mon projet <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

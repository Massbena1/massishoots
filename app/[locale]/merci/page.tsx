"use client";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight, CheckCircle } from "lucide-react";
import Footer from "@/components/Footer";

export default function MerciPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      <section style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", maxWidth: 560 }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}
          >
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "rgba(74,222,128,0.1)",
              border: "1px solid rgba(74,222,128,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <CheckCircle size={32} color="#4ade80" />
            </div>
          </motion.div>

          <span className="font-dm" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c4cdd6", display: "block", marginBottom: 20 }}>
            Message envoyé
          </span>

          <h1 className="font-bebas" style={{ fontSize: "clamp(52px, 8vw, 80px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, marginBottom: 24 }}>
            MERCI POUR<br />VOTRE MESSAGE
          </h1>

          <p className="font-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 48 }}>
            Je vous répondrai dans les <strong style={{ color: "rgba(255,255,255,0.7)" }}>24 à 48 heures</strong>.<br />
            En attendant, explorez mes derniers projets.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/portfolio" className="font-dm" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 28px", background: "#f2f0ec", color: "#0a0a0a",
              borderRadius: 9999, textDecoration: "none",
              fontSize: 13, fontWeight: 700, letterSpacing: "0.06em",
            }}>
              Voir le portfolio <ArrowRight size={13} />
            </Link>
            <Link href="/" className="font-dm" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 24px",
              borderRadius: 9999, border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: 13,
            }}>
              Accueil
            </Link>
          </div>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}

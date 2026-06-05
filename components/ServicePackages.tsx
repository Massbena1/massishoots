"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Check, Minus, ArrowRight, Star } from "lucide-react";

const PACKAGES = [
  {
    id: "express",
    name: "Contenu Express",
    tagline: "Pour démarrer sans risque",
    price: "800 $",
    priceHigh: null,
    unit: "/ mois",
    popular: false,
    color: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.08)",
    livrables: [
      "1h30 de tournage / mois",
      "2 vidéos / Reels montés",
      "5 photos retouchées",
      "Livraison en 2 semaines",
    ],
    nonInclus: [
      "Droits commerciaux",
      "Stratégie contenu",
      "Priorité agenda",
    ],
  },
  {
    id: "essentiel",
    name: "Essentiel",
    tagline: "Pour démarrer fort",
    price: "2 500 $",
    priceHigh: "4 000 $",
    unit: "/ mois",
    popular: false,
    color: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.08)",
    livrables: [
      "1 jour de tournage / mois",
      "4 Reels montés",
      "10 photos retouchées",
      "Livraison en 2 semaines",
      "1 révision incluse",
    ],
    nonInclus: [
      "Droits commerciaux",
      "Stratégie contenu",
      "Priorité agenda",
    ],
  },
  {
    id: "autorite",
    name: "Autorité",
    tagline: "Pour dominer ton marché",
    price: "4 500 $",
    priceHigh: "6 500 $",
    unit: "/ mois",
    popular: true,
    color: "rgba(196,205,214,0.06)",
    border: "rgba(196,205,214,0.25)",
    livrables: [
      "2 jours de tournage / mois",
      "8 Reels montés",
      "25 photos retouchées",
      "Droits commerciaux inclus",
      "Livraison en 10 jours",
      "2 révisions incluses",
    ],
    nonInclus: [
      "Stratégie contenu",
      "Priorité agenda",
    ],
  },
  {
    id: "fullbrand",
    name: "Full Brand",
    tagline: "Pour une présence irréfutable",
    price: "7 100 $",
    priceHigh: "9 000 $",
    unit: "/ mois",
    popular: false,
    color: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.08)",
    livrables: [
      "4 jours de tournage / mois",
      "12+ Reels montés",
      "50 photos retouchées",
      "Droits commerciaux inclus",
      "Stratégie contenu incluse",
      "Livraison en 7 jours",
      "Révisions illimitées",
      "Priorité agenda",
    ],
    nonInclus: [],
  },
];

const COMPARE_ROWS = [
  { label: "Tournage / mois", values: ["1h30", "1 jour", "2 jours", "4 jours"] },
  { label: "Vidéos / Reels", values: ["2", "4", "8", "12+"] },
  { label: "Photos retouchées", values: ["5", "10", "25", "50"] },
  { label: "Droits commerciaux", values: [false, false, true, true] },
  { label: "Stratégie contenu", values: [false, false, false, true] },
  { label: "Révisions", values: ["1", "1", "2", "Illimitées"] },
  { label: "Délai de livraison", values: ["2 semaines", "2 semaines", "10 jours", "7 jours"] },
  { label: "Priorité agenda", values: [false, false, false, true] },
];

export default function ServicePackages() {
  const [activeTab, setActiveTab] = useState<"cards" | "compare">("cards");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: "100px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <span className="font-dm" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c4cdd6" }}>
            — Contenu mensuel
          </span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(40px, 6vw, 64px)", color: "#fff", letterSpacing: "0.03em", marginTop: 12, lineHeight: 0.95 }}>
            CHOISISSEZ VOTRE<br />PACKAGE
          </h2>
          <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 16, lineHeight: 1.7 }}>
            Contrat mensuel · Sans engagement annuel · Fourchette de prix selon votre projet
          </p>

          {/* Tab switcher */}
          <div style={{ display: "inline-flex", marginTop: 28, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 9999, padding: 4 }}>
            {(["cards", "compare"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="font-dm"
                style={{
                  padding: "8px 20px", borderRadius: 9999,
                  background: activeTab === tab ? "#f2f0ec" : "transparent",
                  color: activeTab === tab ? "#0a0a0a" : "rgba(255,255,255,0.4)",
                  border: "none", fontSize: 12, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.2s",
                  letterSpacing: "0.05em",
                }}
              >
                {tab === "cards" ? "Packages" : "Comparer"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Package cards */}
        {activeTab === "cards" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
            className="packages-grid"
          >
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  background: pkg.color,
                  border: `1px solid ${pkg.border}`,
                  borderRadius: 24,
                  padding: "32px 28px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {pkg.popular && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    background: "#c4cdd6", color: "#0a0a0a",
                    padding: "4px 16px", borderRadius: 9999,
                    display: "flex", alignItems: "center", gap: 5,
                    whiteSpace: "nowrap",
                  }}>
                    <Star size={10} fill="#0a0a0a" />
                    <span className="font-dm" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em" }}>LE PLUS POPULAIRE</span>
                  </div>
                )}

                <div style={{ marginBottom: 24 }}>
                  <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>
                    {pkg.tagline}
                  </p>
                  <h3 className="font-bebas" style={{ fontSize: 36, color: "#fff", letterSpacing: "0.06em", lineHeight: 1, marginBottom: 16 }}>
                    {pkg.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
                    <span className="font-bebas" style={{ fontSize: 32, color: "#fff", letterSpacing: "0.03em" }}>
                      {pkg.price}
                    </span>
                    <span className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                      {pkg.priceHigh ? `— ${pkg.priceHigh}` : ""}
                    </span>
                    <span className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                      {pkg.unit}
                    </span>
                  </div>
                </div>

                <div style={{ flex: 1, marginBottom: 28 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {pkg.livrables.map(item => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <Check size={10} color="#4ade80" />
                        </div>
                        <span className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{item}</span>
                      </div>
                    ))}
                    {pkg.nonInclus.map(item => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <Minus size={10} color="rgba(255,255,255,0.2)" />
                        </div>
                        <span className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", lineHeight: 1.4 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="font-dm"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 20px",
                    background: pkg.popular ? "#f2f0ec" : "rgba(255,255,255,0.06)",
                    color: pkg.popular ? "#0a0a0a" : "rgba(255,255,255,0.7)",
                    borderRadius: 12, textDecoration: "none",
                    fontSize: 13, fontWeight: 700, letterSpacing: "0.05em",
                    border: pkg.popular ? "none" : "1px solid rgba(255,255,255,0.08)",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  Commencer avec {pkg.name}
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Comparison table */}
        {activeTab === "compare" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ overflowX: "auto" }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
              <thead>
                <tr>
                  <th style={{ padding: "16px 20px", textAlign: "left", width: "35%" }}>
                    <span className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Livrable</span>
                  </th>
                  {PACKAGES.map(pkg => (
                    <th key={pkg.id} style={{ padding: "16px 20px", textAlign: "center" }}>
                      <span className="font-bebas" style={{ fontSize: 18, color: pkg.popular ? "#c4cdd6" : "#fff", letterSpacing: "0.06em" }}>{pkg.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={row.label} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                    <td style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      <span className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{row.label}</span>
                    </td>
                    {row.values.map((val, j) => (
                      <td key={j} style={{ padding: "14px 20px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        {typeof val === "boolean" ? (
                          val
                            ? <Check size={16} color="#4ade80" style={{ margin: "0 auto" }} />
                            : <Minus size={16} color="rgba(255,255,255,0.15)" style={{ margin: "0 auto" }} />
                        ) : (
                          <span className="font-dm" style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td style={{ padding: "20px" }} />
                  {PACKAGES.map(pkg => (
                    <td key={pkg.id} style={{ padding: "20px", textAlign: "center" }}>
                      <div style={{ marginBottom: 8 }}>
                        <span className="font-bebas" style={{ fontSize: 20, color: "#fff", letterSpacing: "0.03em" }}>{pkg.price}</span>
                        {pkg.priceHigh && <span className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", display: "block" }}>— {pkg.priceHigh} / mois</span>}
                      </div>
                      <Link href="/contact" className="font-dm" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", background: pkg.popular ? "#f2f0ec" : "rgba(255,255,255,0.06)", color: pkg.popular ? "#0a0a0a" : "rgba(255,255,255,0.6)", borderRadius: 9999, textDecoration: "none", fontSize: 12, fontWeight: 700, border: pkg.popular ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
                        Choisir <ArrowRight size={11} />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </motion.div>
        )}

        <p className="font-dm" style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 28 }}>
          * Fourchette indicative en CAD · Prix exact confirmé lors de votre consultation gratuite · Taxes en sus
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) { .packages-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) { .packages-grid { gap: 12px !important; } }
      `}</style>
    </section>
  );
}

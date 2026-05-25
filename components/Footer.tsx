"use client";
import React from "react";
import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

type IconProps = { className?: string };

const InstagramIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TikTokIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.54V6.8a4.85 4.85 0 0 1-1.01-.11z"/>
  </svg>
);

const LinkedInIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const FacebookIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  const footerLinks = [
    {
      label: t("sServices"),
      links: [
        { title: t("lMonthly"), href: "/services" },
        { title: t("lEvents"),  href: "/services" },
        { title: t("lAds"),     href: "/services" },
        { title: t("lWedding"), href: "/services" },
      ],
    },
    {
      label: t("sNavigation"),
      links: [
        { title: t("lPortfolio"), href: "/portfolio" },
        { title: t("lAbout"),     href: "/about" },
        { title: t("lProcess"),   href: "/#processus" },
        { title: t("lFaq"),       href: "/#faq" },
        { title: t("lContact"),   href: "/contact" },
      ],
    },
    {
      label: t("sSocial"),
      links: [
        { title: "Instagram", href: "https://instagram.com/massishoots",                       icon: InstagramIcon },
        { title: "TikTok",    href: "https://www.tiktok.com/@massishoots",                     icon: TikTokIcon },
        { title: "LinkedIn",  href: "https://www.linkedin.com/in/massishoots",                 icon: LinkedInIcon },
        { title: "Facebook",  href: "https://www.facebook.com/profile.php?id=61565282613206", icon: FacebookIcon },
      ],
    },
  ] as const;

  return (
    <footer style={{
      position: "relative",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      background: "radial-gradient(35% 128px at 50% 0%, rgba(196,205,214,0.05), transparent), rgba(255,255,255,0.015)",
      backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "33%", height: 1, background: "rgba(196,205,214,0.18)", filter: "blur(2px)", borderRadius: 9999, pointerEvents: "none" }} />

      <div style={{ padding: "48px 24px 0", textAlign: "center", overflow: "hidden" }}>
        <p className="font-bebas" style={{ fontSize: "clamp(64px, 14vw, 180px)", letterSpacing: "-0.01em", lineHeight: 0.85, color: "rgba(255,255,255,0.025)", userSelect: "none", whiteSpace: "nowrap" }}>
          MASSISHOOTS
        </p>
      </div>

      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "40px 24px 56px" }}>
        <div className="footer-main-grid">
          <AnimatedContainer delay={0.05} className="footer-brand">
            <Link href="/" className="font-bebas" style={{ fontSize: 18, letterSpacing: "0.18em", color: "rgba(255,255,255,0.85)", textDecoration: "none", display: "block", marginBottom: 12 }}>
              MASSISHOOTS
            </Link>
            <p className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.7, maxWidth: 220, marginBottom: 16 }}>
              {t("tagline")}
            </p>
            <span className="font-dm" style={{ fontSize: 11, color: "#c4cdd6", letterSpacing: "0.08em", opacity: 0.65, display: "block", marginBottom: 20 }}>
              {t("travel")}
            </span>
            <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.18)" }}>
              © {new Date().getFullYear()} {t("copyright")}
            </p>
          </AnimatedContainer>

          <div className="footer-links-grid">
            {footerLinks.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.12 + index * 0.08}>
                <h3 className="font-dm" style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
                  {section.label}
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-dm footer-link"
                        style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7, transition: "color 0.2s, gap 0.2s" }}
                      >
                        {"icon" in link && link.icon && <link.icon className="footer-icon" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-main-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 48px; align-items: start; }
        .footer-links-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .footer-link { position: relative; }
        .footer-link::after { content: ""; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: rgba(255,255,255,0.4); transition: width 0.3s ease; border-radius: 1px; }
        .footer-link:hover { color: rgba(255,255,255,0.85) !important; gap: 10px !important; }
        .footer-link:hover::after { width: 100%; }
        .footer-icon { width: 14px; height: 14px; opacity: 0.6; flex-shrink: 0; transition: opacity 0.2s; }
        .footer-link:hover .footer-icon { opacity: 1; }
        @media (max-width: 900px) { .footer-main-grid { grid-template-columns: 1fr !important; gap: 36px !important; } }
        @media (max-width: 560px) { .footer-links-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; } }
      `}</style>
    </footer>
  );
}

type AnimatedContainerProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <>{children}</>;
  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Home, Camera, Image, DollarSign, User, Images } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { key: "services",  href: "/services",  sectionId: null,        homeScroll: false, icon: Camera   },
  { key: "portfolio", href: "/portfolio", sectionId: null,        homeScroll: false, icon: Image    },
  { key: "about",     href: "/about",     sectionId: null,        homeScroll: false, icon: User     },
  { key: "galleries", href: "/galleries", sectionId: null,        homeScroll: false, icon: Images   },
] as const;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScroll(target: number, duration = 800) {
  const start = window.scrollY;
  const distance = target - start;
  const startTime = performance.now();
  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!isHome) { setActiveSection(null); return; }
    const ids = NAV_LINKS.map(l => l.sectionId).filter(Boolean) as string[];
    const observers: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [isHome]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: typeof NAV_LINKS[number]
  ) => {
    if (isHome && link.homeScroll && link.sectionId) {
      e.preventDefault();
      const el = document.getElementById(link.sectionId);
      if (!el) return;
      smoothScroll(el.getBoundingClientRect().top + window.scrollY - 96, 900);
    }
  };

  const isActive = (link: typeof NAV_LINKS[number]) => {
    if (isHome && link.sectionId && activeSection) return activeSection === link.sectionId;
    return pathname.includes(link.href);
  };

  const switchLocale = () => {
    const next = locale === "fr" ? "en" : "fr";
    const localePrefix = `/${locale}`;
    const currentPath = pathname.startsWith(localePrefix)
      ? pathname.slice(localePrefix.length) || "/"
      : "/";
    router.replace(currentPath, { locale: next });
  };

  if (!mounted) return null;

  return (
    <nav className="hidden md:block" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, paddingTop: 20 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          className={cn(
            "flex items-center gap-1",
          )}
          style={{
            background: scrolled ? "rgba(6,8,12,0.95)" : "rgba(6,8,12,0.80)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderBottom: "1px solid rgba(201,168,76,0.35)",
            borderRadius: 9999,
            padding: "5px 6px 5px 16px",
            boxShadow: scrolled
              ? "0 12px 40px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset"
              : "0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06) inset",
            transition: "background 0.3s, box-shadow 0.3s",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", marginRight: 8, display: "flex", alignItems: "center" }}>
            <img src="/logo-navbar.png" alt="Massishoots" style={{ height: 18, width: "auto", objectFit: "contain" }} />
          </Link>

          <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.1)", margin: "0 4px" }} />

          {/* Nav links with lamp effect */}
          {NAV_LINKS.map((link) => {
            const active = isActive(link);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className="font-dm"
                style={{
                  position: "relative",
                  fontSize: 12.5,
                  color: active ? "#fff" : "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                  padding: "7px 14px",
                  borderRadius: 9999,
                  whiteSpace: "nowrap",
                  fontWeight: active ? 600 : 400,
                  transition: "color 0.2s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)"; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
              >
                {/* Lamp background */}
                <AnimatePresence>
                  {active && (
                    <motion.span
                      layoutId="lamp"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 9999,
                        background: "rgba(201,168,76,0.1)",
                        zIndex: -1,
                      }}
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      {/* Lamp light beam from top */}
                      <span style={{
                        position: "absolute",
                        top: -3,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 28,
                        height: 3,
                        background: "#C9A84C",
                        borderRadius: "0 0 4px 4px",
                        display: "block",
                      }} />
                      <span style={{
                        position: "absolute",
                        top: -8,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 40,
                        height: 12,
                        background: "rgba(201,168,76,0.18)",
                        borderRadius: "50%",
                        filter: "blur(6px)",
                        display: "block",
                      }} />
                      <span style={{
                        position: "absolute",
                        top: -4,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 20,
                        height: 8,
                        background: "rgba(201,168,76,0.25)",
                        borderRadius: "50%",
                        filter: "blur(3px)",
                        display: "block",
                      }} />
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Icon (mobile) + label (desktop) */}
                <span className="hidden lg:inline">{t(link.key)}</span>
                <span className="lg:hidden">
                  <Icon size={16} strokeWidth={2} />
                </span>
              </Link>
            );
          })}

          <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.1)", margin: "0 2px 0 4px" }} />

          {/* Locale */}
          <button
            onClick={switchLocale}
            className="font-dm"
            style={{
              fontSize: 11, letterSpacing: "0.12em", fontWeight: 600,
              color: "rgba(255,255,255,0.4)", padding: "6px 10px",
              borderRadius: 9999, border: "none", background: "transparent",
              cursor: "pointer", whiteSpace: "nowrap", transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#c4cdd6")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>

          {/* Espace client */}
          <Link href="/client" className="font-dm" style={{
            padding: "7px 14px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            color: "rgba(255,255,255,0.5)",
            borderRadius: 9999, fontSize: 12, fontWeight: 600,
            textDecoration: "none", letterSpacing: "0.04em",
            whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 5,
          }}>
            🔒 Espace client
          </Link>

          {/* CTA */}
          <Link href="/contact" className="font-dm" style={{
            padding: "8px 18px", background: "#f2f0ec", color: "#0a0a0a",
            borderRadius: 9999, fontSize: 12.5, fontWeight: 700,
            textDecoration: "none", letterSpacing: "0.05em",
            marginLeft: 2, whiteSpace: "nowrap", display: "inline-block",
          }}>
            {t("book")}
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}

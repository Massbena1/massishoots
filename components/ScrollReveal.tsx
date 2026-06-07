"use client";
import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .sr-hidden {
        opacity: 0;
        transform: translateY(40px);
      }
      .sr-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: opacity 0.7s ease-out, transform 0.7s ease-out;
      }
    `;
    document.head.appendChild(style);

    // Only target sections that opted in via data-sr attribute
    // (sections with their own Framer Motion animations are excluded)
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-sr], .grain-section[data-sr]")
    );

    targets.forEach((el) => el.classList.add("sr-hidden"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          el.style.transitionDelay = "0s";
          el.classList.remove("sr-hidden");
          el.classList.add("sr-visible");

          // Stagger direct children that have data-sr-child
          const children = Array.from(el.querySelectorAll<HTMLElement>("[data-sr-child]"));
          children.forEach((child, i) => {
            child.style.opacity = "0";
            child.style.transform = "translateY(40px)";
            child.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
            child.style.transitionDelay = `${i * 0.1}s`;
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                child.style.opacity = "1";
                child.style.transform = "translateY(0)";
              });
            });
          });
        });
      },
      { threshold: 0.1 }
    );

    const tid = setTimeout(() => {
      targets.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(tid);
      observer.disconnect();
      style.remove();
      targets.forEach((el) => {
        el.classList.remove("sr-hidden", "sr-visible");
        el.style.transitionDelay = "";
      });
    };
  }, []);

  return null;
}

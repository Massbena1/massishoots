"use client";
import { useEffect } from "react";

const SECTION_SELECTOR = [
  "section",
  ".grain-section",
].join(", ");

// Direct children to stagger inside each section
const CHILD_SELECTOR = [
  ":scope > div",
  ":scope > header",
  ":scope > article",
  ":scope > figure",
  ":scope > p",
  ":scope > h1",
  ":scope > h2",
  ":scope > h3",
  ":scope > ul",
  ":scope > ol",
].join(", ");

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

    const sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));

    const allTargets: HTMLElement[] = [];

    sections.forEach((section) => {
      // Animate the section itself
      section.classList.add("sr-hidden");
      allTargets.push(section);

      // Stagger direct children
      const children = Array.from(section.querySelectorAll<HTMLElement>(CHILD_SELECTOR));
      children.forEach((child) => {
        child.classList.add("sr-hidden");
        allTargets.push(child);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);

          // Find stagger index among siblings
          const parent = el.parentElement;
          if (!parent) {
            reveal(el, 0);
            return;
          }
          const siblings = Array.from(parent.querySelectorAll<HTMLElement>(".sr-hidden, .sr-visible"));
          const idx = siblings.indexOf(el);
          reveal(el, Math.max(0, idx) * 0.1);
        });
      },
      { threshold: 0.1 }
    );

    function reveal(el: HTMLElement, delay: number) {
      el.style.transitionDelay = `${delay}s`;
      el.classList.remove("sr-hidden");
      el.classList.add("sr-visible");
    }

    // Small timeout so initial paint isn't blocked
    const tid = setTimeout(() => {
      allTargets.forEach((el) => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(tid);
      observer.disconnect();
      style.remove();
      allTargets.forEach((el) => {
        el.classList.remove("sr-hidden", "sr-visible");
        el.style.transitionDelay = "";
      });
    };
  }, []);

  return null;
}

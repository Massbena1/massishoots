"use client";
import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Hide default cursor
    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    // Create cursor element
    const el = document.createElement("div");
    el.id = "gold-cursor";
    Object.assign(el.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "16px",
      height: "16px",
      borderRadius: "50%",
      border: "1.5px solid #C9A84C",
      background: "transparent",
      pointerEvents: "none",
      zIndex: "99999",
      transform: "translate(-50%, -50%)",
      transition: "width 0.2s cubic-bezier(0.22,1,0.36,1), height 0.2s cubic-bezier(0.22,1,0.36,1), background 0.2s, border-color 0.2s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      willChange: "transform",
    });

    const arrow = document.createElement("span");
    Object.assign(arrow.style, {
      color: "#C9A84C",
      fontSize: "14px",
      lineHeight: "1",
      opacity: "0",
      transition: "opacity 0.15s",
      pointerEvents: "none",
      userSelect: "none",
    });
    arrow.textContent = "→";
    el.appendChild(arrow);
    document.body.appendChild(el);

    // Lerp state
    let mx = -100, my = -100;
    let cx = -100, cy = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove, { passive: true });

    const LERP = 0.12;
    function tick() {
      cx += (mx - cx) * LERP;
      cy += (my - cy) * LERP;
      el.style.left = cx + "px";
      el.style.top = cy + "px";
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    // Hover detection
    const HOVER_SELECTOR = "a, button, [data-cursor], input[type=submit], label[for], select, [role=button]";

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(HOVER_SELECTOR)) {
        el.style.width = "40px";
        el.style.height = "40px";
        el.style.background = "rgba(201,168,76,0.15)";
        arrow.style.opacity = "1";
      }
    };
    const onOut = (e: MouseEvent) => {
      if (!(e.relatedTarget as HTMLElement | null)?.closest(HOVER_SELECTOR)) {
        el.style.width = "16px";
        el.style.height = "16px";
        el.style.background = "transparent";
        arrow.style.opacity = "0";
      }
    };
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      el.remove();
      style.remove();
    };
  }, []);

  return null;
}

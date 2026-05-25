"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function NavigationBar() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (prevPathRef.current === pathname) return;
    prevPathRef.current = pathname;

    // New route loaded — complete the bar
    setProgress(100);
    timerRef.current = setTimeout(() => {
      setActive(false);
      setProgress(0);
    }, 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  // Expose a start function via a custom event so Link clicks can trigger it
  useEffect(() => {
    const handleStart = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setActive(true);
      setProgress(0);

      let p = 0;
      const tick = () => {
        // Ease toward ~85% without reaching 100 (waits for route change)
        p = p + (85 - p) * 0.06;
        setProgress(p);
        if (p < 84.5) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("navstart", handleStart);
    return () => {
      window.removeEventListener("navstart", handleStart);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.4 }}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, rgba(196,205,214,0.6), rgba(255,255,255,0.9))",
              boxShadow: "0 0 12px rgba(255,255,255,0.4)",
              borderRadius: "0 2px 2px 0",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

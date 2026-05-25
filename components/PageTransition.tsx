"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -12 },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", zIndex: 1 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

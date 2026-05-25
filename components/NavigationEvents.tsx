"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NavigationEvents() {
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;

      // Only fire for internal same-origin links that aren't anchors
      if (
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !href.includes("#") &&
        !a.hasAttribute("download") &&
        !a.getAttribute("target")
      ) {
        window.dispatchEvent(new Event("navstart"));
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // When route changes, the NavigationBar handles completion via pathname
  return null;
}

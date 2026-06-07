import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";
import ChatBot from "@/components/ChatBot";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "700"],
  style: ["italic"],
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Massishoots | Photographe & Vidéaste Premium — Montréal",
  description:
    "Massi Bena, photographe et vidéaste freelance premium à Montréal. Personal branding, corporate B2B, mariages & événements.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${bebasNeue.variable} ${dmSans.variable} ${playfair.variable} grain`}>
      <body>
        <CustomCursor />
        <ScrollReveal />
        <ChatBot />
        {children}
      </body>
    </html>
  );
}

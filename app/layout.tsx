import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Massishoots | Photographe & Vidéaste Premium — Montréal",
  description:
    "Massi Bena, photographe et vidéaste freelance premium à Montréal. Personal branding, corporate B2B, mariages & événements.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${bebasNeue.variable} ${dmSans.variable} grain`}>
      <body>{children}</body>
    </html>
  );
}

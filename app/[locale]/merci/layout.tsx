import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merci — Massishoots | Votre demande a été reçue",
  description: "Votre demande a bien été reçue. Massishoots vous recontacte sous 24h pour votre projet photo et vidéo à Montréal.",
  robots: { index: false, follow: false },
};

export default function MerciLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

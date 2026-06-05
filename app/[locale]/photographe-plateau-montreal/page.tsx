import type { Metadata } from "next";
import SeoLocalPage from "@/components/SeoLocalPage";

export const metadata: Metadata = {
  title: "Photographe Plateau-Mont-Royal Montréal | Massishoots",
  description: "Photographe et vidéaste au Plateau-Mont-Royal. Événements, portraits, contenu pour entrepreneurs. Consultation gratuite.",
};

export default function Page() {
  return (
    <SeoLocalPage
      quartier="Plateau-Mont-Royal"
      services={[
        "Photographie de restaurant & café",
        "Portrait professionnel & personal branding",
        "Vidéo événementielle & lancement",
        "Contenu mensuel pour entrepreneurs",
        "Reels Instagram & TikTok",
        "Photographie de produits",
      ]}
      description="Photographe et vidéaste basé à Montréal, disponible au Plateau-Mont-Royal. Des visuels authentiques pour les entrepreneurs, restaurants et marques du quartier."
    />
  );
}

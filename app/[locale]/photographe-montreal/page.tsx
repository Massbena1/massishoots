import type { Metadata } from "next";
import SeoLocalPage from "@/components/SeoLocalPage";

export const metadata: Metadata = {
  title: "Photographe & Vidéaste Montréal | Massishoots",
  description: "Photographe et vidéaste professionnel à Montréal. Événements, mariages, corporate, personal branding. Contenu premium livré en 48h. Consultation gratuite.",
};

export default function Page() {
  return (
    <SeoLocalPage
      quartier="Montréal"
      services={[
        "Photographie d'événements & galas",
        "Vidéographie corporate & branding",
        "Contenu mensuel pour entrepreneurs",
        "Photographie de mariage",
        "Reels & vidéos pour Instagram",
        "Publicité Meta & contenu UGC",
        "Portrait professionnel & headshots",
        "Drone & prises de vue aériennes",
      ]}
      description="MassiShoots est votre photographe et vidéaste de référence à Montréal. Spécialisé en événements, branding et contenu mensuel pour les entrepreneurs et marques qui veulent se démarquer."
    />
  );
}

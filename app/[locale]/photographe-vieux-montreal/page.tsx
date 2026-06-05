import type { Metadata } from "next";
import SeoLocalPage from "@/components/SeoLocalPage";

export const metadata: Metadata = {
  title: "Photographe Vieux-Montréal | Massishoots",
  description: "Photographe et vidéaste dans le Vieux-Montréal. Mariages, événements, galas et corporate dans les plus beaux lieux de la ville. Consultation gratuite.",
};

export default function Page() {
  return (
    <SeoLocalPage
      quartier="Vieux-Montréal"
      services={[
        "Photographie de mariage",
        "Galas & soirées de prestige",
        "Événements corporatifs",
        "Vidéo cinématique",
        "Portrait & séance photo lifestyle",
        "Contenu pour hôtels & restaurants",
      ]}
      description="Photographe et vidéaste dans le Vieux-Montréal. Mariages, galas et événements premium dans les plus beaux espaces de la ville, avec une esthétique cinématique et raffinée."
    />
  );
}

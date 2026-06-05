import type { Metadata } from "next";
import SeoLocalPage from "@/components/SeoLocalPage";

export const metadata: Metadata = {
  title: "Photographe Griffintown Montréal | Massishoots",
  description: "Photographe et vidéaste à Griffintown. Corporate, événements, branding pour startups et entreprises tech. Consultation gratuite.",
};

export default function Page() {
  return (
    <SeoLocalPage
      quartier="Griffintown"
      services={[
        "Photographie corporate & B2B",
        "Vidéo de présentation d'entreprise",
        "Événements & conférences",
        "Contenu pour startups & tech",
        "Headshots & portraits d'équipe",
        "Publicité vidéo Meta & LinkedIn",
      ]}
      description="Photographe et vidéaste à Griffintown, Montréal. Spécialisé en contenu corporate pour startups, agences et entreprises tech qui veulent une image professionnelle et moderne."
    />
  );
}

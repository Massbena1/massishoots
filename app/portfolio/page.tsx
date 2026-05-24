import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Portfolio | Massishoots — Photographe & Vidéaste Montréal",
  description: "Galerie complète — Personal Branding, Corporate, Mariages & Événements à Montréal.",
};

export default function PortfolioPage() {
  return (
    <main>
      <Navbar />
      <PageHeader
        label="La galerie"
        title="PORTFOLIO"
        subtitle="50+ projets — filtrez par catégorie pour explorer l'univers visuel Massishoots."
      />
      <Portfolio />
      <Footer />
    </main>
  );
}

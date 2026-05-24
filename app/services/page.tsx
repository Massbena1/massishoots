import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Services | Massishoots — Photographe & Vidéaste Montréal",
  description: "Découvrez les offres Personal Branding, Corporate B2B et Events & Weddings avec forfaits et tarifs.",
};

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <PageHeader
        label="Ce que je fais"
        title="MES SERVICES"
        subtitle="Trois offres taillées sur mesure — du personal branding au mariage cinématique."
      />
      <Services />
      <Process />
      <Footer />
    </main>
  );
}

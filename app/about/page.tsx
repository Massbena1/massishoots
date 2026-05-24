import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "À propos | Massishoots — Photographe & Vidéaste Montréal",
  description: "L'histoire de Massi Bena, son équipement, sa vision artistique et ses valeurs.",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <PageHeader
        label="Qui suis-je"
        title="À PROPOS"
        subtitle="Photographe, vidéaste et directeur artistique basé à Montréal — derrière chaque image, une vision."
      />
      <About />
      <Stats />
      <Footer />
    </main>
  );
}

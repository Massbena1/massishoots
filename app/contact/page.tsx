import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact | Massishoots — Réserver une séance à Montréal",
  description: "Formulaire de contact, réservation en ligne et réseaux sociaux — réponse sous 24h.",
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <Contact />
      <Footer />
    </main>
  );
}

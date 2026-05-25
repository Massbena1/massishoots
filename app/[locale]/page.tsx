import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Clients />
      <Stats />
      <Services />
      <Portfolio />
      <Process />
      <WhyUs />
      <Testimonials />
      <Faq />
      <CtaFinal />
      <Footer />
    </main>
  );
}

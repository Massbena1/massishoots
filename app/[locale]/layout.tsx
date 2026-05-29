import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import GlobalBackground from "@/components/GlobalBackground";
import PageTransition from "@/components/PageTransition";
import NavigationBar from "@/components/NavigationBar";
import NavigationEvents from "@/components/NavigationEvents";
import GradientMenu from "@/components/ui/gradient-menu";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  return { title: t("title"), description: t("description") };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://massishoots.com/#business",
      "name": "Massishoots",
      "description": "Photographe et vidéaste freelance premium à Montréal. Personal branding, événements, mariages et publicité.",
      "url": "https://massishoots.com",
      "telephone": "+14384640607",
      "email": "massishot.ca@gmail.com",
      "image": "https://massishoots.com/og-image.jpg",
      "priceRange": "$$$",
      "currenciesAccepted": "CAD",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer, e-Transfer",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Montréal",
        "addressRegion": "QC",
        "addressCountry": "CA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 45.5017,
        "longitude": -73.5673
      },
      "areaServed": [
        { "@type": "City", "name": "Montréal" },
        { "@type": "Province", "name": "Québec" },
        { "@type": "Country", "name": "Canada" }
      ],
      "sameAs": [
        "https://instagram.com/massishoots",
        "https://www.tiktok.com/@massishoots",
        "https://www.linkedin.com/in/massishoots",
        "https://massishot.myportfolio.com/"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services photo & vidéo",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Contenu Mensuel",
            "description": "Personal branding, Reels, face caméra, photos — package mensuel complet.",
            "price": "2500",
            "priceCurrency": "CAD",
            "priceSpecification": { "@type": "UnitPriceSpecification", "unitCode": "MON" }
          },
          {
            "@type": "Offer",
            "name": "Couverture d'Événements",
            "description": "Photo + vidéo complète pour soirées, galas, conférences, lancements.",
            "price": "2900",
            "priceCurrency": "CAD"
          },
          {
            "@type": "Offer",
            "name": "Publicité",
            "description": "Contenu vidéo court pour Meta Ads et Instagram.",
            "price": "599",
            "priceCurrency": "CAD"
          },
          {
            "@type": "Offer",
            "name": "Mariage",
            "description": "Photo + film cinématique de mariage, de la préparation à la soirée.",
            "priceCurrency": "CAD"
          }
        ]
      }
    },
    {
      "@type": "Person",
      "@id": "https://massishoots.com/#person",
      "name": "Massi Bena",
      "jobTitle": "Photographe & Vidéaste",
      "worksFor": { "@id": "https://massishoots.com/#business" },
      "url": "https://massishoots.com",
      "sameAs": [
        "https://instagram.com/massishoots",
        "https://www.linkedin.com/in/massishoots"
      ],
      "knowsLanguage": ["fr", "en"],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Montréal",
        "addressRegion": "QC",
        "addressCountry": "CA"
      }
    }
  ]
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <GlobalBackground />
          <NavigationBar />
          <NavigationEvents />
          {/* Desktop navigation */}
          <Navbar />
          {/* Mobile / tablet navigation */}
          <div className="md:hidden">
            <TopBar />
            <GradientMenu />
          </div>
          <PageTransition>{children}</PageTransition>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

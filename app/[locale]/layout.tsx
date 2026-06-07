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
import ExitIntentPopup from "@/components/ExitIntentPopup";

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
  "@type": "LocalBusiness",
  "name": "Massishoots",
  "description": "Studio photo et vidéo premium à Montréal. Personal branding, événements, mariages et publicité.",
  "url": "https://www.massishoots.com",
  "telephone": "+1-438-464-0607",
  "email": "massishoots.ca@gmail.com",
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
  "sameAs": [
    "https://www.instagram.com/massishoots"
  ],
  "priceRange": "$$$$",
  "openingHours": "Mo-Fr 09:00-18:00"
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
    <html lang={locale} data-theme="dark">
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
          <ExitIntentPopup />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

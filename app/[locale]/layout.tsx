import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import CustomCursor from "@/components/CustomCursor";
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
      <body>
        <NextIntlClientProvider messages={messages}>
          <GlobalBackground />
          <CustomCursor />
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

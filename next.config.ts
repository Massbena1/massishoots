import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async redirects() {
    return [
      { source: "/fr/tarifs", destination: "/fr/services", permanent: true },
      { source: "/en/tarifs", destination: "/en/services", permanent: true },
      { source: "/tarifs",    destination: "/services",    permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);

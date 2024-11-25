import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: {
    locales: ["fr", "de", "en"],
    defaultLocale: "en",
  },
};

export default nextConfig;

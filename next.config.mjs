/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  output: "export",
  images: {
    unoptimized: true
  }
  // i18n: {
  //   defaultLocale: "en",
  //   locales: ['ar', 'en'],
  //   localePath: "./locales",
  //   localeDetection: true,
  // },
};

export default nextConfig;

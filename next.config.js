// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
/** @type {import('next').NextConfig} */

module.exports = {
  publicRuntimeConfig: {
    site: {
      name: "Next.js + Tailwind CSS template",
    },
  },
  swcMinify: true,
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  // images: {
  //   domains: ["localhost"], // Add other domains if needed

  // },

  images: {
    domains: [
      "api-onlineshop.vercel.app",
      "localhost",
      "onlineshop-zp2h.onrender.com",
    ],
  },
};

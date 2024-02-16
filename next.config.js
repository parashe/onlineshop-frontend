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
      domains: ['puce-determined-cockatoo.cyclic.app'],
    },

};

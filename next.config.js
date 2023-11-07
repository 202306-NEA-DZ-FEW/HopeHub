/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

module.exports = {
    // i18n,
    i18n: {
        locales: ['en', 'ar', 'fr'],
        defaultLocale: 'en',
      },
    eslint: {
        dirs: ["src"],
    },
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: "res.cloudinary.com",
            },
            {
                hostname: "lh3.googleusercontent.com",
            },
        ],
    },
};

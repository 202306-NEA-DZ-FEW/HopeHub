/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

module.exports = {
    i18n,
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
    images: {
        domains: ["res.cloudinary.com"], // Add the domain(s) you want to allow
    },
};

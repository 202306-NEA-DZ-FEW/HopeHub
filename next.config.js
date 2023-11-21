const { i18n } = require("./next-i18next.config");
const withTM = require("next-transpile-modules")(["@jitsi/react-sdk"]);

module.exports = withTM({
    // i18n,
    i18n: {
        locales: ["en", "fr"],
        defaultLocale: "en",
    },
    eslint: {
        dirs: ["src"],
    },
    reactStrictMode: true,
    images: {
        domains: ["res.cloudinary.com"], // Add the domain(s) you want to allow
        remotePatterns: [
            {
                hostname: "res.cloudinary.com",
            },
            {
                hostname: "lh3.googleusercontent.com",
            },
        ],
    },
});

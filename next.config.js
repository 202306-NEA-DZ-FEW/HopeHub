const { i18n } = require("./next-i18next.config");
const withTM = require('next-transpile-modules')(['@jitsi/react-sdk']);

module.exports = withTM({
    i18n,
    eslint: {
        dirs: ["src"],
    },
    reactStrictMode: true,
});

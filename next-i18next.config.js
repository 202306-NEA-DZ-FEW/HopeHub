const path = require("path");
module.exports = {
    i18n: {
        defaultLocale: "en",
        locales: ["en", "ar", "fr"],
        reloadOnPrerender: false,
    },
    localePath: path.resolve("./public/locales"),
};

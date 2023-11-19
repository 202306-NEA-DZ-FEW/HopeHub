import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    // Add your i18next configuration here
    fallbackLng: "en",
    // Other options...
});

export default i18n;

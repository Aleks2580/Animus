import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./languages/en.json";
import cnTranslation from "./languages/cn.json";

const lng = localStorage.getItem("language") || "CN";

i18n.use(initReactI18next).init({
  resources: {
    EN: {
      translation: enTranslation,
    },
    CN: {
      translation: cnTranslation,
    },
  },
  lng: lng,
  fallbackLng: lng,
  interpolation: {
    escapeValue: false,
  },
  react: {
    bindI18n: "languageChanged",
    useSuspense: false,
  },
});

export default i18n;
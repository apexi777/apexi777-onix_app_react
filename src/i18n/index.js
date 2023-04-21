import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en';
import ua from './ua';

export const resources = {
  ua: { translation: ua },
  en: { translation: en },
};

const options = {
  order: ['localStorage'],
  lookupLocalStorage: 'i18next',
  caches: ['localStorage']
};

export const appLocales = Object.keys(resources);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: options,
    resources,
    // lng: 'en',
    fallbackLng: appLocales,
    react: {
      useSuspense: true,
    },
  });

export default i18n;

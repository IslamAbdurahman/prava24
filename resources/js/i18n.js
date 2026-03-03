import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from '../lang/en.json';
import ru from '../lang/ru.json';
import uz from '../lang/uz.json';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            uz: { translation: uz },
            ru: { translation: ru },
        },
        // --- BU QISMLARNI O'ZGARTIRING ---
        lng: localStorage.getItem('i18nextLng') || 'uz', // Birinchi yuklashda uz, keyin esa saqlangan til
        fallbackLng: 'uz', // Agar kalit topilmasa uz tilida ko'rsatadi
        // ---------------------------------
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'], // LocalStorage birinchi tekshiriladi
            caches: ['localStorage', 'cookie'], // Tanlangan tilni saqlab qoladi
        },
    });

export default i18n;

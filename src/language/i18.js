import i18next from 'i18next';
import English from './English.json';
import Spanish from './Spanish.json'
import { initReactI18next } from "react-i18next";
import {I18nManager} from "react-native"

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en',
    resources: {
        en: English,
        es: Spanish,
    },
    react: {
        useSuspense: false
    }
})
export default i18next;
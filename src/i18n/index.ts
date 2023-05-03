import { createI18n } from 'vue-i18n'
import { ar } from './ar/index';
import { en } from './en';
import { de } from './de';
const currentLocale = localStorage.getItem('lang')
export const i18n = createI18n({
    legacy:false,
    locale: currentLocale ? currentLocale : 'en',
    messages: {
        en: {
            ...en
        },
        ar: {
            ...ar
        },
        de: {
            ...de
        }
    }
});


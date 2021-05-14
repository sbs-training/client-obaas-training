import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import langs from './langs.json'

Vue.use(VueI18n)

export const defaultLocale = langs.default
export const locales = langs.locales

const i18n = new VueI18n({
  locale: defaultLocale
})

const setI18nLanguage = locale => {
  i18n.locale = locale
  axios.defaults.headers.common['Accept-Language'] = locale
  document.querySelector('html').setAttribute('lang', locale)
}

export const loadLocale = (locale, data) => {
  for (let i = 0; i < locales.length; i++) {
    // check if the requested locale is supported
    if (locales[i].code === locale) {
      i18n.setLocaleMessage(locale, data)
      i18n.isRtl = locales[i].isRtl || false
      return setI18nLanguage(locale)
    }
  }
  throw new Error(`Unsupported locale: ${locale}`)
}

export default i18n

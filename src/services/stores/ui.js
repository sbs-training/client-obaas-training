import axios from 'axios'
import { getProp, setProp, deleteProp } from '@/services/vuexHelpers.js/'
import { loadLocale, locales } from '@/i18n'
import * as ls from '@/services/localStorage'

const state = {
  locales,
  isStartingApp: true
}

const getters = {
  get: (state) => path => { return getProp(state, path.split('.')) },
  getStoredLocale: () => {
    return ls.get(ls.keys.locale)
  }
}

const mutations = {
  put: (state, { path, value }) => { setProp(state, path.split('.'), value) },
  delete: (state, path) => { deleteProp(state, path.split('.')) }
}

const actions = {
  async setAndLocalStoreValue ({ commit }, { path, value }) {
    commit('put', { path, value })

    switch (path) {
      case 'locale':
        ls.set(ls.keys[path], value)
        document.documentElement.lang = value
        loadLocale(value, (await axios.get(`${process.env.BASE_URL}locales/${value}.json`)).data)
        break
    }
  },
  setInitialState ({ commit, dispatch }, { iterator, iteratorName, value, valueName }) {
    const storedValue = ls.get(ls.keys[valueName])
    commit('put', { path: iteratorName, value: iterator })
    commit('put', { path: valueName, value: iterator.indexOf(storedValue) !== -1 ? storedValue : value })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

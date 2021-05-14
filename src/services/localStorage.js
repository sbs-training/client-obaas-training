import { LS } from '@/config'

const namespace = LS.namespace

export const keys = {
  locale: `${namespace}locale`
}

export const get = (...keys) => {
  if (keys.length === 1) return localStorage.getItem(keys[0])

  const items = {}
  keys.forEach(key => { items[key.replace(namespace, '')] = localStorage.getItem(key) })
  return items
}

export const set = (key, value) => {
  return localStorage.setItem(key, value)
}

// cannot use the word delete, it is reserved
export const rm = (...keys) => {
  keys.forEach(key => { localStorage.removeItem(key) })
}

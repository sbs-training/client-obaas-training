// VueX helper methods for generic operations on the stores
import Vue from 'vue'

// call example: getProp(state, ['prop1', 'nestedProp1.2ToGet'])
export const getProp = (obj, props) => {
  const prop = props.shift()
  if (!obj[prop] || !props.length) return obj[prop]
  return getProp(obj[prop], props)
}

// call example: setProp(state, ['prop1', 'nestedProp1.2ToSet'], valueToSet)
export const setProp = (obj, props, value) => {
  const prop = props.shift()
  if (!obj[prop]) Vue.set(obj, prop, {})
  if (!props.length) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      obj[prop] = { ...value }
      // below is the append form of the set
      // obj[prop] = { ...obj[prop], ...value }
    } else {
      obj[prop] = value
    }
    return
  }
  setProp(obj[prop], props, value)
}

// call example: deleteProp(state, ['prop1', 'nestedProp1.2ToDelete'])
export const deleteProp = (obj, props) => {
  const prop = props.shift()
  if (!obj[prop]) return
  if (!props.length) {
    Vue.delete(obj, prop)
    return
  }
  deleteProp(obj[prop], props)
}

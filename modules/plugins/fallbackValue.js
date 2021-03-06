/* @flow weak */
import resolveArrayValue from 'css-in-js-utils/lib/resolveArrayValue'

import isObject from '../utils/isObject'

function resolveFallbackValues(style) {
  for (const property in style) {
    const value = style[property]

    if (Array.isArray(value)) {
      style[property] = resolveArrayValue(property, value)
    } else if (isObject(value)) {
      style[property] = resolveFallbackValues(value)
    }
  }

  return style
}

export default () => resolveFallbackValues

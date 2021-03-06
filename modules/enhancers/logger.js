/* @flow weak */
/* eslint-disable consistent-return */
import cssbeautify from 'cssbeautify'

import { CLEAR_TYPE } from '../utils/styleTypes'

function addLogger(renderer, options) {
  renderer.subscribe((change) => {
    // log clearing
    if (change.type === CLEAR_TYPE) {
      console.log('Cleared renderer cache.')
      // eslint-disable-line
      return true
    }

    const selector = change.selector || change.fontFamily || change.name
    const css = change.declaration || change.keyframe || change.fontFace || change.css
    const formattedCSS = options.format ? cssbeautify(css) : css
    const isMedia = change.media && change.media.length > 0

    // logs all information in a group
    console.group(selector)
    if (isMedia) {
      console.log(change.media)
    }
    if (options.logCSS) {
      console.log(formattedCSS)
    }
    console.groupEnd(selector)
  })

  return renderer
}

const defaultOptions = {
  logCSS: false,
  formatCSS: false
}
export default (options = {}) => renderer => addLogger(renderer, {
  ...defaultOptions,
  ...options
})

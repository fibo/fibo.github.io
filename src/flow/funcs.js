
/**
 *
 * @param {Array} elements with class .filterArticles
 * @param {Function} onChange
 */

function change (elements, onChange) {
  elements.change(onChange)
}

/**
 *
 * @param {Array} elements with class .filterArticles
 */

function selectPicker (elements) {
  elements.selectpicker()
}

/**
 *
 * @returns {Array} elements with class .filterArticles
 */

function filterArticles () {
  return $('.filterArticles')
}

/*!
 * Exports.
 */

module.exports = {
  'change': change,
  'selectPicker()': selectPicker,
  '$filterArticles': filterArticles
}


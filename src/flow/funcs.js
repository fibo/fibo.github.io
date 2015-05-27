
/**
 *
 * @param {Array} elements with class .filterArticles
 *
 * @returns {Array} elements with class .filterArticles
 */

function selectPicker (elements) {
  return elements.selectpicker()
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
  '.selectpicker()': selectPicker,
  '$filterArticles': filterArticles
}


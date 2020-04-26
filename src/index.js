require('load-html')
window.toggleNav = require('./toggleNav')
var scrollHandler = require('./scrollHandler')

window.addEventListener('load', function() {
  scrollHandler()
  loadHtml()
})

require('./anchor.js')

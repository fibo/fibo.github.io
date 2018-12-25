function scrollHandler () {
  var scrollY = window.pageYOffset || document.documentElement.scrollTop
  var brake = 10
  var nav = document.querySelector('nav')
  navIsHidden = false

  window.addEventListener('scroll', function () {
    var windowScrollY = window.scrollY
    var up = scrollY > windowScrollY + brake
    var down = scrollY < windowScrollY - brake

    if (up && navIsHidden) {
      nav.style.display = 'initial'
      navIsHidden = false
    }

    if (down && !navIsHidden) {
      nav.style.display = 'none'
      navIsHidden = true
    }

    scrollY = windowScrollY
  }, true)
}

module.exports = scrollHandler

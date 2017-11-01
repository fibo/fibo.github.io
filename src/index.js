function toggleNav () {
  document.querySelector('nav').style.display = 'initial'
  document.querySelector('nav ul').classList.toggle('responsive')
  document.getElementById('hamburgericon').classList.toggle('open')
  document.querySelector('main').classList.toggle('shifted')

  // Disable scrolling when menu is open.

  var overflow = document.body.style.overflow

  if (overflow === '') {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

window.toggleNav = toggleNav

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

scrollHandler()

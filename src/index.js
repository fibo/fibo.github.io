function toggleNav () {
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

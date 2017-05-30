function toggleNav () {
  document.querySelector('nav ul').classList.toggle('responsive')
  document.getElementById('hamburgericon').classList.toggle('open')
  document.querySelector('main').classList.toggle('shifted')
}

window.toggleNav = toggleNav

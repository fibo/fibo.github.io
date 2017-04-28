function toggleNav () {
  document.querySelector('nav ul').classList.toggle('responsive')
  document.getElementById('hamburgericon').classList.toggle('open')
}

window.toggleNav = toggleNav

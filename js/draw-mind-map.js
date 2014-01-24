
var draw = SVG('mind-map').fixSubPixelOffset()

// avatar
draw.image('http://gravatar.com/avatar/e8b1967a7daac7e79352cd9447567e09', 80, 80)
    .move(100,140)

// blog
var blogLink = draw.link('http://blog.g14n.info')

blogLink.text('Blog')
    .style({anchor: 'start'})

blogLink.rect(50,50)
    .radius(10)
    .fill('none')
    .stroke('black')
    .move(-10, -10)

var blog = draw.group()

blog.add(blogLink)
blog.translate(40, 140)
    .animate({ease: '>', delay: 2710})
    .move(40, 240)

// github

draw.link('https://npmjs.org/~fibo')
    .image('https://github.global.ssl.fastly.net/images/modules/contact/heartocat.png', 115, 115)
    .move(25,25)

// npm

draw.link('https://npmjs.org/~fibo')
    .image('https://npmjs.org/static/npm.png', 100, 39)
    .move(250,250)

// linkedin

draw.link("http://www.linkedin.com/in/gianlucacasati")
    .image("http://s.c.lnkd.licdn.com/scds/common/u/img/logos/logo_linkedin_92x22.png", 92, 22)
    .move(270,150)

// vvvv

draw.link("http://vvvv.org/users/fibo")
    .image("http://vvvv.org/sites/default/files/imagecache/list_preview/grey.png", 50, 50)
    .move(170,50)


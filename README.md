
# My digital copybook

This is my web book! Gianluca Casati writes here :)

## Domain

The domain for this site is **g14n.info** which redirects to the only subdomain **www.g14n.info**.
Use the naked domain url `http://g14n.info` only as an entry point, `http://www.g14n.info/path/to/resource` for canonical links.

## Debug

It is highly recommended to install [Jekyll][3] to preview your site and avoid build errors before publishing it.

### Install Jekyll

Instructions work great on a [Codio](https://codio.com) box like [this](https://codio.com/fibo/g14n-info).

1. Create a *Gemfile* with the following content

```
source 'https://rubygems.org'
gem 'github-pages'
```

2. Add these lines to your *.gitignore*

```
_site/
.codio
Gemfile*
```

3. Install bundler

```bash
gem install bundler
```                                                                                                                     

4. Install dependencies

```bash
bundle install
```                                                                                                                     

See [Using Jekyll with Pages](https://help.github.com/articles/using-jekyll-with-pages) as a reference.

### Run Jekyll

Test content generation running

```bash
jekyll serve --watch
```

Static content is served [here][5].

  [1]: http://g14n.info/jekyll-boilerplate "Jekyll boilerplate"
  [2]: http://kramdown.gettalong.com "kramdown"
  [3]: http://jekyllrb.com "Jekyll"
  [4]: https://pages.github.com "GitHub Pages"
  [5]: http://rider-rufus.codio.io:4000/ "Static content on codio box"

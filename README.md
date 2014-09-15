
# My digital copybook

## Include projects

Import repo, for instance *dflow*

```
git subtree add --prefix _includes/dflow https://github.com/fibo/dflow.git master --squash
```

Create *dflow/index.html* filling it with *README.md* content

```
---
title: dflow
layout: default
---

{% include dflow/README.md | markdownify %}
```

## Debug

It is highly recommended to install [Jekyll][3] to preview your site and avoid build errors before publishing it.

### Install Jekyll

Instructions work great on a [Codio](https://codio.com) box like [this](https://codio.com/fibo/jekyll-boilerplate).

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
jekyll serve
```

  [1]: http://g14n.info/jekyll-boilerplate "Jekyll boilerplate"
  [2]: http://kramdown.gettalong.com "kramdown"
  [3]: http://jekyllrb.com "Jekyll"
  [4]: https://pages.github.com "GitHub Pages"


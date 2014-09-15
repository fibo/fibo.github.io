---
# This README.md is published as documentation site home page
title: Home page
permalink: index.html
---

[Jekyll boilerplate][1]
=======================

> create a site in few seconds

{:toc}

## Usage

### Quick start

Use this repo to create a site with minimal effort.

0. Create a GitHub repo, you will use [GitHub pages][4] to host your site.

1. Copy the following files in your repo

    * [_config.yml](https://github.com/fibo/jekyll-boilerplate/blob/master/_config.yml)
    * [_includes/footer.html](https://github.com/fibo/jekyll-boilerplate/blob/master/_includes/footer.html)
    * [_includes/header.html](https://github.com/fibo/jekyll-boilerplate/blob/master/_includes/header.html)
    * [_layouts/default.html](https://github.com/fibo/jekyll-boilerplate/blob/master/_layouts/default.html)

2. Create an home page: add an index.html or index.md. You can even use your README.md, if you add to it a [YAML front like this](https://raw.githubusercontent.com/fibo/jekyll-boilerplate/master/README.md).

3. Commit and push on [GitHub pages][4].

This is just a quick starting point, fork this repo and customize it according to your needs.

### Tips

#### README as index

You can even use your README.md content to create your site home page.
If you add to it a [YAML front like this](https://raw.githubusercontent.com/fibo/jekyll-boilerplate/master/README.md) you are done.
Alternatively, if you want a one page site, you can avoid the YAML front and edit yout _config.yml adding the following defaults

## Ingredients

* [GitHub pages][4]
* [Jekyll][3]
* [kramdown][1]

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


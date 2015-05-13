
# My digital copybook

This is my web book! Gianluca Casati writes here :)

## Domain

The domain for this site is **g14n.info** registered on [namecheap](https://www.namecheap.com);
thanks to [CloudFlare](https://www.cloudflare.com/) it is a naked domain and has SSL: both *http* and *https* schemes are available.

## Debug

It is highly recommended to install [Jekyll][3] to preview your site and avoid build errors before publishing it.

### Install Jekyll

0. Install [Ruby](https://www.ruby-lang.org) its dependencies (libxml2, patch) and Node as JavaScript runtime needed by [execjs](https://github.com/rails/execjs).
With [dotsoftware](http://g14n.info/dotsoftware/) it is as simple as

```bash
$ .software_install Ruby
$ .software_install libxml2
$ .software_install patch
$ .software_install Node
```

1. Create a *Gemfile* with the following content

```
source 'https://rubygems.org'
gem 'github-pages'
```

2. Add these lines to your *.gitignore*

```
_site/
Gemfile*
```

3. Install bundler

```bash
$ gem install bundler
```

4. Install dependencies

```bash
$ bundle install
```

See [Using Jekyll with Pages](https://help.github.com/articles/using-jekyll-with-pages) as a reference.

### Run Jekyll

Test content generation running

```bash
$ jekyll serve --watch
```
## Readme driven development

Inspired by [Tom Preston's article](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html) documentation about my projects is contained in their README.md file.

Get repo **foo**.

```bash
$ mkdir -p _projects/_repos
$ git clone https://github.com/fibo/foo _projects/_repos/foo
```

Store YAML front matter in a separate homonym *.yaml* file, which is ignored by Jekyll.

```
---
title: foo
layout: project
---
```

Concatenate *README.md* and its YAML front matter into *foo/index.md*

```bash
cat _projects/foo/index.yaml _projects/_repos/foo/README.md > _projects/foo/index.md
```

  [1]: http://g14n.info/jekyll-boilerplate "Jekyll boilerplate"
  [2]: http://kramdown.gettalong.com "kramdown"
  [3]: http://jekyllrb.com "Jekyll"
  [4]: https://pages.github.com "GitHub Pages"



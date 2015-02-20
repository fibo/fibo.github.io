
# My digital copybook

This is my web book! Gianluca Casati writes here :)

## Domain

The domain for this site is **g14n.info** registered on [namecheap](https://www.namecheap.com);
thanks to [CloudFlare](https://www.cloudflare.com/) it is a naked domain and has SSL: both *http* and *https* schemes are available.

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
  [5]: http://rider-rufus.codio.io:4000/ "Static content on codio box"



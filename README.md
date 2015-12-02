
# My digital copybook

This is my web book! Gianluca Casati writes here :)

## Domain

The domain for this site is **g14n.info** registered on [namecheap](https://www.namecheap.com);
thanks to [CloudFlare](https://www.cloudflare.com/) it is a naked domain and has SSL: both *http* and *https* schemes are available.
However, the default scheme I prefer when linking my site and articles is *http*.

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

See as a reference:
* [Using Jekyll with Pages](https://help.github.com/articles/using-jekyll-with-pages)
* [Repository metadata on GitHub Pages](https://help.github.com/articles/repository-metadata-on-github-pages/)
* [GitHub Markup](https://github.com/github/markup)

### Run Jekyll

Test content generation running

```bash
$ jekyll serve --watch
```

## Collections

### Projects

Inspired by Tom Preston's article [Readme driven development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html),
documentation about my projects that **does not** use [GitHub Pages][4] is contained in their *README.md* file which is used to generate the project Homepage.

```bash
$ npm run readmes
```

## Software

All software I produce is on GitHub, metadata is downloaded via API with

```bash
$ npm run data:repos
```

and stored in *_data/repos* folder as *.json* files. Data is displayed in [software page](http://g14n.info/software).
To add a new repo, *foo* for instance, just add an empty *json* file

```bash
$ touch _data/repos/foo.json
```

The name should not start with a dot, the only exception (by now :) is *.software* that is handled separately. The issue is that [jekyll][3] ignores dotfiles, so I need to name them *dotsoftware*. On the other side, having a repo named *.software* is a great advantage for its user experience: it makes sense.

## npm scripts

### GitHub badges

Update all SVG badges

```bash
$ npm run img.shields.io
```

Update badges for a specific project

```bash
$ export filename=foo
$ export reponame=foo
$ npm run img.shields.io
```

## Licenses

I use the [Artistic license](http://g14n.info/artistic-license) for Perl projects, the [MIT license](http://g14n.info/mit-license) otherwise.

  [2]: http://kramdown.gettalong.com "kramdown"
  [3]: http://jekyllrb.com "Jekyll"
  [4]: https://pages.github.com "GitHub Pages"


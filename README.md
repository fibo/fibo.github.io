# My digital copybook

> This is my web book! Gianluca Casati writes here :)

[![Stack Share](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/fibo/my-personal-website)

## Domain

The domain for this site is **g14n.info** registered on [namecheap](https://www.namecheap.com);
thanks to [CloudFlare](https://www.cloudflare.com/) it is a naked domain and has SSL: both *http* and *https* schemes are available.
However, the default scheme I prefer when linking my site and articles is *http*.

## Pages

### Style

Yes! [Jekyll] supports [Sass], I am using a *style.scss* that imports partials and it is integrated on [GitHub Pages], read

* [Using Sass with Jekyll](http://markdotto.com/2014/09/25/sass-and-jekyll/)
* [Assets doc page on Jekyll website](https://jekyllrb.com/docs/assets/)

A really good starting point is the [Jekyll] scaffold you obtain launching

```bash
jekyll new pippo
```

and the [minima] Jekyll theme.

### Images

When editing post *2000-01-01-template.md*, create a folder *images/2000/01/template*
which contains all images relative to that post, then you can reference them with

```markdown
![image decription](/images{{ page.id }}/image_name.jpg)
```

If you want the image to be responsive add the `responsive` CSS class

```markdown
![image decription](http://image/url){:.responsive}
```

### Link to post

Use the snippet `[linked text]{% post_url yyyy-mm-dd-foo-bar %}`, for example

```
See how to install [AWS Redshift compatible PostgreSQL client]{% post_url 2016-05-12-aws-redshift-compatible-psql %} article.
```

### Libs

```yaml
---
libs:
  twemoji: true
  katex: true
---
```

### Post tags

Every tag can have a [tag](./tag) subfolder names as `{ tag | slugify }`.
To show it as a link in tag badges, edit `_data/pagetag.yml`; for example
if there is only one post tagged with that keywork it does not make sense to list all of its related posts in a page.
Furthermore, tag could by a typo or tag folder could not exist yet.

### Tricks

To escape Liquid tags, use `{{ "{% this " }}%}`. To escape `{{ this }}`, use `{{ "{{ this " }}}}`.
Reference: [How to escape liquid tags?](http://stackoverflow.com/questions/3426182/how-to-escape-liquid-template-tags).

## Debug

It is highly recommended to install [Jekyll] to preview your site and avoid build errors before publishing it.

### Install Jekyll

0. Install [Ruby](https://www.ruby-lang.org) its dependencies (libxml2, patch) and Node as JavaScript runtime needed by [execjs](https://github.com/rails/execjs).
With [dotsoftware](http://g14n.info/dotsoftware/) it is as simple as

```bash
.software_install Ruby
.software_install libxml2
.software_install patch
.software_install Node
```

1. Install bundler

```bash
gem install bundler
```

2. Install dependencies

```bash
bundle install
```

See as a reference:
* [Using Jekyll with Pages](https://help.github.com/articles/using-jekyll-with-pages)
* [Repository metadata on GitHub Pages](https://help.github.com/articles/repository-metadata-on-github-pages/)
* [GitHub Markup](https://github.com/github/markup)
* [Jekyll Tips](http://jekyll.tips/)

### Run Jekyll

Launch server running

```bash
npm start
```

Then you can connect to the site served locally on http://localhost:4000 or the admin panel on http://localhost:4000/admin

You can run it on a remote server, for example launching

```bash
npm start -- -H dev.g14n.info
```

## Collections

### Projects

Inspired by Tom Preston's article [Readme driven development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html),
documentation about my projects that **does not** use [GitHub Pages] is contained in their *README.md* file which is used to generate the project Homepage.

```bash
npm run readmes
```

## Software

First of all, it is needed to create `.gh-token` file containing a GitHub token

All software I produce is on GitHub, metadata is downloaded via API with

```bash
npm run data:github:repos
```

and stored in *_data/github/repos* folder as *.json* files. Data is displayed in [software page](http://g14n.info/software).

To keep software metadata and social badges updated, on a host that is always on, launch the worker

```bash
screen -S worker
npm run worker
```

then escape from screen session with <kbd>CTRL-a d</kbd>.

To add a new repo, *foo* for instance, just add an empty *json* file

```bash
touch _data/github/repos/foo.json
```

The name should not start with a dot, the only exception (by now :) is *.software* that is handled separately. The issue is that [jekyll] ignores dotfiles, so I need to name them *dotsoftware*. On the other side, having a repo named *.software* is a great advantage for its user experience: it makes sense.

## npm scripts

### GitHub badges

At first I started using shield.io, for example

```
https://img.shields.io/github/watchers/fibo/${reponame}.svg?style=social&label=Watch
```

but sometimes the badge goes unresponsive. Another solution is to use buttons from https://buttons.github.io but they cannot be embedded in a README.md on npm.

The final solution is to use static svg files generated by Jekyll.

For instance, repo *foo* has stars badge *http://g14n.info/svg/github/stars/foo.svg*
which is generated by the following code

```
---
layout: null
---
{% assign repo = site.data.github.repos.foo %}
{% include github/stars.html %}
```

## Licenses

I use the [Artistic license](http://g14n.info/artistic-license) for Perl projects, the [MIT license](http://g14n.info/mit-license) otherwise.

[Jekyll]: http://jekyllrb.com "Jekyll"
[GitHub Pages]: https://pages.github.com "GitHub Pages"
[Sass]: http://sass-lang.com/ "Sass"
[minima]: https://github.com/jekyll/minima "minima Jekyll theme"

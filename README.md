
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

See as a reference:
* [Using Jekyll with Pages](https://help.github.com/articles/using-jekyll-with-pages)
* [Repository metadata on GitHub Pages](https://help.github.com/articles/repository-metadata-on-github-pages/)

### Run Jekyll

Test content generation running

```bash
$ jekyll serve --watch
```
## Collections

### Projects

Inspired by Tom Preston's article [Readme driven development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html),
documentation about my projects that does not use [GitHub Pages][4] is contained in their *README.md* file which is used to generate the project Homepage.

Add repo **foo** as a submodule.

```bash
$ git submodule add https://github.com/fibo/foo _projects/_repos/foo
```

**Do not** use `git@github.com:fibo/foo.git` otherwise GitHub will be not able to clone submodule.

Store YAML front matter in a separate homonym *.yaml* file, which is ignored by Jekyll.

```bash
$ mkdir -p _projects/foo
```

Sample content of *_projects/foo/index.yaml*

```
---
name: foo
description: bla bla
---
```

Add this entry in the package.json script array

```
"project:homepage:foo": "cat _projects/foo/index.yaml _projects/_repos/foo/README.md > _projects/foo/index.md"
```

Concatenate *README.md* and its YAML front matter into *foo/index.md*

```bash
npm run project:homepage:foo
```


## Licenses

I use the [Artistic license](http://g14n.info/artistic-license) for Perl projects, the [MIT license](http://g14n.info/mit-license) otherwise.

  [2]: http://kramdown.gettalong.com "kramdown"
  [3]: http://jekyllrb.com "Jekyll"
  [4]: https://pages.github.com "GitHub Pages"




# My digital copybook

## Include projects

Use git subtree to import repo[^1].

Import repo, for instance *dflow*

```
git subtree add --prefix dflow https://github.com/fibo/dflow.git master --squash
```

Create *dflow/index.md* and other pages, without modifying existing ones.

To update projects from source run

```
git subtree pull --prefix dflow https://github.com/fibo/dflow.git master --squash
```

## Documentation projects

Turn *README.md* into *index.html*: just add a YAML front with project title

```
---
title: dflow
---
```

then set defaults in *_config.yml* 

```
    scope:
      path: "dflow"
    values:
      permalink: "./dflow/index.html"
      layout: default
```

so *README.md* will generate project homepage.

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
jekyll serve
```

[^1]:

See [Alternatives To Git Submodule: Git Subtree][4] as a reference


  [1]: http://g14n.info/jekyll-boilerplate "Jekyll boilerplate"
  [2]: http://kramdown.gettalong.com "kramdown"
  [3]: http://jekyllrb.com "Jekyll"
  [4]: https://pages.github.com "GitHub Pages"
  [5]: http://blogs.atlassian.com/2013/05/alternatives-to-git-submodule-git-subtree/ "Alternatives To Git Submodule: Git Subtree"



---
title: Moving from Blogger to GitHub Pages
description: >
    Migrate your blog from Blogger to GitHub Pages to gain full control on your content
tags:
  - Blogger
---

Here it is, another meta post like the one I wrote about [How to use Markdown to edit Blogger posts](http://blog.g14n.info/2013/12/how-to-use-markdown-to-edit-blogger.html).
Yes, this post traits about its creation, infact I am moving from Blogger to Github Pages. 

I started looking these examples:

* [Bootstrap](http://getbootstrap.com/): [repo](hettps://github.com/twbs/bootstrap)
* [Perfection Kills](http://perfectionkills.com/): [repo](https://github.com/kangax/perfectionkills.com)
* [ESLint](http://eslint.org/): [repo](https://github.com/eslint/eslint.github.io)

See here more [sites using Jekyll](http://jekyllrb.com/docs/sites/).

## Pros

* Can edit locally using my favourite editor (vim, of course :^).
* Can edit online using GitHub editor.
* Easier web design: editing Blogger template is horrible! Now I can use Bootstrap 3.
* Can easily embed a GitHub Gist, see [Jekyll documentation about gists](http://jekyllrb.com/docs/templates/#gist).

## Cons

* Loose out of the box Google Ads integration: it is ok for me, cause I will will remove ads.
* Loose comments feature: I will implement it with disqus or facebook. By the way I got three type of comments while my blog was on Blogger: spam, that I had to moderate; hints, that I would like to redirect to a collaboration via GitHub, maybe using the site's repo issues tracker; thanks, that I would like to redirect to donations.
 
## Steps

### Clone a repo on Github

### Basic structure

* _config.yml
* _includes/footer.html
* _includes/header.html
* _layouts/default.html
* _layouts/post.html
* feed.xml
* index.html
* _posts/2014-08-27-moving-from-blogger-to-github-pages.md

### Create a post


### Porting a post

I will focus on post http://blog.g14n.info/2013/07/how-to-install-dbdoracle.html, that is the most visited of my blog.

See [Jekyll docs about how to write a post](http://jekyllrb.com/docs/posts/).

To preserve blogger urls, edit _config.yml and add

```
permalink: ./:year/:month/:title.html
```

Note that filename should start with yyyy-mm-dd and post title should be lowercase and separated by dashes, file extension is *.md*, for instance, I will create a file

```
_posts/2013-07-02-how-to-install-dbdoracle.md
```

Don't forget to insert a [YAML frontmatter](http://jekyllrb.com/docs/frontmatter/)

```
---
layout: post
title: Moving from Blogger to GitHub Pages
tags:
  - Blogger
---
```

## Social integration

## Comments

## See also

[Dependencies and versions used by GitHub Pages](https://pages.github.com/versions/)


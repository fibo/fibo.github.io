# My digital copybook

> This is my web book! Gianluca Casati writes here :)

[![Stack Share](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/fibo/my-personal-website)

### Style

Yes! [Jekyll] supports [Sass], I am using a *style.scss* that imports partials and it is integrated on [GitHub Pages], read

* [Using Sass with Jekyll](http://markdotto.com/2014/09/25/sass-and-jekyll/)
* [Assets doc page on Jekyll website](https://jekyllrb.com/docs/assets/)

A really good starting point is the [Jekyll] scaffold you obtain launching

```bash
jekyll new myblog
```

and the [minima] Jekyll theme.

### Images

When editing post *2000-01-01-post-slug.md*, create a folder *images/2000/01/post-slug*
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

### Post tags

Every tag can have a [tag](./tag) subfolder named as `{ tag | slugify }`.
To show it as a link in tag badges, edit `_data/tagpage.yml`; for example
if there is only one post tagged with that keywork it does not make sense to list all of its related posts in a page.
Furthermore, tag could by a typo or tag folder could not exist yet.

### Tricks

To escape Liquid tags, use `{{ "{% this " }}%}`. To escape `{{ this }}`, use `{{ "{{ this " }}}}`.
Reference: [How to escape liquid tags?](http://stackoverflow.com/questions/3426182/how-to-escape-liquid-template-tags).

## Collections

### Projects

Inspired by Tom Preston's article [Readme driven development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html),
documentation about my projects that **does not** use [GitHub Pages] is contained in their *README.md* file which is used to generate the project Homepage.

```bash
npm run readmes
```

## Software

Create a `.gh-token` file containing a GitHub token.
You can go to [GitHub settings here](https://github.com/settings/personal-access-tokens): get a token that can access _Public repositories_.

All software I produce is on GitHub, metadata is downloaded via API with

```bash
npm run data:github:repos
```

and stored in *_data/github/repos* folder as *.json* files. Data is displayed in [software page](https://fibo.github.io/software).

To add a new repo, *foo* for instance, just add an empty *json* file

```bash
touch _data/github/repos/foo.json
```

[Jekyll]: http://jekyllrb.com "Jekyll"
[GitHub Pages]: https://pages.github.com "GitHub Pages"
[Sass]: http://sass-lang.com/ "Sass"
[minima]: https://github.com/jekyll/minima "minima Jekyll theme"

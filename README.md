# My digital copybook

> This is my web book! Gianluca Casati writes here :)

[![Stack Share](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/fibo/my-personal-website)

## Dev server

I am using [Jekyll] to build this website, to run it locally I have something like this in my MacOS `~/.zshrc` shell profile:

```sh
# Ruby
# for Jekyll, see https://jekyllrb.com/docs/installation/macos/
source $(brew --prefix)/opt/chruby/share/chruby/chruby.sh
source $(brew --prefix)/opt/chruby/share/chruby/auto.sh
chruby ruby-3.4.1
```

Once dependecies are installed with

```sh
bundle install
npm install
```

Then to launch the dev server:

```sh
npm start
```

## Style

Yes! [Jekyll] supports [Sass], I am using a [style.scss](https://github.com/fibo/fibo.github.io/blob/master/style.scss) that imports partials from the [_sass/ folder](https://github.com/fibo/fibo.github.io/tree/master/_sass) and it is integrated on [GitHub Pages].
See [templates/page](https://fibo.github.io/templates/page) for a showcase of styles used.

## Images

When editing post *2000-01-01-post-slug.md*, create a folder *images/2000/01/post-slug*
which contains all images relative to that post, then you can reference them with

```markdown
![image decription](/images{{ page.id }}/image_name.jpg)
```

If you want the image to be responsive add the `responsive` CSS class

```markdown
![image decription](http://image/url){:.responsive}
```

## Link to post

Use the snippet `[linked text]{% post_url yyyy-mm-dd-foo-bar %}`, for example

```
See how to install [AWS Redshift compatible PostgreSQL client]{% post_url 2016-05-12-aws-redshift-compatible-psql %} article.
```

## Post tags

Every tag can have a [tag](./tag) subfolder named as `{ tag | slugify }`.
To show it as a link in tag badges, edit `_data/tagpage.yml`; for example
if there is only one post tagged with that keywork it does not make sense to list all of its related posts in a page.
Furthermore, tag could by a typo or tag folder could not exist yet.

## Tips & Tricks

### Escape Liquid tags

To escape Liquid tags, use `{{ "{% this " }}%}`. To escape `{{ this }}`, use `{{ "{{ this " }}}}`.
Reference: [How to escape liquid tags?](http://stackoverflow.com/questions/3426182/how-to-escape-liquid-template-tags).

### Available gems

To see which gems are available on GitHub Pages, run

```shell
bundle exec github-pages versions
```

See also https://github.com/github/pages-gem

[Jekyll]: http://jekyllrb.com "Jekyll"
[GitHub Pages]: https://pages.github.com "GitHub Pages"
[Sass]: http://sass-lang.com/ "Sass"
[minima]: https://github.com/jekyll/minima "minima Jekyll theme"

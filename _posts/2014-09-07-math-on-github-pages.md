---
title: Math on GitHub Pages
tags:
  - Math
  - Web
description: >
    Display math formulas on GitHub Pages using LaTeX. Two methods are described, one using MathJax to render formulas client side, and other using KaTeX to render formulas server side.
libs:
  katex: true
---

## Goal

I have been searching a process to display math formulas, written in [LaTeX]
in a website for a long time. Now I think I can share my knowledge, hoping it
can help other people to divulge math.

### Using MathJax

This is the preferred method, cause [MathJax] is more complete than [KaTeX] and it is supported on [GitHub Pages][gh-pages], see [Jekyll Math Support](https://jekyllrb.com/docs/extras/#math-support) section.

Just make sure you use the *kramdown* markdown processor, which is the default. If you don't know what I mean, it is ok, it means that you are using the default provided by [GitHub Pages][gh-pages] so you don't need to worry about it.

Just use a double dollar sign `$$` to escape [LaTeX] formulas

```
you can use an inline formula $$\forall x \in R$$ like this one
```

you can use an inline formula $$\forall x \in R$$ like this one

or display a centered formula like this

```
$$
M = \left( \begin{array}{ccc}
x_{11} & x_{12} & \ldots \\
x_{21} & x_{22} & \ldots \\
\vdots & \vdots & \ldots \\
\end{array} \right)
$$
```

$$
M = \left( \begin{array}{ccc}
x_{11} & x_{12} & \ldots \\
x_{21} & x_{22} & \ldots \\
\vdots & \vdots & \ldots \\
\end{array} \right)
$$

To let [MathJax] do its magic, add this script in your page

```html
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
```

<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

For example in my thesis website I created an [_includes/lib/mathjax.html](https://github.com/fibo/Sul-problema-di-Apollonio/blob/master/_includes/lib/mathjax.html) I can use in any page with a [Jekyll] include like

```
{{ "{% include lib/mathjax.html " }}%}
```

**NOTA BENE** formulas are not rendered in the GitHub website but on your [GitHub Pages][gh-pages] website, emh like this one you are reading right now.

### Using KaTeX

I am going to show how to render math snippets server side with [KaTeX][KaTeX]
in order to import them in your [GitHub Pages][gh-pages] static web site using
[Jekyll][Jekyll] `include` feature.
Note that client side rendering is also possible, but it is not in the scope of
this article, by now.

This is an updated version of the original article, that contained a different
solution using MathJax and Redcarpet markdown. That solution is obsolete, I found
[KaTeX][KaTeX] and server side rendering, a far better solution.

What is KaTeX?

> KaTeX is a fast, easy-to-use JavaScript library for TeX math rendering on the web.

Install [katex cli][katex], with [npm][npm] do

```bash
npm install katex -g
```

Create two folders that will contain **inline** and **display** snippets

```bash
mkdir -p tex-snippets/inline
mkdir -p tex-snippets/display
```

An *inline* snippet, like {% include math/inline/for-any-real.html %}, does not break its row.

A snippet in *display* mode will be centered, usually it is a formula, for example

{% include math/display/matrix.html %}

Create file *tex-snippets/inline/for-any-real.tex* with the following content

```tex
\forall x \in R
```

Create file *tex-snippets/display/matrix.tex* with the following content

```tex
M = \left( \begin{array}{ccc}
x_{11} & x_{12} & \ldots \\
x_{21} & x_{22} & \ldots \\
\vdots & \vdots & \ldots \\
\end{array} \right)
```

Create two folders that will contain *inline* and *display* rendered output in your
[Jekyll][Jekyll] **includes** folder

```bash
mkdir -p _includes/math/inline
mkdir -p _includes/math/display
```

Generate html output

```bash
cat tex-snippets/display/matrix.tex | katex --display-mode > _includes/math/display/matrix.html
cat tex-snippets/inline/for-any-real.tex | katex > _includes/math/inline/for-any-real.html
```

Finally, add KaTeX CSS to your html page.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">
```

If you read [KaTeX Usage][KaTexUsage], there is also a JavaScript tag to add, but
it is required only for client side rendering.

Now you can include the snippets in your website using [Jekyll][Jekyll] include tags

* `{{ "{% include math/inline/for-any-real.html " }}%}`
* `{{ "{% include math/display/matrix.html " }}%}`

[algebra]: http://g14n.info/algebra "algebra"
[LaTeX]: http://www.latex-project.org/ "LaTeX"
[gh-pages]: https://pages.github.com/ "GitHub Pages"
[KaTeX]: https://khan.github.io/KaTeX/ "KaTeX"
[Jekyll]: http://jekyllrb.com/ "Jekyll"
[npm]: https://www.npmjs.com/ "npm"
[KaTexUsage]: https://github.com/Khan/KaTeX#usage "KaTex Usage"
[katex]: https://www.npmjs.com/package/katex "katex cli"
[MathJax]: https://www.mathjax.org/ "MathJax"

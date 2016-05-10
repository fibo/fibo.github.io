---
title: Math on GitHub Pages
tags:
  - Math
  - GitHub
  - Markdown
  - LaTeX
  - KaTeX
description: >
    Display math formulas on GitHub Pages using LaTeX formulas rendered server side by KaTeX.
libs:
  katex: true
---

## Goal

I have been searching a process to display math formulas, written in [LaTeX][LaTeX]
in a website for a long time. Now I think I can share my knowledge, hoping it
can help other people to divulge math.
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

## How to

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

* {{ "{% include math/inline/for-any-real.html " }}%}
* {{ "{% include math/display/matrix.html " }}%}

## Structured solution

Actually I am using the process explained above, for a NodeJS package. So I install
[KaTeX cli][katex] locally, and it is declared in my package deps. There are npm scripts
that generate snippets on every build. Check out my [algebra][algebra] NodeJS package
code, to see how its blog is generated.

[algebra]: http://g14n.info/algebra "algebra"
[LaTeX]: http://www.latex-project.org/ "LaTeX"
[gh-pages]: https://pages.github.com/ "GitHub Pages"
[KaTeX]: https://khan.github.io/KaTeX/ "KaTeX"
[Jekyll]: http://jekyllrb.com/ "Jekyll"
[npm]: https://www.npmjs.com/ "npm"
[KaTexUsage]: https://github.com/Khan/KaTeX#usage "KaTex Usage"
[katex]: https://www.npmjs.com/package/katex "katex cli"

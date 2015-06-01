---
title: Math on GitHub Pages
tags:
  - Math
description: >
    Display math formulas on your free website.
---

<div class="alert alert-danger">This article is <strong>obsolete</strong>.
After I switched to <a href="https://github.com/vmg/redcarpet">Redcarpet</a> markdown render, which is actually the GitHub default (or due to some other reason, maybe a MathJax update) the LaTeX rendering got broken.
I also found MathJax <strong>really heavy</strong> to load in my site, it requires more than 170 Mb of disc space!
</div>

<div class="alert alert-info">Take a look to <a href="https://khan.github.io/KaTeX/">KaTeX</a> which claims to be the <strong>fastest</strong> math typesetting library.</div>

GitHub Pages uses [kramdown](http://kramdown.gettalong.org/) by default.
If you want to enable [GitHub Flavored Markdown][3], that is the same used by GitHub Wikis, set the following entries in your *_config.html*

```
markdown: kramdown
kramdown:
  input: GFM
```

Edit your pages to add MathJax support adding the following snippet

```
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
```

Now you can use a double dollar to include [LaTex][1] code block that will be rendered by [MathJax][2]!

For example, try how renders the following code

```
$$
\begin{align*}
  & \phi(x,y) = \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right)
  = \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j) = \\
  & (x_1, \ldots, x_n) \left( \begin{array}{ccc}
      \phi(e_1, e_1) & \cdots & \phi(e_1, e_n) \\
      \vdots & \ddots & \vdots \\
      \phi(e_n, e_1) & \cdots & \phi(e_n, e_n)
    \end{array} \right)
  \left( \begin{array}{c}
      y_1 \\
      \vdots \\
      y_n
    \end{array} \right)
\end{align*}
$$
```

  [1]: http://www.latex-project.org/ "LaTeX"
  [2]: http://www.mathjax.org/ "MathJax"
  [3]: https://help.github.com/articles/github-flavored-markdown "GitHub Flavored Markdown"


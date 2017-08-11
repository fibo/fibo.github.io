---
title: dot-editorconfig
npm: true
---
# dot-editorconfig

> creates a .editorconfig file in your package dir

[![KLP](https://img.shields.io/badge/kiss-literate-orange.svg)](http://g14n.info/kiss-literate-programming)
[![NPM version](https://badge.fury.io/js/dot-editorconfig.svg)](http://badge.fury.io/js/dot-editorconfig)

[Usage](#usage) |
[Source](#source) |
[Contributing](#contributing) |
[License](#license)

## Usage

> [EditorConfig] helps developers define and maintain consistent coding styles between different editors and IDEs.

Launching the command

```bash
npm install dot-editorconfig --save-dev
```

will create, in your package dir, an *.editorconfig* file with [this content](#source).
You can optionally gitignore it or version it and modify it.
Please note that **dot-editorconfig will not override your .editorconfig**
so if you need to upgrade it is necessary to do an `rm .editorconfig`.
It is up to you to choose to gitignore or version and modify further your
*.editorconfig* according to your needs.

## Source

    # EditorConfig is awesome: http://EditorConfig.org

    # This file was created via command line
    #
    #     npm install dot-editorconfig

    # top-most EditorConfig file
    root = true

    [*]
    end_of_line = lf
    trim_trailing_whitespace = true
    charset = utf-8
    indent_style = space
    indent_size = 2

    [*{.conf,.pl,.pm,.py}]
    indent_size = 4

    [*{.glsl,.go,.sh,.sql}]
    indent_style = tab

    [Makefile]
    indent_style = tab


## Contributing

If you also like the idea to have an easy to install and share *.editorconfig*
and you think you can contribute adding something missing or improving current
configuration, edit this [README] in the **Source section** and send a
pull request.
Do not edit the *.editorconfig* file, since it is generated with `make`.

## License

[MIT](http://g14n.info/mit-license/)

[EditorConfig]: http://editorconfig.org/ "EditorConfig"
[README]: https://github.com/fibo/dot-editorconfig/blob/master/README.md "README.md"

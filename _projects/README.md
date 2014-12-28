
# Readme driven development

Inspired by [Tom Preston's article](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html) documentation about my projects is contained in their README.md file.

The *_repos* folder contains my repositories.


The *_repos* folder and this *README.md* is ignored by Jekyll.
The *_repos* folder is also ignored by git, it could be empty or even not exist.

Get repo **foo**.

```bash
$ cd _repos
$ git clone https://github.com/fibo/foo
```

Store YAML front matter in a separate homonym *.yaml* file, which is ignored by Jekyll.

```
---
title: foo
layout: project
---
```

Concatenate *README.md* and its YAML front matter into *foo/index.md*

```bash
cat foo/index.yaml _repos/foo/README.md >> foo/index.md
```

Same procedure applies to other files, like those in *examples/* dir. The *empty* layout can be useful.


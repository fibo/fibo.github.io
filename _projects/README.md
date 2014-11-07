
# Readme driven development

Inspired by [Tom Preston's article](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html) documentation about my projects is contained in their realtive README.md.

The *_repos* folder contains relative reports.


The *_repos* folder and this *README.md* is ignored by Jekyll.
The *_repos* folder is also ignored by git, it could be empty or even not exist.

Get repo **foo**.

```bash
cd _repos
git clone https://github.com/fibo/foo
```

Remove *foo/index.md* content except YAML front matter that should be

```
---
title: foo
layout: default
---
```

Cat *README.md* into *foo/index.md*

```bash
cat _repos/foo/README.md >> foo/index.md
```

Remove `# foo` heading from foo/index.md


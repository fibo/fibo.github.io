
## Include projects

Use git subtree to import repo.

Import repo, for instance *dflow*

```
git subtree add --prefix dflow https://github.com/fibo/dflow.git master --squash
```

Create *dflow/index.md* and other pages, without modifying existing ones.

To update projects from source run

```
git subtree pull --prefix dflow https://github.com/fibo/dflow.git master --squash
```

See [Alternatives To Git Submodule: Git Subtree][5] as a reference

  [1]: http://blogs.atlassian.com/2013/05/alternatives-to-git-submodule-git-subtree/ "Alternatives To Git Submodule: Git Subtree"



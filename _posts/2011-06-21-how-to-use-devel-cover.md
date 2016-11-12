---
title: How to use Devel::Cover
tags:
  - Perl
description: >
    Quick introduction and usage of Devel::Cover to get code coverage metrics for Perl
---

It's time to deploy another version of my CPAN module. I have 57 files and 698 tests: the question is

> Are my tests *good enough*? Did they cover all possible cases?

Mmh, it's a difficult question, the answer depends on a lot of things ... here comes [Devel::Cover][1] to the rescue.
So we have this magic module that gives us some statistics to evaluate where are the gaps in our tests.
Yes, I know, it is still a difficult question, but at least [Devel::Cover][1] gives us some answers, for sure it is a good starting point.

Consider I am on Windows, so I have `set` instead of `export` and `dmake` instead of `make`. My working folder, is `C:\SVN_ROOT\PNI`.

If it is not the first time you run it, launch a

```
C:\SVN_ROOT\PNI>cover -delete
Deleting database C:\SVN_ROOT\PNI\cover_db
```

Just set the environment variable `HARNESS_PERL_SWITCHES=-MDevel::Cover` and run your tests.
For example

```
C:\SVN_ROOT\PNI>set HARNESS_PERL_SWITCHES=-MDevel::Cover
C:\SVN_ROOT\PNI>prove -l
```

Here it is the cool part!

```
C:\SVN_ROOT\PNI>cover
Reading database from C:\SVN_ROOT\PNI\cover_db
...

Writing HTML output to C:\SVN_ROOT\PNI\cover_db/coverage.html ...
done.
```

This will produce a coverage.html file in the *cover_db/* directory.

Noooooo, my *_node-perlfunc-int.t* has a red entry with a 50% ... mmh maybe because the test file is almost empty, it just checks default values.

![int50](/images{{ page.id }}/int50.jpg)

If I click on that ugly <span class="label label-danger">50.0</span>, I can see this.

![int detail](/images{{ page.id }}/int_detail.jpg)

I'm going to add some tests, checking some results and for example passing wrong parameters. This is the result:

```
C:\SVN_ROOT\PNI>prove -l t\_node-perlfunc-int.t
t\_node-perlfunc-int.t .. 1/? Devel::Cover: Deleting old coverage for changed file t/_node-perlfunc-int.t
t\_node-perlfunc-int.t .. ok
All tests successful.
Files=1, Tests=9,  2 wallclock secs ( 0.06 usr +  0.01 sys =  0.08 CPU)
Result: PASS
```

et voilà

![int ok](/images{{ page.id }}/int_ok.jpg)

## Conclusion

[Devel::Cover][1] is a really powerful tool ... just use it!

## References

* [Devel::Cover][1]
* [Devel::Cover::Tutorial][2]

[1]: https://metacpan.org/pod/Devel::Cover "Devel::Cover"
[2]: https://metacpan.org/pod/Devel::Cover::Tutorial "Devel::Cover::Tutorial"


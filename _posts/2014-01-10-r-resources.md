---
title: R resources
tags:
  - R
description: >
    Collection of resources about R, a language and environment for statistical computing and graphics.
---

> What is R?

Read the [R page on Wikipedia](http://en.wikipedia.org/wiki/R_(programming_language)).

## Hello World

Anybody can downlad latest R build and launch its environment, but the
first thing that has real value, in my opinion, is to schedule R script to create daily reports. My use case is a set of script scheduled nightly on an Ubuntu crontab. Follows setup instructions

Install R on Ubuntu

```bash
# See instructions here: https://www.digitalocean.com/community/tutorials/how-to-install-r-on-ubuntu-16-04-2
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
sudo add-apt-repository 'deb [arch=amd64,i386] https://cran.rstudio.com/bin/linux/ubuntu xenial/'
sudo apt-get update
sudo apt-get install r-base
```

Create an *hello-world.R* script that generates a */tmp/hello-R.png* plot file.

```R
#!/usr/bin/env Rscript

data <- c(1, 3, 6, 4, 9)
png(filename="/tmp/hello-R.png")
plot(data)

# Exit without saving workspace
quit(save = "no", status = 0, runLast = TRUE)
```

Note that the `R` executable is a REPL and not intendend to be used in a shebang, use `Rscript` instead.
Make it executable with `chmod +x hello-world.R` as usual, and then you can launch it or schedule it.

## Dependencies

The killer app of R is [CRAN] and its massive number of available packages.
How to use and install them? If you are on a remote Linux server, you
should create a folder for your user libs, for instance

```bash
mkdir $HOME/.R_packages
```

and add to your profile

```bash
export R_LIBS_USER=$HOME/.R_packages
```

I suggest to install [Tidyverse](https://www.tidyverse.org/) that is a
[collection of R packages](https://www.tidyverse.org/packages/).

On Ubuntu, install required deps

```bash
sudo apt-get install libxml2-dev -y
```

Then pick up a CRAN mirror [from this list](https://cran.r-project.org/mirrors.html)
and create an `install_packages.R` script like

```R
#!/usr/bin/env Rscript

install.packages("tidyverse", repos="https://ftp.heanet.ie/mirrors/cran.r-project.org/")
```

You can make it executable and run it when necessary.

## Sites

[The R Project for Statistical Computing](http://www.r-project.org/)

[CRAN](http://www.r-project.org/)

[R-bloggers](http://www.r-bloggers.com/)

[R Graphical Manual](http://rgm3.lab.nig.ac.jp/RGM/top)

[Learn R Programming](https://www.programiz.com/r-programming)

## Free books online

See my [book collection]({% post_url 2014-01-02-free-books-online %}#r)

## Articles

[introducing R to a non-programmer in one hour](http://alyssafrazee.com/introducing-R.html)

[7+ ways to plot dendrograms in R](http://gastonsanchez.com/blog/how-to/2012/10/03/Dendrograms.html)

[CRAN]: "https://cran.r-project.org" "CRAN"

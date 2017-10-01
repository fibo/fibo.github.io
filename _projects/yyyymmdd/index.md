---
title: yyyymmdd
---
# yyyymmdd

> uses cal Unix program to print out the days in a month

[Installation](#installation) |
[Usage](#usage) |
[Annotated source](#annotated-source) |
[License](#license)

[![KLP](https://img.shields.io/badge/kiss-literate-orange.svg)](http://g14n.info/kiss-literate-programming)

<img src="https://rawgit.com/fibo/os-icons8/master/Apple-50.png" width="50" height="50" /> <img src="https://rawgit.com/fibo/os-icons8/master/Linux-50.png" width="50" height="50" />

## Installation

You can just copy and paste the [yyyymmdd.sh](https://github.com/fibo/yyyymmdd/blob/master/yyyymmdd.sh) function or do the following

```bash
mkdir -p ~/.bash
cd ~/.bash
git clone git://github.com/fibo/yyyymmdd.git
```

Edit your *~/.bash_profile* or *~/.profile* and add the following

```bash
source ~/.bash/yyyymmdd/yyyymmdd.sh
```

On MacOS it is required to install coreutils, with [brew] do

```bash
brew install coreutils
```

## Usage

Pass it year and month in *YYYYMM* format

```bash
$ yyyymmdd 201701
20170101
20170102
...
20170129
20170130
20170131
```

Optionally use `FROM` and/or `UNTIL` environment variables,
which are passed to `date -d` GNU command, for example

* `UNTIL=now yyyymmdd 201701`
* `UNTIL=yesterday yyyymmdd 201701`
* `UNTIL="2 hours ago" yyyymmdd 201701`
* `UNTIL=20170117 yyyymmdd 201701`
* `FROM=20170117 yyyymmdd 201701`

You can also use both across multiple `yyyymmdd` command invocation

```bash
export FROM=20170117
export UNTIL=now
yyyymmdd 201701
yyyymmdd 201702
```

## Annotated source

Create a `yyyymmdd` bash function.

    function yyyymmdd () {

Then split input into year and month.

        YYYYMM=$1

        if [ ${#YYYYMM} -ne 6 ]
        then
            echo "Param $YYYYMM is required in YYYYMM format" 1>&2
        else
            YYYY=${YYYYMM:0:4}
            MM=${YYYYMM:4:2}

Use `gdate` on MacOS, and `date` on Linux.
Use [cal] to output days: on Linux it could highlight current day;
option `cal -h` turns it off but it is not supported, nor necessary on MacOS.


        CAL=$(which cal)

        case "$OSTYPE" in
            darwin*)
                DATE=$(which gdate)
            ;;
            linux*)
                DATE=$(which date)
                CAL="$CAL -h"
            ;;
        esac

Handle `FROM` and `UNTIL` optional environment variables

        YYYYMMDD_MIN=0
        YYYYMMDD_MAX=99999999

        if [ ! -z "$FROM" ]
        then
            YYYYMMDD_MIN=`$DATE --date "$FROM" +%Y%m%d`
        fi

        if [ ! -z "$UNTIL" ]
        then
            YYYYMMDD_MAX=`$DATE --date "$UNTIL" +%Y%m%d`
        fi

Loop over days of month

        for DAY in $($CAL $MM $YYYY | grep '^ *[0-9]')
        do
            DD=$(printf "%02d" $DAY)
            YYYYMMDD=$YYYY$MM$DD

            if [ $YYYYMMDD -gt $YYYYMMDD_MIN -a $YYYYMMDD -le $YYYYMMDD_MAX ]
            then
                echo $YYYY$MM$DD
            fi
        done

... and we are done!

        fi
    }

## License

[MIT](http://g14n.info/mit-license)

<sub>OS icons provided by <a href="https://icons8.com/">icons8</a>.</sub>

[cal]: https://en.wikipedia.org/wiki/Cal_(Unix) "cal"
[brew]: https://brew.sh/ "brew"

---
title: yyyymmdd
---
# yyyymmdd

> uses cal Unix program to print out the days in a month

[![KLP](https://img.shields.io/badge/kiss-literate-orange.svg)](http://g14n.info/kiss-literate-programming)

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

Use [cal] to output days...

            for d in $(cal $MM $YYYY | grep "^ *[0-9]")
            do
                DD=$(printf "%02d" $d)
                echo $YYYY$MM$DD
            done

... and we are done!

        fi
    }

## License

[MIT](http://g14n.info/mit-license)

[cal]: https://en.wikipedia.org/wiki/Cal_(Unix) "cal"

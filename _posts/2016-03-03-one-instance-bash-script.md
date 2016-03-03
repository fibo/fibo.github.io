---
title: One instance bash script
tags:
  - Bash
description: >
    Quick-and-dirty way to ensure only one instance of a bash script is running at a time, based on its name.
---

Suppose you have a bash script, for instance *load_data_foo.sh*, that is scheduled
every ten minutes and you want to be sure that the only one instance of the script is running.
Just use this code if you want a fast solution

```
#!/bin/bash

MY_FILENAME=`basename "$BASH_SOURCE"`

echo $MY_FILENAME

MY_PROCESS_COUNT=$(ps -ef | grep $MY_FILENAME | grep -v grep | grep -v $$ | wc -
l)

if [ $MY_PROCESS_COUNT -ne 0  ]; then
  echo found another process
  exit 0
if

# Follows the code to get the job done.
```


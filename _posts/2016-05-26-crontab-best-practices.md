---
title: Crontab best practices
tags:
  - Unix
  - Crontab
description: >
    How to edit a crontab in a mantainable way, and other tips to use it the right way. I found a lot of messy crontabs around, it would be better to mantain order.
---

> The software utility [Cron] is a time-based job scheduler in Unix-like computer operating systems

## Environment

First of all, crontab environment is not the same as your shell. Only few
variables are valued, for example `$HOME`, `$PATH` and `$MAILTO`.
A common pit fall is to schedule a script and it does not work cause it
needs environment varibles. The best trick I found is to use [cron SHELL power](http://shtylman.com/post/cron-shell-power/)!
Create a *.cron.bash* file in your home dir, containing something like the following

```bash
#!/bin/bash

source .bashrc

# Restore SHELL env var for cron
SHELL=/bin/bash

# execute the cron command in an actual shell
exec /bin/bash --norc "$@"

```

Then **on top** of your crontab

```
# Let scheduled scripts run with the same environment as bash
# shell interactive session.
SHELL=.cron.bash
```

## Error handling

Make sure your scripts follow [Rule of silence](http://www.linfo.org/rule_of_silence.html)
but **do not** send standard error stream on `/dev/null`.
The best practice is to write scripts that run commands in quiet mode with
no feedback unless a verbose flag, or whatever, is passed as argument.
In this way, when a script outputs an error, crontab will send you an email
if you configure the `MAILTO` variable, for example

```
# Send scripts output by email.
MAILTO=alarms@example.com
```

## Scheduled jobs

Organize your schedules by frequency (hourly, daily, monthly, etc) and
write then in cronological order.

Pad left single digits with a zero, to get rows alligned. Please, indent
and group where it makes sense

```crontab
# Bad

0 5 * * * script1.sh param1
5 5 * * * script2.sh
15 5 * * * script3.sh param1 param2
5 10 * * * script4.sh

15 10 * * * script5.sh param1
5,35 15 * * * script6.sh
15 15 * * * script7.sh

# Good

00 05 * * * script1.sh param1
05 05 * * * script2.sh
15 05 * * * script3.sh param1 param2

05 10 * * * script4.sh
15 10 * * * script5.sh param1

5,35 15 * * * script6.sh
15   15 * * * script7.sh
```

Use comments to organize and inform, in particular when you deschedule a
task temporarily with a comment, put your nick or email and a date.

Just to have an idea of what I mean:

```crontab

# Countinous integration deploy.
*/10 * * * * $BEMEDIA_REPO/src/bin/continuous_deploy.sh

# Every hour
# ----------

10 * * * * rotate_logs.sh

20 * * * * load_data.sh

# Every day
# ---------

# gcasati 20160405: paused cause waiting for bla bla bla
#10 04 * * * script2.sh

00 05 * * * script3.sh param1
05 05 * * * script4.sh
15 05 * * * script5.sh param1 param2

10 06 * * * script7.sh

00 19 * * 0 script8.sh

00 20 * * 0 script9.sh

# Every sunday
# ------------

00 20 * * 0 rotate_table.sh campaign_dd 60
05 20 * * 0 rotate_table.sh request 90
10 20 * * 0 rotate_table.sh sales_dd 7

```

## Other tips

Since `%` is a special char you need to escape it, for example when you
schedule a `date` command with formatting, for example

```
0 5 * * * script.sh >> /my/log_`date +\%y\%m\%d`.log
```

See the original article: [Using the `date` command in your crontab](http://www.logikdev.com/2010/05/25/using-the-date-command-in-your-crontab/).

[Cron]: https://en.wikipedia.org/wiki/Cron "Cron on Wikipedia"

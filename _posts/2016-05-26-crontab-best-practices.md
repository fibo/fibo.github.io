---
title: Crontab best practices
tags:
  - Unix
  - Crontab
description: >
    How to edit a crontab in a mantainable way, and other tips to use it the right way
---

## Environment

First of all, crontab environment is not the same as your shell. Only few
variables are valued, for example `$HOME`, `$PATH` and `$MAILTO`.
A common pit fall is to schedule a script and it does not work cause it
needs environment varibles. The best trick I found to make it work is to
create a *.cron.bash* file in your home dir, with the following content

```bash
#!/bin/bash

source .bashrc

# Set PATH
export PATH=/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/sbin:/opt/aws/bin

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
if you configure it setting the `MAILTO` variable, for example

```
# Send script output by email.
MAILTO=alarms@example.com
```

## Schedules

Please order your schedules by time and indent them

```crontab
# Hourly

# Daily

# Weekly

# Monthly
```


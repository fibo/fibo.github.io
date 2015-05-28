---
title: Log rotation
tags:
  - Unix
description: >
    Set your logrotate in 60 seconds.
---

cat <<EOF > /application/perl/log/rotate.conf

/application/perl/log/contactlab.log {
        missingok
        weekly
        rotate 4
        compress
}

/application/perl/log/contactlab.err {
        missingok
        weekly
        rotate 4
        compress
}

EOF

2. Da aggiungere in crontab, esegue ogni giorno

0 0 * * * logrotate -s /application/perl/log/rotate.status /application/perl/log/rotate.conf


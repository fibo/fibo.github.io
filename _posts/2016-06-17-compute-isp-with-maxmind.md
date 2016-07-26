---
title: Compute ISP with Maxmind
tags:
  - Perl
description: >
    This is a quick and dirty Perl script to compute the ISP of a given IP, using a Maxmind CSV file
---

## Goal

I have a *GeoIPISP.csv* file from [MaxMind] with a content like the following

```
16777216,16778239,"China Telecom fujian"
16778240,16779263,"Golden It Pty Ltd"
16779264,16781311,"China Telecom Guangdong"
16781312,16785407,"i2ts,inc."
...
```

where first and second fields are the range of the IPs, and the third one is
the ISP name. IPs are converted to numbers by expanding them in base 256, as
documented [here](http://dev.maxmind.com/geoip/legacy/csv/).

I need to compute the ISP name of given IP address, and once again, Perl comes to the rescue!

I am on Mac OS, so Perl is already installed: that is really good cause also
my collegues has a Mac, so I can share the script with them easily.

## Solution

Copy the CSV file and make it executable

```bash
cp GeoIPISP.csv ISP_of
chmod +x ISP_of
```

Then open it and prepend the following Perl code, the *ISP_of* script will look like

```perl
#!/usr/bin/env perl

my $ip = $ARGV[0];

my ($a, $b, $c, $d) = split('\.', $ip);
my $ip_num = $a * 16777216 + 65536 * $b + 256 * $c + $d;
my $found_isp = 'Not found';

while (my $row = <DATA>) {
    chomp $row;
    my ($inf, $sup, $isp) = split(',', $row);
    if (($ip_num >= $inf) and ($ip_num <= $sup)) {
      $found_isp = $isp;
    }
}

print "$ip,$found_isp\n";

__DATA__
16777216,16778239,"China Telecom fujian"
16778240,16779263,"Golden It Pty Ltd"
16779264,16781311,"China Telecom Guangdong"
16781312,16785407,"i2ts,inc."
```

And that's it! Now you can do

```bash
$ ./ISP_of 1.2.3.4
1.2.3.4,"APNIC Debogon Project"
```

[MaxMind]: https://www.maxmind.com "MaxMind"

---
title: Ungoogled Chrome
tags:
  - Web
description: >
     Use Google Chrome, sans integration with Google
---

## Burning Chrome

Ok, I am starting with a kind of Off-Topic section.

One of my favourite cyberpunk books is [Burning Chrome](https://en.wikipedia.org/wiki/Burning_Chrome) by William Gibson.

## Ungoogled Chromium

I remember few years ago I was having a pizza after a tech meetup in Milan and there was a guy specialized in Security. We were talking about trojans and stuff like that and he mentioned that the Chrome installer and updater service was full of interesting things. He said:

> Have you ever tried to disassemble it?
> Also check what it does when it runs.

Let me clarify, I like Google and their products. In particular with Chrome they pushed forward the web platform. But I also apreciate people that **do not trust, and instead verify** and it is good to be aware and have an alternative.

I have a useful use case for having two different Chrome-based browsers. On the computer I am using for work, the default Chrome is managed by the company. So there are extensions and settings that I cannot change and anyway I do not want to mess with that. I know there are profiles but I prefer to have a completely separate browser for my stuff. So far I was using [Chrome Canary](https://www.google.com/chrome/canary/) but of course it is unstable and it happens (pretty rarely by the way) that it crashes.

Today I downloaded [ungoogled-chromium](https://github.com/ungoogled-software/ungoogled-chromium) which is

> Google Chromium, sans integration with Google

Well, actually I downloaded [ungoogled-chromium-macos](https://github.com/ungoogled-software/ungoogled-chromium-macos) which is the build for macOS.

Let's see how it goes.

I am also writing this post to remember about its initial page: `chrome://ungoogled-first-run`.
It contains also a link to the [default settings](https://github.com/ungoogled-software/ungoogled-chromium/blob/master/docs/default_settings.md), among others:

- "Block third-party cookies" is enabled by default
- "Continue running background apps when Chromium is closed" is disabled

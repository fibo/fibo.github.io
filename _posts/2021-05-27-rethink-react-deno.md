---
title: Rethink React with Deno
tags:
  - React
  - Deno
description: >
    How to setup a Denoi server to perform ServerSideRendering with React. The Web is evolving in the right direction.
---

## Deno

Visit [Deno land](https://deno.land/) and follow instruction to install Deno on your platform.

In my opinion Deno is the **next big thing**, once every 4 or 5 years I find myself saying

> Wow! This technology is great, it is the right thing and will be enterprise in few years

It happened to me many times: with SSH, Git, Node.js, React, TypeScript... and now Deno.
Usually I am right or almost right, not so far from the truth.
For example at first I bet on Flow rather then TypeScript, then I realized soon that TypeScript was better, in particular because it was easier to export typings. Still the idea was the same, we needed typings in JavaScript land.

Now I am entering [Deno land](https://deno.land) and I see an awesome tool that I already love 💙 but this is just the beginning of my journey.

Let me share how I started a **minimal** project with server rendering a React page server side.

## Project files

### README.md

Just few instructions, how to start the server, run tests and lint the code.

```
- Run server: `make start`
- Run tests: `make test`
- Lint code: `make lint`
```

### Makefile

```
start:
	deno run --unstable --importmap=import_map.json --allow-net --allow-read --allow-env server.tsx
test:
	deno test --unstable --importmap=import_map.json
lint:
	deno lint --unstable
```

### import_map.json

```json
{
  "imports": {
    "std/": "https://deno.land/std@0.97.0/",
    "react": "https://esm.sh/react@17.0.2",
    "react-dom/server": "https://esm.sh/react-dom@17.0.2/server"
  }
}
```

<div class="paper warning">Work in progress</div>

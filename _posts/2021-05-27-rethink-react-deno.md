---
title: Rethink React with Deno
tags:
  - React
  - Deno
description: >
    How to setup a Deno server to perform ServerSideRendering with React. The Web is evolving in the right direction.
---

## Deno

Visit [Deno land](https://deno.land/) and follow instruction to install Deno on your platform.

In my opinion Deno is the **next big thing**, once every 4 or 5 years I find myself saying

> Wow! This technology is great, it is the right thing and will be enterprise in few years

It happened to me many times: with SSH, Git, Node.js, React, TypeScript... and now Deno.
Usually I am right or almost right, not so far from the truth.
For example at first I bet on Flow rather than TypeScript, then I realized soon that TypeScript was better, in particular because it was easier to export typings. Still the idea was the same, we needed typings in JavaScript land.

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

Deno supports *import maps*.

> This proposal allows control over what URLs get fetched by JavaScript import statements and import() expressions.

```json
{
  "imports": {
    "std/": "https://deno.land/std@0.97.0/",
    "react": "https://esm.sh/react@17.0.2",
    "react-dom/server": "https://esm.sh/react-dom@17.0.2/server"
  }
}
```

### server.tsx

Yes, the article title starts with **rethink**, the server extension is `tsx`.
It uses the experimental `Deno.listen` feature which uses a Rust implementation under the hood.

```jsx
import React from "react";
import { renderToString } from "react-dom/server";

import { HomePage } from "./pages/Home.tsx";

type HeaderValue = string | null;

interface RouteCaseArg {
  accept: HeaderValue;
  pathname: string;
}

async function startServer() {
  const port = 3000;
  const listener = Deno.listen({ port });

  while (true) {
    const conn = await listener.accept();
    handleConnection(conn);
  }
}

async function handleConnection(conn: Deno.Conn) {
  const http = Deno.serveHttp(conn);

  const event = await http.nextRequest();
  if (!event) return;

  const { request } = event;

  const url = new URL(request.url);
  const { pathname } = url;

  const accept = request.headers.get("accept");

  switch (true) {
    case isHomePage({ accept, pathname }): {
      const html = renderToString(<HomePage />);

      event.respondWith(
        new Response(html, {
          headers: { "content-type": "text/html" },
        }),
      );

      break;
    }

    default: {
      event.respondWith(
        new Response("not found", {
          headers: { "content-type": "text/plain" },
        }),
      );
    }
  }
}

export function isHomePage({ accept, pathname }: RouteCaseArg) {
  return pathname === "/" && accept?.includes("text/html");
}

if (import.meta.main) {
  startServer();
}
```

### server_test.ts

Just a simple test.

```js
import { assertEquals } from "std/testing/asserts.ts";

import { isHomePage } from "./server.tsx";

Deno.test("isHomePage", () => {
  assertEquals(
    isHomePage({
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      pathname: "/",
    }),
    true,
  );
});
```

### pages/Home.tsx

```jsx
import React from "react";

export function HomePage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>It Works!</body>
    </html>
  );
}
```

<div class="paper warning">Work in progress</div>

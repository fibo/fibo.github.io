---
title: Tiny static server
tags:
  - Node
  - Web
description: >
     A tiny development web server for static content
---

## Motivation

There are many other static dev servers out there, for example you can try with

```shell
python -m http.server
```

__But__ you need to have _Python_ installed.

If you are using _Node.JS_, you can try with [static-server](https://www.npmjs.com/package/static-server) or [serve](https://www.npmjs.com/package/serve).

__But__ you need to install an npm dependency.

Instead you can just copy paste the script below in a _server.js_ file.

## Show me the code

```js
import { exec } from 'node:child_process'
import { createServer } from 'node:http'
import { readFile } from 'node:fs'
import { networkInterfaces, platform } from 'node:os'
import { extname } from 'node:path'

const port = process.env.PORT

const fileExtensionToMimeTypeMap = new Map()
  .set('css', 'text/css; charset=UTF-8')
  .set('html', 'text/html; charset=UTF-8')
  .set('ico', 'image/vnd.microsoft.icon')
  .set('jpg', 'image/jpg')
  .set('js', 'text/javascript; charset=UTF-8')
  .set('json', 'application/json; charset=UTF-8')
  .set('png', 'image/png')
  .set('svg', 'image/svg+xml; charset=UTF-8')
  .set('woff2', 'font/woff2')

const server = createServer((req, res) => {
  // Ignore URLs like Chrome DevTools
  // /.well-known/appspecific/com.chrome.devtools.json
  if (req.url.startsWith('/.well-known'))
    return

  const url = req.url == '/' ? '/index.html' : req.url
  const fileExtension = extname(url).substring(1).toLowerCase()
  const mimeType = fileExtensionToMimeTypeMap.get(fileExtension)

  if (!mimeType) {
    console.error(`Unknown mime type for ${req.url}`)
    res.writeHead(501).end('Unknown mime type')
    return
  }

  // Assuming (req.method == 'GET')
  readFile(`.${url}`, (err, data) => err ?
    res.writeHead(400).end('Not found') :
    res.writeHead(200, { 'Content-Type': mimeType }).end(data)
  )
})

server.listen(port, () => {
  const serverPort = server.address().port
  const localUrl = `http://localhost:${serverPort}`
  let externalUrl = localUrl

  // Look for IPv4 net interface.
  const nets = networkInterfaces()
  for (const name of Object.keys(nets))
    for (const net of nets[name])
      if (net.family === 'IPv4' && !net.internal) {
        externalUrl = new URL(`http://${net.address}:${serverPort}`)
        break
      }

  // Open default browser.
  switch(platform()) {
    case 'darwin': exec(`open ${localUrl}`)
    case 'linux': exec(`xdg-open ${localUrl}`)
    case 'win32': exec(`start ${localUrl}`)
    default: console.info(`Server started on ${externalUrl}`)
  }
})
```

## How to launch

If you name it _server.js_ and place it in your working folder, then you can launch it with just

```shell
npm start
```

No need to edit your _package.json_ file.

If you have not _package.json_ just launch it with `node server`.

<div class="paper warning">
Environment variable <code>PORT</code> is supported. If not provided it will use a random port.
</div>

So to choose a port, you can launch it with

```shell
PORT=1234 node server.js
```

In case you want to add a default port, for instance 3000, just change this row

```diff
- const port = process.env.PORT
+ const port = process.env.PORT ?? 3000
```

<div class="paper info">
If an IPv4 address is available, other clients in your local network can connect using the URL that is printed once the server is started.
</div>

For example, you will see

```shell
node server.js
Server started on http://192.168.1.52:3000/
```

<div class="paper success">
Your default browser will open automatically. The URL used locally will be always <code>localhost</code> to facilitate development tasks.
</div>

## About mime types

Notice that `fileExtensionToMimeTypeMap` contains a minimal mapping of common file extensions to its _mime type_. Also it assumes charset is `UTF-8` for every text file.

<div class="paper warning">In case a <em>mime type</em> is unknown, server will print an error and browser will get a <code>501</code> HTTP status code.</div>

If you need to extend the mime types mapping, see [common mime types on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types/Common_types).

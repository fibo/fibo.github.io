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

const port = process.env.PORT

const server = createServer((req, res) => {
  // Ignore URLs like Chrome DevTools
  // /.well-known/appspecific/com.chrome.devtools.json
  if (req.url.startsWith('/.well-known'))
    return

  // Assuming (req.method == 'GET')
  readFile(
    `.${req.url == '/' ? '/index.html' : req.url}`,
    (err, data) => err ? res.writeHead(400).end('Not found') : res.end(data)
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
Server started on http://192.168.1.52:53774/
```

<div class="paper success">
Your default browser will open automatically. The URL used locally will be always <code>localhost</code> to facilitate development tasks.
</div>

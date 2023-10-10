---
title: write-file-utf8
npm: true
---
# write-file-utf8

> writes content to file using utf-8 encoding, nested folders will be created if they do not exist yet

[Installation](#installation) |
[Usage](#usage) |
[See also](#see-also) |
[License](#license)

## Installation

With [npm](https://npmjs.org/) do

```sh
npm install write-file-utf8
```

## API

## Usage

`write(filePath: string, content: string | Buffer): Promise<void>`

```javascript
import write from "write-file-utf8";

// Nested folders will be created if they do not exist yet.
const filePath1 = "/tmp/foo/bar.txt";
const filePath2 = "/tmp/quz/bar/foo.txt";

const content = "Hello";

// Write a `string` into a file.
//////////////////////////////////////////////////////////////////
try {
  await write(filePath1, content);
} catch (error) {
  // In case you do not have permissions to create folders,
  // you may want to handle it here.
  console.error(error);
}

// Can also write a `Buffer` into a file.
//////////////////////////////////////////////////////////////////
try {
  const buffer = Buffer.from(content); // this is an utf-8 encoded buffer
  await write(filePath2, buffer);
} catch (error) {
  console.error(error);
}
```

## See also

- [read-file-utf8](https://fibo.github.io/read-file-utf8)

## License

[MIT](https://fibo.github.io/mit-license/)

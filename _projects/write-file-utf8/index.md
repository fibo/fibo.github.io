---
title: write-file-utf8
npm: true
---
# write-file-utf8

> writes content to file using utf-8 encoding, tries to create directory with [mkdirp]

[Installation](#installation) |
[API](#api) |
[Usage](#usage) |
[See also](#see-also) |
[License](#license)

## Installation

With [npm](https://npmjs.org/) do

```bash
npm install write-file-utf8
```

## API

### `write(filePath, content)`

It is an function that returns a *Promise* and requires the following parameters:

* **@param** `{String}` *filePath* can be inside a nested folder that does not exist yet
* **@param** `{String|Buffer}` *content* will be written using *utf-8* encoding

## Usage

```javascript
const write = require('write-file-utf8')

// Nested folders will be created if they do not exist yet.
const filePath1 = '/tmp/foo/bar.txt'
const filePath2 = '/tmp/foo/bar/quz.txt'

const content = 'Hello'

// Since write-file-utf8 function will return a Promise,
// the most comfortable way to run it is inside an async function.
async function example () {
  try {
    await write(filePath1, content)

    const buffer = new Buffer.from(content) // this is an utf-8 encoded buffer
    await write(filePath2, buffer)
  } catch (error) {
    // In case you do not have permissions to create folders,
    // you may want to handle that case here.
    console.error(error)
  }
}

// Run example.
example()
```

## See also

* [read-file-utf8]
* [fs.writeFile]

## License

[MIT](http://g14n.info/mit-license/)

[fs.writeFile]: https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback
[mkdirp]: https://www.npmjs.com/package/mkdirp
[read-file-utf8]: http://npm.im/read-file-utf8

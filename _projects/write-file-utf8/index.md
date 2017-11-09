---
title: write-file-utf8
npm: true
---
# write-file-utf8

> shortcut to [fs.writeFile][writeFile]

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

### `writeFileUtf8(filePath, content[, callback])`

* **@param** `{String}` filePath
* **@param** `{String}` content
* **@param** `{Function}` [callback] defaults to a trivial `if (err) throw err`

### `writeFileUtf8.error`

An object exposing the following error messages:

* contentIsNotString

For example, try the following snippet

```javascript
var write = require('write-file-utf8')

try {
  var buffer = new Buffer('a')
  write('/tmp/foo', buffer)
} catch (err) {
  if (err.message === write.error.contentIsNotString) {
    console.log('Hey, are buffers utf-8 encoded?')
  }
}
```

## Usage

```javascript
var write = require('write-file-utf8')

var filePath = '/tmp/foo'
var content = 'bar'

write(filePath, content)
```

Actually is the same as

```javascript
var fs = require('fs')

var filePath = '/tmp/foo'
var content = 'bar'

function throwError (err) {
  if (err) {
    throw err
  }
}

fs.writeFile(filePath, content, 'utf8', throwError)
```

It accepts also an optional callback, for example

```javascript
write(filePath, content, (err) => {
  if (err) throw err

  console.log(`File saved: ${filePath}`)
})
```

## See also

* [read-file-utf8](http://npm.im/read-file-utf8)
* [fs.writeFile][writeFile]

## License

[MIT](http://g14n.info/mit-license/)

[writeFile]: https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback

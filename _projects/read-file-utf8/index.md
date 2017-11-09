---
title: read-file-utf8
npm: true
---
# read-file-utf8

> shortcut to [fs.readFile][readFile] or [fs.readFileSync][readFileSync]

[API](#api) |
[Usage](#usage) |
[Example](#example) |
[See also](#see-also) |
[License](#license)

## API

### `readFile(filePath[, callback])`

* **@param** `{String}` filePath
* **@param** `{Function}` [callback] optionally passed to fs.readFile
* **@returns** `{String}` content, **only if** callback is not provided

## Usage

Given a callback to execute on *data*, for instance

```javascript
function callback (err, data) {
  if (err) throw err
  console.log(data)
}
```

then, the following code

```javascript
var read = require('read-file-utf8')

var filePath = '/tmp/foo'

read(filePath, callback)
```

actually is the same as

```javascript
var fs = require('fs')

var filePath = '/tmp/foo'

fs.readFile(filePath, 'utf8', callback)
```

If no callback is provided, the synchronous version is used, hence the snippet

```javascript
var content = read('/tmp/bar')
```

is equivalent to

```javascript
var content = fs.readFileSync('/tmp/bar', 'utf8')
```

## Example

Suppose you have some SQL queries. It is really better to put every query
in its own *queryFile.sql*, instead then inside *someOtherFile.js*.

Create a *sql/* folder and put there all your queries. Add also a
*sql/index.js* with the following content

```javascript
var path = require('path')
var read = require('read-file-utf8')

function sql (fileName) {
  return read(path.join(__dirname, `${fileName}.sql`))
}

module.exports = sql
```

Suppose there is a *sql/count_winners.sql* file with the following content

```sql
SELECT COUNT(*) AS num
FROM foo.contest
WHERE is_winner IS TRUE
```

Now you are able to do, for example

```javascript
var sql = require('./path/to/sql/')
var pg = require('pg')

var conString = 'your connection string here'

pg.connect(conString, function (err, client, done) {
  if (err) return console.error(err)

  client.query(sql('count_winners'), function (err, result) {
    if (err) return console.error(err)

    console.log(result.rows[0].num)
  })
})
```

## See also

* [write-file-utf8](http://g14n.info/write-file-utf8)
* [fs.readFile][readFile]
* [fs.readFileSync][readFileSync]

## License

[MIT](http://g14n.info/mit-license/)

[readFile]: https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback
[readFileSync]: https://nodejs.org/api/fs.html#fs_fs_readfilesync_file_options

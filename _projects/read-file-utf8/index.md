---
title: read-file-utf8
npm: true
---
# read-file-utf8

> reads content from file using utf-8 encoding

[API](#api) |
[Usage](#usage) |
[Examples](#examples) |
[See also](#see-also) |
[License](#license)

[![NPM version](https://badge.fury.io/js/read-file-utf8.svg)](http://badge.fury.io/js/read-file-utf8)
[![No deps](https://img.shields.io/badge/dependencies-none-green.svg)](https://github.com/fibo/read-file-utf8)

## API

### `read(filePath)`

It is a function that returns a *Promise* and requires one parameter:

* **@param** `{String}` filePath

## Usage

Read from a text file.

```javascript
const read = require('read-file-utf8')

const filePath = 'file.txt'

// Since read-file-utf8 function will return a Promise,
// the most comfortable way to run it is inside an async function.
async function example () {
  try {
    // Read file content.
    //////////////////////////////////////////////////////////////////
    const content = await read(filePath)

    console.log(content)
  } catch (error) {
    // In case you do not have permissions,
    // you may want to handle it here.
    console.error(error)
  }
}

// Run example.
example()
```

## Examples

### Import JSON

This makes sense at the time of this writing (2020) since it is not possibile to import JSON using `require` when ES modules are enabled in Node.
For example to read version from a *package.json* you can do something like the following.

```javascript
async function showPackageJsonVersion () {
  const { version } = await readFile('package.json').then(content => JSON.parse(content))

  console.log(version)
}

showPackageJsonVersion()
```

### Read SQL files

Suppose you have some SQL queries. It is really better to put every query
in its own *queryFile.sql* good old SQL file, instead then inside *someOtherFile.js* JavaScript file.

Create a *sql/* folder and put there all your queries.
Add also a *sql/index.js* with the following content

```javascript
const path = require('path')
const read = require('read-file-utf8')

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
const pg = require('pg')

const sql = require('./path/to/sql/index.js')

const connectionString = '@@@your connection string here@@@'

pg.connect(connectionString, async function (err, client, done) {
  if (err) return console.error(err)

  const sqlCode = await sql('count_winners')

  client.query(sqlCode, function (err, result) {
    if (err) return console.error(err)

    console.log(result.rows[0].num)
  })
})
```

## See also

* [write-file-utf8](http://g14n.info/write-file-utf8)
* [fs.readFile][readFile]

## License

[MIT](http://g14n.info/mit-license/)

[readFile]: https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback

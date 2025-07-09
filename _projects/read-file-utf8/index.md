---
title: read-file-utf8
npm: true
---
# read-file-utf8

> reads content from file using utf-8 encoding, also imports JSON files easily

## Installation

With [npm](https://npmjs.org/) do

```sh
npm install read-file-utf8
```

## Usage

`read<T = string>(filePath: string): Promise<T>`

Read from a text file.

```js
import read from "read-file-utf8";

const filePath = "path/to/file.txt";

try {
  // Read file content.
  const content = await read(filePath)

  console.log(content)
} catch (error) {
  // In case you do not have permissions,
  // you may want to handle it here.
  console.error(error)
}
```

## Examples

### Import JSON

This makes sense at the time of this writing (2020) since it is not possibile to import JSON using `require` when ES modules are enabled in Node.

Update (2023): you can use import assertions like `import pkg from "./package.json" assert { type: "json" }` but you can a warning:

```
ExperimentalWarning: Import assertions are not a stable feature of the JavaScript language. Avoid relying on their current behavior and syntax as those might change in a future version of Node.js.
```

So, to get attributes from a *package.json* you can do something like the following.

```js
// Read version from package.json file.
// Given the `.json` extension, it is assumed the content is JSON
// and `JSON.parse` is used to parse it.
const { version } = await read("./package.json");

console.log(version)
```

If you are using TypeScript you may need to provide the type of your JSON.

```ts
const { version } = await read<{ version: string }>("./package.json");
```

Or you may want to double check the input declaring it as `unknown` and  use a type-guard.


```ts
const pkg = await read<unknown>("./package.json");

if (isPackageJson(pkg)) console.log(pkg.version);
```

### Read SQL files

Suppose you have some SQL queries. It is really better to put every query
in its own *queryFile.sql* good old SQL file, instead then inside *someOtherFile.js* JavaScript file.

Create a *sql/* folder and put there all your queries.
Add also a *sql/index.js* with the following content

```js
import { join } from "node:path";

export const sql (fileName) =>
  read(path.join(__dirname, `${fileName}.sql`));
```

Suppose there is a *sql/count_winners.sql* file with the following content

```sql
SELECT COUNT(*) AS num
FROM foo.contest
WHERE is_winner IS TRUE
```

Now you are able to do, for example

```js
import { Client } from "pg";
import sql from "./path/to/sql.js";

const client = new Client();
await client.connect();

const sqlCode = await sql("count_winners");

const res = await client.query(sqlCode);
console.log(res.rows);
```

## See also

- [write-file-utf8](https://github.com/fibo/write-file-utf8)

## License

[MIT](https://fibo.github.io/mit-license/)


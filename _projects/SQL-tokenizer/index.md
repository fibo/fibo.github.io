---
title: SQL-tokenizer
npm: true
---
# SQL tokenizer

> analyzes SQL statements and converts it into a list of tokens

[Installation](#installation) |
[Usage](#usage) |
[API](#api) |
[License](#license)

## Installation

With [npm](https://npmjs.org/) do

```bash
npm install sql-tokenizer
```

## Usage

Create a *tokenize* function.

```javascript
const tokenize = require('sql-tokenizer')()
```

Turn SQL statement into tokens.

```javascript
tokenize('select * from revenue')
// ['select', ' ', '*', ' ', 'from', ' ', 'revenue']
```

Quotes are handled properly.

```javascript
tokenize("select 'O''Reilly' as \"book shelf\"")
// ['select', ' ', "'O''Reilly'", ' ', 'as', ' ', '"book shelf"']
```

The *tokenizer* function accepts an optional array of operators, which defaults to [SQL92-operators].
The following example shows how to extend the SQL92 operators list with PostgreSQL bitwise operators.

```javascript
const sql92Operators = require('sql92-operators')
const tokenizer = require('sql-tokenizer')

const operators = sql92Operators.concat(['&', '|', '#', '~' '>>', '<<'])

const tokenize = tokenizer(operators)
```

## License

[MIT](http://g14n.info/mit-license/)

[SQL92-operators]: http://g14n.info/SQL92-operators "SQL92 operators"

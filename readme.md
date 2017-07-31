# Respondent

A package which allows for modular configuration loading from a specified directory

---

## Introduction

The package exports a class that can be instantiated to read configuration files from any specified directory.

## Basic usage

Respondent requires 1 parameter. The path to the root directory of your configuration files.

```JavaScript
const Path = require('path');
const Respondent = require('respondent');

let config = new Respondent({
  rootDir: Path.join(__dirname, 'config')
});
```

The `get` method in Respondent is used to retrieve specific values. The `has` method is used to determine if the value exists. Respondent uses dot notation in order to specify a path to a specific value. The syntax is as follows:

> `[fileName]`.`[path]`

#### Example:

> `app`.`name`

> `app`.`database`.`host`

It should be noted that if a file/value does not exist, no error will be thrown. Instead the return value is `undefined` and a debug message is outputted to the console.

#### Example usage

Assume the following directory structure
```
├── main.js
└── config
    └── app.js
```

app.js
```JavaScript
module.exports = {
  name: 'Respondent',
  database: {
    host: '127.0.0.1',
    username: 'root'
  },
  options: {
    currency: 'GBP'
  }
};
```

main.js
```JavaScript
'use strict';

const Path = require('path');
const Respondent = require('respondent');

let config = new Respondent({
  rootDir: Path.join(__dirname, 'config')
});

let name = config.get('app.name'); // 'Respondent'
let databaseHost = config.get('app.database.host'); // '127.0.0.1'
let databaseUsername = config.get('app.database.username'); // 'root'
let databasePassword = config.get('app.database.password'); // undefined

let currency = config.get('app.options.currency'); // 'GBP'
let country = config.get('app.options.country', 'United Kingdom'); // 'United Kingdom'

let hasCountry = config.has('app.options.country'); // false
```

## API

```JavaScript
/**
 * Retrieve the root path of the config directory.
 *
 * @returns {string}
 */
 Respondent#getRootDirectory();

/**
 * Retrieve a value from the specified path.
 *
 * @param {string} valuePath
 * @param {string} defaultValue
 * @returns value
 */
Respondent#get(valuePath, defaultValue);

/**
 * Check if the specified path & value exists.
 *
 * @param {string} valuePath
 * @returns {boolean}
 */
Respondent#has(valuePath);
```

## Contributing

Respondent makes use of [mocha]() in order to conduct it's unit tests, thus contributions
should be submitted with unit tests relevant to your work.

## License

Copyright (c) 2017 Kieron Wiltshire

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

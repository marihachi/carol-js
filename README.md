# carol-js
A small tool for building regular expressions in JavaScript.  
We build a RegExp object by combining functions.  

## Example
```js
import * as C from 'carol-js';

const regex = C.seq([
  C.regex(/hello/),
  C.regex(/ /),
  C.regex(/world/),
  C.regex(/!/).many0(),
]).many1().build();

assert.strictEqual(regex.source, '(?:hello world(?:!)*)+');
assert.strictEqual(regex.test('hello world!hello world!!hello world!!!'), true);
```

## Installation
```sh
npm i carol-js
```

## Test
```sh
git clone https://github.com/marihachi/carol-js.git
cd carol-js
npm i
npm run test
```

## License
MIT

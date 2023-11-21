# carol-js
A small tool for building regular expressions.  
We build a RegExp object by combining functions.  

## Example
```js
import carol from 'carol-js';

const regex = carol.seq([
  carol(/hello/),
  carol(/ /),
  carol(/world/),
  carol(/!/).many0(),
]).many1().toRegex();

assert.strictEqual(regex.source, '(?:hello world(?:!)*)+');
assert.strictEqual(regex.test('hello world!hello world!!hello world!!!'), true);
```

## Documents
- [API Doc](https://github.com/marihachi/carol-js/blob/0.2.0/doc/api.md)

## Installation
```sh
npm i carol-js
```

## Test
```sh
git clone https://github.com/marihachi/carol-js.git
cd carol-js
npm i
npm test
```

## License
MIT

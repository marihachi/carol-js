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
  carol(/!/).many(1),
]).many().toRegex();

assert.strictEqual(regex.source, '(?:hello world(?:!)+)*');
```

## Documents
- [API Doc](https://github.com/marihachi/carol-js/blob/040ef2ccf33f401e6e912c5e10655d1bd9585351/doc/api.md)

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

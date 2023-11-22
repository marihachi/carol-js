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
- [API list](https://github.com/marihachi/carol-js/blob/1e432a782c70e8ce112e4ea0f7d29410407141d3/doc/api.md)
- [Usage](https://github.com/marihachi/carol-js/blob/1e432a782c70e8ce112e4ea0f7d29410407141d3/doc/usage.md)

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

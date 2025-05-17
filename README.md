# carol-js
A powerful, small tool for building regular expressions.

- It maintains its readability even with complex regular expressions.
- It build a RegExp object by combining functions.
- It provides a package of ES modules.

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

## Get Started
1. Install package of carol-js to your project.
   ```sh
   npm i carol-js
   ```

2. Import the package to your TypeScript or JavaScript(ES modules) source files.
   ```js
   import carol from 'carol-js';
   ```

3. Enjoy carol-js!

## Documents
- [API reference](https://github.com/marihachi/carol-js/blob/3e5d29ffe37d7b4b827bbd59e3133627cac06e76/doc/api.md)
- [Usage](https://github.com/marihachi/carol-js/blob/3e5d29ffe37d7b4b827bbd59e3133627cac06e76/doc/usage.md)

## Test
```sh
git clone https://github.com/marihachi/carol-js.git
cd carol-js
npm i
npm run build
npm test
```

## License
MIT

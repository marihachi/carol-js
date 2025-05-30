# carol-js
A powerful, small tool for building regular expressions.

- It maintains its readability even with complex regular expressions.
- It build a RegExp object by combining functions.
- It provides a package of ES modules.

```js
import C from "carol-js";

const hex = C(/[0-9a-f][0-9a-f]/);

const uuid = C.seq([
  hex.many({ length: 4 }),
  C.token(/-/),
  hex.many({ length: 2 }),
  C.token(/-/),
  hex.many({ length: 2 }),
  C.token(/-/),
  hex.many({ length: 2 }),
  C.token(/-/),
  hex.many({ length: 6 }),
]);

const regex = uuid.toRegex({ flags: "i", exact: true });

assert.strictEqual(
  regex.source,
  "^(?:[0-9a-f][0-9a-f]){4}-(?:[0-9a-f][0-9a-f]){2}-(?:[0-9a-f][0-9a-f]){2}-(?:[0-9a-f][0-9a-f]){2}-(?:[0-9a-f][0-9a-f]){6}$"
);
assert.strictEqual(regex.flags, "i");
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
- [API reference](https://github.com/marihachi/carol-js/blob/7ab6d7796a254764f4372e74220f7302d63b2669/doc/api.md)
- [Usage](https://github.com/marihachi/carol-js/blob/7ab6d7796a254764f4372e74220f7302d63b2669/doc/usage.md)

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

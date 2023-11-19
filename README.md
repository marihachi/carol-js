# carol-js
A small tool for building regular expressions in JavaScript.  
We build a RegExp object by combining functions.  

```ts
const r = seq([
  regex(/hello/),
  regex(/ /),
  regex(/world/),
  regex(/!/).many0(),
]).many1().build();

assert.strictEqual(r.source, /(?:hello world(?:!)*)+/.source);

assert.strictEqual(r.test('hello world!hello world!!hello world!!!'), true);
```

## Test
```
npm i
npm run test
```

## License
MIT

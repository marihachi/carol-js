# regtree
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

## API list
- `regex(): Regtree` function
- `seq(): Regtree` function
- `Regtree` class
  - constructor
  - `Regtree.build(): RegExp` method
  - `Regtree.many0(): Regtree` method
  - `Regtree.many1(): Regtree` method
  - `Regtree.manyJust(): Regtree` method
  - `Regtree.many(): Regtree` method
  - `Regtree.capture(): Regtree` method

## License
MIT

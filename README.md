# regtree
A regular expression builder for JavaScript.  
We build a RegExp object by combining functions.  
  
work in progress.

```ts
const regex = regtree([
  text('hell'),
  many(char('o'), 1),
  text(' wo'),
  many(char('r'), 1),
  text('ld'),
  many(char('!'), 0),
]);
assert.strictEqual(regex.source, /hell[o]+ wo[r]+ld[!]*/.source);
assert.strictEqual(regex.test('helloo worrrrrld!!!'), true);
```

## Function list
- regtree
- text
- char
- many
- group

## License
MIT

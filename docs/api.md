## Regex pattern
```js
C.pattern(/[a-z]/);
C.pattern('[a-z]');
```

## Convert to a Regex
```js
C.pattern(/[a-z]/).toRegex();
```

## Pattern sequence
```js
C.seq([
  C.pattern(/[a-z]/),
  C.pattern(/[0-9]/),
]);
```

## Repeat pattern
```js
C.pattern(/[a-z]/).many0();
C.pattern(/[a-z]/).many1();
C.pattern(/[a-z]/).many(2);
C.pattern(/[a-z]/).many(2, 4);
C.pattern(/[a-z]/).manyJust(2);
```

## Capture input string
```js
C.seq([
  C.pattern(/[a-z]+/),
  C.pattern(/-/),
  C.pattern(/[0-9]+/).capture(),
]);
```

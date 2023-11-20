## Regex pattern
```js
C.regex(/[a-z]/);
```

## Build to Regex
```js
C.regex(/[a-z]/).build();
```

## Pattern sequence
```js
C.seq([
  C.regex(/[a-z]/),
  C.regex(/[0-9]/),
]);
```

## Repeat pattern
```js
C.regex(/[a-z]/).many0();
C.regex(/[a-z]/).many1();
C.regex(/[a-z]/).many(2);
C.regex(/[a-z]/).many(2, 4);
C.regex(/[a-z]/).manyJust(2);
```

## Capture input string
```js
C.seq([
  C.regex(/[a-z0-9]+/),
  C.regex(/ /),
  C.regex(/[a-z0-9]+/).capture(),
]);
```

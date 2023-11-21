## Regex pattern
```js
carol(/[a-z]/);
carol('[a-z]');
```

## Convert to a Regex
```js
carol(/[a-z]/).toRegex();
```

## Pattern sequence
```js
carol.seq([
  carol(/[a-z]/),
  carol(/[0-9]/),
]);
```

## Repeat pattern
```js
carol(/[a-z]/).many0();
carol(/[a-z]/).many1();
carol(/[a-z]/).many(2);
carol(/[a-z]/).many(2, 4);
carol(/[a-z]/).manyJust(2);
```

## Capture input string
```js
carol.seq([
  carol(/[a-z]+/),
  carol(/-/),
  carol(/[0-9]+/).capture(),
]);
```

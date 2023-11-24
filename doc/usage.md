# Usage

## New carol pattern
```js
import carol from 'carol-js';
carol(/[a-z]/);
carol('[a-z]');
```

## Convert to a Regex
```js
import carol from 'carol-js';
carol(/[a-z]/).toRegex();
```

## Pattern sequence
```js
import carol from 'carol-js';
carol.seq([
  carol(/[a-z]/),
  carol(/[0-9]/),
]);
```

## Repeat pattern
```js
import carol from 'carol-js';
carol(/[a-z]/).many(); // *
carol(/[a-z]/).many(1); // +
carol(/[a-z]/).many(2); // {2,}
carol(/[a-z]/).many(2, 4); // {2,4}
carol(/[a-z]/).many({ length: 2 }); // {2}
carol(/[a-z]/).many(2, 2); // {2}
```

## Optional pattern
```js
import carol from 'carol-js';
carol(/[a-z]/).option();
```

## Capture input string
```js
import carol from 'carol-js';
carol.seq([
  carol(/[a-z]+/),
  carol(/-/),
  carol(/[0-9]+/).capture(),
]);
```

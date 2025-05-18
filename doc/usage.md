# Usage

## New carol pattern
```js
import carol from 'carol-js';
const pattern1 = carol(/[a-z]/);
const pattern2 = carol('[a-z]');
```

## Convert to a Regex
```js
import carol from 'carol-js';
const regex = carol(/[a-z]/).toRegex();
```
Equals to
```js
const regex = /[a-z]/;
```

## Sequence pattern
```js
import carol from 'carol-js';
carol.seq([
  carol(/[a-z]/),
  carol(/[0-9]/),
]);
// [a-z][0-9]
```

## Match any of the patterns
```js
import carol from 'carol-js';
carol.alt([
  carol(/true/),
  carol(/false/),
]);
// (?:true|false)
```

## Repeat pattern
```js
import carol from 'carol-js';
carol(/[a-z]/).many();
// (?:[a-z])*

carol(/[a-z]/).many(1);
// (?:[a-z])+

carol(/[a-z]/).many(2);
// (?:[a-z]){2,}

carol(/[a-z]/).many(2, 4);
// (?:[a-z]){2,4}

carol(/[a-z]/).many({ length: 2 });
// (?:[a-z]){2}

carol(/[a-z]/).many({ min: 2, greedy: false });
// (?:[a-z]){2,}?

carol(/[a-z]/).many({ min: 2, max: 4, greedy: false });
// (?:[a-z]){2,4}?
```

## Optional pattern
```js
import carol from 'carol-js';
carol(/[a-z]/).option();
// (?:[a-z])?
```

## Capture input string
```js
import carol from 'carol-js';
carol.seq([
  carol(/[a-z]+/),
  carol(/-/),
  carol(/[0-9]+/).capture(),
]);
// [a-z]+-([0-9]+)
```

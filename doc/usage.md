# Usage

## New carol pattern
```js
import C from 'carol-js';
const pattern1 = C.token(/[a-z]/);
const pattern2 = C.token('[a-z]');
```

## Convert to a Regex
```js
import C from 'carol-js';
const regex = C.token(/[a-z]/).toRegex();
```
Equals to
```js
const regex = /[a-z]/;
```

## Sequence pattern
```js
import C from 'carol-js';
C.seq([
  C.token(/[a-z]/),
  C.token(/[0-9]/),
]);
// [a-z][0-9]
```

## Match any of the patterns
```js
import C from 'carol-js';
C.alt([
  C.token(/true/),
  C.token(/false/),
]);
// (?:true|false)
```

## Repeat pattern
```js
import C from 'carol-js';
C.token(/[a-z]/).many();
// (?:[a-z])*

C.token(/[a-z]/).many(1);
// (?:[a-z])+

C.token(/[a-z]/).many(2);
// (?:[a-z]){2,}

C.token(/[a-z]/).many(2, 4);
// (?:[a-z]){2,4}

C.token(/[a-z]/).many({ length: 2 });
// (?:[a-z]){2}

C.token(/[a-z]/).many({ min: 2, greedy: false });
// (?:[a-z]){2,}?

C.token(/[a-z]/).many({ min: 2, max: 4, greedy: false });
// (?:[a-z]){2,4}?
```

## Optional pattern
```js
import C from 'carol-js';
C.token(/[a-z]/).option();
// (?:[a-z])?
```

## Capture input string
```js
import C from 'carol-js';
C.seq([
  C.token(/[a-z]+/),
  C.token(/-/),
  C.token(/[0-9]+/).capture(),
]);
// [a-z]+-([0-9]+)
```

## Exact match
```js
import C from 'carol-js';
C.token(/[a-z]/).toRegex({ exact: true });
// ^[a-z]$
```

## Case insensitive match
```js
import C from 'carol-js';
C.token(/[a-z]/).toRegex({ flags: "i" });
```
